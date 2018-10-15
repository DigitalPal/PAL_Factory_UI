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
    const request = null;
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
    // request['ChallanNumber'] = dispatch.ChallanNumber;
    request['OrderId'] = dispatch.orderId;
    request['OrderNumber'] = dispatch.orderNumber;
    request['DispatchDate'] = dispatch.date;
    request['TransportName'] = dispatch.transportName;
    request['Laoding'] = dispatch.loading;
    request['Unloading'] = dispatch.unloading;
    request['Remark'] = dispatch.remark;
    request['DispatchDetails'] = dispatch.products;
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
    // request['ChallanNumber'] = dispatch.ChallanNumber;
    request['OrderId'] = dispatch.orderId;
    request['OrderNumber'] = dispatch.orderNumber;
    request['DispatchDate'] = dispatch.date;
    request['TransportName'] = dispatch.transportName;
    request['Laoding'] = dispatch.loading;
    request['Unloading'] = dispatch.unloading;
    request['Remark'] = dispatch.remark;
    request['DispatchDetails'] = dispatch.products;
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

}
