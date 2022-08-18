import InfiniteGrid, * as modules from "./index";

for (const name in modules) {
  (InfiniteGrid as any)[name] = (modules as any)[name];
}

declare const module: any;
module.exports = InfiniteGrid;
export default InfiniteGrid;
export * from "./index";
