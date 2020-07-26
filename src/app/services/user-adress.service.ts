import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UserAdress from '../models/user-adress.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdressService extends BaseService<UserAdress> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/userAdress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/userAdress/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/userAdress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetByUserId(userId: number): Promise<UserAdress[]> {
    return new Promise((resolve) => {
      this.onGet(`/userAdress/userId/${userId}`)
        .subscribe((requested: UserAdress[]) => {
          resolve(requested);
        });
    });
  }
}
