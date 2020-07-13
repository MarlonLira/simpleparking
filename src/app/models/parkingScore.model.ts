import { Utils } from '../commons/core/utils';

export default class ParkingScore {
  id!: number;
  attendanceScore: number;
  securityScore: number;
  locationScore: number;
  userId: number;
  parkingId!: number;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.attendanceScore = Utils.returnIfValid(json.attendanceScore);
    this.securityScore = Utils.returnIfValid(json.securityScore);
    this.locationScore = Utils.returnIfValid(json.locationScore);
    this.userId = Utils.returnIfValid(json.userId);
    this.parkingId = Utils.returnIfValid(json.parkingId);
  }
}
