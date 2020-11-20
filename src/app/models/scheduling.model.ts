import { Utils } from '../commons/core/utils';
import SchedulingProduct from './scheduling-product.model';

export default class Scheduling {
  id!: number;
  status!: string;
  userName!: string;
  cardNumber!: string;
  vehiclePlate!: string;
  vehicleType!: string;
  value!: number;
  date!: Date;
  avaliableTime!: string;
  unavailableTime!: string;
  userId!: number;
  cardId!: number;
  vehicleId!: number;
  parkingId!: number;
  parkingSpaceId!: number;
  schedulingProducts: SchedulingProduct[];

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.userName = Utils.returnIfValid(json.userName);
    this.cardNumber = Utils.returnIfValid(json.cardNumber);
    this.vehiclePlate = Utils.returnIfValid(json.vehiclePlate);
    this.vehicleType = Utils.returnIfValid(json.vehicleType);
    this.value = Utils.returnIfValid(json.value);
    this.date = Utils.returnIfValid(json.date);
    this.avaliableTime = Utils.returnIfValid(json.avaliableTime);
    this.unavailableTime = Utils.returnIfValid(json.unavailableTime);
    this.userId = Utils.returnIfValid(json.userId);
    this.vehicleId = Utils.returnIfValid(json.vehicleId);
    this.cardId = Utils.returnIfValid(json.cardId);
    this.parkingId = Utils.returnIfValid(json.parkingId);
    this.parkingSpaceId = Utils.returnIfValid(json.parkingSpaceId);
    this.schedulingProducts = Utils.returnIfValid(json.schedulingProducts);
  }
}
