import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../Entities/customer';

@Injectable()
export class CustomersService{
    constructor(private http: HttpClient) {}
    getCustomers(logedInUser): Observable<any> {
      const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Customer';
      const request = null;
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      };
      return this.http.get(url, { headers: headers });
    }

    addCustomer(customer: Customer): Observable<any> {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Customer';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        const request = {};
        request['Name'] = customer.Name;
        request['CustomerNumber'] = customer.CustomerNumber;
        request['GSTNumber'] = customer.GSTNumber;
        request['Address'] = customer.Address;
        request['ContactNumber'] = customer.ContactNumber;
        request['Type'] = customer.Type;
        request['Description'] = customer.Description;
        return this.http.post(url, [request], { headers: headers });
      }

      editCustomer(customer: Customer): Observable<any> {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Customer';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        const request = {};
        request['Id'] = customer.Id;
        request['Name'] = customer.Name;
        request['CustomerNumber'] = customer.CustomerNumber;
        request['GSTNumber'] = customer.GSTNumber;
        request['Address'] = customer.Address;
        request['ContactNumber'] = customer.ContactNumber;
        request['Type'] = customer.Type;
        request['Description'] = customer.Description;
        return this.http.put(url, [request], { headers: headers });
      }

      deleteCustomer(customer: Customer): Observable<any> {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Customer';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        return this.http.delete(url + '/' + customer.Id, { headers: headers });
      }
}