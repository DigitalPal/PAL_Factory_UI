import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../Services/order.service';
import { RawMaterialService } from '../Services/rawMaterial.service';
import { SupplierPOService } from '../Services/supplierPO.service';
import { SuppliersService } from '../Services/suppliers.service';
@Component({
  selector: 'app-supplierpo-details',
  templateUrl: './supplierPODetails.component.html',
  styleUrls: ['./supplierPODetails.component.scss']
})
export class SupplierPODetailsComponent implements OnInit {
  model = {
    id: null,
    supplierPONumber: '',
    supplierId: '',
    supplierName: '',
    date: null,
    rate: 0,
    remark: '',
    status: '',
    rawMaterials: [],
    rawMaterialId: '',
    rawMaterialName: '',
    quantity: 0,
  };

  rawMaterialMaster = [];
  rawMaterialOriginal = [];
  supplierMaster = [];

  constructor(private service: SupplierPOService
    , private spinner: NgxSpinnerService
    , private route: ActivatedRoute
    , private supplierService: SuppliersService
    , private orderService: OrderService
    , private rawMaterialService: RawMaterialService
    , private router: Router) {}

  ngOnInit() {

    this.getSuppliers();
    this.getRawMaterials();
    this.spinner.show();
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.service.getSupplierPO(fragment).subscribe(details => {

          this.model.id = details.Id;
          this.model.supplierName = details.SupplierName.trim();
          this.model.supplierPONumber = details.SupplierOrderNumber.trim();
          this.model.supplierId = details.SupplierId;
          const dateHere = new Date(details.SupplierOrderDate);
          this.model.date = {
            day: dateHere.getDate(),
            month: dateHere.getMonth() + 1,
            year: dateHere.getFullYear()
          };
          this.model.rate = details.Price;
          this.model.remark = details.Remark;
          this.model.status = details.OrderStatus;
          const rawMaterials = [];
          details.RawMaterial.forEach(fe => {
            rawMaterials.push({
              rawMaterialId: fe.RawMaterialId,
              rawMaterialName: fe.RawMaterialName,
              quantity: fe.Quantity
            });
          });
          this.getRawMaterials();
          this.spinner.hide();
          this.model.rawMaterials = rawMaterials;
          this.model.rawMaterialId = '';
          this.model.rawMaterialName = '';
          this.model.quantity = 0;
        });
      } else {
        this.service.getMaxNumbers('').subscribe(s => {
          this.getRawMaterials();
          this.spinner.hide();
          let newOrderNo = 1;
          if (s.SupplierOrderNumber) {
            newOrderNo = (+s.SupplierOrderNumber.split('-')[2]) + 1;
          }

          const orderNumber = 'SPO-' + new Date().getDate().toString() +
            (new Date().getMonth() + 1).toString() +
            new Date().getFullYear().toString() +
            '-' + newOrderNo;

          this.model.id = null;
          this.model.supplierPONumber = orderNumber;
          this.model.supplierId = '';
          this.model.supplierName = '';
          this.model.date = null;
          this.model.rate = 0;
          this.model.remark = '';
          this.model.status = '';
          this.model.rawMaterials = [];
          this.model.rawMaterialId = '';
          this.model.rawMaterialName = '';
          this.model.quantity = 0;
        });
      }
    });
  }

  saveData() {
    const msg = this.validate();
    if (msg === '') {
      this.service.addSupplierPO(this.model).subscribe(s => {
        this.router.navigate(['/auth/supplierPOList']);
      });
    } else {
      alert(msg);
    }
  }

  validate() {
    if (this.model.supplierId == null || this.model.supplierId === '') {
      return 'Please select supplier for PO';
    }
    if (this.model.date == null || this.model.date === '') {
      return 'Please select date';
    }
    if (this.model.rate == null || this.model.rate === 0) {
      return 'Please enter rate for PO';
    }
    if (isNaN(this.model.rate)) {
      return 'Rate should be a number';
    }
    if (this.model.rawMaterials == null || this.model.rawMaterials.length === 0) {
      return 'Please select atleast 1 raw material';
    }
    return '';
  }

  validateRawMaterialAdd() {
    if (this.model.rawMaterialId == null || this.model.rawMaterialId === '') {
      return 'Please select atleast 1 raw material';
    }
    if (this.model.quantity == null || this.model.quantity === 0) {
      return 'Quantity should be greater than 0';
    }
    if (isNaN(this.model.quantity)) {
      return 'Quantity should be numeric';
    }
    return '';
  }

  editSupplierPO() {
    // TODO
    // this.service.editOrder({}).subscribe(s => s);
  }

  addRawMaterial() {
    const validationMsg = this.validateRawMaterialAdd();
    if (validationMsg === '') {
      const associatedRawMaterials = this.model.rawMaterials;
      const rawMaterialName = this.rawMaterialMaster.find(f => f.id === this.model.rawMaterialId).name;
      associatedRawMaterials.push({
        rawMaterialId: this.model.rawMaterialId,
        rawMaterialName: rawMaterialName,
        quantity: this.model.quantity
      });
      this.model.rawMaterials = associatedRawMaterials;
      this.model.quantity = 0;
      this.model.rawMaterialId = '';
      this.filterRawMaterialMaster();
    } else {
      alert(validationMsg);
    }
  }

  deleteRawMaterialClicked(row) {
    const associatedRawMaterials = this.model.rawMaterials;
    associatedRawMaterials.splice(associatedRawMaterials.indexOf(row), 1);
    this.model.rawMaterials = associatedRawMaterials;
    this.filterRawMaterialMaster();
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials('').subscribe(s => {
      this.rawMaterialOriginal = s;
      this.filterRawMaterialMaster();
      this.spinner.hide();
    });
  }

  filterRawMaterialMaster() {
    const localRawMaterials = [];
    if (this.rawMaterialOriginal && this.rawMaterialOriginal.length > 0) {
      this.rawMaterialOriginal.forEach(element => {
        const rawMaterialHere = this.model.rawMaterials.find(f => f.rawMaterialId === element.Id);
        if (!rawMaterialHere) {
          localRawMaterials.push({
            id: element.Id,
            name: element.Title.toString().trim(),
          });
        }
      });
    }
    this.rawMaterialMaster = localRawMaterials;
  }

  getSuppliers() {
    this.supplierService.getSuppliers('').subscribe(s => {
      const localSuppliers = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localSuppliers.push({
            id: element.Id,
            name: element.SupplierName.toString().trim(),
          });
        });
      }
      this.supplierMaster = localSuppliers;
      this.spinner.hide();
    });
  }

  backToListView() {
    this.router.navigate(['/auth/supplierPOList']);
  }

}
