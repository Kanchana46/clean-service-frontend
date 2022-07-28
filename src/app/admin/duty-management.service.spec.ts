import { TestBed } from '@angular/core/testing';

import { DutyManagementService } from './duty-management.service';

describe('DutyManagementService', () => {
  let service: DutyManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DutyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
