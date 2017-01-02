import { Component, OnInit } from '@angular/core';

import { CarService } from './../services/car.service';
import { Car } from './../models/car';

@Component({
  // moduleId: module.id,
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[];
  cols: any[];
  selectedCar: Car;
  dialogVisible: boolean;

  constructor(private _carService: CarService) { }

  ngOnInit() {
    this.cars = [];
    this.cars.push({ vin: '01', year: '1234', brand: '555', color: 'red', price: '10' });
    this.cars.push({ vin: '02', year: '1234', brand: '555', color: 'red', price: '10' });
    this.cars.push({ vin: '03', year: '1234', brand: '555', color: 'red', price: '10' });
    this.cars.push({ vin: '04', year: '1234', brand: '555', color: 'red', price: '10' });
    this.cars.push({ vin: '05', year: '1234', brand: '555', color: 'red', price: '10' });
    this.cars.push({ vin: '06', year: '1234', brand: '555', color: 'red', price: '10' });
    this.cars.push({ vin: '07', year: '1234', brand: '555', color: 'red', price: '10' });
    this.cars.push({ vin: '08', year: '1234', brand: '555', color: 'red', price: '10' });
    this.cars.push({ vin: '09', year: '1234', brand: '555', color: 'red', price: '10' });
    this.cars.push({ vin: '10', year: '1234', brand: '555', color: 'red', price: '10' });

    this._carService.getCarsAll().then(cars => this.cars = cars);
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
  }

  handleRowSelect(event) {
    console.log(event);
  }

  showCar(car: Car) {
        this.selectedCar = car;
        this.dialogVisible = true;
    }
}
