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
  MatButtonToggleModule
} from '@angular/material';
import {
  FormsModule
} from '@angular/forms';



@NgModule({

  declarations: [
    PlantsListComponent
  ],

  imports: [
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
  ],


  exports: [
    PlantsListComponent
  ],
})
export class FactoryManagementModule {}
