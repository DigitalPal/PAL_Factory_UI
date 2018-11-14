import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';
import { CustomerListComponent } from '../FactoryManagement/Customer/customer.component';
import { DispatchDetailsComponent } from '../FactoryManagement/Dispatch/dispatchDetails.component';
import { DispatchListComponent } from '../FactoryManagement/Dispatch/dispatchList.component';
import { InvoiceListComponent } from '../FactoryManagement/Invoice/invoiceList.component';
import { InvoicePrintComponent } from '../FactoryManagement/Invoice/printInvoice.component';
import { OrderDetailsComponent } from '../FactoryManagement/Orders/orderDetails.component';
import { OrderListComponent } from '../FactoryManagement/Orders/orderList.component';
import { PaymentListComponent } from '../FactoryManagement/Payments/paymentList.component';
import { PlantsListComponent } from '../FactoryManagement/Plants/plants.component';
import { ProductsListComponent } from '../FactoryManagement/Product/products.component';
import { ProductionEntryListComponent } from '../FactoryManagement/ProductionEntry/productionEntry.component';
import { ProductionDetailsComponent } from '../FactoryManagement/ProductionEntry/productionDetails.component';
import { RawMaterialListComponent } from '../FactoryManagement/RawMaterial/rawmaterial.component';
import { RawMaterialConsumptionListComponent } from '../FactoryManagement/RawMaterialConsumption/rawMaterialConsumption.component';
import { RawMaterialInwardListComponent } from '../FactoryManagement/RawMaterialInward/rawMaterialInward.component';
import { SupplierListComponent } from '../FactoryManagement/Supplier/supplier.component';
import { AuthComponent } from './auth.component';
import { PriceDetailListComponent } from '../FactoryManagement/Price/priceDetails.component';
import { SizeDetailListComponent } from '../FactoryManagement/Size/sizeDetails.component';
import { DispatchReportComponent } from '../FactoryManagement/Reports/Disptach/dispatchReport.component';

import { ProductionReportComponent } from '../FactoryManagement/Reports/Production/productionReport.component';

import { SupplierPOListComponent } from '../FactoryManagement/SupplierPO/supplierPOList.component';
import { SupplierPODetailsComponent } from '../FactoryManagement/SupplierPO/supplierPODetails.component';
import { SupplierPOPrintComponent } from '../FactoryManagement/SupplierPO/printPO.component';
import { SupplierPOReportComponent } from '../FactoryManagement/Reports/SupplierPO/supplierPOReport.component';
import { SummaryReportComponent } from '../FactoryManagement/Reports/Summary/summaryReport.component';





export const appRoutes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
      path: 'plants',
      component: PlantsListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'rawMaterial',
      component: RawMaterialListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'customers',
      component: CustomerListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'prices',
      component: PriceDetailListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'sizes',
      component: SizeDetailListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'suppliers',
      component: SupplierListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'rawMaterialInward',
      component: RawMaterialInwardListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'rawMaterialConsumption',
      component: RawMaterialConsumptionListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'productionEntry',
      component: ProductionEntryListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'productionDetails',
      component: ProductionDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'dashboard',
      component: DashboardCrmComponent
    },
    {
      path: 'orderList',
      component: OrderListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'orderDetails',
      component: OrderDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'dispatchList',
      component: DispatchListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'dispatchDetails',
      component: DispatchDetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'invoiceList',
      component: InvoiceListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'invoicePrint',
      component: InvoicePrintComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'paymentList',
      component: PaymentListComponent,
      canActivate: [AuthGuard]
    },
    { path: 'dispatchReport', component:  DispatchReportComponent, canActivate: [AuthGuard]},

    { path: 'productionReport', component:  ProductionReportComponent, canActivate: [AuthGuard]},


    {
      path: 'supplierPOList',
      component: SupplierPOListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'supplierPODetails',
      component: SupplierPODetailsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'printPO',
      component: SupplierPOPrintComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'supplierPOReport',
      component: SupplierPOReportComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'summaryReport',
      component: SummaryReportComponent,
      canActivate: [AuthGuard]
    },

    {
      path: 'material-widgets',
      loadChildren: '../material-widgets/material-widgets.module#MaterialWidgetsModule'
    },
    {
      path: 'tables',
      loadChildren: '../tables/tables.module#TablesModule'
    },
    {
      path: 'maps',
      loadChildren: '../maps/maps.module#MapsModule'
    },
    {
      path: 'charts',
      loadChildren: '../charts/charts.module#ChartsModule'
    },
    // { path: 'chats', loadChildren: '../chats/chat.module#ChatsModule' }, // fix this
    // { path: 'mail', loadChildren: '../mail/mail.module#MailModule' }, // fix this
    {
      path: 'pages',
      loadChildren: '../pages/pages.module#PagesModule'
    },
    {
      path: 'forms',
      loadChildren: '../forms/forms.module#FormModule'
    }, // fix this
    {
      path: 'guarded-routes',
      loadChildren: '../guarded-routes/guarded-routes.module#GuardedRoutesModule'
    },
    // { path: 'editor', loadChildren: '../editor/editor.module#EditorModule' },
    {
      path: 'scrumboard',
      loadChildren: '../scrumboard/scrumboard.module#ScrumboardModule'
    },
    {
      path: 'products',
      component: ProductsListComponent
    },
  ]
}];
