import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.scss']
})
export class RollsComponent implements OnInit {
  public userProducts: Array<IProductResponse> = [];
  public categoryName!: string;

  constructor(
    private productService: ProductService){}
    
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getAll().subscribe((data) => {this.userProducts = data});
  }
}
