import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from '../Entities/customer';
import { CustomersService } from '../Services/customers.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerListComponent implements OnInit {
  public displayedColumns = ['name', 'custNumber', 'gst', 'address', 'contact', 'type', 'desc', 'actions'];

  customers: Customer[] = [];
  model = {
    id: null,
    name: '',
    customerNumber: '',
    gst: '',
    address: '',
    contact: '',
    type: '',
    description: ''
  };

  constructor(private modalService: NgbModal, private service: CustomersService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    if (!row) {
      this.model.id = null;
      this.model.name = '';
      this.model.customerNumber = '';
      this.model.gst = '';
      this.model.address = '';
      this.model.contact = '';
      this.model.type = '';
      this.model.description = '';
    } else {
      this.model.id = row.id;
      this.model.name = row.name;
      this.model.customerNumber = row.customerNumber;
      this.model.gst = row.gst;
      this.model.address = row.address;
      this.model.contact = row.contact;
      this.model.type = row.type;
      this.model.description = row.description;
    }
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.spinner.show();
      if (result === 'SAVE') {
        if (this.model.id) {
          this.editCustomer();
        } else {
          this.saveCustomer();
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
    this.getCustomers();
  }

  saveCustomer() {
    this.service.addCustomer({
      name: this.model.name,
      customerNumber: this.model.customerNumber,
      gst: this.model.gst,
      address: this.model.address,
      contactNumber: this.model.contact,
      type: this.model.type,
      description: this.model.description,
    }).subscribe(s => this.getCustomers());
  }

  deleteCustomer(row) {
    this.spinner.show();
    this.service.deleteCustomer(row).subscribe(s => this.getCustomers());
  }

  editCustomer() {
    this.service.editCustomer({
      id: this.model.id,
      name: this.model.name,
      customerNumber: this.model.customerNumber,
      gst: this.model.gst,
      address: this.model.address,
      contactNumber: this.model.contact,
      type: this.model.type,
      description: this.model.description,
    }).subscribe(s => this.getCustomers());
  }

  getCustomers() {
    this.service.getCustomers('').subscribe(s => {
      const localCustomers = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localCustomers.push({
            id: element.Id,
            name: element.Name,
            customerNumber: element.CustomerNumber,
            gst: element.GSTNumber,
            address: element.Address,
            contactNumber: element.ContactNumber,
            type: element.Type,
            description: element.Description,
          });
        });
      }
      this.customers = localCustomers;
      this.spinner.hide();
    });
  }

}
