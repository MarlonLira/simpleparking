import { ReturnIfValid } from '../commons/functions/properties';

export default class Vehicle {

  id!: number;
  status!: string;
  model!: string;
  color!: string;
  type!: string;
  licensePlate!: string;
  userId!: number;

  constructor(json?: any) {
    this.id = ReturnIfValid(json.id);
    this.status = ReturnIfValid(json.status);
    this.model = ReturnIfValid(json.model);
    this.color = ReturnIfValid(json.color);
    this.type = ReturnIfValid(json.type);
    this.licensePlate = ReturnIfValid(json.licensePlate);
    this.userId = ReturnIfValid(json.userId);
  }
}
