import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import Scheduling from 'app/models/scheduling.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService extends BaseService<Scheduling> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  toList(): Promise<Scheduling[]> {
    return new Promise(async (resolve) => {
      const parkingId = this.auth.employee.parkingId ? this.auth.employee.parkingId : 0;
      const companyId = this.auth.employee.companyId ? this.auth.employee.companyId : 0;
      if (parkingId > 0) {
        resolve(await this.getByParkingId(parkingId));
      } else {
        resolve(await this.getByCompanyId(companyId));
      }
    });
  }

  getByCompanyId(id: number): Promise<Scheduling[]> {
    return new Promise((resolve, reject) => {
      if (id > 0) {
        this.onGet(`/schedulings/companyId/${id}`)
          .subscribe(
            (requested) => resolve(requested['result']),
            (e) => reject(e.error)
          );
      } else {
        resolve();
      }
    });
  }

  getByParkingId(id: number): Promise<Scheduling[]> {
    return new Promise((resolve, reject) => {
      if (id > 0) {
        this.onGet(`/schedulings/parkingId/${id}`)
          .subscribe(
            (requested) => resolve(requested['result']),
            (e) => reject(e.error)
          );
      } else {
        resolve();
      }
    });
  }

  getById(id: number): Promise<Scheduling> {
    return new Promise((resolve, reject) => {
      this.onGet(`/scheduling/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }
}
