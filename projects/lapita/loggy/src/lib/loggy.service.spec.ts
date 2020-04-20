import { TestBed } from '@angular/core/testing';

import { LoggyService } from './loggy.service';

describe('LoggyService', () => {
  let service: LoggyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
