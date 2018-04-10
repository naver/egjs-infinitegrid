import {PackingLayout as LayoutType} from "@egjs/infinitegrid";
import InfiniteGrid from "../Layout";

export default class PackingLayout extends InfiniteGrid {
	static defaultProps = {
		...InfiniteGrid.defaultProps,
		type: LayoutType,
	};
}
