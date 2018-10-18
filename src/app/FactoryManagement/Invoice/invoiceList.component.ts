import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Invoice } from '../Entities/Invoice';
import { DispatchService } from '../Services/disptach.service';
import { InvoiceService } from '../Services/invoice.service';
import { OrderService } from '../Services/order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoiceList.component.html',
  styleUrls: ['./invoiceList.component.scss']
})
export class InvoiceListComponent implements OnInit {
  public displayedColumns = ['invoiceNumber', 'orderNumber', 'date'
  , 'dispatchNumber', 'transportCharges', 'loadingCharges', 'unloadingCharges', 'price', 'remark', 'actions'];
  invoices: Invoice[] = [];
  model = {
    id: null,
    invoiceNumber: '',
    orderNumber: '',
    orderId: '',
    customerId: '',
    customerName: '',
    date: null,
    dispatchNumber: '',
    dispatchId: '',
    transportCharges: 0,
    loadingCharges: 0,
    unloadingCharges: 0,
    price: 0,
    remark: '',
  };

  orderMaster = [];
  dispatchMaster = [];
  dispatchMasterOriginal = [];

  constructor(private modalService: NgbModal, private service: InvoiceService, private router: Router
    , private spinner: NgxSpinnerService, private orderService: OrderService, private disptachService: DispatchService) {}

  open(content, row) {

    this.orderService.getMaxNumbers('').subscribe(s => {
      let newInvoiceNo = 1;
      if (s.InvoiceNumber) {
        newInvoiceNo = (+s.InvoiceNumber.split('-')[2]) + 1;
      }

      const invoiceNumber = 'INV-' + new Date().getDate().toString() +
        (new Date().getMonth() + 1).toString() +
        new Date().getFullYear().toString() +
        '-' + newInvoiceNo;

      if (row) {
        this.model.id = row.id;
        this.model.invoiceNumber = row.invoiceNumber;
        this.model.orderNumber = row.orderNumber;
        this.model.orderId = row.orderId;
        this.filterDispatches();
        // this.model.customerId = row.customerId;
        // this.model.customerName = row.customerName;
        const dateHere = new Date(row.date);
        this.model.date = {
          day: dateHere.getDate(),
          month: dateHere.getMonth() + 1,
          year: dateHere.getFullYear()
        };
        this.model.dispatchNumber = row.dispatchNumber;
        this.model.dispatchId = row.dispatchId;
        this.model.transportCharges = row.transportCharges;
        this.model.loadingCharges = row.loadingCharges;
        this.model.unloadingCharges = row.unloadingCharges;
        this.model.price = row.price;
        this.model.remark = row.remark;
      } else {
        this.model.id = null;
        this.model.invoiceNumber = invoiceNumber;
        this.model.orderNumber = '';
        this.model.orderId = '';
        this.model.customerId = '';
        this.model.customerName = '';
        this.model.date = null;
        this.model.dispatchNumber = '';
        this.model.dispatchId = '';
        this.model.transportCharges = 0;
        this.model.loadingCharges = 0;
        this.model.unloadingCharges = 0;
        this.model.price = 0;
        this.model.remark = '';
      }
      this.modalService.open(content, {
        size: 'lg',
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.spinner.show();
        if (result === 'SAVE') {
          if (this.model.id) {
            this.editInvoice();
          } else {
            this.saveInvoice();
          }
        } else {
          this.spinner.hide();
        }
      }, (reason) => {
        // handle close exception
      });

    });


  }

  ngOnInit() {
    this.spinner.show();
    this.getDispatches();
    this.getOrders();
    this.getInvoices();
  }

  saveInvoice() {
    this.service.addInvoice(this.model).subscribe(s => this.getInvoices());
  }

  deleteInvoice(row) {
    this.spinner.show();
    this.service.deleteInvoice(row).subscribe(s => this.getInvoices());
  }


  editInvoice() {
    this.service.editInvoice(this.model).subscribe(s => this.getInvoices());
  }


  getInvoices() {
    this.service.getInvoices('').subscribe(s => {
      const localInvoices = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localInvoices.push({
            id: element.Id,
            invoiceNumber: element.InvoiceNumber,
            orderNumber: element.OrderNumber,
            orderId: element.OrderId,
            date: element.InvoiceDate,
            dispatchNumber: element.DispatchNumber,
            dispatchId: element.DispatchId,
            transportCharges: element.TransportCharges,
            loadingCharges: element.LoadingCharges,
            unloadingCharges: element.UnloadingCharges,
            price: element.Amount,
            remark: element.Remark,
          });
        });
      }
      this.invoices = localInvoices;
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

  getDispatches() {
    this.disptachService.getDispatches('').subscribe(element => {
      const localDispatches = [];
      element.forEach(fe => {
        localDispatches.push({
          dispatchId: fe.Id,
          dispatchNumber: fe.DispatchNumber.toString().trim(),
          orderId: fe.OrderId,
        });
      });
      this.dispatchMasterOriginal = localDispatches;
      this.spinner.hide();
    });
  }

  filterDispatches() {
    const localDispatches = [];
    this.dispatchMasterOriginal.forEach(fe => {

      if (fe.orderId === this.model.orderId) {
        localDispatches.push({
          dispatchId: fe.dispatchId,
          dispatchNumber: fe.dispatchNumber.toString().trim(),
        });
      }

    });
    this.dispatchMaster = localDispatches;
  }

  orderSelectionChange() {
    this.filterDispatches();
  }

  openPayments(row) {
    this.router.navigate(['/auth/paymentList'], {fragment: row.id});
  }
}
