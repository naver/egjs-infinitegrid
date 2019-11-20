import { NgModule } from '@angular/core';
import { NgxInfiniteGridComponent } from './ngx-infinitegrid.component';
import { NgxGridLayoutComponent } from './ngx-gridlayout.component';
import { NgxJustifiedLayoutComponent } from './ngx-justifiedlayout.component';
import { NgxSquareLayoutComponent } from './ngx-squarelayout.component';
import { NgxFrameLayoutComponent } from './ngx-framelayout.component';
import { NgxPackingLayoutComponent } from './ngx-packinglayout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgxInfiniteGridComponent,
    NgxGridLayoutComponent,
    NgxJustifiedLayoutComponent,
    NgxSquareLayoutComponent,
    NgxFrameLayoutComponent,
    NgxPackingLayoutComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxInfiniteGridComponent,
    NgxGridLayoutComponent,
    NgxJustifiedLayoutComponent,
    NgxSquareLayoutComponent,
    NgxFrameLayoutComponent,
    NgxPackingLayoutComponent,
  ],
})
export class NgxInfiniteGridModule { }
