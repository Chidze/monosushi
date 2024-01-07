import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCategoryComponent } from './admin-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadCategories', () => {
    spyOn(component, 'loadCategories');
    component.ngOnInit();
    expect(component.loadCategories).toHaveBeenCalled();
  });

  it('should set values null for inputs', () => {
  const testValues = {
    name: null,
    path: null,
    image: 'gs://actions-162bb.appspot.com/images'
  };
  component.initCategoryForm();
  expect(component.categoriesForm.value).toEqual(testValues);
});
});
