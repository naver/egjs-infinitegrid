import { TestBed } from '@angular/core/testing';

import { NgxInfinitegridService } from './ngx-infinitegrid.service';

describe('NgxInfinitegridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxInfinitegridService = TestBed.get(NgxInfinitegridService);
    expect(service).toBeTruthy();
  });
});
