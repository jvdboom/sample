import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { TenantService } from "../services/tenant.service";
import { Tenant } from "../models/tenant";
import { SimpleResult } from "../models/simpleresult";

import { MessageService } from '../services/message.service';
import { EarthquakeService } from '../services/earthquake.service';


import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Rx";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/combineLatest";



@Component({
  selector: "dev-tenant",
  templateUrl: "./tenant.component.html",
  styleUrls: ["./tenant.component.css"]
})
export class TenantComponent implements OnInit, AfterViewInit, OnDestroy {


  // tenants: Tenant[] = []; 
  /** -> */
  tenants$: Observable<Tenant[]>;
  tenAB$: Observable<Tenant[]>;

  simpleResult$: Observable<SimpleResult[]>;
  loadSimpleResult$: Observable<SimpleResult[]>;

  atenants: Tenant[];
  title: string;

  sub: Subscription;
  recent: any[];

  RES: SimpleResult[];
  RES2: SimpleResult[];
  total: number = 0;
  error: any;

  constructor(private tenantService: TenantService,
    private messageService: MessageService, private earthquakeService: EarthquakeService) {
    this.title = "Earthquakes past Week 4.5+ Mag";
    this.getEarthquakes();
    // const tenants$ = tenantService.loadTenants();
    // tenants$.subscribe(
    //   tenants => this.tenants = tenants
    // );

    this.tenants$ = tenantService.loadTenants();
    //this.loadSimpleResult$ = tenantService.loadMessagesViewCount();
    tenantService.loadMessagesViewCount()
      .map(res => {
        console.log(`@res`, res);
      });

    // debugger;
    this.simpleResult$ = tenantService.getMessagesViewCount();
    const firstTenant$ = this.tenants$.map(tenants => tenants[0]);

    firstTenant$.subscribe(
      tenant => console.log(`tenant: ${tenant.Name}`)
    );


    const atenants$ = tenantService.loadTenants();
    atenants$.subscribe(
      tenants => this.atenants = tenants
    );

    const click$ = Observable.fromEvent(document, "click");
    click$.subscribe(
      () => console.log(`clicked...`)
    );

    const mouse$ = Observable.fromEvent(document, "mousemove")
      .filter((move: MouseEvent) => move.clientY >= 200);

    mouse$.subscribe(
      // (move: MouseEvent) => console.log(move)
    );

    const combined$ = Observable.combineLatest(mouse$, click$);

    combined$.subscribe(
      // combined => console.log(combined[0])
    );


    this.sub = this.tenants$.subscribe(
      tenants => this.atenants = tenants
    );

  }



  getCount() {
    this.tenantService.loadMessagesViewCount()
      .subscribe(
      // res => this.RES = res,
      error => this.error = error
      );
  }


  ngOnInit() {
    // this.getCount();
    this.tenantService.loadMessagesViewCount()
      .subscribe(
      simple => {
        debugger;
        if (simple[0].Key === "Count") {
          this.total = +simple[0].Value;
          console.log("@@@@@@@@@@@" + JSON.stringify(this.RES2));
        } else {
          this.total = 0;
        }

      });
    //   .map(res => {
    //     //this.loadSimpleResult$ = res;
    //   });
  }

  getEarthquakes() {
    this.earthquakeService.getRecentEarthquakes()
      .subscribe(
      recent => this.recent = recent);
  }



  ngAfterViewInit() {
    const input: any = document.getElementById("txtSearch");
    console.log(`input: ${input}`);

    const search$ = Observable.fromEvent(input, "keyup")
      .do(() => console.log(input.value))
      .switchMap(() => this.tenantService.loadTenants(input.value));

    search$.subscribe(
      tenants => this.atenants = tenants
    );
  }

  ngOnDestroy() {

  }

  saveTenant(aTenantName: string): void {
    const tenant: Tenant = new Tenant();
    tenant.Name = aTenantName;
    tenant.CustomerNumber = aTenantName + Math.random().toString(36).substr(2, 5);
    this.tenantService.save(tenant)
      .subscribe(
      () => {
        this.tenants$ = this.tenantService.loadTenants();
        console.log(`tenant Saved & Reload!!`);
      },
      err => console.error(err),
      () => console.log(`saving completed...`)
      );
  }

  private mesCount: number = 0;
  countMessage() {
    this.messageService.getMessageCount()
      .then((res: SimpleResult) => {
        console.log(`MessageService: ${res}`, res);
      });
  }

  consecutiveReqs() {

    const deleteLast$ = this.tenantService.delete(this.atenants[(this.atenants.length - 1)]);
    const deleteSecondLast$ = this.tenantService.delete(this.atenants[(this.atenants.length - 2)]);
    const reload$ = this.tenantService.loadTenants().publishLast().refCount();


    const combined$ = Observable.concat(deleteLast$, deleteSecondLast$, reload$);
    combined$.subscribe(
      () => { },
      () => { },
      () => {
        console.log(`Reload finished...`);
        this.tenants$ = reload$;
      }
    );
  }

  parallelRequest() {
    const tenA$ = this.tenantService.loadTenants();
    const tenB$ = this.tenantService.loadTenants();

    const tenAB$ = Observable.combineLatest(
      tenA$,
      tenB$
    );

    tenAB$.subscribe(
      (result) => {
        console.log(`result: ${result}`);
      },
      () => { },
      () => { console.log(`Completed Combine...`) },
    );


  }

  requestChain() {
    const tenant1: Tenant = new Tenant();
    tenant1.Name = "Een";
    tenant1.CustomerNumber = "Een" + Math.random().toString(36).substr(2, 5);

    const tenant2: Tenant = new Tenant();
    tenant2.Name = "Twee";
    tenant2.CustomerNumber = "Twee" + Math.random().toString(36).substr(2, 5);


    // const chain$ = this.tenantService.save(tenant1)
    //   .switchMap(result => this.tenantService.save(tenant2))
    //   .switchMap(() => this.tenantService.loadTenants())
    //   .publishLast()
    //   .refCount();

    // this.tenants$ = chain$;

    // chain$.subscribe(
    //   (value) => console.log(value),
    //   (err) => console.error(err),
    //   () => console.log(`Completed...`),
    // );


    this.tenants$ = this.tenantService.save(tenant1)
      .switchMap(result => this.tenantService.save(tenant2))
      .switchMap(() => this.tenantService.loadTenants())
      .publishLast()
      .refCount();

    this.tenants$.subscribe(
      (value) => console.log(value),
      (err) => console.error(err),
      () => console.log(`Completed...`),
    );
  }

  reload() {

    this.tenants$ = this.tenantService.loadTenants()
      .retryWhen(errors => errors.delay(5000));

  }

  cancel() {

    this.sub.unsubscribe();

  }

  searchTenant(aSearch: string) {
    console.log(`${aSearch}`);
  }

}
