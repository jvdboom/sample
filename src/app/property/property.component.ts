import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

/** PrimeNG */
import { Message, SelectItem, DataTable } from 'primeng/primeng';
import { ReactiveFormsModule } from "@angular/forms";
import { AccordionModule, SharedModule, PanelModule } from 'primeng/primeng';
import { Panel, MenuItem, DialogModule } from 'primeng/primeng';

import { Property } from '../models/property';

@Component({
  selector: 'ccm-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  private properties: Property[];
  private _property: Property;
  private _propertyForm: FormGroup;

  private _msgs: Message[] = [];
  private _sticky: boolean = false;

  formErrors = {
    'Name': '',
    'Element': ''
  };

  validationMessages = {
    'Name': {
      'maxlength': 'Name cannot be more than 50 characters long.'
    },
    'Description': {
      'Element': 'Description cannot be more than 250 characters long.'
    }
  };

  constructor(private _formBuilder: FormBuilder) {

    if (this._property === undefined) {
      this._property = new Property();
    }

    if (this.properties === undefined) {
      this.properties = [];
      this.properties.push({ Name: 'Name01', Element: '1' });
      this.properties.push({ Name: 'Name02', Element: '12' });
      this.properties.push({ Name: 'Name03', Element: '123' });
      this.properties.push({ Name: 'Name04', Element: '1234' });
      this.properties.push({ Name: 'Name05', Element: '12345' });
    }





  }

  ngOnInit() {
    this.buildForm();
  }


  buildForm(): void {
    this._propertyForm = this._formBuilder.group({
      'Name': [this._property.Name, [Validators.required, Validators.maxLength(50)]],
      'Element': [this._property.Element]
    });

    this._propertyForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this._propertyForm) {
      return;
    }
    const form = this._propertyForm;
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

  clone2Object(aForm: any): Property {
    let object = new Property();
    for (let prop in aForm) {
      object[prop] = aForm[prop]
    }
    return object;
  }

  onSubmit() {
    console.log(`onSubmit ${JSON.stringify(this._propertyForm.value)}` );
    const property: Property = this.clone2Object(this._propertyForm.value);
    console.log(`cloned 2 ${JSON.stringify(property)}`);
    this._sticky = false;
    this._msgs = [];
    this._msgs.push({ severity: 'warn', summary: 'TODO', detail: 'SAVE' });
  }

}
