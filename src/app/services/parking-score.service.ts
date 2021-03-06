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

  save(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/parkingScore', values)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onDelete(`/parkingScore/${id}`)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  update(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPut('/parkingScore', values)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  getById(id: number): Promise<ParkingScore> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parkingScore/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  toList(): Promise<ParkingScore[]> {
    return new Promise((resolve, reject) => {
      const parkingId = this.auth.employee.parkingId ? this.auth.employee.parkingId : 0;
      if (parkingId > 0) {
        this.onGet(`/ParkingsScores/${parkingId}`)
          .subscribe(
            (requested) => resolve(requested['result']),
            (e) => reject(e.error)
          );
      } else {
        resolve();
      }
    });
  }
}
