import {
  NgxInfinitegridComponent
} from './ngx-infinitegrid.component';
import { Component, Input } from '@angular/core';
import { TEMPLATE } from './consts';
import { ILayout, FrameLayout } from '@egjs/infinitegrid';



@Component({
  selector: 'ngx-framelayout, [NgxFrameLayout]',
  template: TEMPLATE,
  styles: []
})
export class NgxFrameLayoutComponent extends NgxInfinitegridComponent {
  @Input() public layoutType: new () => ILayout = FrameLayout;
}
