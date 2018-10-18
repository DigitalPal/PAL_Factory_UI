import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RawMaterial } from '../Entities/RawMaterial';
import { RawMaterialInward } from '../Entities/RawMaterialInward';
import { Supplier } from '../Entities/supplier';
import { RawMaterialService } from '../Services/rawMaterial.service';
import { RawMaterialInwardService } from '../Services/rawMaterialInwardService';
import { SuppliersService } from '../Services/suppliers.service';
import { NullInjector } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-rawmaterial-inward-list',
  templateUrl: './rawMaterialInward.component.html',
  styleUrls: ['./rawMaterialInward.component.scss']
})
export class RawMaterialInwardListComponent implements OnInit {
  public displayedColumns = ['date',
    'material',
    'supplier',
    'vehicleNumber',
    'challanNumber',
    'quantity',
    'unloadingDetails',
    'remark',
    'actions'
  ];
  rawMaterialsInward: RawMaterialInward[] = [];
  rawMaterials: RawMaterial[] = [];
  suppliers: Supplier[] = [];

  model = {
    id: null,
    InwardDate: null,
    RawMaterialId: '',
    SupplierId: '',
    VechicalNumber: '',
    ChallanNumber: '',
    Quantity: 0,
    UnloadingDetails: '',
    Remarks: '',
  };


  constructor(private modalService: NgbModal,
    private rawMaterialInwardService: RawMaterialInwardService,
    private spinner: NgxSpinnerService,
    private rawMaterialService: RawMaterialService,
    private suppliersService: SuppliersService) {}

  open(content, row) {
    if (!row) {
      this.model.id = null;
      this.model.InwardDate = null;
      this.model.RawMaterialId = '';
      this.model.SupplierId = '';
      this.model.VechicalNumber = '';
      this.model.ChallanNumber = '';
      this.model.Quantity = 0;
      this.model.UnloadingDetails = '';
      this.model.Remarks = '';
    } else {
      this.model.id = row.id;
      const dateHere = new Date(row.InwardDate);
      this.model.InwardDate = {
        day: dateHere.getDate(),
        month: dateHere.getMonth() + 1,
        year: dateHere.getFullYear()
      };
      this.model.RawMaterialId = row.RawMaterialId;
      this.model.SupplierId = row.SupplierId;
      this.model.VechicalNumber = row.VechicalNumber;
      this.model.ChallanNumber = row.ChallanNumber;
      this.model.Quantity = row.Quantity;
      this.model.UnloadingDetails = row.UnloadingDetails;
      this.model.Remarks = row.Remarks;
    }
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.spinner.show();
      if (result === 'SAVE') {
        if (this.model.id) {
          this.editRawMaterialInward();
        } else {
          this.saveRawMaterialInward();
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
    this.getRawMaterials();
    this.getSuppliers();
    this.getRawMaterialInward();
  }

  saveRawMaterialInward() {
    this.rawMaterialInwardService.addRawMaterialInward({
      id: this.model.id,
      InwardDate: this.model.InwardDate,
      RawMaterialId: this.model.RawMaterialId,
      SupplierId: this.model.SupplierId,
      VechicalNumber: this.model.VechicalNumber,
      ChallanNumber: this.model.ChallanNumber,
      Quantity: this.model.Quantity,
      UnloadingDetails: this.model.UnloadingDetails,
      Remarks: this.model.Remarks,
    }).subscribe(s => this.getRawMaterialInward());
  }

  deleteRawMaterialInward(row) {
    this.spinner.show();
    this.rawMaterialInwardService.deleteRawMaterialInward(row).subscribe(s => this.getRawMaterialInward());
  }

  editRawMaterialInward() {
    this.rawMaterialInwardService.editRawMaterialInward({
      id: this.model.id,
      InwardDate: this.model.InwardDate,
      RawMaterialId: this.model.RawMaterialId,
      SupplierId: this.model.SupplierId,
      VechicalNumber: this.model.VechicalNumber,
      ChallanNumber: this.model.ChallanNumber,
      Quantity: this.model.Quantity,
      UnloadingDetails: this.model.UnloadingDetails,
      Remarks: this.model.Remarks,

    }).subscribe(s => this.getRawMaterialInward());
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials('').subscribe(s => {
      const localRawMaterials = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localRawMaterials.push({
            id: element.Id,
            name: element.Title,
            measurementType: element.MeasureType,
          });
        });
      }
      this.rawMaterials = localRawMaterials;
    });
  }

  getSuppliers() {
    this.suppliersService.getSuppliers('').subscribe(s => {
      const localSuppliers = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localSuppliers.push({
            id: element.Id,
            supplierName: element.SupplierName,
            supplierNumber: element.SupplierNumber,
          });
        });
      }
      this.suppliers = localSuppliers;
    });
  }

  getRawMaterialInward() {

    this.rawMaterialInwardService.getRawMaterialInwards('').subscribe(s => {
      const localRawMaterialInward = [];
      if (s && s.length > 0) {
        s.forEach(element => {

          localRawMaterialInward.push({
            id: element.Id,
            InwardDate: element.InwardDate,
            RawMaterialId: element.RawMaterialId,
            RawMaterial: element.RawMaterial.trim(),
            SupplierId: element.SupplierId,
            Supplier: element.SupplierName.trim(),
            VechicalNumber: element.VechicalNumber,
            ChallanNumber: element.ChallanNumber,
            Quantity: element.Quantity,
            UnloadingDetails: element.UnloadingDetails,
            Remarks: element.Remarks,
          });
        });
      }
      this.rawMaterialsInward = localRawMaterialInward;
      console.log(this.rawMaterialsInward);
      this.spinner.hide();
    });


  }
}
