import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should delete data of user from memory', () => {
    localStorage.setItem('currentUser', JSON.stringify('testData'));
    component.logOut();
    const userData = localStorage.getItem('currentUser');
    expect(userData).toBe(null);
  })
});
