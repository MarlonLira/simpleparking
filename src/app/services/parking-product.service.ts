import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ParkingProduct from 'app/models/parking-product.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingProductService extends BaseService<ParkingProduct> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  save(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/parkingProduct', values)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onDelete(`/parkingProduct/${id}`)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  update(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPut('/parkingProduct', values)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  toList(): Promise<ParkingProduct[]> {
    return new Promise(async (resolve) => {
      const parkingId = this.auth.employee.parkingId ? this.auth.employee.parkingId : 0;
      const companyId = this.auth.employee.companyId ? this.auth.employee.companyId : 0;
      if (parkingId > 0) {
        resolve(await this.getByParkingId(parkingId));
      } else {
        resolve(await this.getByCompanyId(0));
      }
    });
  }

  getByCompanyId(id: number): Promise<ParkingProduct[]> {
    return new Promise((resolve, reject) => {
      if (id > 0) {
        this.onGet(`/parkingProduct/companyId/${id}`)
          .subscribe(
            (requested) => resolve(requested['result']),
            (e) => reject(e.error)
          );
      } else {
        resolve();
      }
    });
  }

  getByParkingId(id: number): Promise<ParkingProduct[]> {
    return new Promise((resolve, reject) => {
      if (id > 0) {
        this.onGet(`/parkingProduct/parkingId/${id}`)
          .subscribe(
            (requested) => resolve(requested['result']),
            (e) => reject(e.error)
          );
      } else {
        resolve();
      }
    });
  }

  getById(id: number): Promise<ParkingProduct> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parkingProduct/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

}
