import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Payments } from '../Entities/Payments';
import { InvoiceService } from '../Services/invoice.service';
import { OrderService } from '../Services/order.service';
import { PaymentsService } from '../Services/payments.service';
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
    , private orderService: OrderService, private service: PaymentsService, private spinner: NgxSpinnerService) {}

  orderMaster = [];
  invoiceMaster = [];
  invoiceMasterOriginal = [];

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
      this.model.invoiceId = '';
      this.model.orderNumber = '';
      this.model.orderId = '';
      this.model.customerId = '';
      this.model.customerName = '';
      this.model.date = null;
      this.model.amount = 0;
      this.model.remark = '';
    }
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
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
    }, (reason) => {
      // handle close exception
    });
  }

  ngOnInit() {
    this.spinner.show();
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
        localInvoices.push({
          invoiceId: fe.Id,
          invoiceNumber: fe.DispatchNumber.toString().trim(),
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
}
