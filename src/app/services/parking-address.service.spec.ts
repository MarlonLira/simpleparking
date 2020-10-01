import { TestBed } from '@angular/core/testing';

import { ParkingAddressService } from './parking-address.service';

describe('ParkingAddressService', () => {
  let service: ParkingAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
