import InfiniteGrid from "../InfiniteGrid.js";
import { MasonryInfiniteGrid as GridClass } from "@egjs/infinitegrid";


let MasonryInfiniteGrid;

if (typeof InfiniteGrid === "object") {
  MasonryInfiniteGrid = InfiniteGrid;
} else {
  MasonryInfiniteGrid = class MasonryInfiniteGrid extends InfiniteGrid {
    constructor(options) {
      options.props.GridClass = GridClass;
      super(options);
    }
  }
}
export { MasonryInfiniteGrid };
