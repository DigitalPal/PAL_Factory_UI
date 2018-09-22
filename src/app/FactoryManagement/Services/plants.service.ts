import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Plant } from '../Entities/plant';

@Injectable()
export class PlantsService {
  constructor(private http: HttpClient) {}
  getPlants(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  addPlant(plant: Plant): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/Plant';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Name'] = plant.name;
    request['CreatedBy'] = plant.userName;
    request['Address'] = plant.address;
    request['ContactNumber'] = plant.contact;
    return this.http.post(url, [request], { headers: headers });
  }

}
