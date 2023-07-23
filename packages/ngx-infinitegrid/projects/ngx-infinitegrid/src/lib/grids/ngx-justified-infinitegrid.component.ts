import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  JustifiedInfiniteGrid as VanillaJustifiedInfiniteGrid,
  JustifiedInfiniteGridOptions
} from '@egjs/infinitegrid';

import { GridClass, TEMPLATE } from '../consts';
import { NgxInfiniteGridComponent } from '../ngx-infinitegrid.component';

@Component({
  selector: 'ngx-justified-infinite-grid, [NgxJustifiedInfiniteGrid]',
  template: TEMPLATE,
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: GridClass, useValue: VanillaJustifiedInfiniteGrid }]
})
export class NgxJustifiedInfiniteGridComponent extends NgxInfiniteGridComponent
  implements Required<JustifiedInfiniteGridOptions> {
  @Input() columnRange!: Required<JustifiedInfiniteGridOptions>['columnRange'];
  @Input() rowRange!: Required<JustifiedInfiniteGridOptions>['rowRange'];
  @Input() sizeRange!: Required<JustifiedInfiniteGridOptions>['sizeRange'];
  @Input() displayedRow!: Required<
    JustifiedInfiniteGridOptions
  >['displayedRow'];
  @Input() isCroppedSize!: Required<
    JustifiedInfiniteGridOptions
  >['isCroppedSize'];
}
