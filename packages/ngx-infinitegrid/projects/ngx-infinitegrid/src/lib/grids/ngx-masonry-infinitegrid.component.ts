import {
  NgxInfiniteGridComponent,
} from '../ngx-infinitegrid.component';
import { Component, Input } from '@angular/core';
import {
  MasonryInfiniteGrid as VanillaMasonryInfiniteGrid,
  MasonryInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { TEMPLATE } from '../consts';


@Component({
  selector: 'ngx-masonry-infinite-grid, [NgxMasonryInfiniteGrid]',
  template: TEMPLATE,
})
export class NgxMasonryInfiniteGridComponent extends NgxInfiniteGridComponent
  implements Required<MasonryInfiniteGridOptions> {
  public static GridClass = VanillaMasonryInfiniteGrid;
  @Input() column!: Required<MasonryInfiniteGridOptions>['column'];
  @Input() columnSize!: Required<MasonryInfiniteGridOptions>['columnSize'];
  @Input() columnSizeRatio!: Required<MasonryInfiniteGridOptions>['columnSizeRatio'];
  @Input() align!: Required<MasonryInfiniteGridOptions>['align'];
  @Input() columnCalculationThreshold!: Required<MasonryInfiniteGridOptions>['columnCalculationThreshold'];
  @Input() maxStretchColumnSize!: Required<MasonryInfiniteGridOptions>['maxStretchColumnSize'];
}
