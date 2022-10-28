import {
  MasonryInfiniteGrid as VanillaMasonryInfiniteGrid, MasonryInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { makeInfiniteGrid } from "../InfiniteGrid";

export const MasonryInfiniteGrid = makeInfiniteGrid<MasonryInfiniteGridOptions>(
  "masonry-infinite-grid",
  VanillaMasonryInfiniteGrid,
);
export type MasonryInfiniteGrid = InstanceType<typeof MasonryInfiniteGrid>;
