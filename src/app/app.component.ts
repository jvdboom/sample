import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** PrimeNG */
import { MenubarModule, MenuItem } from 'primeng/primeng';

import 'rxjs/add/operator/toPromise';
// import "rxjs/Rx";

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
        label: 'DataBase',
        icon: 'fa-database',
        items: [
          { label: 'Table', icon: 'fa-database', routerLink: ['databaseinfo'] },
          { label: 'StoredProcedure', icon: 'fa-database', routerLink: ['databasestoredprocedure'] }
        ]
      }
    ];

    /** EXAMPLE: Two examples of menustructuur */
    let items: MenuItem[] = [];
    items.push({ label: 'Property', icon: 'fa-bolt', routerLink: ['property'] });
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
    items.push({ label: 'DT Form List', icon: 'fa-bolt', routerLink: ['documenttypeformlist'] });
    items.push({ label: 'DocumentType List', icon: 'fa-bolt', routerLink: ['documenttypelist'] });
    items.push({ label: 'DocumentType Form', icon: 'fa-bolt', routerLink: ['documenttypeform'] });
    this._items.push({ label: 'CCM Demo', icon: 'fa-bug', items });

    items = [];
    items.push({ label: 'tenant', icon: 'fa-bolt', routerLink: ['tenant'] });
    this._items.push({ label: 'Tenant Demo', icon: 'fa-bug', items });

    items = [];
    items.push({ label: 'message', icon: 'fa-bolt', routerLink: ['message'] });
    this._items.push({ label: 'Message Demo', icon: 'fa-bug', items });

    items = [];
    items.push({ label: 'PostList', icon: 'fa-bolt', routerLink: ['postlist'] });
    this._items.push({ label: 'PostList Demo', icon: 'fa-bug', items });

  }
}
