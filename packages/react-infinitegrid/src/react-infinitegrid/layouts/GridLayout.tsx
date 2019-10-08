import { GridLayout as LayoutType } from "@egjs/infinitegrid";
import InfiniteGrid from "../InfiniteGrid";
import { InfiniteGridProps } from "../types";

export default class GridLayout extends InfiniteGrid<LayoutType> {
	public static defaultProps: Required<InfiniteGridProps<LayoutType>> = {
		...InfiniteGrid.defaultProps,
		layoutType: LayoutType,
	};
}
