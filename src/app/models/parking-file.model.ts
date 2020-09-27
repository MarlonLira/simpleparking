import { Utils } from '../commons/core/utils';

export default class ParkingFile {
  id: number;
  name: string;
  encoded: any;
  type: string;
  parkingId: number;

  constructor(json?: any) {
    if (json) {
      this.id = Utils.returnIfValid(json.id);
      this.name = Utils.returnIfValid(json.name);
      this.encoded = Utils.returnIfValid(json.encoded);
      this.type = Utils.returnIfValid(json.type);
      this.parkingId = Utils.returnIfValid(json.parkingId);
    }
  }
  public toLink = () => `${atob(this.encoded)}`;
}
