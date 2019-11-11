import {
  NgxInfiniteGridComponent
} from "./ngx-infinitegrid.component";
import { Component, Input } from '@angular/core';
import { TEMPLATE } from './consts';
import { ILayout, JustifiedLayout } from '@egjs/infinitegrid';



@Component({
  selector: 'ngx-justifiedlayout, [NgxJustifiedLayout]',
  template: TEMPLATE,
  styles: []
})
export class NgxJustifiedLayoutComponent extends NgxInfiniteGridComponent {
  @Input() public layoutType: new () => ILayout = JustifiedLayout;
}
