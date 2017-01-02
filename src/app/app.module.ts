import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/** PrimeNG */
import { MenubarModule, MenuItem } from 'primeng/primeng';
import { ButtonModule, DropdownModule, DialogModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';


/** Imports of RXJS Extensions */
import './rxjs-extensions';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DatabaseInfoComponent } from './database-info/database-info.component';
import { CarComponent } from './car/car.component';

import { SqlinfoService } from './services/sqlinfo.service';
import { CarService } from './services/car.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'dev-root', pathMatch: 'full'
  },
  {
    path: 'databaseinfo', component: DatabaseInfoComponent
  },
  {
    path: 'car', component: CarComponent
  }
  // {
  //     path: 'httprequest', component: HttprequestComponent
  // },
  // {
  //     path: 'posts', component: PostsComponent
  // },
  // {
  //     path: 'car', component: CarComponent
  // },
  // {
  //     path: 'store', component: StoreComponent
  // },
  // {
  //     path: 'user-profile', component: UserProfileComponent
  // },
  // {
  //     path: 'address', component: AddressComponent
  // },
];

@NgModule({
  declarations: [
    AppComponent,
    DatabaseInfoComponent,
    CarComponent
  ],
  imports: [
    BrowserModule, ButtonModule,
    DataTableModule, DropdownModule, DialogModule,
    FormsModule,
    HttpModule,
    MenubarModule,
    PanelModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CarService, SqlinfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
