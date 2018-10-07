import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Invoice } from '../Entities/Invoice';

@Injectable()
export class InvoiceService {
  constructor(private http: HttpClient) {}
  getInvoices(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Invoice';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  addInvoice(invoice: Invoice): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Invoice';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    // request['Name'] = invoice.name;
    // request['CreatedBy'] = invoice.userName;
    // request['Address'] = Invoice.address;
    // request['ContactNumber'] = Invoice.contact;
    return this.http.post(url, [request], {
      headers: headers
    });
  }

  editInvoice(invoice: Invoice): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Invoice';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    // request['Id'] = Invoice.id;
    // request['Name'] = Invoice.name;
    // request['CreatedBy'] = Invoice.userName;
    // request['Address'] = Invoice.address;
    // request['ContactNumber'] = Invoice.contact;
    return this.http.put(url, [request], {
      headers: headers
    });
  }


  deleteInvoice(invoice: Invoice): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Invoice';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + invoice.id, {
      headers: headers
    });
  }

}
