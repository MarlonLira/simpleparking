import { TestBed } from '@angular/core/testing';

import { UserAdressService } from './userAdress.service';

describe('userAdressService', () => {
  let service: UserAdressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
