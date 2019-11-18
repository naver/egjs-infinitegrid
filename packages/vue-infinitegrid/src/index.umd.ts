import { VueConstructor } from "vue";
import InfiniteGrid from "./InfiniteGrid";
import GridLayout from "./layouts/GridLayout";
import JustifiedLayout from "./layouts/JustifiedLayout";
import FrameLayout from "./layouts/FrameLayout";
import SquareLayout from "./layouts/SquareLayout";
import PackingLayout from "./layouts/PackingLayout";
import Loading from "./Loading";

declare global {
  interface Window {
	Vue: VueConstructor;
  }
}

const version = "#__VERSION__#";
const install = (Vue: VueConstructor): void => {
  Vue.component("InfiniteGrid", InfiniteGrid);
  Vue.component("GridLayout", GridLayout);
  Vue.component("JustifiedLayout", JustifiedLayout);
  Vue.component("FrameLayout", FrameLayout);
  Vue.component("SquareLayout", SquareLayout);
  Vue.component("PackingLayout", PackingLayout);
  Vue.component("Loading", Loading);
};

const plugin = {
	InfiniteGrid,
	GridLayout,
	JustifiedLayout,
	FrameLayout,
	SquareLayout,
	PackingLayout,
	Loading,
	install,
	version,
};
export default plugin;
