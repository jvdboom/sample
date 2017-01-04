import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Address } from '../models/address';

@Injectable()
export class AddressControlService {

  /** missionAnnouncedSource */
  // Observable Address sources
  private addressAnnouncedSource = new Subject<Address>();
  private addressConfirmedSource = new Subject<Address>();

  // Observable string streams
  addressAnnounced$ = this.addressAnnouncedSource.asObservable();
  addressConfirmed$ = this.addressConfirmedSource.asObservable();

  // Service message commands
  announceAddress(aAddress: Address) {
    console.log(`@Step 1 AddressControlService announceAddress ${aAddress.Name}`);
    this.addressAnnouncedSource.next(aAddress);
  }

  confirmAddress(aAddress: Address) {
    console.log(`@Step 2 AddressControlService confirmAddress ${aAddress.Name}`);
    this.addressConfirmedSource.next(aAddress);
  }
}

  // private addressAddSource = new Subject<Address>();
  // private addressAddedSource = new Subject<Address>();

  // // Observable Address streams
  // addressAdd$ = this.addressAddSource.asObservable();
  // addressAdded$ = this.addressAddedSource.asObservable();

  // // Service message commands
  // addressAdd(aAddress: Address) {
  //   console.log(`AddressControlService ADD ${aAddress.Name}`);
  //   this.addressAddSource.next(aAddress);
  // }

  // addressAdded(aAddress: Address) {
  //   console.log(`AddressControlService ADDED ${aAddress.Name}`);
  //   this.addressAddedSource.next(aAddress);
  // }
