import InfiniteGrid, * as modules from "./index";

for (const name in modules) {
  (InfiniteGrid as any)[name] = (modules as any)[name];
}

export default InfiniteGrid;
