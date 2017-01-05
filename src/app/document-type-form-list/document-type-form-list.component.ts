import { Component, OnInit } from '@angular/core';
import { DocumentType } from '../models/DocumentType';
import { DocumentTypeFormComponent } from '../document-type-form/document-type-form.component';
import { DocumentTypeListComponent } from '../document-type-list/document-type-list.component';
import { DocumentTypeService } from '../services/document-type.service';
import { DocumentTypeControlService } from '../services/documenttype-control.service';

@Component({
  selector: 'dev-document-type-form-list',
  templateUrl: './document-type-form-list.component.html',
  styleUrls: ['./document-type-form-list.component.css']
})
export class DocumentTypeFormListComponent implements OnInit {


  private displayForm: boolean = true;
  private _documentTypeList: DocumentType[];
  private _documentTypes: string[];
  private _documentType: DocumentType;
  private _documentTypeDummyList: number[];

  constructor(private _documentTypeService: DocumentTypeService,
    _documentTypeControlService: DocumentTypeControlService) {
    this._documentTypeDummyList = [];
    this._documentTypes = [];
    this._documentType = new DocumentType();

    _documentTypeControlService.documentTypeConfirmed$.subscribe(
      documentType => {
        this._documentTypeDummyList.length = this._documentTypeList.length + 1;
        this._documentTypeList.push(documentType);
      }
    );
  }

  ngOnInit() {
    this.getDocumentTypes();
  }

  getDocumentTypes() {
    console.log(`Called getDocumentTypes()`);
    this._documentTypeList = [];
    this._documentTypeService.getDocumentTypes()
      .then(documentTypes => {
        this._documentTypeList = documentTypes;
        this._documentTypes = [];
        for (let i = 0; i < this._documentTypeList.length; i++) {
          this._documentTypes.push(this._documentTypeList[i].Name);
        }
        this._documentTypeDummyList = [];
        this._documentTypeDummyList.length = this._documentTypeList.length;
      });
  }

  onTabClose(event) {

  }

  onTabOpen(event) {

  }

  onElementDeleted(aDocumentType: DocumentType) {

  }

}
