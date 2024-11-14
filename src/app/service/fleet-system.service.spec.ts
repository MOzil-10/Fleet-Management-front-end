import { TestBed } from '@angular/core/testing';

import { FleetSystemService } from './fleet-system.service';

describe('FleetSystemService', () => {
  let service: FleetSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
