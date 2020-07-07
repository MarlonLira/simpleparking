import { TestBed } from '@angular/core/testing';

import { ParkingAdressService } from './parkingAdress.service';

describe('ParkingAdressService', () => {
  let service: ParkingAdressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingAdressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
