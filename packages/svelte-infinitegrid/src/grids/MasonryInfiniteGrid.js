import InfiniteGrid from "../InfiniteGrid.svelte";
import { MasonryInfiniteGrid as GridClass } from "@egjs/infinitegrid";

export class MasonryInfiniteGrid extends InfiniteGrid {
  constructor(options) {
    options.props.GridClass = GridClass;
    super(options);
  }
}
