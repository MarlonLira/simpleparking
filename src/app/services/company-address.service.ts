import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CompanyAddress from '../models/company-address.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyAddressService extends BaseService<CompanyAddress> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/companyAddress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/companyAddress/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/companyAddress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetByCompanyId(companyId: number): Promise<CompanyAddress[]> {
    return new Promise((resolve) => {
      this.onGet(`/companyAddress/companyId/${companyId}`)
        .subscribe((requested: CompanyAddress[]) => {
          resolve(requested);
        });
    });
  }
}
