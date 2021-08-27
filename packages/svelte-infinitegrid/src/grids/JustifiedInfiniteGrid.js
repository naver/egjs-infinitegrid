import InfiniteGrid from "../InfiniteGrid.svelte";
import { JustifiedInfiniteGrid as GridClass } from "@egjs/infinitegrid";

export class JustifiedInfiniteGrid extends InfiniteGrid {
  constructor(options) {
    options.props.GridClass = GridClass;
    super(options);
  }
}
