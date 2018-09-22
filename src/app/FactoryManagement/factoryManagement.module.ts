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
import { HttpClientModule } from '@angular/common/http';



@NgModule({

  declarations: [
    PlantsListComponent,
    RawMaterialListComponent,
    CustomerListComponent,
    PriceListComponent,
    SizeListComponent,
    SupplierListComponent
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
  ],
  providers: [
    PlantsService
  ],
  exports: [
    PlantsListComponent,
    RawMaterialListComponent,
    CustomerListComponent,
    PriceListComponent,
    SizeListComponent,
    SupplierListComponent
  ],
})
export class FactoryManagementModule {}
