import {
  NgxInfiniteGridComponent,
} from '../ngx-infinitegrid.component';
import { Component, Input } from '@angular/core';
import {
  FrameInfiniteGrid as VanillaFrameInfiniteGrid,
  FrameInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { TEMPLATE } from '../consts';

@Component({
  selector: 'ngx-frame-infinite-grid, [NgxFrameInfiniteGrid]',
  template: TEMPLATE,
})
export class NgxFrameInfiniteGridComponent extends NgxInfiniteGridComponent
  implements Required<FrameInfiniteGridOptions> {
  @Input() frame!: Required<FrameInfiniteGridOptions>['frame'];
  @Input() useFrameFill!: Required<FrameInfiniteGridOptions>['useFrameFill'];
  @Input() rectSize!: Required<FrameInfiniteGridOptions>['rectSize'];
  public static GridClass = VanillaFrameInfiniteGrid;
}
