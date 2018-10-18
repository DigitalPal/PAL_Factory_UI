import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Order } from '../Entities/Order';
import { OrderService } from '../Services/order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-list',
  templateUrl: './orderList.component.html',
  styleUrls: ['./orderList.component.scss']
})
export class OrderListComponent implements OnInit {
//   public displayedColumns = ['orderNumber', 'customerPONumber', 'customerName', 'date', 'price', 'remark', 'status', 'actions'];
  public displayedColumns = ['orderNumber', 'customerName', 'date', 'price', 'status', 'actions'];
  orders: Order[] = [];
  constructor(private service: OrderService
    , private spinner: NgxSpinnerService
    , private router: Router) {}

  ngOnInit() {
    // this.spinner.show();
    this.getOrders();
  }

  newOrderClick() {
    this.router.navigate(['/auth/orderDetails']);
  }

  getOrders() {
    this.service.getOrders('').subscribe(s => {
      const localOrders = [];
      if (s && s.length > 0) {
        s.forEach(element => {
            localOrders.push({
              id: element.Id,
              orderNumber: element.OrderNumber,
              customerPONumber: element.CustomerPONumber,
              customerName: element.CustomerName,
              customerId: element.CustomerId,
              date: element.OrderDate,
              price: element.Price,
              remark: element.Remark,
              status: element.OrderStatus,
          });
        });
      }
      this.orders = localOrders;
      this.spinner.hide();
    });
  }

  invoiceClicked(row) {
    this.router.navigate(['/auth/invoiceList'], {fragment: row.id});
  }

}
