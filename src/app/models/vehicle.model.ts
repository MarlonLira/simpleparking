import { Utils } from '../commons/core/utils';

export default class Vehicle {

  id!: number;
  status!: string;
  model!: string;
  color!: string;
  type!: string;
  licensePlate!: string;
  userId!: number;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.model = Utils.returnIfValid(json.model);
    this.color = Utils.returnIfValid(json.color);
    this.type = Utils.returnIfValid(json.type);
    this.licensePlate = Utils.returnIfValid(json.licensePlate);
    this.userId = Utils.returnIfValid(json.userId);
  }
}
