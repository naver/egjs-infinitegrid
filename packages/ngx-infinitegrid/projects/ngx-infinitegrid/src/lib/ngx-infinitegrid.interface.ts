import NativeInfiniteGrid, { IInfiniteGridStatus, withInfiniteGridMethods } from '@egjs/infinitegrid';
import { InfiniteGridType } from './types';
import { NgxInfiniteGridComponent } from './ngx-infinitegrid.component';

export default class NgxInfiniteGridInterface {
  @withInfiniteGridMethods
  protected ig!: NativeInfiniteGrid;

}
export default interface NgxInfiniteGridInterface extends InfiniteGridType<NgxInfiniteGridComponent> { }
