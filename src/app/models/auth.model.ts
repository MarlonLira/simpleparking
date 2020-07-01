import { Utils } from '../commons/core/utils';
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
      this.token = Utils.returnIfValid(json.token, '');
      this.authenticationLevel = Utils.returnIfValid(json.authenticationLevel);
      this.validated = Utils.returnIfValid(json.validated);
      this.user = Utils.isValid(json.user) ? new User(json.user) : undefined;
      this.employee = Utils.isValid(json.employee) ? new Employee(json.employee) : undefined;
      this.company = Utils.isValid(json.company) ? new Company(json.company) : undefined;
      this.parking = Utils.isValid(json.parking) ? new Parking(json.parking) : undefined;
    }
  }
}
