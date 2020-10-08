import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from 'app/commons/core/utils';
import GenericAddress from 'app/models/generic-address.model';
import Consts from '../consts';

export interface OSVContent {
  display_name: string;
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root'
})
export class GenericAddressService {

  constructor(public http: HttpClient) { }

  public getByZipCode(zipCode: string): Promise<GenericAddress> {
    return new Promise((resolve, reject) => {
      this.onGet(Consts.VIACEP_API_URL, `/${this.formatterZipCode(zipCode)}`, '/json/')
        .then((requested: any) => {
          let address = new GenericAddress(requested);
          this.onGet(Consts.OSV_API_URL, `?country=Brazil&postalcode=${zipCode}`, '&polygon_geojson=1&format=jsonv2')
            .then((requested: OSVContent[]) => {
              if (Utils.isValid(requested[0])) {
                address.latitude = Number(requested[0].lat);
                address.longitude = Number(requested[0].lon);
              }
              resolve(address);
            });
        }).catch((e) => reject(e.error));
    });
  }

  public formatterZipCode = (zipCode: string) => Utils.isValid(zipCode) ? zipCode.replace('-', '') : '';
  private onGet = (apiURl: string, endpoint: string, parameters: string) => this.http.get(`${apiURl}${endpoint}${parameters}`).toPromise();
}
