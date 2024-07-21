import { TestBed } from '@angular/core/testing';

import { SuspensionService } from './suspension.service';

describe('SuspensionService', () => {
  let service: SuspensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuspensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
