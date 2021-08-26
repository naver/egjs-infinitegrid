import {
  FrameInfiniteGrid as VanillaFrameInfiniteGrid,
} from "@egjs/infinitegrid";
import { makeInfiniteGrid } from "../InfiniteGrid";
import { VueInfiniteGridInterface } from "../types";

export const FrameInfiniteGrid = makeInfiniteGrid("frame-infinite-grid", VanillaFrameInfiniteGrid);
export type FrameInfiniteGrid = VueInfiniteGridInterface<typeof VanillaFrameInfiniteGrid>;
