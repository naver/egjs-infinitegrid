import InfiniteGrid from "../InfiniteGrid.js";
import { MasonryInfiniteGrid as GridClass } from "@egjs/infinitegrid";


let SvelteMasonryInfiniteGrid;

if (typeof InfiniteGrid === "object") {
  SvelteMasonryInfiniteGrid = InfiniteGrid;
} else {
  SvelteMasonryInfiniteGrid = class SvelteMasonryInfiniteGrid extends InfiniteGrid {
    constructor(options) {
      options.props.GridClass = GridClass;
      super(options);
    }
  }
}
export { SvelteMasonryInfiniteGrid as MasonryInfiniteGrid };
