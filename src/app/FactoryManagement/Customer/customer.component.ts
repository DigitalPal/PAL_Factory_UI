import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersService } from '../Services/customers.service';
import { Customer } from '../Entities/customer';
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
    name:'',
    custNumber: '',
    gst: '',
    address:'',
    contact: '',
    type:'',
    desc:''
    };
    
    constructor(private modalService: NgbModal, private service: CustomersService, private spinner: NgxSpinnerService) {}

    open(content, row) {
      if (!row) {
        this.model.id = null;
        this.model.name = '';
        this.model.custNumber='';
        this.model.gst = '';
        this.model.address = '';
        this.model.contact = '';
        this.model.type = '';
        this.model.desc = '';
      } else {
        this.model.id = row.id;
        this.model.name = row.name;
        this.model.custNumber = row.custNumber;
        this.model.gst = row.gst;
        this.model.address = row.address;
        this.model.contact = row.contact;
        this.model.type = row.type;
        this.model.desc = row.desc;
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
        }
      }, (reason) => {
        // handle close exception
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

    ngOnInit() {
      this.spinner.show();
      this.getCustomers();
    }

    saveCustomer() {
      this.service.addCustomer({
        Name: this.model.name,
        CustomerNumber : this.model.custNumber,
        GSTNumber: this.model.gst,
        Address: this.model.address,
        ContactNumber: this.model.contact,
        Type: this.model.type,
        Description: this.model.desc,
      }).subscribe(s => this.getCustomers());
    }

    deleteCustomer(row) {
      this.spinner.show();
      this.service.deleteCustomer(row).subscribe(s => this.getCustomers());
    }

    editCustomer() {
      this.service.editCustomer({
        Id: this.model.id,
        Name: this.model.name,
        CustomerNumber : this.model.custNumber,
        GSTNumber: this.model.gst,
        Address: this.model.address,
        ContactNumber: this.model.contact,
        Type: this.model.type,
        Description: this.model.desc,
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
              custNumber:element.CustomerNumber,
              gst:element.GSTNumber,
              address: element.Address,
              contact: element.ContactNumber,
              type:element.Type,
              desc:element.Description,
              userName: element.CreatedBy,
              userId: element.CreatedBy
            });
          });
        }
        this.customers = localCustomers;
        this.spinner.hide();
      });
    }

  }
