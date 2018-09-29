import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Customer } from '../Entities/customer';

@Injectable()
export class CustomersService {
  constructor(private http: HttpClient) {}
  getCustomers(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Customer';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  addCustomer(customer: Customer): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Customer';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Name'] = customer.name;
    request['CustomerNumber'] = customer.customerNumber;
    request['GSTNumber'] = customer.gst;
    request['Address'] = customer.address;
    request['ContactNumber'] = customer.contactNumber;
    request['Type'] = customer.type;
    request['Description'] = customer.description;
    return this.http.post(url, [request], {
      headers: headers
    });
  }

  editCustomer(customer: Customer): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Customer';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = customer.id;
    request['Name'] = customer.name;
    request['CustomerNumber'] = customer.customerNumber;
    request['GSTNumber'] = customer.gst;
    request['Address'] = customer.address;
    request['ContactNumber'] = customer.contactNumber;
    request['Type'] = customer.type;
    request['Description'] = customer.description;
    return this.http.put(url, [request], {
      headers: headers
    });
  }

  deleteCustomer(customer: Customer): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Customer';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + customer.id, {
      headers: headers
    });
  }
}
