import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTovaryComponent } from './admin-tovary.component';

describe('AdminTovaryComponent', () => {
  let component: AdminTovaryComponent;
  let fixture: ComponentFixture<AdminTovaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTovaryComponent]
    });
    fixture = TestBed.createComponent(AdminTovaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
