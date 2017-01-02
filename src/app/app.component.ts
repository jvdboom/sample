import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** PrimeNG */
import { MenubarModule, MenuItem } from 'primeng/primeng';

import 'rxjs/add/operator/toPromise';

@Component({
  // moduleId: module.id,
  selector: 'dev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _title = 'Developing';
  private _items: MenuItem[];

  constructor(private _router: Router) { }

  ngOnInit() {
    this._items = [
      {
        label: 'DataBaseInfo',
        icon: 'fa-info-circle',
        routerLink: ['databaseinfo']
      },
      {
        label: 'Car',
        icon: 'fa-info-circle',
        routerLink: ['car']
      }
    ];
  }
}
