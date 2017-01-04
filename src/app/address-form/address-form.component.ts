import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

/** PrimeNG */
import { Message, SelectItem, DataTable } from 'primeng/primeng';

/** ReactiveX */
import { Subscription } from 'rxjs/Subscription';

/** Local */
import { Address } from '../models/address';
import { AddressControlService } from '../services/address-control.service';

@Component({
  selector: 'dev-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  @Input() address: Address;
  @Input() displayForm: boolean;

  @Output() elementDeleted: EventEmitter<Address> = new EventEmitter();

  subscription: Subscription;
  addressSubscription: Subscription;
  addressConfirmed: Subscription;
  _addressConfirmed: Address = new Address();

  private msgs: Message[];
  private sticky: boolean;

  private _addressForm: FormGroup;

  addressAnnounced: Address;

  formErrors = {
    'Name': '',
    'Street': '',
    'Age': '',
    'Email': ''
  };

  validationMessages = {
    'Name': {
      'maxlength': 'maxlength'
    },
    'Street': {
      'maxlength': 'maxlength'
    },
    'Age': {
      'maxlength': 'maxlength'
    },
    'Email': {
      'maxlength': 'maxlength'
    }
  };

  constructor(private _formBuilder: FormBuilder,
    private _addressControlService: AddressControlService) {

    this.addressAnnounced = new Address();
    this.addressSubscription = _addressControlService.addressAnnounced$.subscribe(
      address => {
        console.log(`@@2 addressAnnounced`);
      }
    );

    this.addressConfirmed = _addressControlService.addressConfirmed$.subscribe(
      address => {
        this._addressConfirmed = address;
        this.address = this._addressConfirmed;
        this.buildForm();
      }
    );

    /** Single use */
    if (this.address === undefined) {
      this.address = new Address();
      this.address.Name = '';
      this.address.Email = '';
    }
  }

  ngOnInit() {
    this.buildForm();
    if (this.displayForm === undefined) {
      this.displayForm = true;
    }

  }

  buildForm(): void {
    this._addressForm = this._formBuilder.group({
      "Name": [this.address.Name, [Validators.required]],
      "Street": this.address.Street,
      "Age": this.address.Age,
      // "Email": [this.address.Email, [Validators.required]]
      "Email": this.address.Email
    });

    this._addressForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }



  onValueChanged(data?: any) {
    if (!this._addressForm) {
      return;
    }
    const form = this._addressForm;
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



  clone2Address(aFormValue: any): Address {
    const add = new Address();
    for (let prop in aFormValue) {
      add[prop] = aFormValue[prop]
    }
    return add;
  }

  onSubmit(aFormValue: any): void {
    /**Some extra checkings here... */
    this.address = this.clone2Address(aFormValue);
    console.log(`AddresForm TODO:Pressed submit Checks for saving ${this.address.Name}`);
    this.address.Age = 1000;
    this.address.Street = this.address.Name + `laan ${this.address.Age}`;
    this.address.Email = this.address.Name + `@gmail.com`;
    this._addressControlService.confirmAddress(this.address);
  }

  delete() {
    console.log(`AddresForm TODO: Pressed Delete`);
    this.elementDeleted.emit(this.address);
    this.msgs = [];
    this.sticky = true;
    this.msgs.push({ severity: 'error', summary: 'delete', detail: 'Index: ' });
  }

  copy() {
    console.log(`AddresForm TODO: Pressed Copy`);
  }

  onClick() {
    console.log(`AddresForm TODO: CHILD onClick()`);
  }

  ngOnDestroy(): void {
    // prevent memory leak when component destroyed
    //this.subscription.unsubscribe();
  }
}
