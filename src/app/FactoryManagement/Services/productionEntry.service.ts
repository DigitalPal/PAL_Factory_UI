import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Plant } from '../Entities/plant';
import { ProductionEntry } from '../Entities/ProductionEntry';

@Injectable()
export class ProductionEntryService {
  constructor(private http: HttpClient) {}
  getProductionEntrys(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/ProductionDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }

  addProductionEntry(productionEntry: ProductionEntry): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/ProductionDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['ProductionDate'] = productionEntry.date;
    request['Breakage'] = productionEntry.breakage;
    request['Size'] = productionEntry.productId;
    request['Quantity'] = productionEntry.quantity;
    request['Remark'] = productionEntry.remark;
    return this.http.post(url, [request], { headers: headers });
  }

  editProductionEntry(productionEntry: ProductionEntry): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/ProductionDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = productionEntry.id;
    request['ProductionDate'] = productionEntry.date;
    request['Breakage'] = productionEntry.breakage;
    request['Size'] = productionEntry.productId;
    request['Quantity'] = productionEntry.quantity;
    request['Remark'] = productionEntry.remark;
    return this.http.put(url, [request], { headers: headers });
  }


  deleteProductionEntry(plant: Plant): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/ProductionDetails';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + plant.id, { headers: headers });
  }

}
