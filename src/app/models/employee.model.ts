import { Utils } from '../commons/core/utils';
import Rule from './rule.model';
import Parking from './parking.model';

export default class Employee {
  public id!: number;
  public status!: string;
  public name!: string;
  public registryCode!: string;
  public phone!: string;
  public email!: string;
  public about!: string;
  public company: string;
  public image: string;
  public password: string;
  public parkingId!: number;
  public companyId!: number;
  public ruleId!: number;

  public rule: Rule;
  public parking: Parking;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.name = Utils.returnIfValid(json.name);
    this.status = Utils.returnIfValid(json.status);
    this.registryCode = Utils.returnIfValid(json.registryCode);
    this.password = Utils.returnIfValid(json.password);
    this.phone = Utils.returnIfValid(json.phone);
    this.email = Utils.returnIfValid(json.email);
    this.about = Utils.returnIfValid(json.about);
    this.company = Utils.returnIfValid(json.company);
    this.image = Utils.returnIfValid(json.image);
    this.parkingId = Utils.returnIfValid(json.parkingId);
    this.parking = Utils.returnIfValid(json.parking);
    this.companyId = Utils.returnIfValid(json.companyId);
    this.ruleId = Utils.returnIfValid(json.ruleId);
    this.rule = Utils.returnIfValid(json.rule);
  }

}