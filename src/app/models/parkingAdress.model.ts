import { ReturnIfValid } from '../commons/functions/properties';

export default class ParkingAdress {
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
    this.id = ReturnIfValid(json.id);
    this.status = ReturnIfValid(json.status);
    this.country = ReturnIfValid(json.country);
    this.state = ReturnIfValid(json.state);
    this.city = ReturnIfValid(json.city);
    this.district = ReturnIfValid(json.district);
    this.street = ReturnIfValid(json.street);
    this.number = ReturnIfValid(json.number);
    this.zipCode = ReturnIfValid(json.zipCode);
    this.latitude = ReturnIfValid(json.latitude);
    this.longitude = ReturnIfValid(json.longitude);
    this.complement = ReturnIfValid(json.complement);
    this.parkingId = ReturnIfValid(json.parkingId);
  }
}