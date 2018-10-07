import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Dispatch } from '../Entities/Dispatch';

@Injectable()
export class DispatchService {
  constructor(private http: HttpClient) {}

  getOrder(orderId): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  getDispatchs(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  addDispatch(dispatch: Dispatch): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    // request['Name'] = plant.name;
    // request['CreatedBy'] = plant.userName;
    // request['Address'] = plant.address;
    // request['ContactNumber'] = plant.contact;
    return this.http.post(url, [request], {
      headers: headers
    });
  }

  editDispatch(dispatch: Dispatch): Observable < any > {
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
    return this.http.put(url, [request], {
      headers: headers
    });
  }


  deleteDispatch(dispatch: Dispatch): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
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
