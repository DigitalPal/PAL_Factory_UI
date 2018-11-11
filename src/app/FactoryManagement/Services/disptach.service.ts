import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Dispatch } from '../Entities/Dispatch';

@Injectable()
export class DispatchService {
  constructor(private http: HttpClient) {}

  getDispatch(dispatchId): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Dispatch';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url + '/' + dispatchId, {
      headers: headers
    });
  }

  getDispatches(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Dispatch';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  addDispatch(dispatch: Dispatch): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Dispatch';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['DispatchNumber'] = dispatch.dispatchNumber;
    request['OrderId'] = dispatch.orderId;
    request['OrderNumber'] = dispatch.orderNumber;
    request['DispatchDate'] = dispatch.date.month + '-' + dispatch.date.day + '-' + dispatch.date.year;
    request['TransportName'] = dispatch.transportName;
    request['Loading'] = dispatch.loading;
    request['Unloading'] = dispatch.unloading;
    request['Remark'] = dispatch.remark;
    const products = [];
    dispatch.products.forEach(fe => {
      products.push({ 'ProductId': fe.productId, 'Quantity': +fe.quantity});
    });
    request['DispatchDetails'] = products;
    request['CreatedBy'] = environment.userId;
    request['TenantId'] = environment.tenantId;
    request['PlantId'] = environment.plantId;
    return this.http.post(url, [request], {
      headers: headers
    });
  }

  editDispatch(dispatch: Dispatch): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Dispatch';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = dispatch.id;
    request['DispatchNumber'] = dispatch.dispatchNumber;
    request['OrderId'] = dispatch.orderId;
    request['OrderNumber'] = dispatch.orderNumber;
    request['DispatchDate'] = dispatch.date.month + '-' + dispatch.date.day + '-' + dispatch.date.year;
    request['TransportName'] = dispatch.transportName;
    request['Loading'] = dispatch.loading;
    request['Unloading'] = dispatch.unloading;
    request['Remark'] = dispatch.remark;
    const products = [];
    dispatch.products.forEach(fe => {
      products.push({ 'ProductId': fe.productId, 'Quantity': +fe.quantity});
    });
    request['DispatchDetails'] = products;
    request['CreatedBy'] = environment.userId;
    request['TenantId'] = environment.tenantId;
    request['PlantId'] = environment.plantId;
    return this.http.put(url, [request], {
      headers: headers
    });
  }


  deleteDispatch(dispatch: Dispatch): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Dispatch';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + dispatch.id, {
      headers: headers
    });
  }

  getProducts(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SizeDetails';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  getDispatchReport(orderNumber, customerName, startDate, endDate): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Dispatch/Search';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };

    const request = {};
    if (orderNumber) {
      request['OrderNumber'] = orderNumber;
    }

    if (customerName) {
      request['CustomerName'] = customerName;
    }

    if (startDate) {
      request['StartDate'] = startDate.month + '-' + startDate.day + '-' + startDate.year;
    }

    if (endDate) {
      request['EndDate'] = endDate.month + '-' + endDate.day + '-' + endDate.year;
    }

    return this.http.post(url, request, {
      headers: headers
    });
  }

}
