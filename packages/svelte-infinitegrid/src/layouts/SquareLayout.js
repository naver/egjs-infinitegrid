import InfiniteGrid from "../InfiniteGrid.svelte";
import { SquareLayout as layoutType } from "@egjs/infinitegrid";

export default class SquareLayout extends InfiniteGrid {
	constructor(options) {
		options.props.layoutType = layoutType;
		super(options);
	}
}
