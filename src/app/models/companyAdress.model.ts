import { Utils } from '../commons/core/utils';

export default class CompanyAdress {

  id!: number;
  status!: string;
  country!: string;
  state!: string;
  city!: string;
  district!: string;
  street!: string;
  number: number;
  zipCode: string;
  complement!: string;
  companyId!: number;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.country = Utils.returnIfValid(json.country);
    this.state = Utils.returnIfValid(json.state);
    this.city = Utils.returnIfValid(json.city);
    this.district = Utils.returnIfValid(json.district);
    this.street = Utils.returnIfValid(json.street);
    this.number = Utils.returnIfValid(json.number);
    this.zipCode = Utils.returnIfValid(json.zipCode);
    this.complement = Utils.returnIfValid(json.complement);
    this.companyId = Utils.returnIfValid(json.companyId);
  }
}
