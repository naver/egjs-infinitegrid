import { NgModule } from '@angular/core';

import { NgxInfiniteGridComponent } from './ngx-infinitegrid.component';
import { NgxMasonryInfiniteGridComponent } from './grids/ngx-masonry-infinitegrid.component';
import { NgxJustifiedInfiniteGridComponent } from './grids/ngx-justified-infinitegrid.component';
import { NgxFrameInfiniteGridComponent } from './grids/ngx-frame-infinitegrid.component';
import { NgxPackingInfiniteGridComponent } from './grids/ngx-packing-infinitegrid.component';

const components = [
  NgxInfiniteGridComponent,
  NgxMasonryInfiniteGridComponent,
  NgxJustifiedInfiniteGridComponent,
  NgxFrameInfiniteGridComponent,
  NgxPackingInfiniteGridComponent
];

@NgModule({
  imports: components,
  exports: components
})
export class NgxInfiniteGridModule {}
