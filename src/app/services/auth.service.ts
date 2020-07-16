import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import Auth from 'app/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<Auth> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  public signin(values: Auth): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/auth/employee/signin', values)
        .subscribe((requested) => {
          resolve(requested);
        },
          (error) => {
            reject(error);
          }
        );
    });
  }

  public signup(values: Auth): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/auth/employee/signup', values)
        .subscribe((requested) => {
          resolve(requested);
        },
          (error) => {
            console.log('aqui')
            reject(error);
          }
        );
    });
  }

  accountRecovery = (values) => this.onPost('/auth/employee/account-recovery', values).toPromise();

  public getAuthentication = (): Auth => this.auth;

  public verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const _auth = new Auth();
      _auth.token = token;
      this.onPost('/auth/token-validate', _auth)
        .subscribe((requested: any) => {
          resolve(requested);
        },
          (error) => {
            reject(error);
          }
        );
    });
  }

}
