/**
 * egjs-infinitegrid
 * Copyright (c) 2021-present NAVER Corp.
 * MIT license
 */
import VanillaInfiniteGrid, { InfiniteGridMethods, withInfiniteGridMethods } from '@egjs/infinitegrid';
import { NgxInfiniteGridComponent } from './ngx-infinitegrid.component';

export class NgxInfiniteGridInterface {
  @withInfiniteGridMethods
  protected vanillaGrid!: VanillaInfiniteGrid;
}
export interface NgxInfiniteGridInterface extends InfiniteGridMethods<NgxInfiniteGridComponent> { }
