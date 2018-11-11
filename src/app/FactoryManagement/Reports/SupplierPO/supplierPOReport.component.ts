import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RawMaterialService } from '../../Services/rawMaterial.service';
import { SupplierPOService } from '../../Services/supplierPO.service';
import { SuppliersService } from '../../Services/suppliers.service';
@Component({
  selector: 'app-supplierpo-report',
  templateUrl: './supplierPOReport.component.html',
  styleUrls: ['./supplierPOReport.component.scss']
})
export class SupplierPOReportComponent implements OnInit {
  public displayedColumns = ['srNumber', 'supplierPONumber', 'supplierName', 'date', 'rawMaterialName', 'POQuantity'];
  supplierPOs = [];
  model = {
    supplierPOId: '',
    supplierId: '',
    rawMaterialId: '',
    startDate: null,
    endDate: null
  };
  supplierMaster = [];
  rawMaterialMaster = [];
  supplierPOMaster = [];
  constructor(private service: SupplierPOService, private spinner: NgxSpinnerService
    , private rawMaterialService: RawMaterialService, private supplierService: SuppliersService) {}

  ngOnInit() {
    this.getSuppliers();
    this.getSupplierPOs();
    this.getRawMaterials();
    setTimeout(() => {
      this.refreshReport();
    }, 2000);
  }

  getSupplierPOReport() {

    const supplierName = (this.model.supplierId === '' || this.model.supplierId === 'ALL') ? ''
    : this.supplierMaster.find(f => f.id === this.model.supplierId).name;

    const supplierPONumber = (this.model.supplierPOId === '' || this.model.supplierPOId === 'ALL') ? ''
    : this.supplierPOMaster.find(f => f.supplierPOId === this.model.supplierPOId).supplierPONumber;

    const rawMaterial = (this.model.rawMaterialId === '' || this.model.rawMaterialId === 'ALL') ? ''
    : this.rawMaterialMaster.find(f => f.rawMaterialId === this.model.rawMaterialId).name;

    this.service.getSupplierPOReport(supplierName, supplierPONumber, rawMaterial
        , this.model.startDate, this.model.endDate).subscribe(s => {
      const localSupplierPOs = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localSupplierPOs.push({
            srno: element.SrNum,
            supplierPONumber: element.SupplierOrderNumber,
            supplierName: element.SupplierName,
            date: element.SupplierOrderDate,
            rawMaterialName: element.RawMaterialName.toString().trim(),
            POQuantity: element.Quantity,
          });
        });
      }
      this.supplierPOs = localSupplierPOs;
      this.spinner.hide();
    });
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

  getSupplierPOs() {
    this.service.getSupplierPOs('').subscribe(element => {
      const localSupplierPOs = [];
      element.forEach(fe => {
        localSupplierPOs.push({
          supplierPOId: fe.Id,
          supplierPONumber: fe.SupplierOrderNumber.toString().trim(),
        });
      });
      this.supplierPOMaster = localSupplierPOs;
      this.spinner.hide();
    });
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials('').subscribe(element => {
      const localRawMaterials = [];
      element.forEach(fe => {
        localRawMaterials.push({
          rawMaterialId: fe.Id,
          name: fe.Title.toString().trim(),
        });
      });
      this.rawMaterialMaster = localRawMaterials;
      this.spinner.hide();
    });
  }

  refreshReport() {
    this.spinner.show();
    this.getSupplierPOReport();
  }

}
