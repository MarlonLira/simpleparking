import { ReturnIfValid } from '../commons/functions/properties';

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

    this.id = ReturnIfValid(json.id);
    this.status = ReturnIfValid(json.status);
    this.name = ReturnIfValid(json.name);
    this.registryCode = ReturnIfValid(json.registryCode);
    this.phone = ReturnIfValid(json.phone);
    this.email = ReturnIfValid(json.email);
    this.imgUrl = ReturnIfValid(json.imgUrl);
    this.companyId = ReturnIfValid(json.companyId);
  }
}
