import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ParkingAdress from '../models/parking-adress.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingAdressService extends BaseService<ParkingAdress> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/parkingAdress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/parkingAdress/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/parkingAdress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetById(parkingAdressId: number): Promise<ParkingAdress>{
     return new Promise((resolve) => {
       this.onGet(`/parkingAdress/id/${parkingAdressId}`)
        .subscribe((requested: ParkingAdress) => {
          resolve(requested);
        });
     });
  }

  ToList(parkingId): Promise<ParkingAdress[]> {
    return new Promise((resolve) => {
      this.onGet(`/ParkingAdress/${parkingId}`)
        .subscribe((requested: ParkingAdress[]) => {
          resolve(requested);
        });
    });
  }
}
