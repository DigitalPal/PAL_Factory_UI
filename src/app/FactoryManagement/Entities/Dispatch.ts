export interface Dispatch {
    id?: string;
    date: string;
    orderNumber: string;
    orderId: string;
    dispatchNumber: string;
    transportName: string;
    loading: string;
    unloading: string;
    remark: string;
    products: ProductQuantity[];
  }
  
  export interface ProductQuantity {
      productId: string;
      productName: string;
      quantity: number;
  }
