import ItemManager, { IInfiniteGridGroup } from "./ItemManager";
import { assign } from "./utils";
import { CursorType } from "./types";

function isVisible(group: IInfiniteGridGroup, threshold: number, scrollPos: number, endScrollPos: number) {
  const { items, outlines } = group;
  const start = outlines.start;
  const end = outlines.end;

  if (start.length === 0 || end.length === 0 || !items.length || !items[0].el) {
    return 2;
  }
  const min = Math.min(...start);
  const max = Math.max(...end);

  if ((endScrollPos + threshold < min)) {
    return +1;
  } else if ((scrollPos - threshold > max)) {
    return -1;
  }
  return 0;
}

export interface IInfiniteOptions {
 useRecycle?: boolean;
 threshold?: number;
 append?: (e?: {cache: IInfiniteGridGroup[]}) => void;
 prepend?: (e?: {cache: IInfiniteGridGroup[]}) => void;
 recycle?: (e?: {start: number, end: number}) => void;
}
export interface IInfiniteStatus {
  startCursor: number;
  endCursor: number;
  size: number;
}
class Infinite {
  public options: Required<IInfiniteOptions>;
  private _items: ItemManager;
  private _status: IInfiniteStatus;
  constructor(itemManger: ItemManager, options: IInfiniteOptions) {
    this.options = assign({
      useRecycle: true,
      threshold: 100,
      append: () => void 0,
      prepend: () => void 0,
      recycle: () => void 0,
    }, options);

    this._items = itemManger;
    this.clear();
  }
  public setSize(size: number) {
    this._status.size = size;
  }
  public recycle(scrollPos: number, isForward?: boolean) {
    if (!this.options.useRecycle) {
      return;
    }
    const { startCursor, endCursor, size } = this._status;

    if (startCursor === -1 || endCursor === -1) {
      return;
    }
    const endScrollPos = scrollPos + size;
    const { threshold, recycle } = this.options;
    const visibles = this._items.get(startCursor, endCursor)
      .map(group => isVisible(group, threshold, scrollPos, endScrollPos));
    const length = visibles.length;
    let start = isForward ? 0 : visibles.lastIndexOf(0);
    let end = isForward ? visibles.indexOf(0) - 1 : visibles.length - 1;

    if (!isForward && start !== -1) {
      start += 1;
    }
    if (start < 0 || end < 0 || start > end || end - start + 1 >= length) {
      return;
    }
    start = startCursor + start;
    end = startCursor + end;

    recycle({ start, end });
    if (isForward) {
      this.setCursor("start", end + 1);
    } else {
      this.setCursor("end", start - 1);
    }
  }
  public scroll(scrollPos: number) {
    const startCursor = this.getCursor("start");
    const endCursor = this.getCursor("end");
    const items = this._items;

    if (typeof scrollPos !== "number" || startCursor === -1 ||
      endCursor === -1 || !items.size()) {
      return;
    }
    const size = this._status.size;
    const { threshold, append, prepend } = this.options;
    const datas = items.get();
    const endScrollPos = scrollPos + size;
    const startEdgePos = Math.max(...datas[startCursor].outlines.start);
    const endEdgePos = Math.min(...datas[endCursor].outlines.end);
    const visibles = datas.map((group, i) => {
      const { start, end } = group.outlines;

      if (!start.length || !end.length) {
        return false;
      }
      const startPos = Math.min(...start);
      const endPos = Math.max(...end);

      if (startPos - threshold <= endScrollPos && scrollPos <= endPos + threshold) {
        return true;
      }
      return false;
    });
    const startIndex = visibles.indexOf(true);
    const endIndex = visibles.lastIndexOf(true);

    if (~startIndex && startIndex < startCursor) {
      prepend({ cache: datas.slice(startIndex, Math.min(startCursor, endIndex + 1)) });
    } else if (endCursor < endIndex) {
      append({ cache: datas.slice(Math.max(startIndex, endCursor + 1), endIndex + 1) });
    } else if (endScrollPos >= endEdgePos - threshold) {
      append({ cache: datas.slice(endCursor + 1, endCursor + 2) });
    } else if (scrollPos <= startEdgePos + threshold) {
      prepend({ cache: datas.slice(startCursor - 1, startCursor) });
    }
  }
  public setCursor(cursor: CursorType, index: number) {
    const status = this._status;
    const items = this._items;
    const size = items.size();

    if (!this.options.useRecycle) {
      status.startCursor = 0;
      if (items.getOutline(size - 1, "end").length) {
        status.endCursor = size - 1;
        return;
      }
      if (cursor !== "end") {
        return;
      }
    }
    if (cursor === "start") {
      status.startCursor = index;
    } else {
      status.endCursor = Math.min(size - 1, index);
    }
    status.startCursor = Math.max(0, status.startCursor);
  }
  public setStatus(status: IInfiniteStatus) {
    this._status = assign(this._status, status);
  }
  public getStatus(startKey: string | number, endKey: string | number): IInfiniteStatus {
    const { startCursor, endCursor, size } = this._status;
    const startIndex = Math.max(this._items.indexOf(startKey), 0);
    const endIndex = (this._items.indexOf(endKey) + 1 || this._items.size()) - 1;
    const start = Math.max(startCursor - startIndex, ~startCursor ? 0 : -1);
    const end = Math.max(Math.min(endCursor - startIndex, endIndex - startIndex), start);

    return {
      startCursor: start,
      endCursor: end,
      size,
    };
  }
  public getEdgeOutline(cursor: CursorType) {
    const { startCursor, endCursor } = this._status;

    if (startCursor === -1 || endCursor === -1) {
      return [];
    }
    return this._items.getOutline(cursor === "start" ? startCursor : endCursor, cursor);
  }
  public getEdgeValue(cursor: CursorType) {
    const outlines = this.getEdgeOutline(cursor);

    return outlines.length ? Math[cursor === "start" ? "min" : "max"](...outlines) : 0;
  }
  public getVisibleItems() {
    return this._items.pluck("items", this._status.startCursor, this._status.endCursor);
  }
  public getCursor(cursor: CursorType) {
    return this._status[cursor === "start" ? "startCursor" : "endCursor"];
  }
  public getVisibleData() {
    return this._items.get(this._status.startCursor, this._status.endCursor);
  }
  public remove(element: HTMLElement) {
    return this._items.remove(element, this._status.startCursor, this._status.endCursor);
  }
  public clear() {
    this._status = {
      startCursor: -1,
      endCursor: -1,
      size: -1,
    };
  }
}

export default Infinite;
