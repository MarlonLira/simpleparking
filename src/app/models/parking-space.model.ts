import { Utils } from '../commons/core/utils';

export default class ParkingSpace {
  public id!: number;
  public status!: String;
  public amount!: number;
  public value: number;
  public type: 'CAR' | 'MOTORCYCLE' | 'BOTH'
  public parkingId: number;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.value = Utils.returnIfValid(json.value);
    this.type = Utils.returnIfValid(json.type);
    this.parkingId = Utils.returnIfValid(Number(json.parkingId));
    this.amount = Utils.returnIfValid(Number(json.amount));
  }
}
