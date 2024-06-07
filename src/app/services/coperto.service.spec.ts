import { TestBed } from '@angular/core/testing';

import { CopertoService } from './coperto.service';

describe('CopertoService', () => {
  let service: CopertoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopertoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
