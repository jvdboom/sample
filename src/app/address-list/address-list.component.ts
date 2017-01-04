import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { ReactiveFormsModule } from "@angular/forms";

/** PrimeNG */
import { Message, SelectItem, DataTable } from 'primeng/primeng';
import { AccordionModule, SharedModule, PanelModule } from 'primeng/primeng';
import { Panel, MenuItem, DialogModule } from 'primeng/primeng';

/** Local */
import { Address } from '../models/address';
import { AddressFormComponent } from '../address-form/address-form.component';
import { AddressService } from '../services/address.service';
import { AddressControlService } from '../services/address-control.service';

@Component({
  selector: 'dev-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  private _addressList: Address[];
  _addresses: string[] = [];
  private _addressDummyList: number[];
  private _addAddress: boolean = true;

  private msgs: Message[];
  private sticky: boolean = false;


  /**AddressForm variables needed */
  displayForm: boolean = true;

  constructor(private _addressService: AddressService,
    private _addressControlService: AddressControlService) {

    _addressControlService.addressConfirmed$.subscribe(
      address => {
        console.log(`Confirmed ${JSON.stringify(address)}`);
      }
    );
  }

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses() {
    console.log(`Called getAddresses()`);
    this._addressList = [];
    this._addressService.getAdressessAll()
      .then(addresses => {
        this._addressList = addresses;
        this._addresses = [];
        for (let i = 0; i < this._addressList.length; i++) {
          this._addresses.push(this._addressList[i].Name);
        }
        this._addressDummyList = [];
        this._addressDummyList.length = this._addressList.length;
      });
  }

  onElementDeleted(aAddress: Address) {
    console.log(`Reaction on child deleting: ${aAddress.Name}`);
    this._addressList = [];
    this._addressDummyList = [];

    this.getAddresses();


    this.msgs = [];
    this.sticky = true;
    this.msgs.push({ severity: 'error', summary: 'Reaction on child deleting', detail: 'Index: ' });
  }

  addElement() {
    const address = new Address();
    address.Name = 'Add here.. ';
    this._addressList.push(address);
    this._addressDummyList.push(0);
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
