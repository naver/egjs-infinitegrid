/**
 * egjs-infinitegrid
 * Copyright (c) 2021-present NAVER Corp.
 * MIT license
 */
import InfiniteGrid, {
  InfiniteGridFunction,
  InfiniteGridMethods,
  InfiniteGridItemInfo,
  Renderer,
  InfiniteGridStatus,
  InfiniteGridItem,
} from "@egjs/infinitegrid";
import { VNode } from "vue";

export type VueInfiniteGridProps<T extends InfiniteGridFunction> = T["defaultOptions"] & {
  tag?: string;
  status?: InfiniteGridStatus;
  useFirstRender?: boolean;
  itemBy?: (item: VNode, index: number) => string | number;
  groupBy?: (item: VNode, index: number) => string | number;
  infoBy?: (item: VNode, index: number) => Record<string, any>;
};

export interface VueInfiniteGridInterface<T extends InfiniteGridFunction>
  extends InfiniteGridMethods<VueInfiniteGridInterface<T>> {
  $el: HTMLElement;
  $refs: Record<string, any>;
  $_grid: InfiniteGrid;
  $_renderer: Renderer;
  $props: VueInfiniteGridProps<T>;
}

export interface VueInnerInfiniteInterface extends VueInfiniteGridInterface<any> {
  $slots: Record<string, any>;
  $scopedSlots: Record<string, ((...args: any[]) => any) | undefined>;
  $emit(name: string, e?: any): void;
  $forceUpdate(): void;
  $_getItemInfos(): InfiniteGridItemInfo[];
  $_getVisibleChildren(): any[];
  $_renderContainer(h: any): any;
}
