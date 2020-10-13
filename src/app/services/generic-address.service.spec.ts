import { TestBed } from '@angular/core/testing';

import { GenericAddressService } from './generic-address.service';

describe('GenericAddressService', () => {
  let service: GenericAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
