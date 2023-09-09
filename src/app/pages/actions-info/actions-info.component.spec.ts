import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsInfoComponent } from './actions-info.component';

describe('ActionsInfoComponent', () => {
  let component: ActionsInfoComponent;
  let fixture: ComponentFixture<ActionsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsInfoComponent]
    });
    fixture = TestBed.createComponent(ActionsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
