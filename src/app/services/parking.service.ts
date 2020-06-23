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

  ToList(): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.onGet('/parkings/companyId/1')
        .subscribe(requested => {
          resolve(requested['result']);
        });
    });
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/parking', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }
}
