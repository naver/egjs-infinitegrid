import {
  PackingInfiniteGrid as VanillaPackingInfiniteGrid,
} from "@egjs/infinitegrid";
import { makeInfiniteGrid } from "../InfiniteGrid";
import { VueInfiniteGridInterface } from "../types";

export const PackingInfiniteGrid = makeInfiniteGrid("packing-infinite-grid", VanillaPackingInfiniteGrid);
export type PackingInfiniteGrid = VueInfiniteGridInterface<typeof VanillaPackingInfiniteGrid>;
