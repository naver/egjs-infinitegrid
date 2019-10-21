import InfiniteGrid, * as modules from "./index";

for (const name in modules) {
	(InfiniteGrid as any)[name] = modules[name];
}

export default InfiniteGrid;
