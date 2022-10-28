import {
  FrameInfiniteGrid as VanillaFrameInfiniteGrid, FrameInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { makeInfiniteGrid } from "../InfiniteGrid";

export const FrameInfiniteGrid = makeInfiniteGrid<FrameInfiniteGridOptions>(
  "frame-infinite-grid",
  VanillaFrameInfiniteGrid,
);
export type FrameInfiniteGrid = InstanceType<typeof FrameInfiniteGrid>;
