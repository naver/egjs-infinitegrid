import InfiniteGrid from "../InfiniteGrid.svelte";
import { JustifiedInfiniteGrid as GridClass } from "@egjs/infinitegrid";


let JustifiedInfiniteGrid;

if (typeof InfiniteGrid === "object") {
  JustifiedInfiniteGrid = InfiniteGrid;
} else {
  JustifiedInfiniteGrid = class JustifiedInfiniteGrid extends InfiniteGrid {
    constructor(options) {
      options.props.GridClass = GridClass;
      super(options);
    }
  }
}
export { JustifiedInfiniteGrid };
