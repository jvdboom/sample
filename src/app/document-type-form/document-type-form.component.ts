import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DocumentType } from '../models/documenttype';

/** PrimeNG */
import { Message, SelectItem, DataTable } from 'primeng/primeng';
import { ReactiveFormsModule } from "@angular/forms";
import { AccordionModule, SharedModule, PanelModule } from 'primeng/primeng';
import { Panel, MenuItem, DialogModule } from 'primeng/primeng';

import { DocumentTypeService } from '../services/document-type.service';

/** ReactiveX */
import { Subscription } from 'rxjs/Subscription';
import { DocumentTypeControlService } from '../services/documenttype-control.service'
@Component({
  selector: 'dev-document-type-form',
  templateUrl: './document-type-form.component.html',
  styleUrls: ['./document-type-form.component.css']
})
export class DocumentTypeFormComponent implements OnInit {
  @Input() documentType: DocumentType;
  @Input() displayForm: boolean;
  @Output() documentTypeChange = new EventEmitter<DocumentType>();
  // @Output() documentTypeChange = new EventEmitter<DocumentType>();
  // @Output() elementDeleted: EventEmitter<DocumentType> = new EventEmitter();

  documentTypeConfirmed: Subscription;
  elementDeleted: EventEmitter<DocumentType> = new EventEmitter();


  _documentTypeForm: FormGroup;
  _display: boolean = false;
  _error: any;

  private _msgs: Message[] = [];
  private _sticky: boolean;

  _currentTenantID: number = 0;
  _currentDocumentTypeID: number = 0;

  formErrors = {
    'Name': '',
    'Description': ''
  };

  validationMessages = {
    'Name': {
      'maxlength': 'Name cannot be more than 40 characters long.'
    },
    'Description': {
      'maxlength': 'Description cannot be more than 250 characters long.'
    }
  };

  constructor(private _formBuilder: FormBuilder,
    private _documentTypeService: DocumentTypeService,
    private _documentTypeControlService: DocumentTypeControlService) {
    
    this.documentTypeConfirmed = _documentTypeControlService
      .documentTypeConfirmed$.subscribe(
      documentType => {
        if (this.documentType.ID < 0) {
          this.documentType = documentType;
          this.documentType.Description = documentType.Description + ' Confirmed';
          console.log(`${JSON.stringify(this.documentType)}`);
          this.buildForm();
        }
      });

    /** Single component use */
    if (this.documentType == null) {
      this.documentType = new DocumentType();
      this.documentType.ID = 0;
      this.displayForm = true;
    }

    if (this.displayForm == null) {
      this.displayForm = true;
    }
  }

  ngOnInit() {
    // console.log(`FORM 000 ID: ${this.documentType.ID} Name: ${this.documentType.Name}`);
    this._currentDocumentTypeID = this.documentType.ID;
    this.buildForm();
  }


  buildForm(): void {
    this._documentTypeForm = this._formBuilder.group({
      "ID": this.documentType.ID,
      "Name": [this.documentType.Name, [Validators.required, Validators.maxLength(40)]],
      "Description": [this.documentType.Description, [Validators.maxLength(250)]]
    });

    this._documentTypeForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this._documentTypeForm) {
      return;
    }
    const form = this._documentTypeForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  clone2DocumentType(aFormValue: any): DocumentType {
    const documentType = new DocumentType();
    for (let prop in aFormValue) {
      documentType[prop] = aFormValue[prop]
    }
    return documentType;
  }

  onSubmit(aFormValue: any) {
    const documentType = this.clone2DocumentType(aFormValue);
    this.documentType = documentType;
    this.saveDocumentType(this.documentType);
  }

  saveDocumentType(aDocumentType: DocumentType) {
    console.log(`3 saveDocumentType -> ${JSON.stringify(this.documentType)}`);
    if (this._documentTypeForm.dirty) {
      this._documentTypeService.save(aDocumentType)
        .then(simpleResult => {
          if (simpleResult.Key === 'ID') {
            this.documentType.ID = +simpleResult.Value;
            this._currentDocumentTypeID = this.documentType.ID;
            this._documentTypeControlService.confirmDocumentType(this.documentType);
            this.buildForm();
            this._msgs.push({ severity: 'info', summary: 'Added', detail: this.documentType.Name + ' Added !' });
          } else {
            this._msgs.push({ severity: 'info', summary: 'Saved', detail: this.documentType.Name + ' Saved !' });
          }
          console.log(`4 saveDocumentType -> ${JSON.stringify(this.documentType)}`);
          this.documentTypeChange.emit(this.documentType);
          // this._documentTypeControlService.confirmDocumentType(this.documentType);
        })
        .catch(error => {
          this._error = error;
          this._sticky = true;
          this._msgs = [];
          this._msgs.push({ severity: 'error', summary: 'Error Saving DocumentType', detail: this._error });
        });
    }
  }


  copyDocumentType() {
    this._error = 'TODO';
    this._sticky = true;
    this._msgs = [];
    this._msgs.push({ severity: 'info', summary: 'TODO !!', detail: this._error });
  }

  deleteDocumentType() {
    if (this.documentType && this.documentType.ID > 0) {
      this._documentTypeService.delete(this.documentType)
        .then(simpleResult => {
          if (simpleResult.Key === 'Count' && simpleResult.Value === '1') {
            this.elementDeleted.emit(this.documentType);
          }
        })
        .catch(error => {
          this._error = error
          this._sticky = true;
          this._msgs = [];
          this._msgs.push({ severity: 'error', summary: 'Error Deleting DocumentType', detail: this._error });
        });
    }
  }

  onTabShow(event) {
    // this._currentIndex = event.index;
    // this.msgs = [];
    // this.msgs.push({ severity: 'info', summary: '000004', detail: 'Index: ' + event.index });
    // this._displayForm = false;
  }

  onTabClose(event) {
    // this._currentIndex = -1;
    // this.msgs = [];
    // this.msgs.push({ severity: 'info', summary: '000005', detail: 'Index: ' + event.index });
    // this._displayForm = false;
  }

  onTabOpen(event) {
    // this._currentIndex = event.index;
    // this.msgs = [];
    // this.msgs.push({ severity: 'info', summary: '000006', detail: 'Index: ' + event.index });
    // this._displayForm = true;
  }

}
