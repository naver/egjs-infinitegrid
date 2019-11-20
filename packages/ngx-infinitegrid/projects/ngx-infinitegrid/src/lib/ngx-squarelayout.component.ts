import {
  NgxInfiniteGridComponent
} from './ngx-infinitegrid.component';
import { Component, Input } from '@angular/core';
import { TEMPLATE } from './consts';
import { ILayout, SquareLayout } from '@egjs/infinitegrid';



@Component({
  selector: 'ngx-squarelayout, [NgxSquareLayout]',
  template: TEMPLATE,
  styles: []
})
export class NgxSquareLayoutComponent extends NgxInfiniteGridComponent {
  @Input() public layoutType: new () => ILayout = SquareLayout;
}
