import { Utils } from '../commons/core/utils';
import CompanyAdress from './company-adress.model';

export default class Company {
  id!: number;
  status!: string;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!:string;
  about: string;
  imageUrl: string;

  adress: CompanyAdress;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.name = Utils.returnIfValid(json.name);
    this.status = Utils.returnIfValid(json.status);
    this.registryCode = Utils.returnIfValid(json.registryCode);
    this.phone = Utils.returnIfValid(json.phone);
    this.about = Utils.returnIfValid(json.about);
    this.email = Utils.returnIfValid(json.email);
    this.imageUrl = Utils.returnIfValid(json.imageUrl);
    this.adress = Utils.returnIfValid(json.adress);
  }
}
