import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { JsonpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";

/** PrimeNG */
import { MenubarModule, MenuItem } from "primeng/primeng";
import { ButtonModule, DropdownModule, DialogModule } from "primeng/primeng";
import { MegaMenuModule } from "primeng/primeng";
import { DataTableModule, SharedModule } from "primeng/primeng";
import { PanelModule } from "primeng/primeng";
import { AccordionModule } from "primeng/primeng";
import { GrowlModule } from "primeng/primeng";
import { MessagesModule } from "primeng/primeng";
// import { Message } from "primeng/primeng";

/** Imports of RXJS Extensions */
import "./rxjs-extensions";
import { RouterModule, Routes } from "@angular/router";

/** Local */
import { AppComponent } from "./app.component";
import { DatabaseInfoComponent } from "./database-info/database-info.component";
import { CarComponent } from "./car/car.component";

import { AddressService } from "./services/address.service";
import { CarService } from "./services/car.service";
import { DocumentTypeService } from "./services/document-type.service";
import { DocumentTypeControlService } from "./services/documenttype-control.service";

import { SqlinfoService } from "./services/sqlinfo.service";
import { TenantService } from "./services/tenant.service";
import { EarthquakeService } from "./services/earthquake.service";

import { AddressFormComponent } from "./address-form/address-form.component";
import { AddressListComponent } from "./address-list/address-list.component";
import { MissionControlComponent } from "./mission-control/mission-control.component";
import { AstronautComponent } from "./astronaut/astronaut.component";

import { MissionService } from "./services/mission.service";
import { AddressControlService } from "./services/address-control.service";
import { DocumentTypeFormComponent } from "./document-type-form/document-type-form.component";
import { DocumentTypeListComponent } from "./document-type-list/document-type-list.component";
import { DocumentTypeFormListComponent } from "./document-type-form-list/document-type-form-list.component";
import { DatabaseStoredProcedureComponent } from "./database-stored-procedure/database-stored-procedure.component";
import { PropertyComponent } from "./property/property.component";
import { TenantComponent } from "./tenant/tenant.component";
import { MessageComponent } from "./message/message.component";
import { MessageService } from "./services/message.service";
import { PostListComponent } from "./postlist/postlist.component";
import { RequestsviewComponent } from "./requestsview/requestsview.component";
// import { MessagegroupsviewComponent } from "./messagegroupsview/messagegroupsview.component";

const routes: Routes = [
  {
    path: "", redirectTo: "dev-root", pathMatch: "full"
  },
  {
    path: "databaseinfo", component: DatabaseInfoComponent
  },
  {
    path: "databasestoredprocedure", component: DatabaseStoredProcedureComponent
  },
  {
    path: "car", component: CarComponent
  },
  {
    path: "addressform", component: AddressFormComponent
  },
  {
    path: "addresslist", component: AddressListComponent
  },
  {
    path: "missioncontrol", component: MissionControlComponent
  },
  {
    path: "astronaut", component: AstronautComponent
  },
  {
    path: "documenttypeform", component: DocumentTypeFormComponent
  },
  {
    path: "documenttypelist", component: DocumentTypeListComponent
  },
  {
    path: "documenttypeformlist", component: DocumentTypeFormListComponent
  },
  {
    path: "property", component: PropertyComponent
  },
  {
    path: "tenant", component: TenantComponent
  },
  {
    path: "message", component: MessageComponent
  },
  {
    path: "postlist", component: PostListComponent
  }
];

import { Observable } from "rxjs/Observable";
const debug: boolean = true;

Observable.prototype.debug = function (aMessage: string) {
  return this.do(
    nextValue => {
      if (debug) {
        console.log(aMessage, nextValue);
      }
    },
    error => {
      if (debug) {
        console.error(aMessage, error);
      }
    },
    () => {
      if (debug) {
        console.log("Observable completed - ", aMessage);
      }
    }
  );
};

declare module "rxjs/Observable" {
  interface Observable<T> {
    debug: (...any) => Observable<T>;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DatabaseInfoComponent,
    CarComponent,
    AddressFormComponent,
    AddressListComponent,
    MissionControlComponent,
    AstronautComponent,
    DocumentTypeFormComponent,
    DocumentTypeListComponent,
    DocumentTypeFormListComponent,
    DatabaseStoredProcedureComponent,
    PropertyComponent,
    TenantComponent,
    MessageComponent,
    PostListComponent,
    RequestsviewComponent
    // MessagegroupsviewComponent
  ],
  imports: [
    AccordionModule,
    BrowserModule, ButtonModule,
    DataTableModule, DropdownModule, DialogModule,
    FormsModule,
    GrowlModule,
    HttpModule,
    JsonpModule,
    MenubarModule,
    MessagesModule,
    PanelModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CarService, DocumentTypeService, DocumentTypeControlService,
    SqlinfoService, TenantService, EarthquakeService,
    AddressService, MissionService, AddressControlService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
