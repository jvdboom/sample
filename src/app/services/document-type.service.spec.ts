/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentTypeService } from './document-type.service';

describe('DocumentTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentTypeService]
    });
  });

  it('should ...', inject([DocumentTypeService], (service: DocumentTypeService) => {
    expect(service).toBeTruthy();
  }));
});
