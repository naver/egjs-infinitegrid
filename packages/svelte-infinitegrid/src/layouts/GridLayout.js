import InfiniteGrid from "../InfiniteGrid.svelte";
import { GridLayout as layoutType } from "@egjs/infinitegrid";

export default class GridLayout extends InfiniteGrid {
	constructor(options) {
		options.props.layoutType = layoutType;
		super(options);
	}
}
