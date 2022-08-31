import Component from "@egjs/component";
import { diff } from "@egjs/list-differ";
import { DIRECTION } from "./consts";
import { findIndex, findLastIndex, getNextCursors, isFlatOutline } from "./utils";

export interface OnInfiniteRequestAppend {
  key?: string | number | undefined;
  nextKey?: string | number | undefined;
  nextKeys?: Array<string | number>;
  isVirtual: boolean;
}

export interface OnInfiniteRequestPrepend {
  key?: string | number;
  nextKey?: string | number;
  nextKeys?: Array<string | number>;
  isVirtual: boolean;
}

export interface OnInfiniteChange {
  prevStartCursor: number;
  prevEndCursor: number;
  nextStartCursor: number;
  nextEndCursor: number;
}

export interface InfiniteEvents {
  requestAppend: OnInfiniteRequestAppend;
  requestPrepend: OnInfiniteRequestPrepend;
  change: OnInfiniteChange;
}

export interface InfiniteOptions {
  useRecycle?: boolean;
  threshold?: number;
  defaultDirection?: "start" | "end";
}

export interface InfiniteItem {
  key: string | number;
  startOutline: number[];
  endOutline: number[];
  isVirtual?: boolean;
}

export class Infinite extends Component<InfiniteEvents> {
  public options: Required<InfiniteOptions>;
  protected startCursor = -1;
  protected endCursor = -1;
  protected size = 0;
  protected items: InfiniteItem[] = [];
  protected itemKeys: Record<string | number, InfiniteItem> = {};
  constructor(options: InfiniteOptions) {
    super();
    this.options = {
      threshold: 0,
      useRecycle: true,
      defaultDirection: "end",
      ...options,
    };
  }
  public scroll(scrollPos: number) {
    const prevStartCursor = this.startCursor;
    const prevEndCursor = this.endCursor;
    const items = this.items;
    const length = items.length;
    const size = this.size;
    const {
      defaultDirection,
      threshold,
      useRecycle,
    } = this.options;
    const isDirectionEnd = defaultDirection === "end";

    if (!length) {
      this.trigger(isDirectionEnd ? "requestAppend" : "requestPrepend", {
        key: undefined,
        isVirtual: false,
      });
      return;
    } else if (prevStartCursor === -1 || prevEndCursor === -1) {
      const nextCursor = isDirectionEnd ? 0 : length - 1;
      this.trigger("change", {
        prevStartCursor,
        prevEndCursor,
        nextStartCursor: nextCursor,
        nextEndCursor: nextCursor,
      });
      return;
    }

    const endScrollPos = scrollPos + size;
    const startEdgePos = Math.max(...items[prevStartCursor].startOutline);
    const endEdgePos = Math.min(...items[prevEndCursor].endOutline);
    const visibles = items.map((item) => {
      const {
        startOutline,
        endOutline,
      } = item;

      if (!startOutline.length || !endOutline.length) {
        return false;
      }
      const startPos = Math.min(...startOutline);
      const endPos = Math.max(...endOutline);

      if (startPos - threshold <= endScrollPos && scrollPos <= endPos + threshold) {
        return true;
      }
      return false;
    });
    const hasStartItems = 0 < prevStartCursor;
    const hasEndItems = prevEndCursor < length - 1;
    const isStart = scrollPos <= startEdgePos + threshold;
    const isEnd = endScrollPos >= endEdgePos - threshold;
    let nextStartCursor = visibles.indexOf(true);
    let nextEndCursor = visibles.lastIndexOf(true);

    if (nextStartCursor === -1) {
      nextStartCursor = prevStartCursor;
      nextEndCursor = prevEndCursor;
    }

    if (!useRecycle) {
      nextStartCursor = Math.min(nextStartCursor, prevStartCursor);
      nextEndCursor = Math.max(nextEndCursor, prevEndCursor);
    }
    if (nextStartCursor === prevStartCursor && hasStartItems && isStart) {
      nextStartCursor -= 1;
    }
    if (nextEndCursor === prevEndCursor && hasEndItems && isEnd) {
      nextEndCursor += 1;
    }
    let nextVisibleItems = items.slice(nextStartCursor, nextEndCursor + 1);

    // It must contain no virtual items.
    if (nextVisibleItems.every((item) => item.isVirtual === true)) {
      // The real item can be in either the start or end direction.
      let hasRealItem = false;

      for (let i = nextStartCursor - 1; i >= 0; --i) {
        if (!items[i].isVirtual) {
          nextStartCursor = i;
          hasRealItem = true;
          break;
        }
      }
      if (!hasRealItem) {
        for (let i = nextEndCursor + 1; i < length; ++i) {
          if (!items[i].isVirtual) {
            nextEndCursor = i;
            hasRealItem = true;
            break;
          }
        }
      }
      if (hasRealItem) {
        nextVisibleItems = items.slice(nextStartCursor, nextEndCursor + 1);
      }
    }

    const hasVirtualItems = nextVisibleItems.some((item) => item.isVirtual === true);

    if (prevStartCursor !== nextStartCursor || prevEndCursor !== nextEndCursor) {
      this.trigger("change", {
        prevStartCursor,
        prevEndCursor,
        nextStartCursor,
        nextEndCursor,
      });

      if (!hasVirtualItems) {
        return;
      }
    }

    // If a virtual item is included, a requestPrepend (or requestAppend) event is triggered.
    if (hasVirtualItems) {
      const isStartVirtual = nextVisibleItems[0]?.isVirtual;
      const isEndVirtual = nextVisibleItems[nextVisibleItems.length - 1]?.isVirtual;

      if ((!isDirectionEnd || !isEnd) && isStartVirtual) {
        const realItemIndex = findIndex(nextVisibleItems, (item) => !item.isVirtual);
        const endVirtualItemIndex = (realItemIndex === -1 ? nextVisibleItems.length : realItemIndex) - 1;

        if (nextVisibleItems[endVirtualItemIndex]) {
          this.trigger("requestPrepend", {
            key: realItemIndex > -1 ? nextVisibleItems[realItemIndex].key : undefined,
            nextKey: nextVisibleItems[endVirtualItemIndex].key,
            nextKeys: nextVisibleItems.slice(0, endVirtualItemIndex + 1).map((item) => item.key),
            isVirtual: true,
          });
        }
      } else if ((isDirectionEnd || !isStart) && isEndVirtual) {
        const realItemIndex = findLastIndex(nextVisibleItems, (item) => !item.isVirtual);
        const startVirtualItemIndex = realItemIndex + 1;

        if (nextVisibleItems[startVirtualItemIndex]) {
          this.trigger("requestAppend", {
            key: realItemIndex > -1 ? nextVisibleItems[realItemIndex].key : undefined,
            nextKey: nextVisibleItems[startVirtualItemIndex].key,
            nextKeys: nextVisibleItems.slice(startVirtualItemIndex).map((item) => item.key),
            isVirtual: true,
          });
        }
      }
    } else if (!this._requestVirtualItems()) {
      if ((!isDirectionEnd || !isEnd) && isStart) {
        this.trigger("requestPrepend", {
          key: items[prevStartCursor].key,
          isVirtual: false,
        });
      } else if ((isDirectionEnd || !isStart) && isEnd) {
        this.trigger("requestAppend", {
          key: items[prevEndCursor].key,
          isVirtual: false,
        });
      }
    }
  }

  /**
   * Call the requestAppend or requestPrepend event to fill the virtual items.
   * @ko virtual item을 채우기 위해 requestAppend 또는 requestPrepend 이벤트를 호출합니다.
   * @return - Whether the event is called. <ko>이벤트를 호출했는지 여부.</ko>
   */
  public _requestVirtualItems() {
    const isDirectionEnd = this.options.defaultDirection === "end";
    const items = this.items;
    const totalVisibleItems = this.getVisibleItems();
    const visibleItems = totalVisibleItems.filter((item) => !item.isVirtual);
    const totalVisibleLength = totalVisibleItems.length;
    const visibleLength = visibleItems.length;
    const startCursor = this.getStartCursor();
    const endCursor = this.getEndCursor();

    if (visibleLength === totalVisibleLength) {
      return false;
    } else if (visibleLength) {
      const startKey = visibleItems[0].key;
      const endKey = visibleItems[visibleLength - 1].key;
      const startIndex = findIndex(items, (item) => item.key === startKey) - 1;
      const endIndex = findIndex(items, (item) => item.key === endKey) + 1;

      const isEnd = endIndex <= endCursor;
      const isStart = startIndex >= startCursor;

      // Fill the placeholder with the original item.
      if ((isDirectionEnd || !isStart) && isEnd) {
        this.trigger("requestAppend", {
          key: endKey,
          nextKey: items[endIndex].key,
          isVirtual: true,
        });
        return true;
      } else if ((!isDirectionEnd || !isEnd) && isStart) {
        this.trigger("requestPrepend", {
          key: startKey,
          nextKey: items[startIndex].key,
          isVirtual: true,
        });
        return true;
      }
    } else if (totalVisibleLength) {
      const lastItem = totalVisibleItems[totalVisibleLength - 1];

      if (isDirectionEnd) {
        this.trigger("requestAppend", {
          nextKey: totalVisibleItems[0].key,
          isVirtual: true,
        });
      } else {
        this.trigger("requestPrepend", {
          nextKey: lastItem.key,
          isVirtual: true,
        });
      }
      return true;
    }
    return false;
  }
  public setCursors(startCursor: number, endCursor: number) {
    this.startCursor = startCursor;
    this.endCursor = endCursor;
  }
  public setSize(size: number) {
    this.size = size;
  }
  public getStartCursor() {
    return this.startCursor;
  }
  public getEndCursor() {
    return this.endCursor;
  }
  public isLoading(direction: "start" | "end") {
    const startCursor = this.startCursor;
    const endCursor = this.endCursor;
    const items = this.items;
    const firstItem = items[startCursor]!;
    const lastItem = items[endCursor]!;
    const length = items.length;

    if (
      direction === DIRECTION.END
      && endCursor > -1
      && endCursor < length - 1
      && !lastItem.isVirtual
      && !isFlatOutline(lastItem.startOutline, lastItem.endOutline)
    ) {
      return false;
    }
    if (
      direction === DIRECTION.START
      && startCursor > 0
      && !firstItem.isVirtual
      && !isFlatOutline(firstItem.startOutline, firstItem.endOutline)
    ) {
      return false;
    }
    return true;
  }
  public setItems(nextItems: InfiniteItem[]) {
    this.items = nextItems;

    const itemKeys: Record<string | number, InfiniteItem> = {};

    nextItems.forEach((item) => {
      itemKeys[item.key] = item;
    });
    this.itemKeys = itemKeys;
  }
  public syncItems(nextItems: InfiniteItem[]) {
    const prevItems = this.items;
    const prevStartCursor = this.startCursor;
    const prevEndCursor = this.endCursor;
    const {
      startCursor: nextStartCursor,
      endCursor: nextEndCursor,
    } = getNextCursors(
      this.items.map((item) => item.key),
      nextItems.map((item) => item.key),
      prevStartCursor,
      prevEndCursor,
    );
    // sync items between cursors
    let isChange = nextEndCursor - nextStartCursor !== prevEndCursor - prevStartCursor
      || (prevStartCursor === -1 || nextStartCursor === -1);

    if (!isChange) {
      const prevVisibleItems = prevItems.slice(prevStartCursor, prevEndCursor + 1);
      const nextVisibleItems = nextItems.slice(nextStartCursor, nextEndCursor + 1);
      const visibleResult = diff(prevVisibleItems, nextVisibleItems, (item) => item.key);

      isChange = visibleResult.added.length > 0
        || visibleResult.removed.length > 0
        || visibleResult.changed.length > 0;
    }
    this.setItems(nextItems);
    this.setCursors(nextStartCursor, nextEndCursor);
    return isChange;
  }
  public getItems() {
    return this.items;
  }
  public getVisibleItems() {
    const startCursor = this.startCursor;
    const endCursor = this.endCursor;

    if (startCursor === -1) {
      return [];
    }
    return this.items.slice(startCursor, endCursor + 1);
  }
  public getItemByKey(key: string | number) {
    return this.itemKeys[key];
  }
  public getRenderedVisibleItems() {
    const items = this.getVisibleItems();
    const rendered = items.map(({ startOutline, endOutline }) => {
      const length = startOutline.length;

      if (length === 0 || length !== endOutline.length) {
        return false;
      }
      return startOutline.some((pos, i) => endOutline[i] !== pos);
    });
    const startIndex = rendered.indexOf(true);
    const endIndex = rendered.lastIndexOf(true);

    return endIndex === -1 ? [] : items.slice(startIndex, endIndex + 1);
  }
  public destroy() {
    this.off();
    this.startCursor = -1;
    this.endCursor = -1;
    this.items = [];
    this.size = 0;
  }
}
