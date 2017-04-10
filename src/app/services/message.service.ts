import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Jsonp } from "@angular/http";

import { Message } from '../models/message';


import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SimpleResult } from '../models/simpleresult';


@Injectable()
export class MessageService {
  private mockFile: string = "app/resources/data/message.json";
  private messageUrl: string = "http://172.28.88.12:8088/cosmos-ccm/dbstandard/message";
  private _dbstoredProcedure = "http://172.28.88.12:8088/cosmos-ccm/dbstoredprocedure";

  private headers: Headers;


  private totalMessages: number;

  constructor(private _http: Http, private jsonp: Jsonp) {
    this.headers = new Headers({ "Content-Type": "application/json" });
    // this.getMessageCount()
    //   .then(res => {
    //     if (res.Key === "Count") {
    //       this.totalMessages = +res.Value;
    //     }
    //   })
    //   .catch(this.handleError);
  }

  // /**
  //  * name
  //  */
  // public getTotalMessages(): number {
  //   return this.totalMessages;
  // }

  loadMessagesMock(): Observable<Message[]> {
    return this._http.get(this.mockFile)
      .map(res => res.json)
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  loadMessages(): Observable<Message[]> {
    return this._http.get(this.messageUrl)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }


  loadGetMessages(aOffset: number = 0, aLimit: number = 10): Observable<Message[]> {
    const search: URLSearchParams = new URLSearchParams();
    search.set("param1", aOffset.toString());
    search.set("param2", aLimit.toString());

    const url: string = `${this._dbstoredProcedure}/getmessages?` + search.toString();
    console.log(`url=> ${url}`);

    return this._http.get(url)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }



  private handleError(error: any) {
    console.log(`ERROR: ${JSON.stringify(error)}`);
    return Promise.reject(error.message || error);
  }

  interval(): void {
    // const intervalObs = this.http.get(this.messageUrl)
  }

  // var search: URLSearchParams = new URLSearchParams()
  // search.set("id", aTenant.ID.toString());
  // const url: string = `${this._tenantUrl}?` + search.toString();

  getMessageCount(): Promise<SimpleResult> {
    const url = this._dbstoredProcedure + "/getmessagecount";

    return this._http
      .get(url)
      .toPromise()
      .then(res => res.json()[0])
      .catch(this.handleError);
  }

  search(term: string) {
    const search = new URLSearchParams();
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    // http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK&action=opensearch&search=a&format=json
    return this.jsonp
      .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
      .map((response) => response.json()[1]);
  }

  searchOLD(term: string) {
    const search = new URLSearchParams();
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.jsonp
      .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
      .toPromise()
      .then((request) => request.json()[1]);
  }
}
