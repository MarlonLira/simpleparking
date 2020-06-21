import { ReturnIfValid } from '../commons/functions/properties';

export default class Employee {
  public id!: number;
  public status!: string;
  public name!: string;
  public registryCode!: string;
  public phone!: string;
  public email!: string;
  public password: string;
  public parkingId!: number;
  public companyId!: number;
  public ruleId!: number;

  constructor(json?: any) {
    this.id = ReturnIfValid(json.id);
    this.name = ReturnIfValid(json.name);
    this.status = ReturnIfValid(json.status);
    this.registryCode = ReturnIfValid(json.registryCode);
    this.password = ReturnIfValid(json.password);
    this.phone = ReturnIfValid(json.phone);
    this.email = ReturnIfValid(json.email);
    this.parkingId = ReturnIfValid(json.parkingId);
    this.companyId = ReturnIfValid(json.companyId);
    this.ruleId = ReturnIfValid(json.ruleId);
  }

}