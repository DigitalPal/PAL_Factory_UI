import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersService } from '../Services/customers.service';
import { OrderService } from '../Services/order.service';
import { NgbDateCustomParserFormatter} from '../Helpers/dateFormatter';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-order-details',
  templateUrl: './orderDetails.component.html',
  styleUrls: ['./orderDetails.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class OrderDetailsComponent implements OnInit {
  model = {
    id: null,
    orderNumber: '',
    customerPONumber: '',
    customerName: '',
    date: null,
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

    this.getCustomers();
    this.spinner.show();
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.service.getOrder(fragment).subscribe(details => {

          this.model.id = details.Id;
          this.model.orderNumber = details.OrderNumber;
          this.model.customerPONumber = details.CustomerPONumber;
          this.model.customerName = details.CustomerName.trim();
          const dateHere = new Date(details.OrderDate);
          this.model.date = {
            day: dateHere.getDate(),
            month: dateHere.getMonth() + 1,
            year: dateHere.getFullYear()
          };
          this.model.price = details.Price;
          this.model.remark = details.Remark;
          this.model.status = details.OrderStatus;
          const products = [];
          details.Products.forEach(fe => {
            products.push({
              productId: fe.ProductId,
              productName: fe.ProductName,
              quantity: fe.Quantity
            });
          });
          this.getProducts();
          this.spinner.hide();
          this.model.products = products;
          this.model.productId = '';
          this.model.productName = '';
          this.model.quantity = 0;
          this.model.customerId = details.CustomerId;
        });
      } else {
        this.service.getMaxNumbers('').subscribe(s => {
          this.getProducts();
          this.spinner.hide();
          let newOrderNo = 1;
          if (s.OrderNumber) {
            newOrderNo = (+s.OrderNumber.split('-')[2]) + 1;
          }

          const orderNumber = 'ORD-' + new Date().getDate().toString() +
            (new Date().getMonth() + 1).toString() +
            new Date().getFullYear().toString() +
            '-' + newOrderNo;

          this.model.id = null;
          this.model.orderNumber = orderNumber;
          this.model.customerPONumber = '';
          this.model.customerName = '';
          this.model.date = null;
          this.model.price = 0;
          this.model.remark = '';
          this.model.status = '';
          this.model.products = [];
          this.model.productId = '';
          this.model.productName = '';
          this.model.quantity = 0;
          this.model.customerId = '';
        });
      }
    });
  }

  saveData() {
    const msg = this.validate();
    if (msg === '') {
      this.service.addOrder(this.model).subscribe(s => {
        this.router.navigate(['/auth/orderList']);
      });
    } else {
      alert(msg);
    }
  }

  validate() {
    if (this.model.customerId == null || this.model.customerId === '') {
      return 'Please select customer for order';
    }
    if (this.model.date == null || this.model.date === '') {
      return 'Please select date';
    }
    if (this.model.price == null || this.model.price === 0) {
      return 'Please enter rate for order';
    }
    if (isNaN(this.model.price)) {
      return 'Rate per order should be a number';
    }
    if (this.model.products == null || this.model.products.length === 0) {
      return 'Please select atleast 1 product';
    }
    return '';
  }

  validateProductAdd() {
    if (this.model.productId == null || this.model.productId === '') {
      return 'Please select atleast 1 product';
    }
    if (this.model.quantity == null || this.model.quantity === 0) {
      return 'Quantity should be greater than 0';
    }
    if (isNaN(this.model.quantity)) {
      return 'Quantity should be numeric';
    }
    return '';
  }

  editOrder() {
    // TODO
    // this.service.editOrder({}).subscribe(s => s);
  }

  addProduct() {
    const validationMsg = this.validateProductAdd();
    if (validationMsg === '') {
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
    } else {
      alert(validationMsg);
    }
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
            name: element.Name.toString().trim(),
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

}
