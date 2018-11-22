import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Payments } from '../Entities/Payments';

@Injectable()
export class PaymentsService {
  constructor(private http: HttpClient) {}

  getSupplierPayments(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierPayment';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  getPayments(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Payment';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  addPayment(payment: Payments): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Payment';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['PaymentDate'] = payment.date.month + '-' + payment.date.day + '-' + payment.date.year;
    request['InvoiceNumber'] = payment.invoiceNumber;
    request['InvoiceId'] = payment.invoiceId;
    request['OrderNumber'] = payment.orderNumber;
    request['OrderId'] = payment.orderId;
    request['CustomerName'] = payment.customerName;
    request['CustomerId'] = payment.customerId;
    request['Amount'] = payment.amount;
    request['ModeOfPayment'] = payment.paymentMode;
    request['ChequeNumber'] = payment.chequeNumber;
    if (payment.chequeDate) {
      request['ChequeDate'] = payment.chequeDate.month + '-' + payment.chequeDate.day + '-' + payment.chequeDate.year;
    }
    request['BankName'] = payment.bank;
    // request['PaymentStatus'] = payment.name;

    return this.http.post(url, [request], {
      headers: headers
    });
  }

  editPayment(payment: Payments): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Payment';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = payment.id;
    request['PaymentDate'] = payment.date.month + '-' + payment.date.day + '-' + payment.date.year;
    request['InvoiceNumber'] = payment.invoiceNumber;
    request['InvoiceId'] = payment.invoiceId;
    request['OrderNumber'] = payment.orderNumber;
    request['OrderId'] = payment.orderId;
    request['CustomerName'] = payment.customerName;
    request['CustomerId'] = payment.customerId;
    request['Amount'] = payment.amount;
    request['ModeOfPayment'] = payment.paymentMode;
    request['ChequeNumber'] = payment.chequeNumber;
    if (payment.chequeDate) {
      request['ChequeDate'] = payment.chequeDate.month + '-' + payment.chequeDate.day + '-' + payment.chequeDate.year;
    }
    request['BankName'] = payment.bank;
    return this.http.put(url, [request], {
      headers: headers
    });
  }


  deletePayment(payment: Payments): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Payment';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + payment.id, {
      headers: headers
    });
  }


  addSupplierPayment(payment: Payments): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierPayment';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['PaymentDate'] = payment.date.month + '-' + payment.date.day + '-' + payment.date.year;
    request['SupplierOrderNumber'] = payment.orderNumber;
    request['SupplierOrderId'] = payment.orderId;
    request['SupplierName'] = payment.customerName;
    request['SupplierId'] = payment.customerId;
    request['Amount'] = payment.amount;
    request['ModeOfPayment'] = payment.paymentMode;
    request['ChequeNumber'] = payment.chequeNumber;
    if (payment.chequeDate) {
      request['ChequeDate'] = payment.chequeDate.month + '-' + payment.chequeDate.day + '-' + payment.chequeDate.year;
    }
    request['BankName'] = payment.bank;
    // request['PaymentStatus'] = payment.name;

    return this.http.post(url, [request], {
      headers: headers
    });
  }

  editSupplierPayment(payment: Payments): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierPayment';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = payment.id;
    request['PaymentDate'] = payment.date.month + '-' + payment.date.day + '-' + payment.date.year;
    request['SupplierOrderNumber'] = payment.orderNumber;
    request['SupplierOrderId'] = payment.orderId;
    request['SupplierName'] = payment.customerName;
    request['SupplierId'] = payment.customerId;
    request['Amount'] = payment.amount;
    request['ModeOfPayment'] = payment.paymentMode;
    request['ChequeNumber'] = payment.chequeNumber;
    if (payment.chequeDate) {
      request['ChequeDate'] = payment.chequeDate.month + '-' + payment.chequeDate.day + '-' + payment.chequeDate.year;
    }
    request['BankName'] = payment.bank;
    return this.http.put(url, [request], {
      headers: headers
    });
  }


  deleteSupplierPayment(payment: Payments): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierPayment';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + payment.id, {
      headers: headers
    });
  }


}
