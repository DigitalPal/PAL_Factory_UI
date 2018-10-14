import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Payments } from '../Entities/Payments';

@Injectable()
export class PaymentsService {
  constructor(private http: HttpClient) {}
  getPayments(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Payment';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  addPayment(payment: Payments): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Payment';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['PaymentDate'] = payment.date;
    request['InvoiceNumber'] = payment.invoiceNumber;
    request['InvoiceId'] = payment.invoiceId;
    request['OrderNumber'] = payment.orderNumber;
    request['OrderId'] = payment.orderId;
    request['CustomerName'] = payment.customerName;
    request['CustomerId'] = payment.customerId;
    request['Amount'] = payment.amount;
    // request['PaymentStatus'] = payment.name;

    return this.http.post(url, [request], { headers: headers });
  }

  editPayment(payment: Payments): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Payment';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = payment.id;
    request['PaymentDate'] = payment.date;
    request['InvoiceNumber'] = payment.invoiceNumber;
    request['InvoiceId'] = payment.invoiceId;
    request['OrderNumber'] = payment.orderNumber;
    request['OrderId'] = payment.orderId;
    request['CustomerName'] = payment.customerName;
    request['CustomerId'] = payment.customerId;
    request['Amount'] = payment.amount;
    return this.http.put(url, [request], { headers: headers });
  }


  deletePayment(payment: Payments): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Payment';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + payment.id, { headers: headers });
  }

}
