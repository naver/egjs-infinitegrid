import {FrameLayout as LayoutType} from "@egjs/infinitegrid";
import InfiniteGrid from "../InfiniteGrid";

class FrameLayout extends InfiniteGrid {
	static layoutProps = {
		frame: [],
	};
	static defaultProps = {
		...InfiniteGrid.defaultProps,
		type: LayoutType,
	};
}

export default FrameLayout;
