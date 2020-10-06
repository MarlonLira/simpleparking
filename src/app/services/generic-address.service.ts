import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GenericAddress from 'app/models/generic-address.model';
import Consts from '../consts';

@Injectable({
  providedIn: 'root'
})
export class GenericAddressService {

  constructor(public http: HttpClient) { }

  public getByZipCode(zipCode: number): Promise<GenericAddress> {
    return new Promise((resolve, reject) => {
      this.onGet(`/${zipCode}`)
        .subscribe(
          (requested) => resolve(new GenericAddress(requested)),
          (e) => reject(e.error)
        );
    });
  }

  private onGet = (endpoint: string) => this.http.get(`${Consts.VIACEP_API_URL}${endpoint}/json/`);
}
