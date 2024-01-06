import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminTovaryComponent } from './admin-tovary/admin-tovary.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'admin-actions', component: AdminActionsComponent },
      { path: 'admin-category', component: AdminCategoryComponent },
      { path: 'admin-tovary', component: AdminTovaryComponent },
      { path: 'admin-orders', component: AdminOrdersComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
