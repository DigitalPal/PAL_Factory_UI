import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Payments } from '../Entities/Payments';
import { PaymentsService } from '../Services/payments.service';
@Component({
  selector: 'app-payment-list',
  templateUrl: './paymentList.component.html',
  styleUrls: ['./paymentList.component.scss']
})
export class PaymentListComponent implements OnInit {
  public displayedColumns = ['invoiceNumber', 'orderNumber'
  , 'customerName', 'date', 'amount', 'remark', 'actions'];
  payments: Payments[] = [];
  model = {
    id: null,
    date: '',
    orderNumber: '',
    orderId: '',
    customerId: '',
    customerName: '',
    invoiceNumber: '',
    invoiceId: '',
    amount: 0,
    remark: '',
  };
  constructor(private modalService: NgbModal, private service: PaymentsService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    if (!row) {
      this.model.id = row.id;
      this.model.invoiceNumber = row.invoiceNumber;
      this.model.invoiceId = row.invoiceId;
      this.model.orderNumber = row.orderNumber;
      this.model.orderId = row.orderId;
      this.model.customerId = row.customerId;
      this.model.customerName = row.customerName;
      this.model.date = row.date;
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
      this.model.date = '';
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
}
