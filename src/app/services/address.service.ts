import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**Local */
import { Address } from './../models/address';
@Injectable()
export class AddressService {

  constructor(private _http: Http) { }

  getAdressessAll() {
    return this._http.get('../resources/data/address-large.json')
      .toPromise()
      .then(res => <Address[]>res.json().data)
      .then(data => {
        return data;
      });
  }

}
