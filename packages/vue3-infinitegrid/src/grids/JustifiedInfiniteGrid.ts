import {
  JustifiedInfiniteGrid as VanillaJustifiedInfiniteGrid, JustifiedInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { makeInfiniteGrid } from "../InfiniteGrid";

export const JustifiedInfiniteGrid = makeInfiniteGrid<JustifiedInfiniteGridOptions>(
  "justified-infinite-grid",
  VanillaJustifiedInfiniteGrid,
);
export type JustifiedInfiniteGrid = InstanceType<typeof JustifiedInfiniteGrid>;

