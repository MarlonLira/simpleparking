import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UserAddress from '../models/user-address.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService extends BaseService<UserAddress> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/userAddress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/userAddress/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/userAddress', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetByUserId(userId: number): Promise<UserAddress[]> {
    return new Promise((resolve) => {
      this.onGet(`/userAddress/userId/${userId}`)
        .subscribe((requested: UserAddress[]) => {
          resolve(requested);
        });
    });
  }
}
