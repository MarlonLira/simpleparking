import { TestBed } from '@angular/core/testing';

import { ParkingProductService } from './parking-product.service';

describe('ParkingProductService', () => {
  let service: ParkingProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
