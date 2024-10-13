import { TestBed } from '@angular/core/testing';

import { GarageserviceService } from './garageservice.service';

describe('GarageserviceService', () => {
  let service: GarageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
