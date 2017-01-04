/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentTypeControlService } from './documenttype-control.service';

describe('DocumenttypeControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentTypeControlService]
    });
  });

  it('should ...', inject([DocumentTypeControlService], (service: DocumentTypeControlService) => {
    expect(service).toBeTruthy();
  }));
});
