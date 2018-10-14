import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Invoice } from '../Entities/Invoice';
import { InvoiceService } from '../Services/invoice.service';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoiceList.component.html',
  styleUrls: ['./invoiceList.component.scss']
})
export class InvoiceListComponent implements OnInit {
  public displayedColumns = ['invoiceNumber', 'orderNumber'
  , 'customerName', 'date', 'disptachNumber', 'transportCharges'
  , 'loadingCharges', 'unloadingCharges', 'price', 'remark', 'actions'];
  plants: Invoice[] = [];
  model = {
    id: null,
    invoiceNumber: '',
    orderNumber: '',
    orderId: '',
    customerId: '',
    customerName: '',
    date: '',
    disptachNumber: '',
    disptachId: '',
    transportCharges: 0,
    loadingCharges: 0,
    unloadingCharges: 0,
    price: 0,
    remark: '',
  };
  constructor(private modalService: NgbModal, private service: InvoiceService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    if (!row) {
      this.model.id = row.id;
      this.model.invoiceNumber = row.invoiceNumber;
      this.model.orderNumber = row.orderNumber;
      this.model.orderId = row.orderId;
      this.model.customerId = row.customerId;
      this.model.customerName = row.customerName;
      this.model.date = row.date;
      this.model.disptachNumber = row.disptachNumber;
      this.model.disptachId = row.disptachId;
      this.model.transportCharges = row.transportCharges;
      this.model.loadingCharges = row.loadingCharges;
      this.model.unloadingCharges = row.unloadingCharges;
      this.model.price = row.price;
      this.model.remark = row.remark;
    } else {
      this.model.id = null;
      this.model.invoiceNumber = '';
      this.model.orderNumber = '';
      this.model.orderId = '';
      this.model.customerId = '';
      this.model.customerName = '';
      this.model.date = '';
      this.model.disptachNumber = '';
      this.model.disptachId = '';
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
  }

  ngOnInit() {
    this.spinner.show();
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
      const localPlants = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localPlants.push({
            id: element.Id,
            name: element.Name,
            address: element.Address,
            contact: element.ContactNumber,
            userName: 'Astracon Admin', // element.CreatedBy,
            userId: element.CreatedBy
          });
        });
      }
      this.plants = localPlants;
      this.spinner.hide();
    });
  }

  openPayments() {
    
  }
}
