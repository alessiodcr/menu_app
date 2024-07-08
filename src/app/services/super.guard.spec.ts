import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { superGuard } from './super.guard';

describe('superGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => superGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
