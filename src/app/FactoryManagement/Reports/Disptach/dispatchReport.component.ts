import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersService } from '../../Services/customers.service';
import { DispatchService } from '../../Services/disptach.service';
import { OrderService } from '../../Services/order.service';
@Component({
  selector: 'app-dispatch-report',
  templateUrl: './dispatchReport.component.html',
  styleUrls: ['./dispatchReport.component.scss']
})
export class DispatchReportComponent implements OnInit {
  public displayedColumns = ['srNumber', 'orderNumber'
  , 'dispatchNumber', 'customerName', 'date', 'productName'
  , 'orderQuantity', 'dispatchQuantity', 'transportName', 'loading'
  , 'unloading', 'remark', 'orderStatus'];
  dispatches = [];
  model = {
    orderId: '',
    customerId: '',
    startDate: null,
    endDate: null
  };
  customerMaster = [];
  orderMaster = [];
  constructor(private service: DispatchService
    , private orderService: OrderService, private spinner: NgxSpinnerService
    , private customerService: CustomersService) {}

  ngOnInit() {
    this.refreshReport();
    this.getCustomers();
    this.getOrders();
  }

  getDispatch() {
    this.service.getDispatchReport(this.model.orderId, this.model.customerId, this.model.startDate, this.model.endDate).subscribe(s => {
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

  getCustomers() {
    this.customerService.getCustomers('').subscribe(s => {
      const localCustomers = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localCustomers.push({
            id: element.Id,
            name: element.Name.toString().trim(),
          });
        });
      }
      this.customerMaster = localCustomers;
      this.spinner.hide();
    });
  }

  getOrders() {
    this.orderService.getOrders('').subscribe(element => {
      const localOrders = [];
      element.forEach(fe => {
        localOrders.push({
          orderId: fe.Id,
          orderNumber: fe.OrderNumber.toString().trim(),
        });
      });
      this.orderMaster = localOrders;
      this.spinner.hide();
    });
  }

  refreshReport() {
    this.spinner.show();
    this.getDispatch();
  }

}
