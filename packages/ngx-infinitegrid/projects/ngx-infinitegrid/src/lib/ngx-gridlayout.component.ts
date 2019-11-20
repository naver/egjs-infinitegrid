import {
  NgxInfiniteGridComponent
} from './ngx-infinitegrid.component';
import { Component, Input } from '@angular/core';
import { TEMPLATE } from './consts';
import { ILayout, GridLayout } from '@egjs/infinitegrid';



@Component({
  selector: 'ngx-gridlayout, [NgxGridLayout]',
  template: TEMPLATE,
  styles: []
})
export class NgxGridLayoutComponent extends NgxInfiniteGridComponent {
  @Input() public layoutType: new () => ILayout = GridLayout;
}
