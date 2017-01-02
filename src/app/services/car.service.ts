import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Car } from './../models/car';

@Injectable()
export class CarService {

  constructor(private _http: Http) { }

  getCarsAll() {

    return this._http.get('../resources/data/cars-large.json')
      .toPromise()
      .then(res => <Car[]>res.json().data)
      .then(data => { return data; });
  }

}
