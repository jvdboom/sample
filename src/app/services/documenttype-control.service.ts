import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DocumentType } from '../models/documenttype';

@Injectable()
export class DocumentTypeControlService {

  // Observable object sources
  private documentTypeAnnouncedSource = new Subject<DocumentType>();
  private documentTypeConfirmedSource = new Subject<DocumentType>();

  // Observable string streams
  documentTypeAnnounced$ = this.documentTypeAnnouncedSource.asObservable();
  documentTypeConfirmed$ = this.documentTypeConfirmedSource.asObservable();

  // Service message commands
  announceDocumentType(aDocumentType: DocumentType) {
    console.log(`@Control announce ${aDocumentType.Name}`);
    this.documentTypeAnnouncedSource.next(aDocumentType);
  }

  confirmDocumentType(aDocumentType: DocumentType) {
    console.log(`@Control confirm ${aDocumentType.Name}`);
    this.documentTypeConfirmedSource.next(aDocumentType);
  }
}
