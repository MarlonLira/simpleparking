import { Utils } from '../commons/core/utils';
import Scheduling from './scheduling.model';
import ParkingProduct from './parking-product.model';

export default class SchedulingProduct {

  id!: number;
  status!: string;
  value!: number;
  parkingProductId!: number;
  schedulingId!: number;

  scheduling: Scheduling;
  parkingProduct: ParkingProduct;

  constructor(json?: any) {
    if (json) {
      this.id = Utils.returnIfValid(json.id);
      this.status = Utils.returnIfValid(json.status);
      this.value = Utils.returnIfValid(json.value);
      this.parkingProductId = Utils.returnIfValid(json.parkingProductId);
      this.schedulingId = Utils.returnIfValid(json.schedulingId);
      this.parkingProduct = Utils.returnIfValid(json.parkingProduct);
      this.scheduling = Utils.returnIfValid(json.sheduling);
    }
  }
}
