import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Supplier } from '../Entities/supplier';
import { SuppliersService } from '../Services/suppliers.service';
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
    supplierName: '',
    supplierNumber: '',
    gst: '',
    address: '',
    contactNumber: '',
    type: '',
    description: ''
  };

  constructor(private modalService: NgbModal, private service: SuppliersService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    if (!row) {
      this.model.id = null;
      this.model.supplierName = '';
      this.model.supplierNumber = '';
      this.model.gst = '';
      this.model.address = '';
      this.model.contactNumber = '';
      this.model.type = '';
      this.model.description = '';
    } else {
      this.model.id = row.id;
      this.model.supplierName = row.supplierName;
      this.model.supplierNumber = row.supplierNumber;
      this.model.gst = row.gst;
      this.model.address = row.address;
      this.model.contactNumber = row.contactNumber;
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
          this.editSupplier();
        } else {
          this.saveSupplier();
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
    this.getSuppliers();
  }

  saveSupplier() {
    this.service.addSupplier({
      supplierName: this.model.supplierName,
      supplierNumber: this.model.supplierNumber,
      gst: this.model.gst,
      address: this.model.address,
      contactNumber: this.model.contactNumber,
      type: this.model.type,
      description: this.model.description,
    }).subscribe(s => this.getSuppliers());
  }

  deleteSupplier(row) {
    this.spinner.show();
    this.service.deleteSupplier(row).subscribe(s => this.getSuppliers());
  }

  editSupplier() {
    this.service.editSupplier({
      id: this.model.id,
      supplierName: this.model.supplierName,
      supplierNumber: this.model.supplierNumber,
      gst: this.model.gst,
      address: this.model.address,
      contactNumber: this.model.contactNumber,
      type: this.model.type,
      description: this.model.description,
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
            supplierNumber: element.SupplierNumber,
            gst: element.GSTNumber,
            address: element.Address,
            contactNumber: element.ContactNumber,
            type: element.Type,
            description: element.Description,
          });
        });
      }
      this.suppliers = localSuppliers;
      this.spinner.hide();
    });
  }

}
