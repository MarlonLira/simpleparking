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

  ToList(): Promise<Employee[]> {
    return new Promise((resolve) => {
      this.onGet('/employees/companyId/1')
        .subscribe(requested => {
          resolve(requested['result']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/employee', values)
        .subscribe(requested => {
          resolve(requested)
        });
    });
  }
}
