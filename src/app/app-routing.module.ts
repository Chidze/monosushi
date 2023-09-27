import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { ActionsInfoComponent } from './pages/actions-info/actions-info.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { AdminComponent } from './admin/admin.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminTovaryComponent } from './admin/admin-tovary/admin-tovary.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { productInfoResolver } from './shared/services/product/product-info.resolver';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'actions/:id', component: ActionsInfoComponent },
  { path: 'product-category/:category', component: ProductCategoryComponent },
  { path: 'product/:category/:id', component: ProductInfoComponent, resolve: {
    productInfo: productInfoResolver
  }},
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'discounts', component: DiscountsComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'admin-actions', component: AdminActionsComponent },
      { path: 'admin-category', component: AdminCategoryComponent },
      { path: 'admin-tovary', component: AdminTovaryComponent },
      { path: 'admin-orders', component: AdminOrdersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
