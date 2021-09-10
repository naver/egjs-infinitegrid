import { TestBed } from '@angular/core/testing';

import { NgxInfinitegridService } from './ngx-infinitegrid.service';

describe('NgxInfinitegridService', () => {
  let service: NgxInfinitegridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxInfinitegridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
