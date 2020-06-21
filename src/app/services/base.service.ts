import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import Consts from '../consts';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  constructor(
    public http: HttpClient,
  ) { }

  protected GetHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    });
  }

  protected onPost = (endpoint: string, body: T) => this.http.post(`${Consts.API_URL}${endpoint}`, body, { headers: this.GetHeader() });
  protected onGet = (endpoint: string) => this.http.get(`${Consts.API_URL}${endpoint}`, { headers: this.GetHeader() });
  protected onPut = (endpoint: string, body: T) => this.http.post(`${Consts.API_URL}${endpoint}`, body, { headers: this.GetHeader() });
  protected onDelete = (endpoint: string) => this.http.post(`${Consts.API_URL}${endpoint}`, { headers: this.GetHeader() });
}
