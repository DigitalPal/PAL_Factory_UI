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
    request['InvoiceNumber'] = invoice.invoiceNumber;
    request['InvoiceDate'] = invoice.date;
    request['OrderId'] = invoice.orderId;
    request['OrderNumber'] = invoice.orderNumber;
    request['DispatchId'] = invoice.disptachId;
    request['DispatchNumber'] = invoice.disptachNumber;
    request['TransportCharges'] = invoice.transportCharges;
    request['LaodingUnloadingCharges'] = invoice.loadingCharges;
    request['Amount'] = invoice.price;
    request['InvoiceStatus'] = '';
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
    request['Id'] = invoice.id;
    request['InvoiceNumber'] = invoice.invoiceNumber;
    request['InvoiceDate'] = invoice.date;
    request['OrderId'] = invoice.orderId;
    request['OrderNumber'] = invoice.orderNumber;
    request['DispatchId'] = invoice.disptachId;
    request['DispatchNumber'] = invoice.disptachNumber;
    request['TransportCharges'] = invoice.transportCharges;
    request['LaodingUnloadingCharges'] = invoice.loadingCharges;
    request['Amount'] = invoice.price;
    request['InvoiceStatus'] = '';
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
