import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Plant } from '../Entities/plant';
import { RawMaterial } from '../Entities/RawMaterial';

@Injectable()
export class RawMaterialService {
  constructor(private http: HttpClient) {}
  getRawMaterials(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  addRawMaterial(rawMaterial: RawMaterial): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Title'] = rawMaterial.name;
    request['MeasureType'] = rawMaterial.measurementType;
    return this.http.post(url, [request], { headers: headers });
  }

  editRawMaterial(rawMaterial: RawMaterial): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = rawMaterial.id;
    request['Title'] = rawMaterial.name;
    request['MeasureType'] = rawMaterial.measurementType;
    return this.http.put(url, [request], { headers: headers });
  }


  deleteRawMaterial(plant: Plant): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/RawMaterialDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + plant.id, { headers: headers });
  }

}
