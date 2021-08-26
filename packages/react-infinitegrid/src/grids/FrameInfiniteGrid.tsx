import {
  FrameInfiniteGrid as VanillaFrameInfiniteGrid,
  FrameInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { InfiniteGrid } from "../InfiniteGrid";

export class FrameInfiniteGrid extends InfiniteGrid<FrameInfiniteGridOptions> {
  public static GridClass = VanillaFrameInfiniteGrid;
}
