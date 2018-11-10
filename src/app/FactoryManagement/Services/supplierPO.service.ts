import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { SupplierPO } from '../Entities/SupplierPO';

@Injectable()
export class SupplierPOService {
  constructor(private http: HttpClient) {}


  getSupplierPO(supplierPOId): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierOrder';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url + '/' + supplierPOId, {
      headers: headers
    });
  }


  getSupplierPOs(logedInUser): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierOrder';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, {
      headers: headers
    });
  }

  addSupplierPO(supplierPO: SupplierPO): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierOrder';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };

    const request = {};
    request['SupplierOrderNumber'] = supplierPO.supplierPONumber;
    request['SupplierName'] = supplierPO.supplierName;
    request['SupplierId'] = supplierPO.supplierId;
    request['SupplierOrderDate'] = supplierPO.date.month + '-' + supplierPO.date.day + '-' + supplierPO.date.year;
    request['Price'] = supplierPO.rate;
    request['Remark'] = supplierPO.remark;
    const rawMaterials = [];
    supplierPO.rawMaterials.forEach(fe => {
      rawMaterials.push({ 'RawMaterialId': fe.rawMaterialId, 'Quantity': +fe.quantity});
    });
    request['RawMaterial'] = rawMaterials;
    request['CreatedBy'] = environment.userId;
    request['TenantId'] = environment.tenantId;
    request['PlantId'] = environment.plantId;
    return this.http.post(url, [request], {
      headers: headers
    });
  }

  editSupplierPO(supplierPO: SupplierPO): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierOrder';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    const request = {};
    request['Id'] = supplierPO.id;
    request['SupplierOrderNumber'] = supplierPO.supplierPONumber;
    request['SupplierName'] = supplierPO.supplierName;
    request['SupplierId'] = supplierPO.supplierId;
    request['SupplierOrderDate'] = supplierPO.date.month + '-' + supplierPO.date.day + '-' + supplierPO.date.year;
    request['Price'] = supplierPO.rate;
    request['Remark'] = supplierPO.remark;
    const rawMaterials = [];
    supplierPO.rawMaterials.forEach(fe => {
      rawMaterials.push({ 'RawMaterialId': fe.rawMaterialId, 'Quantity': +fe.quantity});
    });
    request['RawMaterial'] = rawMaterials;
    request['CreatedBy'] = environment.userId;
    request['TenantId'] = environment.tenantId;
    request['PlantId'] = environment.plantId;
    return this.http.put(url, [request], {
      headers: headers
    });
  }


  deleteSupplierPO(supplierPO: SupplierPO): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierOrder';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.delete(url + '/' + supplierPO.id, {
      headers: headers
    });
  }

  getSupplierPOReport(supplierId, supplierPOId, rawMaterialId, startDate, endDate): Observable < any > {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierPOReport';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url + '/' + supplierPOId, {
      headers: headers
    });
  }

  getMaxNumbers(logedInUser): Observable<any> {
    const url = environment.factoryAPIBase + '/api/DigitalPal/v1/SupplierOrder/maxNumbers';
    const request = null;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return this.http.get(url, { headers: headers });
  }
}
