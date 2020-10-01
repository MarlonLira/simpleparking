import { Utils } from '../commons/core/utils';
import ParkingAddress from './parking-address.model';
import Company from './company.model';

export default class Parking {
  id!: number;
  status!: string;
  name: string;
  registryCode: string;
  phone: string;
  email: string;
  imgUrl: string;
  companyId: number;

  address: ParkingAddress;
  company: Company;

  constructor(json?: any) {

    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.name = Utils.returnIfValid(json.name);
    this.registryCode = Utils.returnIfValid(json.registryCode);
    this.phone = Utils.returnIfValid(json.phone);
    this.email = Utils.returnIfValid(json.email);
    this.imgUrl = Utils.returnIfValid(json.imgUrl);
    this.companyId = Utils.returnIfValid(json.companyId);
    this.address = Utils.returnIfValid(json.address);
    this.company = Utils.returnIfValid(json.company);
  }
}
