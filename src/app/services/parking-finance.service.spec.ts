import { TestBed } from '@angular/core/testing';

import { ParkingFinanceService } from './parking-finance.service';

describe('ParkingFinanceService', () => {
  let service: ParkingFinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingFinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
