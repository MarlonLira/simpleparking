import { TestBed } from '@angular/core/testing';

import { ParkingPriceService } from './parking-price.service';

describe('ParkingPriceService', () => {
  let service: ParkingPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
