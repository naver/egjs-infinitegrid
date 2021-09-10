import InfiniteGrid from "../InfiniteGrid.svelte";
import { PackingInfiniteGrid as GridClass } from "@egjs/infinitegrid";

export class PackingInfiniteGrid extends InfiniteGrid {
  constructor(options) {
    options.props.GridClass = GridClass;
    super(options);
  }
}
