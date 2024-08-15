import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { offAuthGuard } from './off-auth.guard';

describe('offAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => offAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
