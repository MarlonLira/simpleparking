import { Utils } from '../commons/core/utils';

export default class ParkingFinance{
  id!: number;
  month!: string;
  year!: string;
  value!: number;
  parkingId!: number;
  companyId!: number;
  status!: string;

  constructor(json?: any){
    this.id = Utils.returnIfValid(json.id);
    this.month = Utils.returnIfValid(json.month);
    this.year = Utils.returnIfValid(json.year);
    this.value = Utils.returnIfValid(json.value);
    this.parkingId = Utils.returnIfValid(json.parkingId);
    this.companyId = Utils.returnIfValid(json.companyId);
    this.status = Utils.returnIfValid(json.status);
  }
}
