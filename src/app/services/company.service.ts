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

  save(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/company', values)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onDelete(`/company/${id}`)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  update(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPut('/company', values)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  getByRegistryCode(registryCode: string): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/company/registryCode/${registryCode}`)
        .subscribe(
          (requested: Company[]) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  getById(id: number): Promise<Company> {
    return new Promise((resolve, reject) => {
      this.onGet(`/company/userId/${id}`)
        .subscribe(
          (requested: Company) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }
}
