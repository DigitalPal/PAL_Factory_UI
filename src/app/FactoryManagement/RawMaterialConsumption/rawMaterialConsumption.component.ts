import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RawMaterialConsumption } from '../Entities/RawMaterialConsumption';
import { RawMaterialConsumptionService } from '../Services/rawMaterialConsumptionService';
@Component({
  selector: 'app-rawmaterial-consumption-list',
  templateUrl: './rawMaterialConsumption.component.html',
  styleUrls: ['./rawMaterialConsumption.component.scss']
})
export class RawMaterialConsumptionListComponent implements OnInit {
  public displayedColumns = ['date', 'material', 'quantity', 'remark', 'actions'];
  rawMaterialConsumptions: RawMaterialConsumption[] = [];
  model = {
    id: null,
    date: '',
    material: '',
    quantity: 0,
    remark: '',
  };
  constructor(private modalService: NgbModal, private service: RawMaterialConsumptionService, private spinner: NgxSpinnerService) {}

  open(content, row) {
    console.log(row);
    if (!row) {
      this.model.id = null;
      this.model.date = '';
      this.model.material = '';
      this.model.quantity = 0;
      this.model.remark = '';
    } else {
      this.model.id = row.id;
      this.model.date = row.date;
      this.model.material = row.material;
      this.model.quantity = row.quantity;
      this.model.remark = row.remark;
    }
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.spinner.show();
      if (result === 'SAVE') {
        if (this.model.id) {
          this.editRawMaterialConsumption();
        } else {
          this.saveRawMaterialConsumption();
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
    this.getRawMaterialConsumption();
  }

  saveRawMaterialConsumption() {
    // this.service.addRawMaterial({
    //   name: this.model.name,
    //   measurementType: this.model.measurementType,
    // }).subscribe(s => this.getRawMaterial());
  }

  deleteRawMaterialConsumption(row) {
    // this.spinner.show();
    // this.service.deleteRawMaterial(row).subscribe(s => this.getRawMaterial());
  }


  editRawMaterialConsumption() {
    // this.service.editRawMaterial({
    //   id: this.model.id,
    //   name: this.model.name,
    //   measurementType: this.model.measurementType,
    // }).subscribe(s => this.getRawMaterial());
  }


  getRawMaterialConsumption() {
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
