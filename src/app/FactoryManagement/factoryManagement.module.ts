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
import { PriceListComponent } from './Price/price.component';
import { SizeListComponent } from './Size/size.component';
import { SupplierListComponent } from './Supplier/supplier.component';
import { PlantsService } from './Services/plants.service';
import { RawMaterialService } from './Services/rawMaterial.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RawMaterialInwardService } from './Services/rawMaterialInwardService';
import { RawMaterialInwardListComponent } from './RawMaterialInward/rawMaterialInward.component';
import { RawMaterialConsumptionListComponent } from './RawMaterialConsumption/rawMaterialConsumption.component';
import { RawMaterialConsumptionService } from './Services/rawMaterialConsumptionService';
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


@NgModule({

  declarations: [
    PlantsListComponent,
    RawMaterialListComponent,
    CustomerListComponent,
    PriceListComponent,
    SizeListComponent,
    SupplierListComponent,
    RawMaterialListComponent,
    RawMaterialInwardListComponent,
    RawMaterialConsumptionListComponent,
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
    NgxSpinnerModule
  ],
  providers: [
    PlantsService,
    RawMaterialService,
    RawMaterialInwardService,
    RawMaterialConsumptionService,
    ProductionEntryService,
    OrderService,
    DispatchService,
    InvoiceService
  ],
  exports: [
    PlantsListComponent,
    RawMaterialListComponent,
    CustomerListComponent,
    PriceListComponent,
    SizeListComponent,
    SupplierListComponent,
    RawMaterialListComponent,
    RawMaterialInwardListComponent,
    RawMaterialConsumptionListComponent,
    ProductionEntryListComponent,
    OrderDetailsComponent,
    OrderListComponent,
    DispatchListComponent,
    DispatchDetailsComponent,
    InvoiceListComponent
  ],
})
export class FactoryManagementModule {}
