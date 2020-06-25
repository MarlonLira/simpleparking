import { ReturnIfValid, IsValid } from '../commons/functions/properties';
import User from './user.model';
import Employee from './employee.model';
import Company from './company.model';
import Parking from './parking.model';

export default class Auth {
  token!: string;
  validated!: boolean;
  user!: User;
  employee!: Employee;
  company!: Company;
  parking!: Parking;
  authenticationLevel!: number;

  constructor(json?: any) {
    if (json) {
      this.token = ReturnIfValid(json.token, '');
      this.authenticationLevel = ReturnIfValid(json.authenticationLevel);
      this.validated = ReturnIfValid(json.validated);
      this.user = IsValid(json.user) ? new User(json.user) : undefined;
      this.employee = IsValid(json.employee) ? new Employee(json.employee) : undefined;
      this.company = IsValid(json.company) ? new Company(json.company) : undefined;
      this.parking = IsValid(json.parking) ? new Parking(json.parking) : undefined;
    }
  }
}
