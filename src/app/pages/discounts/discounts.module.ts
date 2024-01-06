import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountsComponent } from './discounts.component';
import { AboutRoutingModule } from '../about/about-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    DiscountsComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule
  ]
})
export class DiscountsModule { }
