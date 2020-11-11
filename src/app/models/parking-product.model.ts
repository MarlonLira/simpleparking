import { Utils } from '../commons/core/utils';
import Parking from './parking.model';

export default class ParkingProduct {
  id!: number;
  status!: string;
  name!: string;
  description!: string;
  value: number;
  parkingId!: number;

  parking: Parking;

  constructor(json?: any) {
    if (json) {
      this.id = Utils.returnIfValid(json.id);
      this.status = Utils.returnIfValid(json.status);
      this.name = Utils.returnIfValid(json.name);
      this.description = Utils.returnIfValid(json.description);
      this.value = Utils.returnIfValid(json.value);
      this.parkingId = Utils.returnIfValid(json.parkingId);
      this.parking = Utils.returnIfValid(json.parking);
    }
  }
}
