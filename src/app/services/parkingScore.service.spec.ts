import { TestBed } from '@angular/core/testing';

import { ParkingScoreService } from './parkingScore.service';

describe('ParkingScoreService', () => {
  let service: ParkingScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
