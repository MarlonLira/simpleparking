import { TestBed } from '@angular/core/testing';

import { UserAddressService } from './user-address.service';

describe('userAddressService', () => {
  let service: UserAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
