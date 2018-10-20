import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Payments } from '../Entities/Payments';
import { InvoiceService } from '../Services/invoice.service';
import { OrderService } from '../Services/order.service';
import { PaymentsService } from '../Services/payments.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-payment-list',
  templateUrl: './paymentList.component.html',
  styleUrls: ['./paymentList.component.scss']
})
export class PaymentListComponent implements OnInit {
  public displayedColumns = ['invoiceNumber', 'orderNumber', 'customerName', 'date', 'amount', 'remark', 'actions'];
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
    remark: '',
  };
  constructor(private modalService: NgbModal, private invoiceService: InvoiceService
    , private orderService: OrderService, private service: PaymentsService
    , private spinner: NgxSpinnerService, private route: ActivatedRoute) {}

  orderMaster = [];
  invoiceMaster = [];
  invoiceMasterOriginal = [];
  selectedInvoiceId = null;
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
      this.model.amount = row.amount;
      this.model.remark = row.remark;
    } else {
      this.model.id = '';
      this.model.invoiceNumber = '';
      this.model.invoiceId = this.selectedInvoiceId;
      this.model.orderNumber = '';
      this.model.orderId = this.selectedOrderId;
      this.model.customerId = '';
      this.model.customerName = '';
      this.model.date = null;
      this.model.amount = 0;
      this.model.remark = '';
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
        this.selectedInvoiceId = fragment;
        this.model.invoiceId = this.selectedInvoiceId;
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
    this.service.addPayment(this.model).subscribe(s => this.getPayments());
  }

  deletePayment(row) {
    this.spinner.show();
    this.service.deletePayment(row).subscribe(s => this.getPayments());
  }


  editPayment() {
    this.service.editPayment(this.model).subscribe(s => this.getPayments());
  }


  getPayments() {
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
                // remark: element.CreatedBy,
              });
          }
        });
      }
      this.payments = localPayments;
      this.spinner.hide();
    });
  }


  getInvoices() {
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

  getOrders() {
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
    this.filterInvoices();
  }

  validate() {
    if (this.model.orderId == null || this.model.orderId === '') {
      return 'Please select customer for order';
    }
    if (this.model.invoiceId == null || this.model.invoiceId === '') {
      return 'Please select invoice details';
    }
    if (this.model.date == null || this.model.date === 0) {
      return 'Please select date';
    }
    if (this.model.amount == null || this.model.amount === 0) {
      return 'Please enter amount';
    }
    return '';
  }
}
