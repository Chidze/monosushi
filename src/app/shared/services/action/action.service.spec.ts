import { TestBed } from '@angular/core/testing';

import { ActionService } from './action.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActionService', () => {
  let service: ActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
