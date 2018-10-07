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
  public displayedColumns = ['name', 'address', 'contact', 'adminUser', 'actions'];
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
    transportCharges: '',
    loadingCharges: '',
    unloadingCharges: '',
    price: '',
    remark: '',
  };
  constructor(private modalService: NgbModal, private service: InvoiceService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    if (!row) {
    //   this.model.id = null;
    //   this.model.name = '';
    //   this.model.address = '';
    //   this.model.contact = '';
    //   this.model.adminUser = null;
    } else {
    //   this.model.id = row.id;
    //   this.model.name = row.name;
    //   this.model.address = row.address;
    //   this.model.contact = row.contact;
    //   this.model.adminUser = row.userId;
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
    this.service.addInvoice({
    //   name: this.model.name,
    //   address: this.model.address,
    //   contact: this.model.contact,
    //   userName: this.model.adminUser,
    //   userId: this.model.adminUser,
    }).subscribe(s => this.getInvoices());
  }

  deletePlant(row) {
    this.spinner.show();
    this.service.deleteInvoice(row).subscribe(s => this.getInvoices());
  }


  editInvoice() {
    this.service.editInvoice({
    //   id: this.model.id,
    //   name: this.model.name,
    //   address: this.model.address,
    //   contact: this.model.contact,
    //   userName: this.model.adminUser,
    //   userId: this.model.adminUser,
    }).subscribe(s => this.getInvoices());
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
}
