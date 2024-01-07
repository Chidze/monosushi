import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneDialogComponent } from './phone-dialog.component';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PhoneDialogComponent', () => {
  let component: PhoneDialogComponent;
  let fixture: ComponentFixture<PhoneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BasketDialogComponent,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set values null for inputs', () => {
    const testValues = {
      name: null,
      phone: null
    };
    component.initPhoneForm();
    expect(component.phoneForm.value).toEqual(testValues);
  });

});
