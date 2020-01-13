import InfiniteGrid from "./InfiniteGrid.svelte";
import { INFINITEGRID_METHODS } from "@egjs/infinitegrid";

export default /*#__PURE__*/ (() => {
    const prototype = InfiniteGrid.prototype;

	for (const name in INFINITEGRID_METHODS) {
        prototype[name] = function (...args) {
            const self = this.getInstance();
            const result = self[name](...args);

            if (result === self) {
                return this;
            } else {
                return result;
            }
        };
    }
    return InfiniteGrid;
})();
