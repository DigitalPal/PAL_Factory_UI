import {
  CommonModule
} from '@angular/common';
import {
  NgModule
} from '@angular/core';
import {
  PlantsListComponent
} from './Plants/plants.component';
import {
  ProductsListComponent
} from './Product/products.component';
import {
  FormsRouterModule
} from '../forms/forms.router';
import {
  FlexLayoutModule
} from '@angular/flex-layout';
import { NgbActiveModal, NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
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
} from '@angular/material';
import {
  FormsModule
} from '@angular/forms';
import { RawMaterialListComponent } from './RawMaterial/rawmaterial.component';
import { CustomerListComponent } from './Customer/customer.component';
import { PriceDetailListComponent } from './Price/priceDetails.component';
import { SizeDetailListComponent } from './Size/sizeDetails.component';
import { SupplierListComponent } from './Supplier/supplier.component';
import { PlantsService } from './Services/plants.service';
import { RawMaterialService } from './Services/rawMaterial.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RawMaterialInwardService } from './Services/rawMaterialInwardService';
import { RawMaterialInwardListComponent } from './RawMaterialInward/rawMaterialInward.component';
import { RawMaterialConsumptionListComponent } from './RawMaterialConsumption/rawMaterialConsumption.component';
import { RawMaterialConsumptionService } from './Services/rawMaterialConsumptionService';

import { SizeDetailsService } from './Services/sizeDetails.service';
import { PriceDetailsService } from './Services/priceDetails.service';
import { ProductsService } from './Services/products.service';

import { ProductionEntryListComponent } from './ProductionEntry/productionEntry.component';
import { ProductionEntryService } from './Services/productionEntry.service';
import { OrderDetailsComponent } from './Orders/orderDetails.component';
import { OrderListComponent } from './Orders/orderList.component';
import { OrderService } from './Services/order.service';
import { DispatchDetailsComponent } from './Dispatch/dispatchDetails.component';
import { DispatchListComponent } from './Dispatch/dispatchList.component';
import { DispatchService } from './Services/disptach.service';
import { InvoiceListComponent } from './Invoice/invoiceList.component';
import { InvoiceService } from './Services/invoice.service';
import { RouterModule } from '@angular/router';



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
    OrderDetailsComponent,
    OrderListComponent,
    DispatchDetailsComponent,
    DispatchListComponent,
    InvoiceListComponent

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
    InvoiceService

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
    OrderDetailsComponent,
    OrderListComponent,
    DispatchListComponent,
    DispatchDetailsComponent,
    InvoiceListComponent

  ],
})
export class FactoryManagementModule {}
