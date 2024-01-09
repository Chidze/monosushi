import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {

  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  public currentCategoryName!: string;
  public nameOfPage = '';


  constructor(
    public productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadProduct();
      }
    });
  }

  ngOnInit(): void {
  }


  loadProduct(): void {
    let categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    // this.productService.getAllByCategory(categoryName).subscribe((data) => {
    //     this.userProducts = data;
    // });
    this.productService.getAllByCategoryFirebase(categoryName).subscribe(data => {
      this.userProducts = data as IProductResponse[];
      this.nameOfPage = this.userProducts[0].category.name;
    })
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }
  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((prod) => prod.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        basket[index].count =
          Number(basket[index].count) + Number(product.count);
        console.log(typeof basket[index].count);
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
  path(): void{

  }
}
