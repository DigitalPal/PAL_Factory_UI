import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dispatch } from '../Entities/Dispatch';
import { NgxSpinnerService } from 'ngx-spinner';
import { DispatchService } from '../Services/disptach.service';
@Component({
  selector: 'app-dispatch-list',
  templateUrl: './dispatchList.component.html',
  styleUrls: ['./dispatchList.component.scss']
})
export class DispatchListComponent implements OnInit {
  public displayedColumns = ['orderNumber', 'dispatchNumber', 'transportName', 'loading', 'unloading', 'remark'];
  dispatches: Dispatch[] = [];
  constructor(private service: DispatchService
    , private spinner: NgxSpinnerService
    , private router: Router) {}

  ngOnInit() {
    this.spinner.show();
    this.getDispatch();
  }

  newDisptachClick() {
    this.router.navigate(['/auth/dispatchDetails']);
  }

  getDispatch() {
    this.service.getDispatches('').subscribe(s => {
      const localDispatches = [];
      if (s && s.length > 0) {
        s.forEach(element => {
            localDispatches.push({
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
      this.dispatches = localDispatches;
      this.spinner.hide();
    });
  }

}
