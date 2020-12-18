import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import ParkingSpace from 'app/models/parking-space.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpaceService extends BaseService<ParkingSpace> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  save(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/parkingSpace', values)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onDelete(`/parkingSpace/${id}`)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  update(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPut('/parkingSpace', values)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  getByParkingId(id: number): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      if (id > 0) {
        this.onGet(`/parkingspace/parkingId/${id}`)
          .subscribe(
            (requested) => resolve(requested['result']),
            (e) => reject(e.error)
          );
      } else {
        resolve(undefined);
      }
    });
  }

  toList(): Promise<ParkingSpace[]> {
    return new Promise(async (resolve, reject) => {
      const parkingId = this.auth.employee.parkingId ? this.auth.employee.parkingId : 0;
      if (parkingId > 0) {
        resolve(await this.getByParkingId(parkingId));
      } else {
        resolve(undefined);
      }
    });
  }

  getById(id: number): Promise<ParkingSpace> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parkingspace/id/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  toList(): Promise<ParkingSpace[]> {
    return new Promise(async (resolve) => {
      const parkingId = this.auth.employee.parkingId ? this.auth.employee.parkingId : 0;
      if (parkingId > 0) {
        resolve(await this.getByParkingId(parkingId));
      } else {
        resolve();
      }
    });
  }
}
