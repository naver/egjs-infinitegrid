import { SquareLayout as LayoutType } from "@egjs/infinitegrid";
import InfiniteGrid from "../InfiniteGrid";
import { InfiniteGridProps } from "../types";

export default class SquareLayout extends InfiniteGrid<LayoutType> {
	public static defaultProps: Required<InfiniteGridProps<LayoutType>> = {
		...InfiniteGrid.defaultProps,
		layoutType: LayoutType,
	};
}
