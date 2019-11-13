import InfiniteGrid, * as modules from "./index";


for (const name in modules) {
	InfiniteGrid[name] = modules[name];
}

export default InfiniteGrid;
