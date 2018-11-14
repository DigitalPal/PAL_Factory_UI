import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ProductionEntry } from '../Entities/ProductionEntry';

@Injectable()
export class ProductionEntryService {
  constructor(private http: HttpClient) {}

  getProductionEntry(productionId): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Production';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url + '/' + productionId, {
      headers: headers
    });
  }

  getProductionEntrys(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Production';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  addProductionEntry(productionEntry: ProductionEntry): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Production';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['ProductionNumber'] = productionEntry.productionNumber;
    request['ProductionDate'] = productionEntry.productionDate.month + '-' +  productionEntry.productionDate.day + '-' +
                                productionEntry.productionDate.year;
    request['Breakage'] = productionEntry.breakage;
    request['NoOfMouldsCasted'] = productionEntry.noOfMouldsCasted;
    request['Remark'] = productionEntry.remark;
    const products = [];
    productionEntry.products.forEach(fe => {
      products.push({'ProductId': fe.productId, 'Quantity': +fe.quantity, 'Breakage': fe.breakage});
    });
    request['ProductionDetails'] = products;
    request['CreatedBy'] = environment.userId;
    request['TenantId'] = environment.tenantId;
    request['PlantId'] = environment.plantId;
    return this.http.post(url, [request], { headers: headers });
  }

  editProductionEntry(productionEntry: ProductionEntry): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Production';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = productionEntry.id;
    request['ProductionNumber'] = productionEntry.productionNumber;
    request['ProductionDate'] = productionEntry.productionDate.month + '-' +  productionEntry.productionDate.day + '-' +
                                productionEntry.productionDate.year;
    request['Breakage'] = productionEntry.breakage;
    request['NoOfMouldsCasted'] = productionEntry.noOfMouldsCasted;
    request['Remark'] = productionEntry.remark;
    const products = [];
    productionEntry.products.forEach(fe => {
      products.push({ 'ProductId': fe.productId, 'Quantity': +fe.quantity, 'Breakage': fe.breakage});
    });
    request['ProductionDetails'] = products;
    request['CreatedBy'] = environment.userId;
    request['TenantId'] = environment.tenantId;
    request['PlantId'] = environment.plantId;
    return this.http.put(url, [request], { headers: headers });
  }


  deleteProductionEntry(productionEntry: ProductionEntry): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Production';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + productionEntry.id, { headers: headers });
  }

  getMaxNumbers(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Prduction/maxNumbers';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  getProducts(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Product';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  getProductionReport(productName, startDate, endDate): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Production/Search';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };

    const request = {};
    if (productName) {
      request['ProductName'] = productName;
    }

    if (startDate) {
      request['StartDate'] = startDate.month + '-' + startDate.day + '-' + startDate.year;
    }

    if (endDate) {
      request['EndDate'] = endDate.month + '-' + endDate.day + '-' + endDate.year;
    }

    return this.http.post(url, request, {
      headers: headers
    });
  }
}
