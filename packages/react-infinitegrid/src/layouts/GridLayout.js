import {GridLayout as LayoutType} from "@egjs/infinitegrid";
import InfiniteGrid from "../InfiniteGrid";

export default class GridLayout extends InfiniteGrid {
	static defaultProps = {
		...InfiniteGrid.defaultProps,
		type: LayoutType,
	};
}
