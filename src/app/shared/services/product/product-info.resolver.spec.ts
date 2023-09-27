import { TestBed } from '@angular/core/testing';

import { productInfoResolver } from './product-info.resolver';

describe('ProductInfoResolver', () => {
  let resolver: productInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(productInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
