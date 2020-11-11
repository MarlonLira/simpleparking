import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SchedulingProduct from 'app/models/scheduling-product.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulingProductService extends BaseService<SchedulingProduct> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  toList(): Promise<SchedulingProduct[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/schedulingProducts/companyId/${this.auth.employee.companyId}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  getByParkingProductId(id: number): Promise<SchedulingProduct[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/schedulingProducts/parkingProductId/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  getBySchedulingId(id: number): Promise<SchedulingProduct[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/schedulingProducts/schedulingId/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

}
