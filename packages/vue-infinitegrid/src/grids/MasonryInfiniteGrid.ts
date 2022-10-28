import {
  MasonryInfiniteGrid as VanillaMasonryInfiniteGrid,
} from "@egjs/infinitegrid";
import { makeInfiniteGrid } from "../InfiniteGrid";
import { VueInfiniteGridInterface } from "../types";

export const MasonryInfiniteGrid = makeInfiniteGrid("masonry-infinite-grid", VanillaMasonryInfiniteGrid);
export type MasonryInfiniteGrid = VueInfiniteGridInterface<typeof VanillaMasonryInfiniteGrid>;
