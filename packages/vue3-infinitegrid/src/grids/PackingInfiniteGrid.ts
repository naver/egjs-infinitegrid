import {
  PackingInfiniteGrid as VanillaPackingInfiniteGrid,
  PackingInfiniteGridOptions,
} from "@egjs/infinitegrid";
import { makeInfiniteGrid } from "../InfiniteGrid";

export const PackingInfiniteGrid = makeInfiniteGrid<PackingInfiniteGridOptions>(
  "packing-infinite-grid",
  VanillaPackingInfiniteGrid,
  );
export type PackingInfiniteGrid = InstanceType<typeof PackingInfiniteGrid>;
