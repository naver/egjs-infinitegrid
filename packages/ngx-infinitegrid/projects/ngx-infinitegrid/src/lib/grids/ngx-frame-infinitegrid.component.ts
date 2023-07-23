import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FrameInfiniteGrid as VanillaFrameInfiniteGrid,
  FrameInfiniteGridOptions
} from '@egjs/infinitegrid';

import { GridClass, TEMPLATE } from '../consts';
import { NgxInfiniteGridComponent } from '../ngx-infinitegrid.component';

@Component({
  selector: 'ngx-frame-infinite-grid, [NgxFrameInfiniteGrid]',
  template: TEMPLATE,
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: GridClass, useValue: VanillaFrameInfiniteGrid }]
})
export class NgxFrameInfiniteGridComponent extends NgxInfiniteGridComponent
  implements Required<FrameInfiniteGridOptions> {
  @Input() frame!: Required<FrameInfiniteGridOptions>['frame'];
  @Input() useFrameFill!: Required<FrameInfiniteGridOptions>['useFrameFill'];
  @Input() rectSize!: Required<FrameInfiniteGridOptions>['rectSize'];
}
