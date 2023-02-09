import InfiniteGrid from "../InfiniteGrid.js";
import { FrameInfiniteGrid as GridClass } from "@egjs/infinitegrid";


let SvelteFrameInfiniteGrid;

if (typeof InfiniteGrid === "object") {
  SvelteFrameInfiniteGrid = InfiniteGrid;
} else {
  SvelteFrameInfiniteGrid = class SvelteFrameInfiniteGrid extends InfiniteGrid {
    constructor(options) {
      options.props.GridClass = GridClass;
      super(options);
    }
  }
}
export { SvelteFrameInfiniteGrid as FrameInfiniteGrid };
