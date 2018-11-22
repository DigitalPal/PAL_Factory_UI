import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductionEntryService } from '../Services/productionEntry.service';
import { OrderService } from '../Services/order.service';
@Component({
    selector: 'app-production-details',
    templateUrl: './productionDetails.component.html',
    styleUrls: ['./productionDetails.component.scss']
  })
  export class ProductionDetailsComponent implements OnInit {
    model = {
        id: null,
        productionNumber: '',
        productionDate: null,
        breakage: '0',
        noOfMouldsCasted: '',
        remark: '',
        products: [],
        productId: '',
        productName: '',
        quantity: 0,
      };

      productMaster = [];
      productMasterOriginal = [];

      constructor(private service: ProductionEntryService, private spinner: NgxSpinnerService,
        private route: ActivatedRoute, private router: Router, private orderService: OrderService) {}

        ngOnInit() {
            this.spinner.show();
            this.route.fragment.subscribe(fragment => {
                if (fragment) {
                    this.service.getProductionEntry(fragment).subscribe(details => {
                        this.model.id = details.Id;
                        this.model.productionNumber = details.ProductionNumber;
                        const dateHere = new Date(details.ProductionDate);
                        this.model.productionDate = {
                            day: dateHere.getDate(),
                            month: dateHere.getMonth() + 1,
                            year: dateHere.getFullYear()
                        };
                        this.model.noOfMouldsCasted = details.NoOfMouldsCasted;
                        this.model.breakage = details.Breakage;
                        this.model.remark = details.Remark;
                        const products = [];
                        details.ProductionDetails.forEach(fe => {
                            products.push({
                              productId: fe.ProductId,
                              productName: fe.ProductName,
                              quantity: fe.Quantity,
                              breakage: fe.Breakage
                            });
                          });
                            this.getProducts();
                            this.spinner.hide();
                            this.model.products = products;
                            this.model.productId = '';
                            this.model.productName = '';
                            this.model.quantity = 0;
                            this.model.breakage = '0';
                    });
                } else {
                    this.orderService.getMaxNumbers('').subscribe(s => {
                        this.getProducts();
                        this.spinner.hide();
                        let newProductionNumber = 1;
                        if (s.ProductionNumber) {
                            newProductionNumber = (+s.ProductionNumber.split('-')[2]) + 1;
                        }
                        const productionNumber = 'MLD-' + new Date().getDate().toString() +
                            (new Date().getMonth() + 1).toString() +
                            new Date().getFullYear().toString() +
                            '-' + newProductionNumber;

                        this.model.id = null;
                        this.model.productionNumber = productionNumber;
                        this.model.productionDate = null;
                        this.model.breakage = '0';
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
          if (this.model.id === null || this.model.id === '') {
            const msg = this.validate();
            if (msg === '') {
              this.service.addProductionEntry(this.model).subscribe(s => {
                this.router.navigate(['/auth/productionEntry']);
              });
            } else {
              alert(msg);
            }
          } else {
            this.editProductionEntry();
          }
          }

          editProductionEntry() {
            const msg = this.validate();
            if (msg === '') {
             this.service.editProductionEntry(this.model).subscribe(s => {
               this.router.navigate(['/auth/productionEntry']);
             });
            } else {
              alert(msg);
            }
          }

          addProduct() {
            const validationMsg = this.validateProductAdd();
            if (validationMsg === '') {
              const associatedProducts = this.model.products;
              const productName = this.productMaster.find(f => f.id === this.model.productId).name;
              associatedProducts.push({
                productId: this.model.productId,
                productName: productName,
                quantity: this.model.quantity,
                breakage: this.model.breakage
              });
              this.model.products = associatedProducts;
              this.model.quantity = 0;
              this.model.productId = '';
              this.model.breakage = '0';
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

          validate() {
            if (this.model.productionDate == null || this.model.productionDate === '') {
              return 'Please select date';
            }
            // if (this.model.noOfMouldsCasted == null || this.model.noOfMouldsCasted === '') {
            //     return 'Please enter number of moulds';
            //   }
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
            if (isNaN(Number(this.model.breakage))) {
              return 'Breakage should be numeric';
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
                    breakage: element.Breakage
                  });
                }
              });
            }
            this.productMaster = localProducts;
          }

          backToListView() {
            this.router.navigate(['/auth/productionEntry']);
          }
  }
