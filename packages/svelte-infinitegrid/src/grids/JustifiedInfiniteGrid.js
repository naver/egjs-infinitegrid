import InfiniteGrid from "../InfiniteGrid.js";
import { JustifiedInfiniteGrid as GridClass } from "@egjs/infinitegrid";


let SvelteJustifiedInfiniteGrid;

if (typeof InfiniteGrid === "object") {
  SvelteJustifiedInfiniteGrid = InfiniteGrid;
} else {
  SvelteJustifiedInfiniteGrid = class SvelteJustifiedInfiniteGrid extends InfiniteGrid {
    constructor(options) {
      options.props.GridClass = GridClass;
      super(options);
    }
  }
}
export { SvelteJustifiedInfiniteGrid as JustifiedInfiniteGrid };
