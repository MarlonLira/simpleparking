import { Utils } from '../commons/core/utils';
import ParkingAddress from './parking-address.model';
import Company from './company.model';
import Employee from './employee.model';
import ParkingFile from './parking-file.model';

export default class Parking {
  id!: number;
  status!: string;
  name: string;
  registryCode: string;
  phone: string;
  email: string;
  imgUrl: string;
  companyId: number;
  qrcode: string;

  address: ParkingAddress;
  company: Company;
  employees: Employee[];
  files: ParkingFile[];

  constructor(json?: any) {
    if (json) {
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
      this.employees = Utils.returnIfValid(json.employees);
      this.files = Utils.returnIfValid(json.files);
      this.qrcode = Utils.returnIfValid(json.qrCode);
    }
  }
}
