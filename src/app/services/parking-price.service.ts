import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ParkingPrice } from 'app/models/parking-price.models';

@Injectable({
  providedIn: 'root'
})
export class ParkingPriceService extends BaseService<ParkingPrice> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  save(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/parkingPrice', values)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onDelete(`/parkingPrice/${id}`)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  update(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPut('/parkingPrice', values)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  getByParkingId(): Promise<ParkingPrice[]> {
    return new Promise((resolve, reject) => {
      const parkingId = this.auth.parking.id ? this.auth.parking.id : 0;
      if (parkingId > 0) {
        this.onGet(`/parkingprice/parkingId/${parkingId}`)
          .subscribe(
            (requested) => resolve(requested['result']),
            (e) => reject(e.error)
          );
      } else {
        resolve();
      }
    });
  }

  getById(id: number): Promise<ParkingPrice> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parkingprice/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }
}
