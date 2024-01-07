import { TestBed } from '@angular/core/testing';

import { productInfoResolver } from './product-info.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductInfoResolver', () => {
  let resolver: productInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    resolver = TestBed.inject(productInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
