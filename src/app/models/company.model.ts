import { Utils } from '../commons/core/utils';
import CompanyAddress from './company-address.model';

export default class Company {
  id!: number;
  status!: string;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!:string;
  about: string;
  image: string;

  address: CompanyAddress;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.name = Utils.returnIfValid(json.name);
    this.status = Utils.returnIfValid(json.status);
    this.registryCode = Utils.returnIfValid(json.registryCode);
    this.phone = Utils.returnIfValid(json.phone);
    this.about = Utils.returnIfValid(json.about);
    this.email = Utils.returnIfValid(json.email);
    this.image = Utils.returnIfValid(json.image);
    this.address = Utils.returnIfValid(json.address);
  }
}
