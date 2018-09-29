import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Supplier } from '../Entities/supplier';

@Injectable()
export class SuppliersService {
  constructor(private http: HttpClient) {}
  getSuppliers(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Supplier';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  addSupplier(supplier: Supplier): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Supplier';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['SupplierName'] = supplier.supplierName;
    request['SupplierNumber'] = supplier.supplierNumber;
    request['GSTNumber'] = supplier.gst;
    request['Address'] = supplier.address;
    request['ContactNumber'] = supplier.contactNumber;
    request['Type'] = supplier.type;
    request['Description'] = supplier.description;
    return this.http.post(url, [request], {
      headers: headers
    });
  }

  editSupplier(supplier: Supplier): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Supplier';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = supplier.id;
    request['SupplierName'] = supplier.supplierName;
    request['SupplierNumber'] = supplier.supplierNumber;
    request['GSTNumber'] = supplier.gst;
    request['Address'] = supplier.address;
    request['ContactNumber'] = supplier.contactNumber;
    request['Type'] = supplier.type;
    request['Description'] = supplier.description;
    return this.http.put(url, [request], {
      headers: headers
    });
  }

  deleteSupplier(supplier: Supplier): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Supplier';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    alert(supplier.id);
    return this.http.delete(url + '/' + supplier.id, {
      headers: headers
    });
  }
}
