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
