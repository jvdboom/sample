/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TenantService } from './tenant.service';

describe('TenantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantService]
    });
  });

  it('should ...', inject([TenantService], (service: TenantService) => {
    expect(service).toBeTruthy();
  }));
});
