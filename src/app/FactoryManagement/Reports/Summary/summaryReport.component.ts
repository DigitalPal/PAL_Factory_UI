import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SummaryReportService } from '../../Services/summaryReport.service';
@Component({
  selector: 'app-summary-report',
  templateUrl: './summaryReport.component.html',
  styleUrls: ['./summaryReport.component.scss']
})
export class SummaryReportComponent implements OnInit {
  public productDisplayedColumns = ['srNumber', 'productName', 'productQuantity'];
  public rawMaterialDisplayedColumns = ['srNumber', 'rawMaterialName', 'rawMaterialQuantity'];
  products = [];
  rawMaterials = [];

  constructor(private service: SummaryReportService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getSummary();
  }

  getSummary() {
    this.service.getSummaryReport().subscribe(s => {
      //   const localDispatches = [];
      //   if (s && s.length > 0) {
      //     s.forEach(element => {
      //       localDispatches.push({
      //         id: element.Id,
      //         orderNumber: element.OrderNumber,
      //         date: element.DispatchDate,
      //         orderId: element.OrderId,
      //         dispatchNumber: element.DispatchNumber,
      //         transportName: element.TransportName,
      //         loading: element.Loading,
      //         unloading: element.Unloading,
      //         remark: element.Remark,
      //       });
      //     });
      //   }
      //   this.dispatches = localDispatches;
      //   this.spinner.hide();
    });
  }
}
