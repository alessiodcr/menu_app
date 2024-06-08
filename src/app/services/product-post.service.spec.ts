import { TestBed } from '@angular/core/testing';

import { ProductPostService } from './product-post.service';

describe('ProductPostService', () => {
  let service: ProductPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
