import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from '../../Services/products.service';
import { ProductionEntryService } from '../../Services/productionEntry.service';
import { OrderService } from '../../Services/order.service';
@Component({
    selector: 'app-production-report',
    templateUrl: './productionReport.component.html',
    styleUrls: ['./productionReport.component.scss']
  })
  export class ProductionReportComponent implements OnInit {
    public displayedColumns = ['srNum', 'productionDate', 'productionNumber'
    , 'noOfMouldsCasted', 'productName', 'breakage'];
productions = [];
model = {
    productId: '',
    startDate: null,
    endDate: null
  };
  productMaster = [];
  constructor(private service: ProductionEntryService, private productsService: ProductsService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getProducts();

    setTimeout(() => {
      this.refreshReport();
    }, 2000);
  }

  getProduction() {
    const productName = (this.model.productId === '' || this.model.productId === 'ALL') ? ''
    : this.productMaster.find(f => f.id === this.model.productId).name;

    this.service.getProductionReport(productName, this.model.startDate, this.model.endDate).subscribe(s => {
      const localProductions = [];
      if (s && s.length > 0) {
        s.forEach(element => {
            localProductions.push({
            id: element.Id,
            srNum: element.SrNum,
            productionNumber: element.ProductionNumber,
            date: element.ProductionDate,
            productName: element.ProductName,
            breakage: element.Breakage,
            noOfMouldsCasted: element.NoOfMouldsCasted
          });
        });
      }
      this.productions = localProductions;
      this.spinner.hide();
    });
  }

  getProducts() {
    this.productsService.getProducts('').subscribe(s => {
      const localProducts = [];
      if (s && s.length > 0) {
        s.forEach(element => {
            localProducts.push({
            id: element.Id,
            name: element.Name.toString().trim(),
          });
        });
      }
      this.productMaster = localProducts;
      this.spinner.hide();
    });
  }

  refreshReport() {
    this.spinner.show();
    this.getProduction();
  }

  }
