import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { SizeDetail } from '../Entities/SizeDetail';

@Injectable()
export class SizeDetailsService {
  constructor(private http: HttpClient) {}
  getSizeDetails(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SizeDetails';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  addSizeDetail(sizeDetail: SizeDetail): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SizeDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Size'] = sizeDetail.size;
    request['ConversionFactor'] = sizeDetail.conversionFactor;
    return this.http.post(url, [request], {
      headers: headers
    });
  }

  editSizeDetail(sizeDetail: SizeDetail): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SizeDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = sizeDetail.id;
    request['Size'] = sizeDetail.size;
    request['conversionFactor'] = sizeDetail.conversionFactor;
    return this.http.put(url, [request], {
      headers: headers
    });
  }

  deleteSizeDetail(sizeDetail: SizeDetail): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SizeDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + sizeDetail.id, {
      headers: headers
    });
  }
}
