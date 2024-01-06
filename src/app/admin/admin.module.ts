import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminTovaryComponent } from './admin-tovary/admin-tovary.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminActionsComponent,
    AdminCategoryComponent,
    AdminTovaryComponent,
    AdminOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
