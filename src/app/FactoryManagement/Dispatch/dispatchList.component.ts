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
  public displayedColumns = ['orderNumber', 'dispatchNumber', 'transportName', 'loading', 'unloading', 'remark', 'actions'];
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
    this.service.getDispatchs('').subscribe(s => {
      const localDispatches = [];
      if (s && s.length > 0) {
        s.forEach(element => {
            localDispatches.push({
            // id: element.Id,
            // name: element.Title,
            // measurementType: element.MeasureType,
          });
        });
      }
      this.dispatches = localDispatches;
      this.spinner.hide();
    });
  }

}
