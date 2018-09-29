import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Supplier } from '../Entities/supplier';

@Injectable()
export class SuppliersService{
    constructor(private http: HttpClient) {}
    getSuppliers(logedInUser): Observable<any> {
      const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Supplier';
      const request = null;
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      };
      return this.http.get(url, { headers: headers });
    }

    addSupplier(supplier: Supplier): Observable<any> {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Supplier';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        const request = {};
        request['SupplierName'] = supplier.SupplierName;
        request['SupplierNumber'] = supplier.SupplierNumber;
        request['GSTNumber'] = supplier.GSTNumber;
        request['Address'] = supplier.Address;
        request['ContactNumber'] = supplier.ContactNumber;
        request['Type'] = supplier.Type;
        request['Description'] = supplier.Description;
        return this.http.post(url, [request], { headers: headers });
      }

      editSupplier(supplier : Supplier): Observable<any> {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Supplier';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        alert(supplier.Id);
        const request = {};
        request['Id'] = supplier.Id;
        request['SupplierName'] = supplier.SupplierName;
        request['SupplierNumber'] = supplier.SupplierNumber;
        request['GSTNumber'] = supplier.GSTNumber;
        request['Address'] = supplier.Address;
        request['ContactNumber'] = supplier.ContactNumber;
        request['Type'] = supplier.Type;
        request['Description'] = supplier.Description;
        return this.http.put(url, [request], { headers: headers });
      }

      deleteSupplier(supplier: Supplier): Observable<any> {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Supplier';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        alert(supplier.Id);
        return this.http.delete(url + '/' + supplier.Id, { headers: headers });
      }
}