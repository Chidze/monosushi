import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryComponent } from './product-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


describe('ProductCategoryComponent', () => {
  let component: ProductCategoryComponent;
  let fixture: ComponentFixture<ProductCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCategoryComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change product count', () => {
    const boolean = true;
    const Fake_Product = {
      id: 1,
      category: { id: 1, name: 'qqq', path: 'qqq', image: 'iqq' },
      name: 'qqq',
      path: 'qqq',
      description: 'qqq',
      weight: 10,
      price: 10,
      image: 'qqq',
      count: 1,
    };
    spyOn(component, 'productCount').and.callThrough();
    component.productCount(Fake_Product, boolean);
    expect(component.productCount).toHaveBeenCalled();
    expect(Fake_Product.count).toBe(2);
  });

  it('should addBasket', () => {
    const product = {
      id: 1,
      category: { id: 1, name: 'qqq', path: 'qqq', image: 'iqq' },
      name: 'qqq',
      path: 'qqq',
      description: 'qqq',
      weight: 10,
      price: 10,
      image: 'qqq',
      count: 1,
    };
    spyOn(component, 'addToBasket').and.callThrough();
    component.addToBasket(product);
    expect(component.addToBasket).toHaveBeenCalled();
    expect(product.count).toBe(1);
  });


  it('should write data to localStorage', () => {
    const currentProduct = {
      id: 1,
      category: {
        id: 2,
        name: 'string',
        path: 'string',
        image: 'string',
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: 10,
      price: 510,
      image: 'string',
      count: 1
    };
    component.addToBasket(currentProduct);
    let data = JSON.parse(localStorage.getItem('basket') as string);
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBeTrue();
  });

});
