import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTovaryComponent } from './admin-tovary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';

describe('AdminTovaryComponent', () => {
  let component: AdminTovaryComponent;
  let fixture: ComponentFixture<AdminTovaryComponent>;
  const products: IProductResponse[] = [
    {
      id: 1,
      category: { id: 1, name: 'qqq', path: 'qqq', image: 'iqq' },
      name: 'qqq',
      path: 'qqq',
      description: 'qqq',
      weight: 10,
      price: 10,
      image: 'qqq',
      count: 1,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTovaryComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(AdminTovaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProduct', () => {
    spyOn(component, 'loadProducts');
    component.ngOnInit();
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should set values null for inputs', () => {
    const testValues = {
      name: null,
      category: null,
      path: null,
      description: null,
      weight: null,
      price: null,
      image: null,
      count: 1
    };
    component.initProductForm();
    expect(component.productForm.value).toEqual(testValues);
  });

  it('should set form values when editing a product', () => {
    const product: IProductResponse = products[0];
    component.editProduct(product);
    expect(component.isUploaded).toBe(true);
    expect(component.editStatus).toBe(true);
    expect(component.show).toBe(false);
  });
  it('should set form values when save a product', () => {
    component.addProduct();
    expect(component.isUploaded).toBe(false);
    expect(component.editStatus).toBe(false);
    expect(component.show).toBe(true);
  });

  it('should set form values when delete a product', () => {
    const product: IProductResponse = products[0];
    component.deleteProduct(product);
    expect(component.loadCategories).toBeTruthy();
  });
});
