import InfiniteGrid from "../InfiniteGrid.svelte";
import { JustifiedLayout as layoutType } from "@egjs/infinitegrid";

export default class JustifiedLayout extends InfiniteGrid {
	constructor(options) {
		options.props.layoutType = layoutType;
		super(options);
	}
}
