import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsInfoComponent } from './actions-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('ActionsInfoComponent', () => {
  let component: ActionsInfoComponent;
  let fixture: ComponentFixture<ActionsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ActionsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
