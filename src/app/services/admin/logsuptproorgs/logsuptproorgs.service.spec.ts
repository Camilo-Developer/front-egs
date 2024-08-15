import { TestBed } from '@angular/core/testing';

import { LogsuptproorgsService } from './logsuptproorgs.service';

describe('LogsuptproorgsService', () => {
  let service: LogsuptproorgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsuptproorgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
