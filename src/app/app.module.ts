import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FactoryManagementModule } from './FactoryManagement/factoryManagement.module';
import { LoginModule } from './pages/login/login.module';
import { PlantsService } from './FactoryManagement/Services/plants.service';
import { CustomersService } from './FactoryManagement/Services/customers.service';
import { SuppliersService } from './FactoryManagement/Services/suppliers.service';
import { RawMaterialService } from './FactoryManagement/Services/rawMaterial.service';
import { SizeDetailsService } from './FactoryManagement/Services/sizeDetails.service';
import { PriceDetailsService } from './FactoryManagement/Services/priceDetails.service';
import { HttpClientModule } from '@angular/common/http';
import { RawMaterialInwardService } from './FactoryManagement/Services/rawMaterialInwardService';
import { RawMaterialConsumptionService } from './FactoryManagement/Services/rawMaterialConsumptionService';

import { ProductsService } from './FactoryManagement/Services/products.service';

import { ProductionEntryService } from './FactoryManagement/Services/productionEntry.service';
import { OrderService } from './FactoryManagement/Services/order.service';
import { DispatchService } from './FactoryManagement/Services/disptach.service';
import { InvoiceService } from './FactoryManagement/Services/invoice.service';
import { AmountCalculatorService } from './FactoryManagement/Services/amountCalculator.service';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule,
    FactoryManagementModule,
    LoginModule
  ],
  providers: [
    PlantsService,
    CustomersService,
    SuppliersService,
    RawMaterialService,
    RawMaterialInwardService,
    RawMaterialConsumptionService,

    SizeDetailsService,
    PriceDetailsService,
    ProductsService,

    ProductionEntryService,
    OrderService,
    DispatchService,
    InvoiceService,
    AmountCalculatorService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
