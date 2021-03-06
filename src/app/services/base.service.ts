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

  protected getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.auth ? this.auth.token : ''}`
    });
  }

  protected getAuth = (): Auth =>
    Utils.isValid(this.storage.getItem('_sp_auth'))
      ? <Auth>JSON.parse(Crypto.decrypt(this.storage.getItem('_sp_auth')))
      : undefined;

  protected onPost = (endpoint: string, body: T) => this.http.post(`${Consts.API_URL}${endpoint}`, body, { headers: this.getHeader() });
  protected onGet = (endpoint: string) => this.http.get(`${Consts.API_URL}${endpoint}`, { headers: this.getHeader() });
  protected onPut = (endpoint: string, body: T) => this.http.put(`${Consts.API_URL}${endpoint}`, body, { headers: this.getHeader() });
  protected onDelete = (endpoint: string) => this.http.delete(`${Consts.API_URL}${endpoint}`, { headers: this.getHeader() });
}
