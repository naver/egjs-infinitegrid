import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInfiniteGridComponent } from './ngx-infinitegrid.component';

describe('NgxInfiniteGridComponent', () => {
  let component: NgxInfiniteGridComponent;
  let fixture: ComponentFixture<NgxInfiniteGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxInfiniteGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInfiniteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
