import {
  NgxInfiniteGridComponent,
} from '../ngx-infinitegrid.component';
import { Component, Input } from '@angular/core';
import {
  PackingInfiniteGrid as VanillaPackingInfiniteGrid,
  PackingInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { TEMPLATE } from '../consts';


@Component({
  selector: 'ngx-packing-infinite-grid, [NgxPackingInfiniteGrid]',
  template: TEMPLATE,
})
export class NgxPackingInfiniteGridComponent extends NgxInfiniteGridComponent
  implements Required<PackingInfiniteGridOptions> {
  @Input() aspectRatio!: Required<PackingInfiniteGridOptions>['aspectRatio'];
  @Input() sizeWeight!: Required<PackingInfiniteGridOptions>['sizeWeight'];
  @Input() ratioWeight!: Required<PackingInfiniteGridOptions>['ratioWeight'];
  @Input() weightPriority!: Required<PackingInfiniteGridOptions>['weightPriority'];
  public static GridClass = VanillaPackingInfiniteGrid;
}
