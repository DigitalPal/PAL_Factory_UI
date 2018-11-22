export interface SupplierPO {
  id?: string;
  supplierPONumber: string;
  supplierId: string;
  supplierName: string;
  date: any;
  rate: number;
  remark: string;
  status: string;
  rawMaterials: RawMaterialQuantity[];
}

export interface RawMaterialQuantity {
  rawMaterialId: string;
  rawMaterialName: string;
  quantity: number;
}
