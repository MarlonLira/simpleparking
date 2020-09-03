import { Utils } from '../commons/core/utils';

export default class ParkingSpace {
  id!: number;
  status!: String;
  amount!: number;
  value: number;
  type: 'CAR' | 'MOTORCYCLE' | 'BOTH'
  parkingId!: number;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.value = Utils.returnIfValid(json.value);
    this.type = Utils.returnIfValid(json.type);
    this.parkingId = Utils.returnIfValid(json.parkingId);
    this.amount = Utils.returnIfValid(json.amount);
  }
}
