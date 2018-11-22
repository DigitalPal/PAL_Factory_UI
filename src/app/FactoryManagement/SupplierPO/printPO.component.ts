import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AmountCalculatorService } from '../Services/amountCalculator.service';
import { SupplierPOService } from '../Services/supplierPO.service';

@Component({
  selector: 'app-supplierpo-print',
  templateUrl: './printPO.component.html',
  styleUrls: ['./printPO.component.scss']
})
export class SupplierPOPrintComponent implements OnInit {
  @ViewChildren('printContainer') printContainer: QueryList < ElementRef > ;

  todaysDate = new Date();

  supplierName = '';
  supplierAddress = '';
  supplierContact = '';
  materialName = '';
  quantity = 0;
  rate = 0;
  gst = '';
  grandTotal = 0;


  productsArray = [];


  constructor(private service: SupplierPOService
    , private spinner: NgxSpinnerService, private route: ActivatedRoute
    , private amountCalculator: AmountCalculatorService) {}

  ngOnInit() {
    this.spinner.show();

    this.route.fragment.subscribe(fragment => {

      if (fragment) {
        this.service.getSupplierPO(fragment).subscribe(po => {
          this.supplierName = po.SupplierName.toString().trim();
          this.supplierAddress = po.SupplierName.toString().trim();
          this.supplierContact = po.SupplierName.toString().trim();
          this.materialName = po.RawMaterial[0].RawMaterialName.toString().trim();
          this.quantity = +po.RawMaterial[0].Quantity;
          this.rate = +po.Price;
          this.gst = '-';
          this.grandTotal = (this.rate * this.quantity);
          this.spinner.hide();
        });
      }

    });
  }

  printClicked() {
    let printContents, popupWin;
    printContents = this.printContainer.first.nativeElement.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();

    popupWin.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
          .print-invoice-container {
            width: 90%;
            border: 1px solid black;
            margin: 20px;
            float: left;
          }
          .print-invoice-header {
            border-bottom: 1px solid black;
            float: left;
            width: 100%;
            height: 60px;
          }
          .print-invoice-subtitle {
            float: right;
            margin-top: -40px;
            margin-right: 40px;
          }
          .print-invoice-title {
            text-align: center;
            float: left;
            width: 100%;
            line-height: 60px;
            font-size: x-large;
            font-weight: bold;
          }
          .print-invoice-partyname-container {
            border-bottom: 1px solid black;
            float: left;
            width: 100%;
          }
          .supplier-name {
            width: 100%;
            float: left;
            margin-left: 10px;
            margin-right: 60px;
          }
          .print-invoice-declaration {
            border-bottom: 1px solid black;
            float: left;
            width: 100%;
            height: 100px;
          }
          .print-invoice-declaration-content {
            width: 55%;
            float: left;
            height: 100%;
            border-right: 1px solid black;
            margin-left: 10px;
          }
          .print-invoice-declaration-sign {
            width: 38%;
            float: left;
            margin-left: 5px;
          }
          </style>
        </head>
            <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }
}
