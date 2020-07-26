import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ParkingPromotion from '../models/parking-promotion.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingPromotionService extends BaseService<ParkingPromotion> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/parkingPromotion', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/parkingPromotion/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/parkingPromotion', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetByName(parkingPromotionName: string): Promise<ParkingPromotion[]> {
    return new Promise((resolve) => {
      this.onGet(`/parkingPromotion/name/${parkingPromotionName}`)
        .subscribe((requested: ParkingPromotion[]) => {
          resolve(requested);
        });
    });
  }

  ToList(parkingId): Promise<ParkingPromotion[]> {
    return new Promise((resolve) => {
      this.onGet(`/ParkingsPromotion/${parkingId}`)
        .subscribe((requested: ParkingPromotion[]) => {
          resolve(requested);
        });
    });
  }
}
