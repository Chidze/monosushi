import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      imports: [
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call loadActions', () => {
    spyOn(component, 'loadActions');
    component.ngOnInit();
    expect(component.loadActions).toHaveBeenCalled();
  });
});
