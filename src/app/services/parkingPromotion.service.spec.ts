import { TestBed } from '@angular/core/testing';

import { ParkingPromotionService } from './parkingPromotion.service';

describe('ParkingPromotionService', () => {
  let service: ParkingPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingPromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
