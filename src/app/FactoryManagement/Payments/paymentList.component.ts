import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  NgxSpinnerService
} from 'ngx-spinner';
import {
  Payments
} from '../Entities/Payments';
import {
  InvoiceService
} from '../Services/invoice.service';
import {
  OrderService
} from '../Services/order.service';
import {
  PaymentsService
} from '../Services/payments.service';
import {
  SupplierPOService
} from '../Services/supplierPO.service';
@Component({
  selector: 'app-payment-list',
  templateUrl: './paymentList.component.html',
  styleUrls: ['./paymentList.component.scss']
})
export class PaymentListComponent implements OnInit {
  mode = '';
  public displayedColumns = [];
  payments: Payments[] = [];
  model = {
    id: null,
    date: null,
    orderNumber: '',
    orderId: '',
    customerId: '',
    customerName: '',
    invoiceNumber: '',
    invoiceId: '',
    amount: 0,
    paymentMode: 'CASH',
    bank: '',
    chequeNumber: '',
    chequeDate: null
    // remark: '',
  };
  constructor(private modalService: NgbModal, private invoiceService: InvoiceService
    , private orderService: OrderService, private service: PaymentsService, private spinner: NgxSpinnerService
    , private route: ActivatedRoute, private supplierOrderService: SupplierPOService) {}

  orderMaster = [];
  invoiceMaster = [];
  invoiceMasterOriginal = [];
  selectedInvoiceId = null;
  selectedSupplierOrderId = null;
  selectedOrderId = null;
  selectedInvoiceNumber = null;
  modal1 = null;

  open(content, row) {
    if (row) {
      this.model.id = row.id;
      this.model.invoiceNumber = row.invoiceNumber;
      this.model.invoiceId = row.invoiceId;
      this.model.orderNumber = row.orderNumber;
      this.model.orderId = row.orderId;
      this.model.customerId = row.customerId;
      this.model.customerName = row.customerName;
      const dateHere = new Date(row.date);
      this.model.date = {
        day: dateHere.getDate(),
        month: dateHere.getMonth() + 1,
        year: dateHere.getFullYear()
      };

      const chequeDateHere = new Date(row.ChequeDate);
      this.model.chequeDate = {
        day: chequeDateHere.getDate(),
        month: chequeDateHere.getMonth() + 1,
        year: chequeDateHere.getFullYear()
      };

      this.model.paymentMode = row.ModeOfPayment;
      this.model.chequeDate = row.ChequeNumber;
      this.model.bank = row.BankName;
      this.model.amount = row.amount;
      // this.model.remark = row.remark;
    } else {
      this.model.id = '';
      this.model.invoiceNumber = '';
      this.model.invoiceId = this.selectedInvoiceId;
      this.model.orderNumber = '';
      if (this.mode === 'SUPPLIER_ORDER') {
        this.model.orderId = this.selectedSupplierOrderId;
      } else {
      this.model.orderId = this.selectedOrderId;
      }
      this.model.customerId = '';
      this.model.customerName = '';
      this.model.date = null;
      this.model.amount = 0;
      this.model.chequeDate = null;

      this.model.paymentMode = 'CASH';
      this.model.chequeDate = null;
      this.model.bank = '';
      // this.model.remark = '';
    }
    this.filterInvoices();
    this.modal1 = this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    });
    this.modal1.result.then((result) => {
        this.spinner.show();
        if (result === 'SAVE') {
          if (this.model.id) {
            this.editPayment();
          } else {
            this.savePayment();
          }
        } else {
          this.spinner.hide();
        }
      },
      (reason) => {
        // handle close exception
      });
  }

  modalButtonClick(button) {
    switch (button) {
      case 'SAVE':
        const msg = this.validate();
        if (msg === '') {
          this.modal1.close('SAVE');
        } else {
          alert(msg);
        }
        break;
      case 'CANCEL':
        this.modal1.close('CANCEL');
        break;
    }
  }

  ngOnInit() {
    this.spinner.show();

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.mode = fragment.split('+')[0];
        if (this.mode === 'SUPPLIER_ORDER') {
          this.displayedColumns = ['orderNumber', 'customerName', 'date', 'amount', 'paymentMode'];
          this.selectedSupplierOrderId = fragment.split('+')[1];
          this.model.orderId = this.selectedSupplierOrderId;
        } else {
          this.displayedColumns = ['invoiceNumber', 'orderNumber', 'customerName', 'date', 'amount', 'paymentMode'];
          this.selectedInvoiceId = fragment.split('+')[1];
          this.model.invoiceId = this.selectedInvoiceId;
        }
      }
      this.initialLoad();
    });

  }

  initialLoad() {
    this.getPayments();
    this.getOrders();
    this.getInvoices();
  }

  savePayment() {
    if (this.mode === 'CUSTOMER_ORDER') {
      this.service.addPayment(this.model).subscribe(s => this.getPayments());
    } else {
      this.service.addSupplierPayment(this.model).subscribe(s => this.getPayments());
    }
  }

  deletePayment(row) {
    this.spinner.show();
    if (this.mode === 'CUSTOMER_ORDER') {
      this.service.deletePayment(row).subscribe(s => this.getPayments());
    } else {
      this.service.deleteSupplierPayment(row).subscribe(s => this.getPayments());
    }
  }


  editPayment() {
    if (this.mode === 'CUSTOMER_ORDER') {
      this.service.editPayment(this.model).subscribe(s => this.getPayments());
    } else {
      this.service.editSupplierPayment(this.model).subscribe(s => this.getPayments());
    }
  }


  getPayments() {
    if (this.mode === 'CUSTOMER_ORDER') {
      this.service.getPayments('').subscribe(s => {
        const localPayments = [];
        if (s && s.length > 0) {
          s.forEach(element => {
            if ((!this.selectedInvoiceId) || element.InvoiceId === this.selectedInvoiceId) {
              localPayments.push({
                id: element.Id,
                date: element.PaymentDate,
                orderNumber: element.OrderNumber,
                orderId: element.OrderId,
                invoiceNumber: element.InvoiceNumber,
                invoiceId: element.InvoiceId,
                customerName: element.CustomerName,
                customerId: element.CustomerId,
                amount: element.Amount,
                paymentMode: element.ModeOfPayment,
                chequeNumber: element.ChequeNumber,
                chequeDate: element.ChequeDate,
                bank: element.BankName,
                // remark: element.CreatedBy,
              });
            }
          });
        }
        this.payments = localPayments;
        this.spinner.hide();
      });
    } else {
      this.service.getSupplierPayments('').subscribe(s => {
        const localPayments = [];
        if (s && s.length > 0) {
          s.forEach(element => {
            if ((!this.selectedSupplierOrderId) || element.SupplierOrderId === this.selectedSupplierOrderId) {
              localPayments.push({
                id: element.Id,
                date: element.PaymentDate,
                orderNumber: element.SupplierOrderNumber,
                orderId: element.SupplierOrderId,
                // invoiceNumber: element.InvoiceNumber,
                // invoiceId: element.InvoiceId,
                customerName: element.SupplierName,
                customerId: element.SupplierId,
                amount: element.Amount,
                paymentMode: element.ModeOfPayment,
                chequeNumber: element.ChequeNumber,
                chequeDate: element.ChequeDate,
                bank: element.BankName,
                // remark: element.CreatedBy,
              });
            }
          });
        }
        this.payments = localPayments;
        this.spinner.hide();
      });
    }
  }


  getInvoices() {
    if (this.mode === 'CUSTOMER_ORDER') {
      this.invoiceService.getInvoices('').subscribe(element => {
        const localInvoices = [];
        element.forEach(fe => {

          if (this.selectedInvoiceId && this.selectedInvoiceId === fe.Id) {
            this.selectedInvoiceNumber = fe.InvoiceNumber.toString().trim();
            this.selectedOrderId = fe.OrderId;
          }

          localInvoices.push({
            invoiceId: fe.Id,
            invoiceNumber: fe.InvoiceNumber.toString().trim(),
            orderId: fe.OrderId,
          });
        });
        this.invoiceMasterOriginal = localInvoices;
        this.spinner.hide();
      });
    }
  }

  getOrders() {
    if (this.mode === 'CUSTOMER_ORDER') {
      this.orderService.getOrders('').subscribe(element => {
        const localOrders = [];
        element.forEach(fe => {
          localOrders.push({
            orderId: fe.Id,
            orderNumber: fe.OrderNumber.toString().trim(),
          });
        });
        this.orderMaster = localOrders;
        this.spinner.hide();
      });
    } else {
      this.supplierOrderService.getSupplierPOs('').subscribe(element => {
        const localOrders = [];
        element.forEach(fe => {
          localOrders.push({
            orderId: fe.Id,
            orderNumber: fe.SupplierOrderNumber.toString().trim(),
          });
        });
        this.orderMaster = localOrders;
        this.spinner.hide();
      });
    }
  }

  filterInvoices() {
    const localInvoices = [];
    this.invoiceMasterOriginal.forEach(fe => {

      if (fe.orderId === this.model.orderId) {
        localInvoices.push({
          invoiceId: fe.invoiceId,
          invoiceNumber: fe.invoiceNumber.toString().trim(),
        });
      }

    });
    this.invoiceMaster = localInvoices;
  }

  orderSelectionChange() {
    if (this.mode === 'CUSTOMER_ORDER') {
      this.filterInvoices();
    }
  }

  validate() {
    if (this.model.orderId == null || this.model.orderId === '') {
      return 'Please select customer for order';
    }
    if (this.mode === 'CUSTOMER_ORDER' && (this.model.invoiceId == null || this.model.invoiceId === '')) {
      return 'Please select invoice details';
    }
    if (this.model.date == null || this.model.date === 0) {
      return 'Please select date';
    }
    if (this.model.amount == null || this.model.amount === 0) {
      return 'Please enter amount';
    }
    if (isNaN(this.model.amount)) {
      return 'Amount should be a number';
    }
    return '';
  }
}
