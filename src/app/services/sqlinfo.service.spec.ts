/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SqlinfoService } from './sqlinfo.service';

describe('SqlinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SqlinfoService]
    });
  });

  it('should ...', inject([SqlinfoService], (service: SqlinfoService) => {
    expect(service).toBeTruthy();
  }));
});
