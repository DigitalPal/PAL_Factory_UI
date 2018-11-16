export interface ProductionEntry {
    id?: string;
    productionNumber: string;
    productionDate: any;
    breakage: string;
    remark: string;
    noOfMouldsCasted: string;
    products: ProductQuantity[];
  }
  export interface ProductQuantity {
    productId: string;
    productName: string;
    quantity: number;
    breakage: string;
}
