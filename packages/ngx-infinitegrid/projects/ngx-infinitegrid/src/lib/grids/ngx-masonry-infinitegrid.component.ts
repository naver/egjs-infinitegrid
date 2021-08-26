import {
  NgxInfiniteGridComponent,
} from '../ngx-infinitegrid.component';
import { Component, Input } from '@angular/core';
import {
  MasonryInfiniteGrid as VanillaMasonryInfiniteGrid,
  MasonryInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { GridAlign } from '@egjs/grid';
import { TEMPLATE } from '../consts';


@Component({
  selector: 'ngx-masonry-infinitegrid, [NgxMasonryInfiniteGrid]',
  template: TEMPLATE,
  styles: [],
})
export class NgxMasonryInfiniteGridComponent extends NgxInfiniteGridComponent
  implements Required<MasonryInfiniteGridOptions> {
  public static GridClass = VanillaMasonryInfiniteGrid;
  @Input() column!: number;
  @Input() columnSize!: number;
  @Input() columnSizeRatio!: number;
  @Input() align!: GridAlign;
}
