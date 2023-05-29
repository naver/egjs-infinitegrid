import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MasonryInfiniteGrid as VanillaMasonryInfiniteGrid,
  MasonryInfiniteGridOptions
} from '@egjs/infinitegrid';

import { GridClass, TEMPLATE } from '../consts';
import { NgxInfiniteGridComponent } from '../ngx-infinitegrid.component';

@Component({
  selector: 'ngx-masonry-infinite-grid, [NgxMasonryInfiniteGrid]',
  template: TEMPLATE,
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: GridClass, useValue: VanillaMasonryInfiniteGrid }]
})
export class NgxMasonryInfiniteGridComponent extends NgxInfiniteGridComponent
  implements Required<MasonryInfiniteGridOptions> {
  @Input() column!: Required<MasonryInfiniteGridOptions>['column'];
  @Input() columnSize!: Required<MasonryInfiniteGridOptions>['columnSize'];
  @Input() columnSizeRatio!: Required<
    MasonryInfiniteGridOptions
  >['columnSizeRatio'];
  @Input() align!: Required<MasonryInfiniteGridOptions>['align'];
  @Input() columnCalculationThreshold!: Required<
    MasonryInfiniteGridOptions
  >['columnCalculationThreshold'];
  @Input() maxStretchColumnSize!: Required<
    MasonryInfiniteGridOptions
  >['maxStretchColumnSize'];
}
