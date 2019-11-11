import { TestBed } from '@angular/core/testing';

import { NgxInfiniteGridService } from './ngx-infinitegrid.service';

describe('NgxInfiniteGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxInfiniteGridService = TestBed.get(NgxInfiniteGridService);
    expect(service).toBeTruthy();
  });
});
