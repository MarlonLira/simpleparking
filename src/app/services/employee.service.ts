import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Employee from '../models/employee.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService<Employee> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getByCompanyId(id: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/employees/companyId/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  getByParkingId(id: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/employees/parkingId/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  toList(): Promise<Employee[]> {
    return new Promise(async (resolve, reject) => {
      const parkingId = this.auth.employee.parkingId ? this.auth.employee.parkingId : 0;
      const companyId = this.auth.employee.companyId ? this.auth.employee.companyId : 0;
      if (parkingId > 0) {
        resolve(await this.getByParkingId(parkingId));
      } else {
        resolve(await this.getByCompanyId(companyId));
      }
    });
  }

  save(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/employee', values)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  update(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPut('/employee', values)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  getById(id: number): Promise<Employee> {
    return new Promise((resolve, reject) => {
      this.onGet(`/employee/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onDelete(`/employee/${id}`)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  getByRegistryCode(registryCode) {
    return new Promise((resolve, reject) => {
      this.onGet(`/employees/registryCode/${registryCode}`)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    })
  }
}
