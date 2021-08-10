import Component from "@egjs/component";
import { diff } from "@egjs/list-differ";
import { getNextCursors } from "./utils";

export interface OnInfiniteRequestAppend {
  startCursor: number;
  endCursor: number;
  groupKey: string | number | undefined;
}

export interface OnInfiniteRequestPrepend {
  startCursor: number;
  endCursor: number;
  groupKey: string | number | undefined;
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
  useRecyle?: boolean;
  threshold?: number;
  defaultDirection?: "start" | "end";
}

export interface InfiniteItem {
  key: string | number;
  startOutline: number[];
  endOutline: number[];
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
      useRecyle: false,
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
    } = this.options;
    const isDirectionEnd = defaultDirection === "end";

    if (!length) {
      this.trigger(isDirectionEnd ? "requestAppend" : "requestPrepend", {
        groupKey: undefined,
        startCursor: prevStartCursor,
        endCursor: prevEndCursor,
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

    if (nextStartCursor === prevStartCursor && hasStartItems && isStart) {
      nextStartCursor -= 1;
    }
    if (nextEndCursor === prevEndCursor && hasEndItems && isEnd) {
      nextEndCursor += 1;
    }
    if (prevStartCursor !== nextStartCursor || prevEndCursor !== nextEndCursor) {
      this.trigger("change", {
        prevStartCursor,
        prevEndCursor,
        nextStartCursor,
        nextEndCursor,
      });
    } else if ((!isDirectionEnd || !isEnd) && isStart) {
      this.trigger("requestPrepend", {
        groupKey: items[prevStartCursor].key,
        startCursor: prevStartCursor,
        endCursor: prevEndCursor,
      });
    } else if ((isDirectionEnd || !isStart) && isEnd) {
      this.trigger("requestAppend", {
        groupKey: items[prevEndCursor].key,
        startCursor: prevStartCursor,
        endCursor: prevEndCursor,
      });
    }
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
  public setItems(nextItems: InfiniteItem[]) {
    this.items = nextItems;

    const itemKeys: Record<string | number, InfiniteItem> = {};

    nextItems.forEach((item) => {
      itemKeys[item.key] = item;
    });
    this.itemKeys = itemKeys;
  }
  public sync(nextItems: InfiniteItem[]) {
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
      const prevVisibleItems = prevItems.slice(prevStartCursor, prevEndCursor);
      const nextVisibleItems = nextItems.slice(nextStartCursor, nextEndCursor);
      const visibleResult = diff(prevVisibleItems, nextVisibleItems, (item) => item.key);

      isChange = visibleResult.added.length > 0
        || visibleResult.removed.length > 0
        || visibleResult.changed.length > 0;
    }
    this.setItems(nextItems);
    this.setCursors(nextStartCursor, nextEndCursor);
    return isChange;
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
    const groups = this.getVisibleItems();
    const rendered = groups.map((group) => group.startOutline.length > 0);
    const startIndex = rendered.indexOf(true);
    const endIndex = rendered.lastIndexOf(true);

    return endIndex === -1 ? [] : groups.slice(startIndex, endIndex + 1);
  }
  public destroy() {
    this.off();
    this.startCursor = -1;
    this.endCursor = -1;
    this.items = [];
    this.size = 0;
  }
}
