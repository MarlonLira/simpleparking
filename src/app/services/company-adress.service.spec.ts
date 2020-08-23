import { TestBed } from '@angular/core/testing';

import { CompanyAdressService } from './company-adress.service';

describe('companyAdressService', () => {
  let service: CompanyAdressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyAdressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
