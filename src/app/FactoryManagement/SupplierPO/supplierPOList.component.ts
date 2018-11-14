import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SupplierPO } from '../Entities/SupplierPO';
import { SupplierPOService } from '../Services/supplierPO.service';
@Component({
  selector: 'app-supplierpo-list',
  templateUrl: './supplierPOList.component.html',
  styleUrls: ['./supplierPOList.component.scss']
})
export class SupplierPOListComponent implements OnInit {
  //   public displayedColumns = ['orderNumber', 'customerPONumber', 'customerName', 'date', 'price', 'remark', 'status', 'actions'];
  public displayedColumns = ['supplierPONumber', 'supplierName', 'date', 'rate', 'status', 'remark', 'actions'];
  supplierPOs: SupplierPO[] = [];
  constructor(private service: SupplierPOService, private spinner: NgxSpinnerService, private router: Router) {}

  ngOnInit() {
    this.spinner.show();
    this.getSupplierPOs();
  }

  newSupplierPOClick() {
    this.router.navigate(['/auth/supplierPODetails']);
  }

  getSupplierPOs() {
    this.service.getSupplierPOs('').subscribe(s => {
      const localSupplierPOs = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localSupplierPOs.push({
            id: element.Id,
            supplierPONumber: element.SupplierOrderNumber,
            supplierId: element.SupplierId,
            supplierName: element.SupplierName,
            date: element.SupplierOrderDate,
            rate: element.Price,
            remark: element.Remark,
            status: element.OrderStatus,
          });
        });
      }
      this.supplierPOs = localSupplierPOs;
      this.spinner.hide();
    });
  }

  printClicked(row) {
    this.router.navigate(['/auth/printPO'], {
      fragment: row.id
    });
  }

}
