import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashcardComponent } from '../dashboard-widget/dashcard/dashcard.component';
import { PlantsListComponent } from '../FactoryManagement/Plants/plants.component';
import { RawMaterialListComponent } from '../FactoryManagement/RawMaterial/rawmaterial.component';
import { CustomerListComponent } from '../FactoryManagement/Customer/customer.component';
import { PriceDetailListComponent } from '../FactoryManagement/Price/priceDetails.component';
import { SizeDetailListComponent } from '../FactoryManagement/Size/sizeDetails.component';
import { SupplierListComponent } from '../FactoryManagement/Supplier/supplier.component';
import { RawMaterialInwardListComponent } from '../FactoryManagement/RawMaterialInward/rawMaterialInward.component';
import { RawMaterialConsumptionListComponent } from '../FactoryManagement/RawMaterialConsumption/rawMaterialConsumption.component';
import { ProductsListComponent } from '../FactoryManagement/Product/products.component';

export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'plants', component: PlantsListComponent },
        { path: 'rawMaterial', component: RawMaterialListComponent },
        { path: 'customers', component: CustomerListComponent },
        { path: 'prices', component: PriceDetailListComponent },
        { path: 'sizes', component: SizeDetailListComponent },
        { path: 'suppliers', component: SupplierListComponent },
        { path: 'rawMaterialInward', component: RawMaterialInwardListComponent },
        { path: 'rawMaterialConsumption', component: RawMaterialConsumptionListComponent },
        { path: 'dashboard', component: DashboardCrmComponent },
        { path: 'material-widgets', loadChildren: '../material-widgets/material-widgets.module#MaterialWidgetsModule' },
        { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
        { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
        { path: 'charts', loadChildren: '../charts/charts.module#ChartsModule' },
        // { path: 'chats', loadChildren: '../chats/chat.module#ChatsModule' }, // fix this
        // { path: 'mail', loadChildren: '../mail/mail.module#MailModule' }, // fix this
        { path: 'pages', loadChildren: '../pages/pages.module#PagesModule' },
        { path: 'forms', loadChildren: '../forms/forms.module#FormModule' }, // fix this
        { path: 'guarded-routes', loadChildren: '../guarded-routes/guarded-routes.module#GuardedRoutesModule' },
        // { path: 'editor', loadChildren: '../editor/editor.module#EditorModule' },
        { path: 'scrumboard', loadChildren: '../scrumboard/scrumboard.module#ScrumboardModule' },
        { path: 'products', component: ProductsListComponent },
    ]
}];
