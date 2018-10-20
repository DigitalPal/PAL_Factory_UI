import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AmountCalculatorService } from '../Services/amountCalculator.service';
import { DispatchService } from '../Services/disptach.service';
import { InvoiceService } from '../Services/invoice.service';
import { OrderService } from '../Services/order.service';
import { Converter } from './wordConverter';
@Component({
  selector: 'app-invoice-print',
  templateUrl: './printInvoice.component.html',
  styleUrls: ['./printInvoice.component.scss']
})
export class InvoicePrintComponent implements OnInit {
  @ViewChildren('printContainer') printContainer: QueryList < ElementRef > ;

  todaysDate = new Date();


  supplierName = '';
  supplierAddress = '';
  supplierContact = '';
  supplierGST = '';
  purchaserName = '';
  purchaserAddress = '';
  purchaserContact = '';
  purchaserGST = '';
  supplyDate = '';
  invoiceNumber = '';
  challanNumber = '';
  PONumber = '';
  subTotal = 0;
  cGST = 0;
  sGST = 0;
  grandTotal = 0;
  amountInWords = '';

  productsArray = [];


  constructor(private invoiceService: InvoiceService, private router: Router
    , private spinner: NgxSpinnerService, private orderService: OrderService
    , private disptachService: DispatchService, private route: ActivatedRoute
    , private amountCalculator: AmountCalculatorService) {}

  ngOnInit() {
    // this.spinner.show();

    this.route.fragment.subscribe(fragment => {

      if (fragment) {
        this.invoiceService.getInvoice(fragment).subscribe(invoice => {
          if (invoice) {
            this.orderService.getOrder(invoice.OrderId).subscribe(order => {
              if (order) {
                this.disptachService.getDispatch(invoice.DispatchId).subscribe(disptach => {
                  if (disptach) {
                    const rate = order.Price;
                    console.log(order);
                    const products = disptach.DispatchDetails;
                  }
                });
              }
            });
          }
        });
      }

    });
    const meterCubeRate = 3250;


    this.productsArray = [{
        srNo: 1,
        width: 600,
        breadth: 250,
        height: 125,
        item: '600X250X125mm',
        hsnCode: '68159910',
        quantity: 800,
        rate: 0,
        per: 'Block',
        amount: 0
      },
      {
        srNo: 2,
        width: 600,
        breadth: 250,
        height: 100,
        item: '600X250X100mm',
        hsnCode: '68159911',
        quantity: 200,
        rate: 0,
        per: 'Block',
        amount: 0
      }
    ];

    // let _grandTotal = 0;
    // for (let i = 0; i < this.productsArray.length; i++) {
    //   const totalmm3 = this.productsArray[i].width * this.productsArray[i].breadth
    //                   * this.productsArray[i].height * this.productsArray[i].quantity;
    //   const totalm3 = totalmm3 / m3_To_mm3;
    //   const priceForThisSize = totalm3 * meterCubeRate;
    //   const ratePerBlock = priceForThisSize / this.productsArray[i].quantity;

    //   this.productsArray[i].rate = ratePerBlock;
    //   this.productsArray[i].amount = priceForThisSize;

    //   _grandTotal = _grandTotal + priceForThisSize;
    // }

    this.grandTotal = this.amountCalculator.calculateAmount(this.productsArray, meterCubeRate);

    const tempSubTotal = Math.round(this.grandTotal / 1.12);
    this.cGST = this.sGST = Math.round((tempSubTotal * 0.06));
    this.subTotal = (this.grandTotal - this.sGST - this.cGST);



    const converter = new Converter();
    this.amountInWords = converter.transformToWord(this.grandTotal);

    this.supplierName = 'Astracon Industries';
    this.supplierAddress = 'Ground Floor, Office No 90A, K. K. Market, Dhankawadi, Pune - 411043';
    this.supplierContact = '9822471226';
    this.supplierGST = '27ABLFA2369L1Z0';

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
            height: 700px;
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
            width: 45%;
            float: left;
            margin-left: 10px;
          }
          
          .purchaser-name {
            width: 45%;
            float: left;
            margin-left: 10px;
          }
          
          .print-invoice-PO-container {
            border-bottom: 1px solid black;
            float: left;
            width: 100%;
          }
          
          .print-invoice-detail-table-container {
              float: left;
              width: 100%; 
          }
          
          .print-invoice-detail-table {
              width: 100%; 
          }
          
          .print-invoice-detail-table tr th {
              border: 1px solid black;
              padding-left: 5px;
          }
          
          .print-invoice-detail-table tr td {
              border: 1px solid black;
              padding-left: 5px;
          
          }
          
          .print-invoice-amount-words {
              border-bottom: 1px solid black;
              float: left;
              width: 100%;
          }
          
          .print-invoice-amount-words-content {
            margin-left: 10px;
          }
          
          .print-invoice-bank-details {
              border-bottom: 1px solid black;
              float: left;
              width: 100%;
          }
          
          .print-invoice-bank-details-content {
            margin-left: 10px;
          }
          
          .print-invoice-declaration{
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
          
          .print-invoice-terms-title {
            width: 100%;
            text-align: center;
            font-size: 16px;
          }
          </style>
        </head>
            <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }
}
