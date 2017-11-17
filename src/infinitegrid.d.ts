// Type definitions for egjs-infinitegrid 2.0
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
  horizontal?: boolean,
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
  getItems(includeCached?: boolean): [];
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
  function getItems(includeCached?: boolean): [];
  function setStatus(status: InfiniteGridStatus, applyScrollPos: boolean): InfiniteGrid;
}
