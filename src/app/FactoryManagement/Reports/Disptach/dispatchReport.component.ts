import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersService } from '../../Services/customers.service';
import { DispatchService } from '../../Services/disptach.service';
import { OrderService } from '../../Services/order.service';
import { NgbDateCustomParserFormatter} from '../../Helpers/dateFormatter';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dispatch-report',
  templateUrl: './dispatchReport.component.html',
  styleUrls: ['./dispatchReport.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class DispatchReportComponent implements OnInit {
  public displayedColumns = ['srNumber', 'orderNumber'
  , 'dispatchNumber', 'customerName', 'date', 'productName'
  , 'orderQuantity', 'dispatchQuantity', 'transportName', 'loading'
  , 'unloading'];
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
    this.getCustomers();
    this.getOrders();

    setTimeout(() => {
      this.refreshReport();
    }, 2000);
  }

  getDispatch() {

    const orderNumber = (this.model.orderId === '' || this.model.orderId === 'ALL') ? ''
    : this.orderMaster.find(f => f.orderId === this.model.orderId).orderNumber;

    const customerName = (this.model.customerId === '' || this.model.customerId === 'ALL') ? ''
    : this.customerMaster.find(f => f.id === this.model.customerId).name;

    this.service.getDispatchReport(orderNumber, customerName, this.model.startDate, this.model.endDate).subscribe(s => {
      const localDispatches = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localDispatches.push({
            srno: element.SrNum,
            orderNumber: element.OrderNumber,
            dispatchNumber: element.ChallanNumber,
            customerName: element.CustomerName,
            date: element.DispatchDate,
            productName: element.ProductName,
            orderQuantity: element.OrderQuantity,
            dispatchQuantity: element.DispatchQuantity,
            transportName: element.TransportName,
            loading: element.Loading,
            unloading: element.Unloading,
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
