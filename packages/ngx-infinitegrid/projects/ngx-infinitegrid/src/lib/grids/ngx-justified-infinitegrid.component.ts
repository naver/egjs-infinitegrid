import {
  NgxInfiniteGridComponent,
} from '../ngx-infinitegrid.component';
import { Component, Input } from '@angular/core';
import {
  JustifiedInfiniteGrid as VanillaJustifiedInfiniteGrid,
  JustifiedInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { TEMPLATE } from '../consts';


@Component({
  selector: 'ngx-justified-infinite-grid, [NgxJustifiedInfiniteGrid]',
  template: TEMPLATE,
  styles: [],
})
export class NgxJustifiedInfiniteGridComponent extends NgxInfiniteGridComponent
  implements Required<JustifiedInfiniteGridOptions> {
  @Input() columnRange!: Required<JustifiedInfiniteGridOptions>['columnRange'];
  @Input() rowRange!: Required<JustifiedInfiniteGridOptions>['rowRange'];
  @Input() sizeRange!: Required<JustifiedInfiniteGridOptions>['sizeRange'];
  @Input() displayedRow!: Required<JustifiedInfiniteGridOptions>['displayedRow'];
  @Input() isCroppedSize!: Required<JustifiedInfiniteGridOptions>['isCroppedSize'];
  public static GridClass = VanillaJustifiedInfiniteGrid;
}
