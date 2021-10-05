import InfiniteGrid from "../InfiniteGrid.svelte";
import { PackingInfiniteGrid as GridClass } from "@egjs/infinitegrid";


let PackingInfiniteGrid;

if (typeof InfiniteGrid === "object") {
  PackingInfiniteGrid = InfiniteGrid;
} else {
  PackingInfiniteGrid = class PackingInfiniteGrid extends InfiniteGrid {
    constructor(options) {
      options.props.GridClass = GridClass;
      super(options);
    }
  }
}
export { PackingInfiniteGrid };
