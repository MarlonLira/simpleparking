import { TestBed } from '@angular/core/testing';

import { ParkingSpaceService } from './parking-space.service';

describe('ParkingSpaceService', () => {
  let service: ParkingSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
