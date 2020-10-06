import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from 'app/commons/core/utils';
import GenericAddress from 'app/models/generic-address.model';
import { utils } from 'protractor';
import Consts from '../consts';

@Injectable({
  providedIn: 'root'
})
export class GenericAddressService {

  constructor(public http: HttpClient) { }

  public getByZipCode(zipCode: string): Promise<GenericAddress> {
    return new Promise((resolve, reject) => {
      this.onGet(`/${this.formatterZipCode(zipCode)}`)
        .subscribe(
          (requested: any) => resolve(new GenericAddress(requested)),
          (e) => reject(e.error)
        );
    });
  }

  public formatterZipCode = (zipCode: string) => Utils.isValid(zipCode) ? zipCode.replace('-', '') : '';
  private onGet = (endpoint: string) => this.http.get(`${Consts.VIACEP_API_URL}${endpoint}/json/`);
}
