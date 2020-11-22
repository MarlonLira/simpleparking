import { Utils } from '../commons/core/utils';
import Parking from './parking.model';

export class ParkingPrice {

  public id!: number;
  public status!: string;
  public period!: 'OVERTIME' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  public value!: number;
  public vehicleType!: 'CAR' | 'MOTORCYCLE' | 'BOTH';
  public unit!: number;
  public parkingId!: number;

  parking: Parking;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.period = Utils.returnIfValid(json.period);
    this.value = Utils.returnIfValid(json.value);
    this.vehicleType = Utils.returnIfValid(json.vehicleType);
    this.unit = Utils.returnIfValid(json.unit);
    this.parkingId = Utils.returnIfValid(json.parkingId);
    this.parking = Utils.returnIfValid(json.parking);

  }
}
