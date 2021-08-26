import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInfinitegridComponent } from './ngx-infinitegrid.component';

describe('NgxInfinitegridComponent', () => {
  let component: NgxInfinitegridComponent;
  let fixture: ComponentFixture<NgxInfinitegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxInfinitegridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInfinitegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
