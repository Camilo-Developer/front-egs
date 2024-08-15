import { TestBed } from '@angular/core/testing';

import { UptproorganizationsService } from './uptproorganizations.service';

describe('UptproorganizationsService', () => {
  let service: UptproorganizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UptproorganizationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
