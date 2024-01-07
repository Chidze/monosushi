import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketDialogComponent } from './basket-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('BasketDialogComponent', () => {
  let component: BasketDialogComponent;
  let fixture: ComponentFixture<BasketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BasketDialogComponent,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should change total', () => {
    const FAKE_BASKET = [
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
    component.basketArray = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();

    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(10);
    component.basketArray = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });
});
