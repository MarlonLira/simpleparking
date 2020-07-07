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

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/parking', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/parking/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/parking', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  ToList(): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parkings/companyId/${this.auth.company.id}`)
        .subscribe(requested => {
          resolve(requested['result']);
        });
    });
  }

  GetByRegistryCode(registryCode: string): Promise<Parking[]> {
    return new Promise((resolve) => {
      this.onGet(`/parking/companyId/:companyId/registryCode/${this.auth.company.registryCode}`)
        .subscribe(requested => {
          resolve(requested['result']);
        });
    });
  }
}
