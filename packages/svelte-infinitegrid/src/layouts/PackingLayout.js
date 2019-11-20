import InfiniteGrid from "../InfiniteGrid.svelte";
import { PackingLayout as layoutType } from "@egjs/infinitegrid";

export default class PackingLayout extends InfiniteGrid {
	constructor(options) {
		options.props.layoutType = layoutType;
		super(options);
	}
}
