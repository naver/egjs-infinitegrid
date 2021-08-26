/**
 * egjs-infinitegrid
 * Copyright (c) 2021-present NAVER Corp.
 * MIT license
 */
import { EventEmitter } from "@angular/core";
import { InfiniteGridEvents, InfiniteGridOptions, InfiniteGridStatus } from "@egjs/infinitegrid";

export type NgxInfiniteGridEvents = {
  [key in keyof InfiniteGridEvents]: EventEmitter<InfiniteGridEvents[key]>
};


export interface NgxInfiniteGridProps extends NgxInfiniteGridEvents, Required<InfiniteGridOptions> {
  usePlaceholder: boolean;
  useLoading: boolean;
  useFirstRender: boolean;
  status: InfiniteGridStatus;
  items: any[];
  trackBy: (index: number, item: any) => any;
  groupBy: (index: number, item: any) => any;
}
