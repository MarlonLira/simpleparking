import { Utils } from '../commons/core/utils';

export default class ParkingAddress {
  id!: number;
  status!: string;
  country!: string;
  state!: string;
  city!: string;
  district!: string;
  street!: string;
  number: number;
  zipCode!: string;
  latitude: string;
  longitude: string;
  complement: string;
  parkingId!: number;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.country = Utils.returnIfValid(json.country);
    this.state = Utils.returnIfValid(json.state);
    this.city = Utils.returnIfValid(json.city);
    this.district = Utils.returnIfValid(json.district);
    this.street = Utils.returnIfValid(json.street);
    this.number = Utils.returnIfValid(json.number);
    this.zipCode = Utils.returnIfValid(json.zipCode);
    this.latitude = Utils.returnIfValid(json.latitude);
    this.longitude = Utils.returnIfValid(json.longitude);
    this.complement = Utils.returnIfValid(json.complement);
    this.parkingId = Utils.returnIfValid(json.parkingId);
  }
}