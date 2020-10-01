import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ParkingAddress from '../models/parking-address.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingAddressService extends BaseService<ParkingAddress> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/parkingAddress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/parkingAddress/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/parkingAddress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetById(parkingAddressId: number): Promise<ParkingAddress>{
     return new Promise((resolve) => {
       this.onGet(`/parkingAddress/id/${parkingAddressId}`)
        .subscribe((requested: ParkingAddress) => {
          resolve(requested);
        });
     });
  }

  ToList(parkingId): Promise<ParkingAddress[]> {
    return new Promise((resolve) => {
      this.onGet(`/ParkingAddress/${parkingId}`)
        .subscribe((requested: ParkingAddress[]) => {
          resolve(requested);
        });
    });
  }
}
