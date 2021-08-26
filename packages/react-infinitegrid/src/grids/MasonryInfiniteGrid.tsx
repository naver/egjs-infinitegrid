import {
  MasonryInfiniteGrid as VanillaMasonryInfiniteGrid,
  MasonryInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { InfiniteGrid } from "../InfiniteGrid";

export class MasonryInfiniteGrid extends InfiniteGrid<MasonryInfiniteGridOptions> {
  public static GridClass = VanillaMasonryInfiniteGrid;
}
