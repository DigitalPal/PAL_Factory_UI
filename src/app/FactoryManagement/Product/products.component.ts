import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../Entities/Product';
import { ProductsService } from '../Services/products.service';
@Component({
    selector: 'app-products-list',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
  })
  export class ProductsListComponent implements OnInit {
    public displayedColumns = ['name', 'length', 'width', 'height', 'price',  'actions'];
    products: Product[] = [];
    model = {
      id: null,
      name: '',
      length: '',
      width: '',
      height: '',
      price: ''
    };

    constructor(private modalService: NgbModal, private service: ProductsService, private spinner: NgxSpinnerService) {}

    open(content, row) {
        if (!row) {
          this.model.id = null;
          this.model.name = '';
          this.model.length = '';
          this.model.width = '';
          this.model.height = '';
          this.model.price = '';
        } else {
          this.model.id = row.id;
          this.model.name = row.name;
          this.model.width = row.width;
          this.model.length = row.length;
          this.model.height = row.height;
          this.model.price = row.price;
        }
        this.modalService.open(content, {
          size: 'lg',
          ariaLabelledBy: 'modal-basic-title'
        }).result.then((result) => {
          this.spinner.show();
          if (result === 'SAVE') {
            if (this.model.id) {
              this.editProduct();
            } else {
              this.saveProduct();
            }
          } else {
            this.spinner.hide();
          }
        }, (reason) => {
          // handle close exception
        });
      }

      ngOnInit() {
        this.spinner.show();
        this.getProducts();
      }

      saveProduct() {
        this.service.addProduct({
          name: this.model.name,
          length: this.model.length,
          width: this.model.width,
          height: this.model.height,
          price: this.model.price,
        }).subscribe(s => this.getProducts());
      }

      deleteProduct(row) {
        this.spinner.show();
        this.service.deleteProduct(row).subscribe(s => this.getProducts());
      }

      editProduct() {
        this.service.editProduct({
          id: this.model.id,
          name: this.model.name,
          length: this.model.length,
          width: this.model.width,
          height: this.model.height,
          price: this.model.price,
        }).subscribe(s => this.getProducts());
      }

      getProducts() {
        this.service.getProducts('').subscribe(s => {
          const localProducts = [];
          if (s && s.length > 0) {
            s.forEach(element => {
              localProducts.push({
                id: element.Id,
                name: element.Name,
                length: element.Length,
                width: element.Width,
                height: element.Height,
                price: element.Price
              });
            });
          }
          this.products = localProducts;
          this.spinner.hide();
        });
      }
}
