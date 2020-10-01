import { TestBed } from '@angular/core/testing';

import { CompanyAddressService } from './company-address.service';

describe('companyAddressService', () => {
  let service: CompanyAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
