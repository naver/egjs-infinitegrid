import {
  JustifiedInfiniteGrid as VanillaJustifiedInfiniteGrid,
  JustifiedInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { InfiniteGrid } from "../InfiniteGrid";

export class JustifiedInfiniteGrid extends InfiniteGrid<JustifiedInfiniteGridOptions> {
  public static GridClass = VanillaJustifiedInfiniteGrid;
}
