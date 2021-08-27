import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMasonryInfiniteGridComponent } from './grids/ngx-masonry-infinitegrid.component';
import { NgxInfiniteGridComponent } from './ngx-infinitegrid.component';



@NgModule({
  declarations: [
    NgxInfiniteGridComponent,
    NgxMasonryInfiniteGridComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxInfiniteGridComponent,
    NgxMasonryInfiniteGridComponent,
  ],
})
export class NgxInfiniteGridModule { }
