import {
  NgxInfiniteGridComponent
} from './ngx-infinitegrid.component';
import { Component, Input } from '@angular/core';
import { TEMPLATE } from './consts';
import { ILayout, PackingLayout } from '@egjs/infinitegrid';


@Component({
  selector: 'ngx-packinglayout, [NgxPackingLayout]',
  template: TEMPLATE,
  styles: []
})
export class NgxPackingLayoutComponent extends NgxInfiniteGridComponent {
  @Input() public layoutType: new () => ILayout = PackingLayout;
}
