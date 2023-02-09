import InfiniteGrid from "../InfiniteGrid.js";
import { PackingInfiniteGrid as GridClass } from "@egjs/infinitegrid";


let SveltePackingInfiniteGrid;

if (typeof InfiniteGrid === "object") {
  SveltePackingInfiniteGrid = InfiniteGrid;
} else {
  SveltePackingInfiniteGrid = class SveltePackingInfiniteGrid extends InfiniteGrid {
    constructor(options) {
      options.props.GridClass = GridClass;
      super(options);
    }
  }
}
export { SveltePackingInfiniteGrid as PackingInfiniteGrid };
