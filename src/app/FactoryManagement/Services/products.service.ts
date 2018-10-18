import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Product } from '../Entities/product';

@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) {}
    getProducts(logedInUser): Observable<any> {
      const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Product';
      const request = null;
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      };
      return this.http.get(url, { headers: headers });
    }

    addProduct(product: Product): Observable<any> {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Product';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        const request = {};
        request['Name'] = product.name;
        // request['Size'] = product.size;
        request['Length'] = product.length;
        request['Width'] = product.width;
        request['Height'] = product.height;
        request['Price'] = product.price;
        return this.http.post(url, [request], { headers: headers });
      }

      editProduct(product: Product): Observable<any> {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Product';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        const request = {};
        request['Id'] = product.id;
        request['Name'] = product.name;
        // request['Size'] = product.size;
        request['Length'] = product.length;
        request['Width'] = product.width;
        request['Height'] = product.height;
        request['Price'] = product.price;
        return this.http.put(url, [request], { headers: headers });
      }

      deleteProduct(product: Product): Observable<any> {
        const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Product';
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
        };
        return this.http.delete(url + '/' + product.id, { headers: headers });
      }
}
