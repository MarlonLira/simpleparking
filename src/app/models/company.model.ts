import { Utils } from '../commons/functions/utils';

export default class Company {
  id!: number;
  status!: string;
  name!: string;
  registryCode!: string;
  phone!: string;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.name = Utils.returnIfValid(json.name);
    this.status = Utils.returnIfValid(json.status);
    this.registryCode = Utils.returnIfValid(json.registryCode);
    this.phone = Utils.returnIfValid(json.phone);
  }
}
