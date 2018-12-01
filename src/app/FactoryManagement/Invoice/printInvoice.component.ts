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
    this.spinner.show();

    this.route.fragment.subscribe(fragment => {

      if (fragment) {
        this.invoiceService.getInvoiceInformationForPrint(fragment).subscribe(invoice => {
          // console.log(invoice);
          this.purchaserName = invoice.CustomerName;
          this.purchaserAddress = invoice.Address;
          this.purchaserContact = ''; // invoice.CustomerName;
          this.purchaserGST = invoice.CustomerGST;
          this.PONumber = invoice.CustomerPONumber;
          this.supplyDate = invoice.DispatchDate;
          this.invoiceNumber = invoice.InvoiceNumber;
          this.challanNumber = invoice.DispatchNumber;
          this.grandTotal = Math.round(invoice.Price);
          const tempSubTotal = Math.round(this.grandTotal / 1.12);
          this.cGST = this.sGST = Math.round((tempSubTotal * 0.06));
          this.subTotal = (this.grandTotal - this.sGST - this.cGST);

          const productsHere = [];
          let totalMeterCube = 0;
          invoice.Products.forEach(element => {
            totalMeterCube = totalMeterCube +
            this.amountCalculator.getMeterCube(element.Length, element.Width, element.Height, element.Quantity);
          });

          const newRateAfterGST = this.subTotal / totalMeterCube;

          for (let i = 1; i <= invoice.Products.length; i++) {
            const amount = (this.amountCalculator.getMeterCube(invoice.Products[i - 1].Length
              , invoice.Products[i - 1].Width
              , invoice.Products[i - 1].Height
              , invoice.Products[i - 1].Quantity) * newRateAfterGST);
            productsHere.push({
              srNo: i,
              item: invoice.Products[i - 1].ProductName,
              hsnCode: invoice.Products[i - 1].HSNCode,
              quantity: invoice.Products[i - 1].Quantity,
              amount: amount,
              rate: amount / invoice.Products[i - 1].Quantity,
              per: 'Block'
            });
          }

          this.productsArray = productsHere;
          const converter = new Converter();
          this.amountInWords = converter.transformToWord(this.grandTotal);
          this.spinner.hide();
        });
      }

    });

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
            width: 40%;
            float: left;
            margin-left: 10px;
            margin-right: 60px;
          }
          .purchaser-name {
            width: 40%;
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
          .supply-date {
            width: 40%;
            float: left;
            margin-left: 10px;
            margin-right: 60px;
          }
          .invoice-number {
            width: 40%;
            float: left;
            margin-left: 10px;
          }
          .print-invoice-terms-content {
            font-size: 10px;
          }
          </style>
        </head>
            <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }
}
