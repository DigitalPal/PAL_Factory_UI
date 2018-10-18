import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { PriceDetail } from '../Entities/PriceDetails';

@Injectable()
export class PriceDetailsService {
    constructor(private http: HttpClient) {}
    getPriceDetails(logedInUser): Observable < any > {
      const url = environment.factoryAPIBase + '/api/DigitalPal/v1/PriceDetails';
      const request = null;
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      };
      return this.http.get(url, {
        headers: headers
      });
    }

    addPriceDetail(priceDetail: PriceDetail): Observable < any > {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/PriceDetails';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        const request = {};
        request['Size'] = priceDetail.size;
        request['Price'] = priceDetail.price;
        request['Unit'] = priceDetail.unit;
        return this.http.post(url, [request], {
          headers: headers
        });
      }
      editPriceDetail(priceDetail: PriceDetail): Observable < any > {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/PriceDetails';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        const request = {};
        request['Id'] = priceDetail.id;
        request['Size'] = priceDetail.size;
        request['Price'] = priceDetail.price;
        request['Unit'] = priceDetail.unit;
        return this.http.put(url, [request], {
          headers: headers
        });
      }

      deletePriceDetail(priceDetail: PriceDetail): Observable < any > {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/PriceDetails';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        return this.http.delete(url + '/' + priceDetail.id, {
          headers: headers
        });
      }
}
