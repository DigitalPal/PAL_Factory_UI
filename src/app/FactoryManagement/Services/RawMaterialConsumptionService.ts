import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Plant } from '../Entities/plant';
import { RawMaterialConsumption } from '../Entities/RawMaterialConsumption';

@Injectable()
export class RawMaterialConsumptionService {
  constructor(private http: HttpClient) {}
  getRawMaterialConsumptions(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialConsumption';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  addRawMaterialConsumption(rawMaterialConsumption: RawMaterialConsumption): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialConsumption';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    // request['Title'] = rawMaterial.name;
    // request['MeasureType'] = rawMaterial.measurementType;
    return this.http.post(url, [request], { headers: headers });
  }

  editRawMaterialConsumption(rawMaterialConsumption: RawMaterialConsumption): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialConsumption';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
     request['Id'] = rawMaterialConsumption.id;
    // request['Title'] = rawMaterial.name;
    // request['MeasureType'] = rawMaterial.measurementType;
    return this.http.put(url, [request], { headers: headers });
  }


  deleteRawMaterialConsumption(plant: Plant): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialConsumption';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + plant.id, { headers: headers });
  }

}
