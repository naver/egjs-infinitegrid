// Type definitions for egjs-infinitegrid 2.0
// Project: https://github.com/naver/egjs-infinitegrid
// Definitions by: Naver <https://github.com/naver>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

export as namespace eg;

export = InfiniteGrid;

interface InfiniteGridOption {
  itemSelector?: string;
  count?: number;
  defaultGroupKey?: string;
  isEqualSize?: boolean;
  isOverflowScroll?: boolean;
  threshold?: number;
}

interface Item {
  el?: HTMLElement;
  position: {
    x: number,
    y: number
  };
  groupKey?: number|string;
}

interface InfiniteGridStatus {
  options: InfiniteGridOption;
  prop: { [key: string]: any};
  layoutManager: {
    prop: { [key: string]: any};
    items: Item[];
  };
  html: string;
  cssText: string;
  scrollPos: number;
}

declare class InfiniteGrid {
  constructor(el: string | HTMLElement, options?: InfiniteGridOption);
  append(elements: (string|HTMLElement)[]| string, groupKey?: string|number): number;
  prepend(elements: (string|HTMLElement)[]| string, groupKey?: string|number): number;
  clear(): InfiniteGrid;
  destroy();
  getBottomElement(): HTMLElement;
  getTopElement(): HTMLElement;
  getGroupKeys(): (string|number)[];
  getStatus(): InfiniteGridStatus;
  isProcessing(): boolean;
  isRecycling(): boolean;
  layout(isRelayout?: boolean): InfiniteGrid;
  remove(item: HTMLElement): Item;
  setStatus(status: InfiniteGridStatus, applyScrollPos: boolean): InfiniteGrid;
}

declare namespace InfiniteGrid {
  function append(elements: (string|HTMLElement)[]| string, groupKey?: string|number): number;
  function prepend(elements: (string|HTMLElement)[]| string, groupKey?: string|number): number;
  function clear(): InfiniteGrid;
  function destroy();
  function getBottomElement(): HTMLElement;
  function getTopElement(): HTMLElement;
  function getGroupKeys(): (string|number)[];
  function getStatus(): InfiniteGridStatus;
  function isProcessing(): boolean;
  function isRecycling(): boolean;
  function layout(isRelayout?: boolean): InfiniteGrid;
  function remove(item: HTMLElement): Item;
  function setStatus(status: InfiniteGridStatus, applyScrollPos: boolean): InfiniteGrid;
}
