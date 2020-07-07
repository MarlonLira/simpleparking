import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ParkingFinance from '../models/parkingFinance.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingFinanceService extends BaseService<ParkingFinance> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/parkingFinance', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/parkingFinance/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/parkingFinance', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetById(parkingFinanceId: number): Promise<ParkingFinance>{
     return new Promise((resolve) => {
       this.onGet(`/parkingFinance/id/${parkingFinanceId}`)
        .subscribe((requested: ParkingFinance) => {
          resolve(requested);
        });
     });
  }

  ToList(parkingId): Promise<ParkingFinance[]> {
    return new Promise((resolve) => {
      this.onGet(`/ParkingFinance/${parkingId}`)
        .subscribe((requested: ParkingFinance[]) => {
          resolve(requested);
        });
    });
  }
}
