import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@angular/fire/storage';
import { AdminActionsComponent } from './admin-actions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminActionsComponent', () => {
  let component: AdminActionsComponent;
  let fixture: ComponentFixture<AdminActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminActionsComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(AdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadDiscount', () => {
    spyOn(component, 'loadActions');
    component.ngOnInit();
    expect(component.loadActions).toHaveBeenCalled();
  });
});
