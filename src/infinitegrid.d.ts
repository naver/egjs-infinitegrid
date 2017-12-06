// Type definitions for egjs-infinitegrid 3.0
// Project: https://github.com/naver/egjs-infinitegrid
// Definitions by: Naver <https://github.com/naver>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

export as namespace eg;

export = InfiniteGrid;

interface InfiniteGridOption {
  itemSelector?: string;
  isEqualSize?: boolean;
  isOverflowScroll?: boolean;
  threshold?: number;
  useRecycle?: boolean;
  horizontal?: boolean;
  loadingBar?: string | {
    append?: string | HTMLElement;
    prepend?: string | HTMLElement;
  }
}

interface Item {
  el?: HTMLElement;
  content: string;
  groupKey?: number|string;
  orgSize?: {
    width: number,
    height: number;
  },
  rect?: {
    top: number,
    left: number;
    width?: number;
    height?: number;
  } 
  size?: {
    width: number,
    height: number;
  },
  column? : number
}

interface InfiniteGridStatus {
  options: InfiniteGridOption;
  _items: {
    _data: Array<Item>;
  }
  _renderer: {
    cssText: string;
    options: {
      isEqualSize: boolean;
      isOverflowScroll: boolean;
      isVertical: boolean;
    }
  }
  _size: {
    containerOffset: number;
    item?: number;
    view: number;
    viewport: number;
  },
  _status: {
    end: Item;
    endCursor: number;
    start: Item;
    startCursor: number;
    loadingBar?: string | {
      append?: string | HTMLElement;
      prepend?: string | HTMLElement;
    },
    processingStatus: number;
  },
  _watcher: {
    scrollPos: number;
    _prevPos: number;
  }
}

declare class InfiniteGrid {
  constructor(el: string | HTMLElement, options?: InfiniteGridOption);
  append(elements: (string|HTMLElement)[]| string, groupKey?: string|number): InfiniteGrid;
  prepend(elements: (string|HTMLElement)[]| string, groupKey?: string|number): InfiniteGrid;
  clear(): InfiniteGrid;
  destroy();
  getGroupKeys(includeCached?: boolean): (string|number)[];
  getStatus(): object;
  isProcessing(): boolean;
  layout(isRelayout?: boolean): InfiniteGrid;
  remove(item: HTMLElement): (object|null);
  setLayout(LayoutKlass, options?): InfiniteGrid;
  getItems(includeCached?: boolean): Array<Item>;
  setStatus(status: InfiniteGridStatus, applyScrollPos: boolean): InfiniteGrid;
}

declare namespace InfiniteGrid {
  function append(elements: (string|HTMLElement)[]| string, groupKey?: string|number): InfiniteGrid;
  function prepend(elements: (string|HTMLElement)[]| string, groupKey?: string|number): InfiniteGrid;
  function clear(): InfiniteGrid;
  function destroy();
  function getGroupKeys(includeCached?: boolean): (string|number)[];
  function getStatus(): object;
  function isProcessing(): boolean;
  function layout(isRelayout?: boolean): InfiniteGrid;
  function remove(item: HTMLElement): (object|null);
  function setLayout(LayoutKlass, options?): InfiniteGrid;
  function getItems(includeCached?: boolean): Array<Item>;
  function setStatus(status: InfiniteGridStatus, applyScrollPos: boolean): InfiniteGrid;
}
