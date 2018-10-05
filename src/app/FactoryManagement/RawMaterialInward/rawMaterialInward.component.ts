import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RawMaterialInward } from '../Entities/RawMaterialInward';
import { RawMaterialInwardService } from '../Services/rawMaterialInwardService';
@Component({
  selector: 'app-rawmaterial-inward-list',
  templateUrl: './rawMaterialInward.component.html',
  styleUrls: ['./rawMaterialInward.component.scss']
})
export class RawMaterialInwardListComponent implements OnInit {
  public displayedColumns = ['date', 'material', 'supplier', 'vehicleNumber'
  , 'challanNumber', 'quantity', 'unloadingDetails', 'remark', 'actions'];
  rawMaterialInwards: RawMaterialInward[] = [{
    date: '02/10/2018',
    challanNumber: 'CH0001',
    materialname: 'PONDASH',
    quantity: 100,
    remark: 'NA',
    supplierName: 'PRATIK TRANSPORT',
    unloadingDetails: 'Mathadi',
    vehicleNumber: 'MH12/KP8225',
    id: null,
    materialId: null,
    supplierId: null
  }];
  model = {
    id: null,
    date: '',
    material: '',
    supplier: '',
    vehicleNumber: '',
    challan: '',
    quantity: 0,
    unloadingDetails: '',
    remark: '',
  };
  constructor(private modalService: NgbModal, private service: RawMaterialInwardService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    console.log(row);
    if (!row) {
      this.model.id = null;
      this.model.date = '';
      this.model.material = '';
      this.model.supplier = '';
      this.model.vehicleNumber = '';
      this.model.challan = '';
      this.model.quantity = 0;
      this.model.unloadingDetails = '';
      this.model.remark = '';
    } else {
        this.model.id = row.id;
        this.model.date = row.date;
        this.model.material = row.material;
        this.model.supplier = row.supplier;
        this.model.vehicleNumber = row.vehicleNumber;
        this.model.challan = row.challan;
        this.model.quantity = row.quantity;
        this.model.unloadingDetails = row.unloadingDetails;
        this.model.remark = row.remark;
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
    // this.spinner.show();
    this.getRawMaterialInward();
  }

  saveRawMaterialInward() {
    // this.service.addRawMaterial({
    //   name: this.model.name,
    //   measurementType: this.model.measurementType,
    // }).subscribe(s => this.getRawMaterial());
  }

  deleteRawMaterialInward(row) {
    // this.spinner.show();
    // this.service.deleteRawMaterial(row).subscribe(s => this.getRawMaterial());
  }


  editRawMaterialInward() {
    // this.service.editRawMaterial({
    //   id: this.model.id,
    //   name: this.model.name,
    //   measurementType: this.model.measurementType,
    // }).subscribe(s => this.getRawMaterial());
  }


  getRawMaterialInward() {
    // this.service.getRawMaterials('').subscribe(s => {
    //   const localRawMaterials = [];
    //   if (s && s.length > 0) {
    //     s.forEach(element => {
    //       localRawMaterials.push({
    //         id: element.Id,
    //         name: element.Title,
    //         measurementType: element.MeasureType,
    //       });
    //     });
    //   }
    //   this.rawMaterials = localRawMaterials;
    //   this.spinner.hide();
    // });
  }

}
