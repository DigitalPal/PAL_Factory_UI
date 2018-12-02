import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RawMaterialService } from '../../Services/rawMaterial.service';
import { SuppliersService } from '../../Services/suppliers.service';

import { RawMaterialInwardService } from '../../Services/rawMaterialInwardService';
@Component({
    selector: 'app-inward-report',
    templateUrl: './inwardReport.component.html',
    styleUrls: ['./inwardReport.component.scss']
  })
  export class inwardReportComponent implements OnInit {
    public displayedColumns = [
                                'srNum',
                                'inwardDate',
                                'supplierName', 
                                'rawMaterialName',
                                'poNumber', 
                                'quantity',
                                'unit',
                                
                                ];
    rawMaterialInwards = [];
    model = {
      rawMaterialId: '',
      rawMaterialName: '',
      supplierId: '',
      supplierName: '',
      poNumber: '',
      startDate: '',
      endDate: '',
      inwardDate: '',
      };
    rawMaterialMaster = [];
    supplierMaster = [];
    constructor(private rawMaterialInwardService: RawMaterialInwardService,
                private rawMaterialService: RawMaterialService, 
                private suppliersService: SuppliersService, 
                private spinner: NgxSpinnerService) {}


  ngOnInit() {
    this.getRawMaterials();
    this.getSuppliers();

    setTimeout(() => {
      this.refreshReport();
    }, 2000);
  }

  getRawMaterialInward() {
    const rawMaterialName = (this.model.rawMaterialId === '' || this.model.rawMaterialId === 'ALL') ? ''
    : this.rawMaterialMaster.find(f => f.id === this.model.rawMaterialId).name;

    const supplierlName = (this.model.supplierId === '' || this.model.supplierName === 'ALL') ? ''
    : this.supplierMaster.find(f => f.id === this.model.supplierId).supplierName;

    this.rawMaterialInwardService.getInwardReport(rawMaterialName, supplierlName, this.model.startDate, this.model.endDate).subscribe(s => {
      const localInward = [];
      if (s && s.length > 0) {
        s.forEach(element => {
            localInward.push({
            srNum: element.SrNum,
            rawMaterialName: element.rawMaterialName,
            supplierlName: element.supplierlName,
            quantity: element.quantity,
            poNumber: element.poNumber,
            inwardDate: element.inwardDate,
          });
        });
      }
      this.rawMaterialInwards = localInward;
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
      this.supplierMaster = localSuppliers;
    });
  }

  refreshReport() {
    this.spinner.show();
    this.getRawMaterialInward();
  }
}
