import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SuppliersService } from '../Services/suppliers.service';
import { Supplier } from '../Entities/supplier';
  @Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss']
  })
  export class SupplierListComponent implements OnInit {
    public displayedColumns = ['name', 'supplierNumber', 'gst', 'address', 'contact', 'type', 'desc', 'actions'];
    
    suppliers: Supplier[] = [];
    model = {
    id: null,
    supplierName:'',
    supplierNumber: '',
    gst: '',
    address:'',
    contact: '',
    type:'',
    desc:''
    };

    constructor(private modalService: NgbModal, private service: SuppliersService, private spinner: NgxSpinnerService) {}

    open(content, row) {
      if (!row) {
        this.model.id = null;
        this.model.supplierName = '';
        this.model.supplierNumber='';
        this.model.gst = '';
        this.model.address = '';
        this.model.contact = '';
        this.model.type = '';
        this.model.desc = '';
      } else {
        this.model.id = row.id;
        this.model.supplierName = row.supplierName;
        this.model.supplierNumber = row.supplierNumber;
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
            this.editSupplier();
          } else {
            this.saveSupplier();
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
      this.getSuppliers();
    }

    saveSupplier() {
      this.service.addSupplier({
        SupplierName: this.model.supplierName,
        SupplierNumber : this.model.supplierNumber,
        GSTNumber: this.model.gst,
        Address: this.model.address,
        ContactNumber: this.model.contact,
        Type: this.model.type,
        Description: this.model.desc,
      }).subscribe(s => this.getSuppliers());
    }

    deleteSupplier(row) {
      this.spinner.show();
      this.service.deleteSupplier(row).subscribe(s => this.getSuppliers());
    }

    editSupplier() {
      this.service.editSupplier({
        Id: this.model.id,
        SupplierName: this.model.supplierName,
        SupplierNumber : this.model.supplierNumber,
        GSTNumber: this.model.gst,
        Address: this.model.address,
        ContactNumber: this.model.contact,
        Type: this.model.type,
        Description: this.model.desc,
      }).subscribe(s => this.getSuppliers());
    }

    getSuppliers() {
      this.service.getSuppliers('').subscribe(s => {
        const localSuppliers = [];
        if (s && s.length > 0) {
          s.forEach(element => {
            localSuppliers.push({
              id: element.Id,
              supplierName: element.SupplierName,
              supplierNumber:element.SupplierNumber,
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
        this.suppliers = localSuppliers;
        this.spinner.hide();
      });
    }

  }
