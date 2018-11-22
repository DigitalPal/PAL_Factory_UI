import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RawMaterialService } from '../../Services/rawMaterial.service';
import { RawMaterialConsumptionService } from '../../Services/rawMaterialConsumptionService';
@Component({
    selector: 'app-consumption-report',
    templateUrl: './consumptionReport.component.html',
    styleUrls: ['./consumptionReport.component.scss']
  })
  export class ConsumptionReportComponent implements OnInit {
    public displayedColumns = ['srNum', 'consumptionDate', 'rawMaterial', 'quantity', 'measureType'];
    consumptions = [];
    model = {
        rawMaterialId: '',
        startDate: null,
        endDate: null
      };
      rawMaterialMaster = [];
      constructor(private service: RawMaterialConsumptionService,
        private rawMaterialService: RawMaterialService, private spinner: NgxSpinnerService) {}


  ngOnInit() {
    this.getRawMaterials();

    setTimeout(() => {
      this.refreshReport();
    }, 2000);
  }

  getConsumption() {
    const rawMaterialName = (this.model.rawMaterialId === '' || this.model.rawMaterialId === 'ALL') ? ''
    : this.rawMaterialMaster.find(f => f.id === this.model.rawMaterialId).name;

    this.service.getConsumptionReport(rawMaterialName, this.model.startDate, this.model.endDate).subscribe(s => {
      const localConsumptions = [];
      if (s && s.length > 0) {
        s.forEach(element => {
            localConsumptions.push({
            srNum: element.SrNum,
            consumptionDate: element.ConsumptionDate,
            rawMaterial: element.RawMaterial,
            quantity: element.Quantity,
            measureType: element.MeasureType
          });
        });
      }
      this.consumptions = localConsumptions;
      this.spinner.hide();
    });
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials('').subscribe(s => {
      const localRawMaterials = [];
      if (s && s.length > 0) {
        s.forEach(element => {
            localRawMaterials.push({
            id: element.Id,
            name: element.Title.toString().trim(),
          });
        });
      }
      this.rawMaterialMaster = localRawMaterials;
      this.spinner.hide();
    });
  }

  refreshReport() {
    this.spinner.show();
    this.getConsumption();
  }
}
