import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DispatchService } from '../Services/disptach.service';
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
    date: '',
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
  productMasterOriginal = [];

  constructor(private service: DispatchService, private spinner: NgxSpinnerService
    , private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getProducts();
    // this.spinner.show();
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.service.getOrder('').subscribe(details => {
          this.model.id = details.id;
          this.model.orderNumber = details.orderNumber;
          this.model.dispatchNumber = details.dispatchNumber;
          this.model.orderId = details.orderId;
          this.model.date = details.date;
          this.model.loading = details.loading;
          this.model.unloading = details.unloading;
          this.model.transportName = details.transportName;
          this.model.remark = details.remark;
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
        });
      } else {
        this.model.id = '';
        this.model.orderNumber = '';
        this.model.dispatchNumber = '';
        this.model.orderId = '';
        this.model.date = '';
        this.model.loading = '';
        this.model.unloading = '';
        this.model.transportName = '';
        this.model.remark = '';
        this.model.productId = '';
        this.model.productName = '';
        this.model.quantity = 0;
        this.model.products = [{
            productId: '1',
            productName: '250X250X250',
            quantity: 120
          }, {
            productId: '2',
            productName: '200X200X200',
            quantity: 100
          }];
      }
    });
  }

  saveDispatch() {
    // this.service.addOrder({}).subscribe(s => s);
  }

  editDispatch() {
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

  backToListView() {
    this.router.navigate(['/auth/dispatchList']);
  }

  saveData() {
    this.router.navigate(['/auth/dispatchList']);
  }
}
