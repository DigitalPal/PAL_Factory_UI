import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Order } from '../Entities/Order';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}


  getOrder(orderId): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Order';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url + '/' + orderId, {
      headers: headers
    });
  }


  getOrders(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Order';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  addOrder(order: Order): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Order';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };

    const request = {};
    request['OrderNumber'] = order.orderNumber;
    request['CustomerPONumber'] = order.customerPONumber;
    request['CustomerId'] = order.customerId;
    request['OrderDate'] = order.date.month + '-' + order.date.day + '-' + order.date.year;
    request['Price'] = order.price;
    request['Remark'] = order.remark;
    const products = [];
    order.products.forEach(fe => {
      products.push({ 'ProductId': fe.productId, 'Quantity': +fe.quantity});
    });
    request['Products'] = products;
    request['CreatedBy'] = environment.userId;
    request['TenantId'] = environment.tenantId;
    request['PlantId'] = environment.plantId;
    return this.http.post(url, [request], { headers: headers });
  }

  editOrder(order: Order): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Order';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = order.id;
    request['OrderNumber'] = order.orderNumber;
    request['CustomerPONumber'] = order.customerPONumber;
    request['CustomerId'] = order.customerId;
    request['OrderDate'] = order.date;
    request['Price'] = order.price;
    request['Remark'] = order.remark;
    const products = [];
    order.products.forEach(fe => {
      products.push({ 'ProductId': fe.productId, 'Quantity': fe.quantity});
    });
    request['Products'] = products;
    request['CreatedBy'] = environment.userId;
    request['TenantId'] = environment.tenantId;
    request['PlantId'] = environment.plantId;
    return this.http.put(url, [request], { headers: headers });
  }


  deleteOrder(order: Order): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Order';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + order.id, { headers: headers });
  }

  getProducts(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Product';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  getMaxNumbers(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Order/maxNumbers';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }
}
