import {
  JustifiedInfiniteGrid as VanillaJustifiedInfiniteGrid,
} from "@egjs/infinitegrid";
import { makeInfiniteGrid } from "../InfiniteGrid";
import { VueInfiniteGridInterface } from "../types";

export const JustifiedInfiniteGrid = makeInfiniteGrid("justified-infinite-grid", VanillaJustifiedInfiniteGrid);
export type JustifiedInfiniteGrid = VueInfiniteGridInterface<typeof VanillaJustifiedInfiniteGrid>;
