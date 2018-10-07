import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Order } from '../Entities/Order';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrder(orderId): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  getOrders(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  addOrder(order: Order): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    // request['Name'] = plant.name;
    // request['CreatedBy'] = plant.userName;
    // request['Address'] = plant.address;
    // request['ContactNumber'] = plant.contact;
    return this.http.post(url, [request], { headers: headers });
  }

  editOrder(order: Order): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    // request['Id'] = plant.id;
    // request['Name'] = plant.name;
    // request['CreatedBy'] = plant.userName;
    // request['Address'] = plant.address;
    // request['ContactNumber'] = plant.contact;
    return this.http.put(url, [request], { headers: headers });
  }


  deleteOrder(order: Order): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + order.id, { headers: headers });
  }

  getProducts(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SizeDetails';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

}
