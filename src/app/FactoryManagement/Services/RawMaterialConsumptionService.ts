import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { RawMaterialConsumption } from '../Entities/RawMaterialConsumption';

@Injectable()
export class RawMaterialConsumptionService {
  constructor(private http: HttpClient) {}
  getRawMaterialConsumptions(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Consumption';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  addRawMaterialConsumption(rawMaterialConsumption: RawMaterialConsumption): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Consumption';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['ConsumptionDate'] = rawMaterialConsumption.consumptionDate.month +
    '-' + rawMaterialConsumption.consumptionDate.day +
    '-' + rawMaterialConsumption.consumptionDate.year;
    request['RawMaterialId'] = rawMaterialConsumption.rawMaterialId;
    request['Quantity'] = rawMaterialConsumption.quantity;
    request['Remark'] = rawMaterialConsumption.remark;
    return this.http.post(url, [request], { headers: headers });
  }

  editRawMaterialConsumption(rawMaterialConsumption: RawMaterialConsumption): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Consumption';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
     request['Id'] = rawMaterialConsumption.id;
    request['ConsumptionDate'] = rawMaterialConsumption.consumptionDate.month +
    '-' + rawMaterialConsumption.consumptionDate.day +
    '-' + rawMaterialConsumption.consumptionDate.year;
    request['RawMaterialId'] = rawMaterialConsumption.rawMaterialId;
    request['Quantity'] = rawMaterialConsumption.quantity;
    request['Remark'] = rawMaterialConsumption.remark;
    return this.http.put(url, [request], { headers: headers });
  }


  deleteRawMaterialConsumption(rawMaterialConsumption: RawMaterialConsumption): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Consumption';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + rawMaterialConsumption.id, { headers: headers });
  }

  getConsumptionReport(rawMaterial, startDate, endDate): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Consumption/Search';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };

    const request = {};
    if (rawMaterial) {
      request['RawMaterial'] = rawMaterial;
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
