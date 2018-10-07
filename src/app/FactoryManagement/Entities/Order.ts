export interface Order {
    id?: string;
    orderNumber: string;
    customerPONumber: string;
    customerId: string;
    customerName: string;
    date: string;
    price: number;
    remark: string;
    status: string;
    products: ProductQuantity[];
  }
  export interface ProductQuantity {
      productId: string;
      productName: string;
      quantity: number;
  }
