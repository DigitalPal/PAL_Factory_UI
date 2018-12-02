import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule
  , MatChipsModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule
  , MatInputModule, MatNativeDateModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTabsModule
  , MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomerListComponent } from './Customer/customer.component';
import { DispatchDetailsComponent } from './Dispatch/dispatchDetails.component';
import { DispatchListComponent } from './Dispatch/dispatchList.component';
import { InvoiceListComponent } from './Invoice/invoiceList.component';
import { OrderDetailsComponent } from './Orders/orderDetails.component';
import { OrderListComponent } from './Orders/orderList.component';
import { PaymentListComponent } from './Payments/paymentList.component';
import { PlantsListComponent } from './Plants/plants.component';
import { PriceDetailListComponent } from './Price/priceDetails.component';
import { ProductsListComponent } from './Product/products.component';
import { ProductionEntryListComponent } from './ProductionEntry/productionEntry.component';
import { ProductionDetailsComponent } from './ProductionEntry/productionDetails.component';
import { RawMaterialListComponent } from './RawMaterial/rawmaterial.component';
import { RawMaterialConsumptionListComponent } from './RawMaterialConsumption/rawMaterialConsumption.component';
import { RawMaterialInwardListComponent } from './RawMaterialInward/rawMaterialInward.component';
import { DispatchService } from './Services/disptach.service';
import { InvoiceService } from './Services/invoice.service';
import { OrderService } from './Services/order.service';
import { PlantsService } from './Services/plants.service';
import { ProductionEntryService } from './Services/productionEntry.service';
import { ProductsService } from './Services/products.service';
import { RawMaterialService } from './Services/rawMaterial.service';
import { RawMaterialConsumptionService } from './Services/rawMaterialConsumptionService';
import { RawMaterialInwardService } from './Services/rawMaterialInwardService';
import { SizeDetailsService } from './Services/sizeDetails.service';
import { SizeDetailListComponent } from './Size/sizeDetails.component';
import { SupplierListComponent } from './Supplier/supplier.component';
import { PaymentsService } from './Services/payments.service';
import { InvoicePrintComponent } from './Invoice/printInvoice.component';
import { AmountCalculatorService } from './Services/amountCalculator.service';
import { DispatchReportComponent } from './Reports/Disptach/dispatchReport.component';
import { ProductionReportComponent } from './Reports/Production/productionReport.component';
import { ConsumptionReportComponent } from './Reports/Consumption/consumptionReport.component';

import { SupplierPOService } from './Services/supplierPO.service';
import { SupplierPODetailsComponent } from './SupplierPO/supplierPODetails.component';
import { SupplierPOListComponent } from './SupplierPO/supplierPOList.component';
import { SupplierPOPrintComponent } from './SupplierPO/printPO.component';
import { SupplierPOReportComponent } from './Reports/SupplierPO/supplierPOReport.component';
import { SummaryReportComponent } from './Reports/Summary/summaryReport.component';
import { SummaryReportService } from './Services/summaryReport.service';
import { inwardReportComponent } from './Reports/inward/inwardReport.component';


@NgModule({

  declarations: [
    PlantsListComponent,
    RawMaterialListComponent,
    CustomerListComponent,
    PriceDetailListComponent,
    SizeDetailListComponent,
    SupplierListComponent,
    RawMaterialListComponent,
    RawMaterialInwardListComponent,
    RawMaterialConsumptionListComponent,
    ProductsListComponent,
    ProductionEntryListComponent,
    ProductionDetailsComponent,
    OrderDetailsComponent,
    OrderListComponent,
    DispatchDetailsComponent,
    DispatchListComponent,
    InvoiceListComponent,
    PaymentListComponent,
    InvoicePrintComponent,
    DispatchReportComponent,
    ProductionReportComponent,
    ConsumptionReportComponent,
    SupplierPODetailsComponent,
    SupplierPOListComponent,
    SupplierPOPrintComponent,
    SupplierPOReportComponent,
    SummaryReportComponent,
    inwardReportComponent,

  ],

  imports: [
    HttpClientModule,
    CommonModule,
    // FormsRouterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatChipsModule,
    MatButtonToggleModule,
    NgbModule.forRoot(),
    NgxSpinnerModule,
    RouterModule
  ],
  providers: [
    PlantsService,
    RawMaterialService,
    RawMaterialInwardService,
    RawMaterialConsumptionService,
    SizeDetailsService,
    ProductsService,
    ProductionEntryService,
    OrderService,
    DispatchService,
    InvoiceService,
    PaymentsService,
    AmountCalculatorService,
    SupplierPOService,
    SummaryReportService
  ],
  exports: [
    PlantsListComponent,
    RawMaterialListComponent,
    CustomerListComponent,
    PriceDetailListComponent,
    SizeDetailListComponent,
    SupplierListComponent,
    RawMaterialListComponent,
    RawMaterialInwardListComponent,
    RawMaterialConsumptionListComponent,
    ProductsListComponent,
    ProductionEntryListComponent,
    ProductionDetailsComponent,
    OrderDetailsComponent,
    OrderListComponent,
    DispatchListComponent,
    DispatchDetailsComponent,
    InvoiceListComponent,
    PaymentListComponent,
    InvoicePrintComponent,
    DispatchReportComponent,

    ProductionReportComponent,
    ConsumptionReportComponent,
    SupplierPODetailsComponent,
    SupplierPOListComponent,
    SupplierPOPrintComponent,
    SupplierPOReportComponent,
    SummaryReportComponent,
    inwardReportComponent,

  ],
})
export class FactoryManagementModule {}
