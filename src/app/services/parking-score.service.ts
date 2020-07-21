import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ParkingScore from '../models/parking-score.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingScoreService extends BaseService<ParkingScore> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/parkingScore', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/parkingScore/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/parkingScore', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetById(id: number): Promise<ParkingScore> {
    return new Promise((resolve) => {
      this.onGet(`/parkingScore/parkingScoreId/${id}`)
        .subscribe((requested: ParkingScore) => {
          resolve(requested);
        });
    });
  }

  ToList(parkingId): Promise<ParkingScore[]> {
    return new Promise((resolve) => {
      this.onGet(`/ParkingsScore/${parkingId}`)
        .subscribe((requested: ParkingScore[]) => {
          resolve(requested);
        });
    });
  }
}
