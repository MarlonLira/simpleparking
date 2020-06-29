import { TestBed } from '@angular/core/testing';

import { CompanyAdressService } from './companyAdress.service';

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
