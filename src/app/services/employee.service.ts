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
      this.onGet(`/employees/companyId/${this.auth.company.id}`)
        .subscribe(requested => {
          resolve(requested['result']);
        });
    });
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/employee', values)
        .subscribe(requested => {
          resolve(requested['message']);
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
