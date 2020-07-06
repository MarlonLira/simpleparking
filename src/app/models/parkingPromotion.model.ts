import { Utils } from '../commons/core/utils';

export default class ParkingPromotion {

  id!: number;
  status!: string;
  name: string;
  description!: string;
  days!: number;
  hours!: number;
  discount!: number;
  parkingId!: number;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.description = Utils.returnIfValid(json.description);
    this.name = Utils.returnIfValid(json.name);
    this.days = Utils.returnIfValid(json.days);
    this.hours = Utils.returnIfValid(json.hours);
    this.discount = Utils.returnIfValid(json.discount);
    this.parkingId = Utils.returnIfValid(json.parkingId);
  }
}
