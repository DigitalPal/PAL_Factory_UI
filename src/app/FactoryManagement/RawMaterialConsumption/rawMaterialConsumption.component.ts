import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RawMaterialConsumption } from '../Entities/RawMaterialConsumption';
import { RawMaterialConsumptionService } from '../Services/rawMaterialConsumptionService';
import { RawMaterialService } from '../Services/rawMaterial.service';
import { RawMaterial } from '../Entities/RawMaterial';
import { NgbDateCustomParserFormatter} from '../Helpers/dateFormatter';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rawmaterial-consumption-list',
  templateUrl: './rawMaterialConsumption.component.html',
  styleUrls: ['./rawMaterialConsumption.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class RawMaterialConsumptionListComponent implements OnInit {
  public displayedColumns = ['ConsumptionDate', 'RawMaterial', 'Quantity', 'Remark', 'actions'];
  rawMaterialConsumptions: RawMaterialConsumption[] = [];
  rawMaterials: RawMaterial[] = [];
  model = {
    id: null,
    consumptionDate: null,
    rawMaterialId: '',
    quantity: 0,
    remark: '',
  };
  constructor(private modalService: NgbModal, private service: RawMaterialConsumptionService,
    private spinner: NgxSpinnerService, private rawMaterialService: RawMaterialService) {}

  open(content, row) {
    if (!row) {
      this.model.id = null;
      this.model.consumptionDate = null;
      this.model.rawMaterialId = '';
      this.model.quantity = 0;
      this.model.remark = '';
    } else {
      this.model.id = row.id;
      const dateHere = new Date(row.consumptionDate);
      this.model.consumptionDate = {
        day: dateHere.getDate(),
        month: dateHere.getMonth() + 1,
        year: dateHere.getFullYear()
      };
      this.model.rawMaterialId = row.rawMaterialId;
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
    this.spinner.show();
    this.getRawMaterials();
    this.getRawMaterialConsumption();
  }

  saveRawMaterialConsumption() {
    const msg = this.validate();
    if (msg === '') {
    this.service.addRawMaterialConsumption({
      id: this.model.id,
      consumptionDate: this.model.consumptionDate,
      rawMaterialId: this.model.rawMaterialId,
      RawMaterial: this.model.rawMaterialId,
      quantity: this.model.quantity,
      remark: this.model.remark
    }).subscribe(s => this.getRawMaterialConsumption());
  } else {
    alert(msg);
  }
  }

  deleteRawMaterialConsumption(row) {
    this.spinner.show();
    this.service.deleteRawMaterialConsumption(row).subscribe(s => this.getRawMaterialConsumption());
  }


  editRawMaterialConsumption() {
    this.service.editRawMaterialConsumption({
      id: this.model.id,
      consumptionDate: this.model.consumptionDate,
      rawMaterialId: this.model.rawMaterialId,
      RawMaterial: this.model.rawMaterialId,
      quantity: this.model.quantity,
      remark: this.model.remark
    }).subscribe(s => this.getRawMaterialConsumption());
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

  getRawMaterialConsumption() {
    this.service.getRawMaterialConsumptions('').subscribe(s => {
      const localRawMaterialConsumption = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localRawMaterialConsumption.push({
            id: element.Id,
            rawMaterialId: element.RawMaterialId,
            RawMaterial: element.RawMaterial,
            consumptionDate: element.ConsumptionDate,
            quantity: element.Quantity,
            remark: element.Remark.trim()
          });
        });
      }
      this.rawMaterialConsumptions = localRawMaterialConsumption;
      this.spinner.hide();
    });
  }

  validate() {
    if (this.model.consumptionDate == null || this.model.consumptionDate === '') {
      return 'Please select consumption date';
    }
    if (this.model.rawMaterialId === '0' || this.model.rawMaterialId === '') {
      return 'Please select raw material';
    }
    if (this.model.quantity === 0) {
      return 'Please enter quantity';
    }
    return '';
  }
}
