import {SquareLayout as LayoutType} from "@egjs/InfiniteGrid";
import InfiniteGrid from "../InfiniteGrid";

export default class SquareLayout extends InfiniteGrid {
	static defaultProps = {
		...InfiniteGrid.defaultProps,
		type: LayoutType,
	};
}
