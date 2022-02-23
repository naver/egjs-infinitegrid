import InfiniteGrid from "../InfiniteGrid.js";
import { FrameInfiniteGrid as GridClass } from "@egjs/infinitegrid";


let FrameInfiniteGrid;

if (typeof InfiniteGrid === "object") {
  FrameInfiniteGrid = InfiniteGrid;
} else {
  FrameInfiniteGrid = class FrameInfiniteGrid extends InfiniteGrid {
    constructor(options) {
      options.props.GridClass = GridClass;
      super(options);
    }
  }
}
export { FrameInfiniteGrid };
