import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Plant } from '../Entities/plant';
import { RawMaterialInward } from '../Entities/RawMaterialInward';

@Injectable()
export class RawMaterialInwardService {

  constructor(private http: HttpClient) {}
  getRawMaterialInwards(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialInward';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  addRawMaterialInward(rawMaterialInward: RawMaterialInward): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialInward';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = [];
    const rawMaterialInwardJson = {};
    rawMaterialInwardJson['InwardDate'] = rawMaterialInward.InwardDate.month +
    '-' + rawMaterialInward.InwardDate.day +
    '-' + rawMaterialInward.InwardDate.year;

    rawMaterialInwardJson['RawMaterialId'] = rawMaterialInward.RawMaterialId;
    rawMaterialInwardJson['SupplierId'] = rawMaterialInward.SupplierId;
    rawMaterialInwardJson['VechicalNumber'] = rawMaterialInward.VechicalNumber;
    rawMaterialInwardJson['ChallanNumber'] = rawMaterialInward.ChallanNumber;
    rawMaterialInwardJson['Quantity'] = rawMaterialInward.Quantity;
    rawMaterialInwardJson['UnloadingDetails'] = rawMaterialInward.UnloadingDetails;
    rawMaterialInwardJson['Remarks'] = rawMaterialInward.Remarks;
    request.push(rawMaterialInwardJson);
    return this.http.post(url, [rawMaterialInwardJson], {
      headers: headers
    });
  }

  editRawMaterialInward(rawMaterialInward: RawMaterialInward): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialInward';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = [];
    const rawMaterialInwardJson = {};
    rawMaterialInwardJson['Id'] = rawMaterialInward.id;
    rawMaterialInwardJson['InwardDate'] = rawMaterialInward.InwardDate.month +
    '-' + rawMaterialInward.InwardDate.day +
    '-' + rawMaterialInward.InwardDate.year;

    rawMaterialInwardJson['RawMaterialId'] = rawMaterialInward.RawMaterialId;
    rawMaterialInwardJson['SupplierId'] = rawMaterialInward.SupplierId;
    rawMaterialInwardJson['VechicalNumber'] = rawMaterialInward.VechicalNumber;
    rawMaterialInwardJson['ChallanNumber'] = rawMaterialInward.ChallanNumber;
    rawMaterialInwardJson['Quantity'] = rawMaterialInward.Quantity;
    rawMaterialInwardJson['UnloadingDetails'] = rawMaterialInward.UnloadingDetails;
    rawMaterialInwardJson['Remarks'] = rawMaterialInward.Remarks;
    request.push(rawMaterialInwardJson);
    return this.http.put(url, [rawMaterialInwardJson], {
      headers: headers
    });
  }


  deleteRawMaterialInward(plant: Plant): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialInward';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + plant.id, {
      headers: headers
    });
  }

  getInwardReport(rawMaterialName, supplierName, startDate, endDate): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Inward/Search';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };

    const request = {};
    if (rawMaterialName) {
      request['rawMaterialName'] = rawMaterialName;
    }

    if (supplierName) {
      request['supplierName'] = supplierName;
    }

    if (startDate) {
      request['startDate'] = startDate.month + '-' + startDate.day + '-' + startDate.year;
    }

    if (endDate) {
      request['endDate'] = endDate.month + '-' + endDate.day + '-' + endDate.year;
    }

    return this.http.post(url, request, {
      headers: headers
    });
  }

}
