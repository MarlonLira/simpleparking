import { TestBed } from '@angular/core/testing';

import { SchedulingProductService } from './scheduling-product.service';

describe('SchedulingProductService', () => {
  let service: SchedulingProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
