import {PackingLayout as LayoutType} from "@egjs/infinitegrid";
import InfiniteGrid from "../InfiniteGrid";

export default class PackingLayout extends InfiniteGrid {
	static defaultProps = {
		...InfiniteGrid.defaultProps,
		type: LayoutType,
	};
}
