import { Utils } from '../commons/functions/utils';

export default class User {
  id!: number;
  status!: string;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!: string;
  password!: string;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.name = Utils.returnIfValid(json.name);
    this.status = Utils.returnIfValid(json.status);
    this.registryCode = Utils.returnIfValid(json.registryCode);
    this.phone = Utils.returnIfValid(json.phone);
    this.email = Utils.returnIfValid(json.email);
    this.password = Utils.returnIfValid(json.password);
  }
}
