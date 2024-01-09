import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountsComponent } from './discounts.component';
import { SharedModule } from '../../shared/shared.module';
import { DiscountsRoutingModule } from "./discounts-routing.module";



@NgModule({
  declarations: [
    DiscountsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DiscountsRoutingModule
  ]
})
export class DiscountsModule { }
