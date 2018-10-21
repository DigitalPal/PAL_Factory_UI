import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DispatchService } from '../Services/disptach.service';
import { OrderService } from '../Services/order.service';
@Component({
  selector: 'app-dispatch-details',
  templateUrl: './dispatchDetails.component.html',
  styleUrls: ['./dispatchDetails.component.scss']
})
export class DispatchDetailsComponent implements OnInit {
  model = {
    id: null,
    dispatchNumber: '',
    orderNumber: '',
    orderId: '',
    date: null,
    remark: '',
    loading: '',
    unloading: '',
    transportName: '',
    products: [],
    productId: '',
    productName: '',
    quantity: 0,
  };

  productMaster = [];
  orderMaster = [];
  productMasterOriginal = [];

  constructor(private service: DispatchService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router, private orderService: OrderService) {}

  ngOnInit() {
    this.spinner.show();
    this.getOrders();
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.service.getDispatch(fragment).subscribe(details => {
          this.model.id = details.Id;
          this.model.orderNumber = details.OrderNumber;
          this.model.dispatchNumber = details.DispatchNumber;
          this.model.orderId = details.OrderId;
          const dateHere = new Date(details.DispatchDate);
          this.model.date = {
            day: dateHere.getDate(),
            month: dateHere.getMonth() + 1,
            year: dateHere.getFullYear()
          };
          this.model.loading = details.Loading;
          this.model.unloading = details.Unloading;
          this.model.transportName = details.TransportName;
          this.model.remark = details.Remark;
          const products = [];
          details.DispatchDetails.forEach(fe => {
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
        });
      } else {

        this.orderService.getMaxNumbers('').subscribe(s => {
          this.getProducts();
          this.spinner.hide();
          let newDispatchNo = 1;
          if (s.DispatchNumber) {
            newDispatchNo = (+s.DispatchNumber.split('-')[2]) + 1;
          }
          const dispatchNumber = 'DPT-' + new Date().getDate().toString() +
            (new Date().getMonth() + 1).toString() +
            new Date().getFullYear().toString() +
            '-' + newDispatchNo;

          this.model.id = null;
          this.model.orderNumber = '';
          this.model.dispatchNumber = dispatchNumber;
          this.model.orderId = '';
          this.model.date = null;
          this.model.loading = '';
          this.model.unloading = '';
          this.model.transportName = '';
          this.model.remark = '';
          this.model.productId = '';
          this.model.productName = '';
          this.model.quantity = 0;
          this.model.products = [];
        });
      }
    });
  }

  saveData() {
    const msg = this.validate();
    if (msg === '') {
      this.service.addDispatch(this.model).subscribe(s => {
        this.router.navigate(['/auth/dispatchList']);
      });
    } else {
      alert(msg);
    }
  }

  editDispatch() {
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
    this.orderService.getProducts('').subscribe(s => {
      this.productMasterOriginal = s;
      this.filterProductMaster();
      this.spinner.hide();
    });
  }

  getOrders() {
    this.orderService.getOrders('').subscribe(element => {
      const localOrders = [];
      element.forEach(fe => {
        localOrders.push({
          orderId: fe.Id,
          orderNumber: fe.OrderNumber.toString().trim(),
        });
      });
      this.orderMaster = localOrders;
      this.spinner.hide();
    });
  }

  validate() {
    if (this.model.orderId == null || this.model.orderId === '') {
      return 'Please select customer for order';
    }
    if (this.model.transportName == null || this.model.transportName === '') {
      return 'Please add a transport name';
    }
    if (this.model.loading == null || this.model.loading === '') {
      return 'Please select loading details';
    }
    if (this.model.unloading == null || this.model.unloading === '') {
      return 'Please select unloading details';
    }
    if (this.model.date == null || this.model.date === '') {
      return 'Please select date';
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

  backToListView() {
    this.router.navigate(['/auth/dispatchList']);
  }
}
