import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**Local */
import { Car } from './../models/car';

@Injectable()
export class CarService {

  private _mockFile: string = 'app/resources/data/cars-small.json';
  constructor(private _http: Http) { }

  getCarsAll() {
    return this._http.get(this._mockFile)
      .toPromise()
      .then(res => <Car[]>res.json().data)
      .then(data => {
        return data;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}
