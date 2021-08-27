/**
 * egjs-infinitegrid
 * Copyright (c) 2021-present NAVER Corp.
 * MIT license
 */
import InfiniteGrid from "./InfiniteGrid.svelte";
import { INFINITEGRID_METHODS } from "@egjs/infinitegrid";

export default /*#__PURE__*/ (() => {
  const prototype = InfiniteGrid.prototype;

  INFINITEGRID_METHODS.forEach(name => {
    if (name in prototype) {
      return;
    }
    prototype[name] = function (...args) {
      const self = this.getInstance();
      const result = self[name](...args);

      if (result === self) {
        return this;
      } else {
        return result;
      }
    };
  });
  return InfiniteGrid;
})();
