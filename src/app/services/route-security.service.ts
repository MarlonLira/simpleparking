import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RouteSecurity from 'app/models/route-security.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RouteSecurityService extends BaseService<RouteSecurity> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  save(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/routeSecurity', values)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onDelete(`/routeSecurity/${id}`)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  update(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPut('/routeSecurity', values)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  toList(): Promise<RouteSecurity[]> {
    return new Promise((resolve, reject) => {
      this.onGet('/routeSecurity')
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  getByCompanyId(): Promise<RouteSecurity[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/routeSecurity/companyId/${this.auth.company.id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

}
