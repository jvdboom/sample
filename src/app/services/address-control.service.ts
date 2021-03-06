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
    console.log(`@Control 1 Address announce ${aAddress.Name}`);
    this.addressAnnouncedSource.next(aAddress);
  }

  confirmAddress(aAddress: Address) {
    console.log(`@Control 2 Address confirm ${aAddress.Name}`);
    this.addressConfirmedSource.next(aAddress);
  }
}
