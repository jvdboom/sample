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
      }
    ];

    let items: MenuItem[] = [];
    items.push({ label: 'Address List', icon: 'fa-bolt', routerLink: ['addresslist'] });
    items.push({ label: 'Address Form', icon: 'fa-bolt', routerLink: ['addressform'] });
    this._items.push({ label: 'Address', icon: 'fa-bug', items });

    items = [];
    items.push({ label: 'Car', icon: 'fa-bolt', routerLink: ['car'] });
    this._items.push({ label: 'Example', icon: 'fa-bug', items });

    items = [];
    items.push({ label: 'Mission Control', icon: 'fa-bolt', routerLink: ['missioncontrol'] });
    items.push({ label: 'Astronaut', icon: 'fa-bolt', routerLink: ['astronaut'] });
    this._items.push({ label: 'Mission', icon: 'fa-bug', items });


    items = [];
    items.push({ label: 'DocumentType List', icon: 'fa-bolt', routerLink: ['documenttypelist'] });
    items.push({ label: 'DocumentType Form', icon: 'fa-bolt', routerLink: ['documenttypeform'] });
    this._items.push({ label: 'CCM Demo', icon: 'fa-bug', items });
  }
}
