import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Vehicle from '../models/vehicle.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/vehicle', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/vehicle/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/vehicle', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetByLicensePlate(licensePlate: string): Promise<Vehicle> {
    return new Promise((resolve) => {
      this.onGet(`/vehicle/licensePlate/${licensePlate}`)
        .subscribe((requested: Vehicle) => {
          resolve(requested);
        });
    });
  }

  GetByUserId(userId: number): Promise<Vehicle[]> {
    return new Promise((resolve) => {
      this.onGet(`/vehicles/userId/${userId}`)
        .subscribe((requested: Vehicle[]) => {
          resolve(requested);
        });
    });
  }
}
