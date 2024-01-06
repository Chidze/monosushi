import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions.component';
import { ActionsRoutingModule } from './actions-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionsInfoComponent } from './actions-info/actions-info.component';
import {ProductCategoryComponent} from "../product-category/product-category.component";



@NgModule({
  declarations: [
    ActionsComponent,
    ActionsInfoComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    SharedModule
  ],
  exports: [
    ActionsComponent
  ],
})
export class ActionsModule { }
