import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

/**Local */
import { Address } from './../models/address';

@Injectable()
export class AddressService {

  private _headers: Headers;
  private _url: string = '';
  private _mockFile: string = 'app/resources/data/address-large.json';

  constructor(private _http: Http) { }

  getAdressessAll() {
    return this._http.get(this._mockFile)
      .toPromise()
      .then(res => <Address[]>res.json().data)
      .then(data => {
        return data;
      })
      .catch(this.handleError);
  }

  // Update existing Tenant
  private put(aAddress: Address): Promise<any> {
    return this._http
      .put(this._url, JSON.stringify(aAddress), { headers: this._headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Add new Tenant
  private post(aAddress: Address): Promise<any> {
    return this._http
      .post(this._url, JSON.stringify(aAddress), { headers: this._headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

}
