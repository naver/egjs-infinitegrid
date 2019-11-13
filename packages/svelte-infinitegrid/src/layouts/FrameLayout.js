import InfiniteGrid from "../InfiniteGrid.svelte";
import { FrameLayout as layoutType } from "@egjs/infinitegrid";

export default class FrameLayout extends InfiniteGrid {
	constructor(options) {
		options.props.layoutType = layoutType;
		super(options);
	}
}
