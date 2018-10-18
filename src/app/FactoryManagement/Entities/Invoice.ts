export interface Invoice {
    id?: string;
    invoiceNumber: string;
    orderNumber: string;
    orderId: string;
    customerId: string;
    customerName: string;
    date: any;
    dispatchNumber: string;
    dispatchId: string;
    transportCharges: number;
    loadingCharges: number;
    unloadingCharges: number;
    price: number;
    remark: string;
  }
