import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CompanyAdress from '../models/companyAdress.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyAdressService extends BaseService<CompanyAdress> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/companyAdress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/companyAdress/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/companyAdress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetByCompanyId(companyId: number): Promise<CompanyAdress[]> {
    return new Promise((resolve) => {
      this.onGet(`/companyAdress/companyId/${companyId}`)
        .subscribe((requested: CompanyAdress[]) => {
          resolve(requested);
        });
    });
  }
}
