import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class SummaryReportService {
  constructor(private http: HttpClient) {}

  getSummaryReport(): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Summary';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

}
