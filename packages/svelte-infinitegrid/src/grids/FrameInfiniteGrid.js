import InfiniteGrid from "../InfiniteGrid.svelte";
import { FrameInfiniteGrid as GridClass } from "@egjs/infinitegrid";

export class FrameInfiniteGrid extends InfiniteGrid {
  constructor(options) {
    options.props.GridClass = GridClass;
    super(options);
  }
}
