import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PackingInfiniteGrid as VanillaPackingInfiniteGrid,
  PackingInfiniteGridOptions
} from '@egjs/infinitegrid';

import { GridClass, TEMPLATE } from '../consts';
import { NgxInfiniteGridComponent } from '../ngx-infinitegrid.component';

@Component({
  selector: 'ngx-packing-infinite-grid, [NgxPackingInfiniteGrid]',
  template: TEMPLATE,
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: GridClass, useValue: VanillaPackingInfiniteGrid }]
})
export class NgxPackingInfiniteGridComponent extends NgxInfiniteGridComponent
  implements Required<PackingInfiniteGridOptions> {
  @Input() aspectRatio!: Required<PackingInfiniteGridOptions>['aspectRatio'];
  @Input() sizeWeight!: Required<PackingInfiniteGridOptions>['sizeWeight'];
  @Input() ratioWeight!: Required<PackingInfiniteGridOptions>['ratioWeight'];
  @Input() weightPriority!: Required<
    PackingInfiniteGridOptions
  >['weightPriority'];
}
