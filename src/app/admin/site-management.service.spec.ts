import { TestBed } from '@angular/core/testing';

import { SiteManagementService } from './site-management.service';

describe('SiteManagementService', () => {
  let service: SiteManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
