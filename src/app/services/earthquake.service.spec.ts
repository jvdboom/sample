/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EarthquakeService } from './earthquake.service';

describe('EarthquakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EarthquakeService]
    });
  });

  it('should ...', inject([EarthquakeService], (service: EarthquakeService) => {
    expect(service).toBeTruthy();
  }));
});
