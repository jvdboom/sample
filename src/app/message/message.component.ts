import { Component, OnInit } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

import { LazyLoadEvent } from "primeng/primeng";

import { Observable } from "rxjs/Observable";

import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { SimpleResult } from '../models/simpleresult';


import 'rxjs/Rx';


@Component({
  selector: 'dev-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private cMessages: Message[];
  private cMessages$: Observable<Message[]>;
  private cMessagesTimed$: Observable<Message[]>;
  private cMessagesTimed: Message[];
  private messageUrl = "http://172.28.88.12:8088/cosmos-ccm/dbstandard/message";
  private loading: boolean;

  private cTotal: number;
  private cLimit: number = 10;
  private out: any;
  results$: Observable<any>;

  items: Observable<Array<string>>;
  itemsOld: Observable<Array<string>>;

  term = new FormControl();


  constructor(private _messageService: MessageService, private http: Http) {
    _messageService.getMessageCount()
      .then(res => {
        if (res.Key === "Count") {
          this.cTotal = +res.Value;
        } else {
          this.cTotal = 0;
        }
      });
  }

  ngOnInit() {
    // this._messageService.getMessageCount()
    //   .then(res => {
    //     if (res.Key === "Count") {
    //       this.cTotal = +res.Value;
    //     } else {
    //       this.cTotal = 0;
    //     }
    //   });
    // this.items = this.term.valueChanges
    //   .debounceTime(400)
    //   .distinctUntilChanged()
    //   .switchMap(term => this.messageService.search(term));


    // this.messageService.loadGetMessages(20, 50)
    //   .subscribe(res => {
    //     this.cMessages = res;
    //   });
  }


  loadData(event: LazyLoadEvent): void {
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort in single sort mode
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    // multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    // filters: Filters object having field as key and filter value, filter matchMode as value
    // this.cars = //do a request to a remote datasource using a service and return the cars that match the lazy load criteria

    const offset: number = event.first;
    const rowslimit: number = event.rows;

    this._messageService.loadGetMessages(offset, rowslimit)
      .subscribe(res => {
        this.cMessages = [];
        this.cMessages = res;
      });
  }

  loadTenantData(event: LazyLoadEvent): void {
    // setTimeout(() => {
    //   if (this.pTennantsSource) {
    //     this.pTennants = this.pTennantsSource.slice(event.first, (event.first + event.rows));
    //   }
    // }, 250);
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort in single sort mode
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    // multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    // filters: Filters object having field as key and filter value, filter matchMode as value
    // this.cars = //do a request to a remote datasource using a service and return the cars that match the lazy load criteria
  }

  searchOLD(term) {
    this._messageService.searchOLD(term).then(items => this.itemsOld = items);
  }


  // this.messageService.getMessageCountCount()
  //   .then(simpleResult => {

  //     if (simpleResult.Key === "Count") {
  //       console.log(`simpleResult een ${simpleResult}`, simpleResult);
  //       this.total = +simpleResult.Value;
  //     } else {
  //       console.log(`simpleResult twee: ${simpleResult}`, simpleResult);
  //     }
  //   });
  // this.out = this.getAllResults();

  // this.loading = true;
  // this.cMessagesTimed = [];

  // this.results$ = this.http
  //   .get(this.messageUrl)
  //   .map(res => res.json())
  //   .catch((error: any) => Observable.throw(error.json().error || "Server error"))
  //   .finally(() => this.loading = false);

  // this.results$
  //   .subscribe((res: Message) => {
  //     this.cMessagesTimed = res;
  //   })



  // this.cMessagesTimed$ = messageService
  //   .loadMessages()
  //   .timeInterval();

  // messageService.loadMessages().first()
  //   .subscribe(mess => {
  //     this.cMessages = mess;
  //   });


  // const source = Observable.timer(0, 1000)
  //   .timeInterval()
  //   .map(function (x) { return x.value + ':' + x.interval; })
  //   .take(10);

  // const subscription = source.subscribe(
  //   function (x) { console.log('Next: ' + x); },
  //   function (err) { console.log('Error: ' + err); },
  //   function () { console.log('Completed'); });


  getAllResults(startIdx = 0) {
    return this.http.get(this.messageUrl)
      .concatMap(data => {
        if (data) {
          return this.getAllResults()
            .map(resultsToJoin => data);
        } else {
          return Observable.of(data);
        }
      });
  }

  getMessages(): Observable<Message[]> {
    return this.http.get(this.messageUrl)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  getData(idx: number) {
    const data = [{
      next: 1,
      results: [1, 2]
    }, {
      next: 2,
      results: [3, 4]
    }, {
      next: null,
      results: [5, 6]
    }];
    return Observable.of(data[idx]);
  }


  ngOnDestroy() {
    // Speak now or forever hold your peace
  }

  ngDoCheck() {
    // Custom change detection
  }

  ngOnChanges(changes) {
    // Called right after our bindings have been checked but only
    // if one of our bindings has changed.
    //
    // changes is an object of the format:
    // {
    //   'prop': PropertyUpdate
    // }
  }

  ngAfterContentInit() {
    // Component content has been initialized
  }

  ngAfterContentChecked() {
    // Component content has been Checked
  }

  ngAfterViewInit() {
    // Component views are initialized
  }

  ngAfterViewChecked() {
    // Component views have been checked
  }

}
