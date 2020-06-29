import { Utils } from '../commons/functions/utils';

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
    this.id = Utils.returnIfValid(json.id);
    this.name = Utils.returnIfValid(json.name);
    this.status = Utils.returnIfValid(json.status);
    this.registryCode = Utils.returnIfValid(json.registryCode);
    this.password = Utils.returnIfValid(json.password);
    this.phone = Utils.returnIfValid(json.phone);
    this.email = Utils.returnIfValid(json.email);
    this.parkingId = Utils.returnIfValid(json.parkingId);
    this.companyId = Utils.returnIfValid(json.companyId);
    this.ruleId = Utils.returnIfValid(json.ruleId);
  }

}