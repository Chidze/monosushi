import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationComponent } from './authorization.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AuthDialogComponent } from '../../components/auth-dialog/auth-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationComponent],
      imports: [
        AuthDialogComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
    fixture = TestBed.createComponent(AuthorizationComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should set values null for inputs', () => {
    const testValues = {
      email: null,
      password: null
    };
    component.initAuthForm();
    expect(component.authForm.value).toEqual(testValues);
  });
})
