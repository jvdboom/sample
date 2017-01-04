import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

/** PrimeNG */
import { Message, SelectItem, DataTable } from 'primeng/primeng';
import { AccordionModule, SharedModule, PanelModule } from 'primeng/primeng';
import { Panel, MenuItem, DialogModule } from 'primeng/primeng';

import { DocumentType } from '../models/documenttype';
import { DocumentTypeFormComponent } from '../document-type-form/document-type-form.component';
import { DocumentTypeService } from '../services/document-type.service';
import { DocumentTypeControlService } from '../services/documenttype-control.service';



@Component({
  selector: 'dev-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.css']
})

export class DocumentTypeListComponent implements OnInit {
  private _documentTypeList: DocumentType[];
  _documentTypes: string[] = [];
  private _documentTypeDummyList: number[];
  private _addDocumentType: boolean = true;

  private msgs: Message[];
  private sticky: boolean = false;

  abo: DocumentType;

  /**AddressForm variables needed */
  displayForm: boolean = true;

  constructor(private _documentTypeService: DocumentTypeService,
    _documentTypeControlService: DocumentTypeControlService) {

    _documentTypeControlService.documentTypeConfirmed$.subscribe(
      documentType => {
        this.abo = documentType;
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

  addElement() {
    const documentType = new DocumentType();
    documentType.Name = 'Add here.. ';
    this._documentTypeList.push(documentType);
    this._documentTypeDummyList.push(0);
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'addElement', detail: '' });
  }

  onTabClose(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'onTabClose', detail: 'Index: ' + event.index });
    this.displayForm = false;
  }

  onTabOpen(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'onTabOpen', detail: 'Index: ' + event.index });
    this.displayForm = true;
  }

  onClick(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'onClick', detail: 'Index: ' + event.index });
    this.sticky = true;
    this.displayForm = true;
  }

}
