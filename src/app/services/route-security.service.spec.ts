import { TestBed } from '@angular/core/testing';

import { RouteSecurityService } from './route-security.service';

describe('RouteSecurityService', () => {
  let service: RouteSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
