import { Injectable } from "@angular/core";
import { Headers, Http, Response, URLSearchParams } from "@angular/http";

import { Tenant } from "../models/tenant";
import { SimpleResult } from "../models/simpleresult";

import { Observable } from "rxjs/Observable";

import "rxjs/Rx";

@Injectable()
export class TenantService {

  private url: string = "http://172.28.88.12:8088/cosmos-ccm/dbstandard/Tenant";
  tenants = [];
  _headers: Headers;

  constructor(private http: Http) {
    this._headers = new Headers({ "Content-Type": "application/json" });
    // const responses$: Observable<Response> = http.get(this.url); ==> Response

    const responses$: Observable<Response> = http.get(this.url)
      .map((res: Response) => res.json());

    responses$.subscribe(
      // res => console.log(res),
      tenants => console.log(tenants),
      () => { },
      () => console.log("Completed!")
    );

    // this.loadTenants();
  }

  loadTenants(search = ""): Observable<Tenant[]> {
    return this.http.get(this.url).map(res => res.json());

    // return this.http.get(this.url).map((res: Response) => res.json());

    // return this.http.get(this.url)
    //   .map((res: Response) => res.json())
    //   .subscribe(
    //   tenants => this.tenants = tenants,
    //   err => console.error(err)
    //   );
  }


  loadMessagesViewCountORG(): Observable<SimpleResult[]> {
    const url: string = "http://172.28.88.12:8088/cosmos-ccm/dbstoredprocedure/getMessagesViewCount";
    return this.http
      .get(url)
      //.map((res: Response) => res.json())
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  //loadMessagesViewCount(): Observable<SimpleResult[]> {
  loadMessagesViewCount(): Observable<SimpleResult> {    
    const url: string = "http://172.28.88.12:8088/cosmos-ccm/dbstoredprocedure/getMessagesViewCount";
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }



  // http://172.28.88.12:8088/cosmos-ccm/dbstoredprocedure/getMessagesViewCount
  getMessagesViewCount(): Observable<SimpleResult[]> {
    //  const search: URLSearchParams = new URLSearchParams();
    //  search.set("param1", aParam.toString());
    // ${this.storedProcedureUrl}/[GetMessageProperties]?${search.toString()}
    return this.http.get("http://172.28.88.12:8088/cosmos-ccm/dbstoredprocedure/getMessagesViewCount")
      .debug(res => res.json()[0])
      .debug(res => res.json())
      .map(res => res.json()[0])
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }





  loadTenants001(search = ""): Observable<Tenant[]> {
    console.log("searching for ${search}");
    let params: URLSearchParams = new URLSearchParams();
    params.set("search", search);

    // return this.http.get("/lessons", {search:params}).map(res => res.json());
    return this.http.get(this.url).map((res: Response) => res.json());
  }

  save(aTenant: Tenant) {
    aTenant.ID = undefined;
    aTenant.ParentID = undefined;
    aTenant.Active = true;
    aTenant.CountryCodeID = 150;

    // return this.http.post(this.url, JSON.stringify(aTenant), { headers: this._headers });
    //const network$ = this.http.post(this.url, JSON.stringify(aTenant), { headers: this._headers });

    const network$ = this.http.post(this.url, JSON.stringify(aTenant), { headers: this._headers })
      .publishLast()
      .refCount();

    // .cache();

    network$.subscribe(
      () => console.log("HTTP Post"),
      err => console.error(err)
    );
    return network$;
  }

  delete(aTenant: Tenant) {
    // let url = "${this._tenantUrl}?id=${aTenant.ID}";
    const search: URLSearchParams = new URLSearchParams();
    search.set("id", aTenant.ID.toString());

    const url = "${this.url}?" + search.toString();
    return this.http.delete(url, this._headers);
  }




  // Update existing Tenant
  // private put(aTenant: Tenant): Promise<SimpleResult> {
  //   return this._http
  //     .put(this._tenantUrl, JSON.stringify(aTenant), { headers: this._headers })
  //     .toPromise()
  //     //.then(() => aTenant)
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  // // Add new Tenant
  // private post(aTenant: Tenant): Promise<SimpleResult> {
  //   console.log("${this._tenantUrl}/${JSON.stringify(aTenant)}${JSON.stringify(this._headers)}");
  //   //http://172.28.88.12:8088/cosmos-ccm/dbstandard/Tenant/{"ParentID":null,"Name":"Zus00001","CustomerNumber":"RefSuz","CountryCodeID":74,"Active":true}{"Content-Type":["application/json"]}
  //   return this._http
  //     .post(this._tenantUrl, JSON.stringify(aTenant), { headers: this._headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  // .catch(this.handleError);
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : "Server error";
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}
