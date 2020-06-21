import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Parking from '../models/parking';
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
}
