import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

/** PrimeNG */
import { MenubarModule, MenuItem } from 'primeng/primeng';
import { ButtonModule, DropdownModule, DialogModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { AccordionModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

/** Imports of RXJS Extensions */
import './rxjs-extensions';
import { RouterModule, Routes } from '@angular/router';

/** Local */
import { AppComponent } from './app.component';
import { DatabaseInfoComponent } from './database-info/database-info.component';
import { CarComponent } from './car/car.component';

import { AddressService } from './services/address.service';
import { SqlinfoService } from './services/sqlinfo.service';
import { CarService } from './services/car.service';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressListComponent } from './address-list/address-list.component';
import { MissionControlComponent } from './mission-control/mission-control.component';
import { AstronautComponent } from './astronaut/astronaut.component';

import { MissionService } from './services/mission.service';
import { AddressControlService } from './services/address-control.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'dev-root', pathMatch: 'full'
  },
  {
    path: 'databaseinfo', component: DatabaseInfoComponent
  },
  {
    path: 'car', component: CarComponent
  },
  {
    path: 'addressform', component: AddressFormComponent
  },
  {
    path: 'addresslist', component: AddressListComponent
  },
  {
    path: 'missioncontrol', component: MissionControlComponent
  },
  {
    path: 'astronaut', component: AstronautComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DatabaseInfoComponent,
    CarComponent,
    AddressFormComponent,
    AddressListComponent,
    MissionControlComponent,
    AstronautComponent
  ],
  imports: [
    AccordionModule,
    BrowserModule, ButtonModule,
    DataTableModule, DropdownModule, DialogModule,
    FormsModule,
    GrowlModule,
    HttpModule,
    MenubarModule,
    PanelModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CarService, SqlinfoService,
    AddressService, MissionService, AddressControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
