import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductInfoComponent } from './product-info/product-info.component';


@NgModule({
  declarations: [
    ProductCategoryComponent,
    ProductInfoComponent,
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    SharedModule,
  ],
  exports: [
    ProductCategoryComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductCategoryModule { }
