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

  getByParkingId(parkingId): Promise<ParkingProduct[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parkingProduct/parkingId/${parkingId}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
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
