import { Utils } from '../commons/functions/utils';

export default class Parking {
  id!: number;
  status!: string;
  name: string;
  registryCode: string;
  phone: string;
  email: string;
  imgUrl: string;
  companyId: number;

  constructor(json?: any) {

    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.name = Utils.returnIfValid(json.name);
    this.registryCode = Utils.returnIfValid(json.registryCode);
    this.phone = Utils.returnIfValid(json.phone);
    this.email = Utils.returnIfValid(json.email);
    this.imgUrl = Utils.returnIfValid(json.imgUrl);
    this.companyId = Utils.returnIfValid(json.companyId);
  }
}
