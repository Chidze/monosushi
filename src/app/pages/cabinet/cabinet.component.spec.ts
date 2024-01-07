import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetComponent } from './cabinet.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CabinetComponent', () => {
  let component: CabinetComponent;
  let fixture: ComponentFixture<CabinetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinetComponent],
      imports: [
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(CabinetComponent);
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
  });
});
