import {
  PackingInfiniteGrid as VanillaPackingInfiniteGrid,
  PackingInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { InfiniteGrid } from "../InfiniteGrid";

export class PackingInfiniteGrid extends InfiniteGrid<PackingInfiniteGridOptions> {
  public static GridClass = VanillaPackingInfiniteGrid;
}
