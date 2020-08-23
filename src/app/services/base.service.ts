import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import Consts from '../consts';
import Auth from 'app/models/auth.model';
import { Utils } from 'app/commons/core/utils';
import { Crypto } from 'app/commons/core/crypto';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  protected auth: Auth;
  private storage: Storage;

  constructor(
    public http: HttpClient,
  ) {
    this.storage = sessionStorage;
    this.auth = this.getAuth();
  }

  protected GetHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.auth ? this.auth.token : ''}`
    });
  }

  private getAuth = (): Auth =>
    Utils.isValid(this.storage.getItem('_sp_auth'))
      ? <Auth>JSON.parse(Crypto.Decrypt(this.storage.getItem('_sp_auth')))
      : undefined;

  protected onPost = (endpoint: string, body: T) => this.http.post(`${Consts.API_URL}${endpoint}`, body, { headers: this.GetHeader() });
  protected onGet = (endpoint: string) => this.http.get(`${Consts.API_URL}${endpoint}`, { headers: this.GetHeader() });
  protected onPut = (endpoint: string, body: T) => this.http.put(`${Consts.API_URL}${endpoint}`, body, { headers: this.GetHeader() });
  protected onDelete = (endpoint: string) => this.http.delete(`${Consts.API_URL}${endpoint}`, { headers: this.GetHeader() });
}
