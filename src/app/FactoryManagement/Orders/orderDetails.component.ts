import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersService } from '../Services/customers.service';
import { OrderService } from '../Services/order.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './orderDetails.component.html',
  styleUrls: ['./orderDetails.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  model = {
    id: null,
    orderNumber: '',
    customerPONumber: '',
    customerName: '',
    date: '',
    price: 0,
    remark: '',
    status: '',
    products: [],
    productId: '',
    productName: '',
    quantity: 0,
    customerId: '',
  };

  productMaster = [];
  productMasterOriginal = [];
  customerMaster = [];

  constructor(private service: OrderService, private spinner: NgxSpinnerService
    , private route: ActivatedRoute, private customerService: CustomersService, private router: Router) {}

  ngOnInit() {
    this.getProducts();
    this.getCustomers();
    // this.spinner.show();
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.service.getOrder('').subscribe(details => {
          this.model.id = details.id;
          this.model.orderNumber = details.orderNumber;
          this.model.customerPONumber = details.customerPONumber;
          this.model.customerName = details.customerName;
          this.model.date = details.date;
          this.model.price = details.price;
          this.model.remark = details.remark;
          this.model.status = details.status;
          this.model.products = [{
            productId: '1',
            productName: '250X250X250',
            quantity: 120
          }, {
            productId: '2',
            productName: '200X200X200',
            quantity: 100
          }];
          this.model.productId = '';
          this.model.productName = '';
          this.model.quantity = 0;
          this.model.customerId = details.customerId;
        });
      } else {
        this.model.id = null;
        this.model.orderNumber = '';
        this.model.customerPONumber = '';
        this.model.customerName = '';
        this.model.date = '';
        this.model.price = 0;
        this.model.remark = '';
        this.model.status = '';
        this.model.products = [];
        this.model.productId = '';
        this.model.productName = '';
        this.model.quantity = 0;
        this.model.customerId = '';
      }
    });
  }

  saveOrder() {
    // this.service.addOrder({}).subscribe(s => s);
  }

  editOrder() {
    // this.service.editOrder({}).subscribe(s => s);
  }

  addProduct() {
    const associatedProducts = this.model.products;
    const productName = this.productMaster.find(f => f.id === this.model.productId).name;
    associatedProducts.push({
      productId: this.model.productId,
      productName: productName,
      quantity: this.model.quantity
    });
    this.model.products = associatedProducts;
    this.model.quantity = 0;
    this.model.productId = '';
    this.filterProductMaster();
  }

  deleteProductClicked(row) {
    const associatedProducts = this.model.products;
    associatedProducts.splice(associatedProducts.indexOf(row), 1);
    this.model.products = associatedProducts;
    this.filterProductMaster();
  }

  getProducts() {
    this.service.getProducts('').subscribe(s => {
      this.productMasterOriginal = s;
      this.filterProductMaster();
      this.spinner.hide();
    });
  }

  filterProductMaster() {
    const localProducts = [];
    if (this.productMasterOriginal && this.productMasterOriginal.length > 0) {
      this.productMasterOriginal.forEach(element => {
        const productHere = this.model.products.find(f => f.productId === element.Id);
        if (!productHere) {
          localProducts.push({
            id: element.Id,
            name: element.Size.toString().trim(),
          });
        }
      });
    }
    this.productMaster = localProducts;
  }

  getCustomers() {
    this.customerService.getCustomers('').subscribe(s => {
      const localCustomers = [];
      if (s && s.length > 0) {
        s.forEach(element => {
          localCustomers.push({
            id: element.Id,
            name: element.Name.toString().trim(),
          });
        });
      }
      this.customerMaster = localCustomers;
      this.spinner.hide();
    });
  }

  backToListView() {
    this.router.navigate(['/auth/orderList']);
  }

  saveData() {
    this.router.navigate(['/auth/orderList']);
  }
}
