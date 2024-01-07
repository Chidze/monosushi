import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDialogComponent } from './auth-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthDialogComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule
    ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize auth form', () => {
    expect(component.authForm.value).toEqual({email: null, password: null});
  });

  it('should initialize register form', () => {
    expect(component.registerForm.value).toEqual({
       firstName:null, lastName:null, phone:null,  email: null, password1: null, password2:null});
  });

  it('should set checkConfirmedPassword to false when passwords do not match', () => {
    const password1Control = component.registerForm.controls['password1'];
    const password2Control = component.registerForm.controls['password2'];
    password1Control.setValue('password');
    password2Control.setValue('password9');
    component.checkConfirmedPassword();
    expect(component.match).toBeTrue();
  });

  it('should set checkConfirmedPassword to true when passwords match', () => {
    const password1Control = component.registerForm.controls['password1'];
    const password2Control = component.registerForm.controls['password2'];
    password1Control.setValue('password');
    password2Control.setValue('password');
    component.checkConfirmedPassword();
    expect(component.match).toBeFalse();
  });
});
