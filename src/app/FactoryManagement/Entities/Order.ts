import { ProductQuantity } from './Dispatch';
export interface Order {
    id?: string;
    orderNumber: string;
    customerPONumber: string;
    customerId: string;
    customerName: string;
    date: any;
    price: number;
    remark: string;
    status: string;
    products: ProductQuantity[];
  }
