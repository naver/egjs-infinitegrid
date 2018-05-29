import {JustifiedLayout as LayoutType} from "@egjs/infinitegrid";
import InfiniteGrid from "../InfiniteGrid";

export default class JustifiedLayout extends InfiniteGrid {
	static defaultProps = {
		...InfiniteGrid.defaultProps,
		type: LayoutType,
	};
}
