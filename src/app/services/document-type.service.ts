import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from "@angular/http";
import { DocumentType } from '../models/documenttype';
import { SimpleResult } from '../models/simpleresult';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class DocumentTypeService {

  // "http://localhost:8088/cosmos-ccm/" 
  private _baseUrl = 'http://172.28.88.12:8088/cosmos-ccm/';
  private _documentTypeUrl: string = this._baseUrl + 'dbstandard/documenttype';
  private _headers: Headers;

  constructor(private _http: Http) {
    this._headers = new Headers({ 'Content-Type': 'application/json' });

  }


  getDocumentTypes(): Promise<DocumentType[]> {
    return this._http.get(this._documentTypeUrl)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  getDocumentTypes4MessageType(aMessageTypeID: number) {
    return this.getDocumentTypes()
      .then(documentTypes =>
        documentTypes.filter(documentType =>
          documentType.MessageTypeID === aMessageTypeID));
  }

  save(aDocumentType: DocumentType): Promise<SimpleResult> {
    if (aDocumentType.ID) {
      return this.put(aDocumentType);
    } else {
      return this.post(aDocumentType);
    }
  }

  delete(aDocumentType: DocumentType): Promise<SimpleResult> {
    const search = new URLSearchParams()
    search.set('id', aDocumentType.ID.toString());
    const url = `${this._documentTypeUrl}?` + search.toString();


    return this._http
      .delete(url, this._headers)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  // Update existing DocumentType
  private put(aDocumentType: DocumentType): Promise<SimpleResult> {
    return this._http
      .put(this._documentTypeUrl, JSON.stringify(aDocumentType), this._headers)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Add new DocumentType
  private post(aDocumentType: DocumentType): Promise<SimpleResult> {
    aDocumentType.ID = undefined;
    aDocumentType.MessageTypeID = 1;

    return this._http
      .post(this._documentTypeUrl, JSON.stringify(aDocumentType), this._headers)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  private handleError(error: any) {
    console.error('DocumentTypeService ', error);
    return Promise.reject(error.Message || error);
  }

}
