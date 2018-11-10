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
  public displayedColumns = ['srNumber', 'supplierPONumber', 'supplierName', 'date', 'rawMaterialName', 'POQuantity', 'remark'];
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
    this.refreshReport();
    this.getSuppliers();
    this.getSupplierPOs();
    this.getRawMaterials();
  }

  getSupplierPOReport() {
    this.service.getSupplierPOReport(this.model.supplierId, this.model.supplierPOId, this.model.rawMaterialId
        , this.model.startDate, this.model.endDate).subscribe(s => {
      const localSupplierPOs = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localSupplierPOs.push({
            id: element.Id,
            orderNumber: element.OrderNumber,
            date: element.DispatchDate,
            orderId: element.OrderId,
            dispatchNumber: element.DispatchNumber,
            transportName: element.TransportName,
            loading: element.Loading,
            unloading: element.Unloading,
            remark: element.Remark,
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
            name: element.Name.toString().trim(),
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
          supplierPONumber: fe.SupplierPONumber.toString().trim(),
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
