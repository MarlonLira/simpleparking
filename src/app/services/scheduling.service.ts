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
    return new Promise((resolve, reject) => {
      this.onGet(`/schedulings/companyId/${this.auth.employee.companyId}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  getByParkingId(id: number): Promise<Scheduling[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/schedulings/parkingId/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
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
