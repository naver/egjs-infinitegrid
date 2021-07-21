import Grid from "@egjs/grid";
import { InfiniteGridItem } from "./InfiniteGridItem";

export interface InfiniteGridGroup {
  groupKey: string | number;
  grid: Grid;
}

export interface CategorizedGroup {
  groupKey: number | string;
  items: InfiniteGridItem[];
}
/**
 * @typedef
 * @memberof eg.InfiniteGrid
 */
export interface InfiniteGridItemInfo {
  groupKey?: string | number;
  key?: string | number;
  element?: HTMLElement | null;
  html?: string;
  data?: Record<string, any>;
}

export type InfiniteGridInsertedItems = string | Array<string | InfiniteGridItemInfo | HTMLElement>;
