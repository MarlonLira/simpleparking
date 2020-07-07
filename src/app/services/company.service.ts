import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Company from '../models/company.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<Company> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/company', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/company/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/company', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetByRegistryCode(registryCode: string): Promise<Company[]> {
    return new Promise((resolve) => {
      this.onGet(`/company/registryCode/${registryCode}`)
        .subscribe((requested: Company[]) => {
          resolve(requested);
        });
    });
  }

  GetById(id: number): Promise<Company> {
    return new Promise((resolve) => {
      this.onGet(`/company/userId/${id}`)
        .subscribe((requested: Company) => {
          resolve(requested);
        });
    });
  }
}
