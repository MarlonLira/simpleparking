import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import Auth from 'app/models/auth.model';
import Employee from 'app/models/employee.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Auth, Employee]
    });
    service = TestBed.inject(AuthService);
  });

  it('Login Test', () => {
    const _auth = new Auth();
    _auth.employee = new Employee();
    _auth.employee.email = 'marlonlira2@gmail.com';
    _auth.employee.password = '123456';
    expect(service.signin(_auth)).toBeTruthy();
  });
});
