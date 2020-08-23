import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Parking from '../models/parking.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService extends BaseService<Parking> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  save(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/parking', values)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onDelete(`/parking/${id}`)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  update(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPut('/parking', values)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  toList(): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parkings/companyId/${this.auth.company.id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  getByRegistryCode(registryCode: string): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parking/companyId/${this.auth.company.id}/registryCode/${registryCode}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  getById(id: number): Promise<Parking> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parking/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }
}
