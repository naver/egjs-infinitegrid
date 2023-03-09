import { withClassMethods } from "@cfcs/core";
import Grid, { GRID_PROPERTY_TYPES } from "@egjs/grid";
import { diff } from "@egjs/list-differ";
import { GROUP_TYPE, IGNORE_PROPERITES_MAP, INFINITEGRID_METHODS, ITEM_INFO_PROPERTIES, ITEM_TYPE } from "./consts";
import { GroupManagerStatus, InfiniteGridGroupStatus } from "./GroupManager";
import InfiniteGrid from "./InfiniteGrid";
import { InfiniteGridItem, InfiniteGridItemStatus } from "./InfiniteGridItem";
import {
  CategorizedGroup, InfiniteGridGroup, InfiniteGridInsertedItems,
  InfiniteGridItemInfo,
  RenderingOptions,
} from "./types";

export function isWindow(el: Window | Element): el is Window {
  return el === window;
}

export function isNumber(val: any): val is number {
  return typeof val === "number";
}

export function isString(val: any): val is string {
  return typeof val === "string";
}
export function isObject(val: any): val is object {
  return typeof val === "object";
}

export function flat<T>(arr: T[][]): T[] {
  return arr.reduce((prev, cur) => {
    return [...prev, ...cur];
  }, []);
}
export function splitOptions(options: Record<string, any>) {
  const {
    gridOptions,
    ...otherOptions
  } = options;

  return {
    ...splitGridOptions(gridOptions),
    ...otherOptions,
  };
}
export function splitGridOptions(options: Record<string, any>) {
  const nextOptions: Record<string, any> = {};
  const gridOptions: Record<string, any> = {};
  const defaultOptions = Grid.defaultOptions;

  for (const name in options) {
    const value = options[name];

    if (!(name in IGNORE_PROPERITES_MAP)) {
      gridOptions[name] = value;
    }

    if (name in defaultOptions) {
      nextOptions[name] = value;
    }
  }
  return {
    ...nextOptions,
    gridOptions,
  };
}

export function categorize<Item extends InfiniteGridItemInfo = InfiniteGridItem>(items: Item[]) {
  const groups: Array<CategorizedGroup<Item>> = [];
  const groupKeys: Record<string | number, CategorizedGroup<Item>> = {};
  const registeredGroupKeys: Record<string | number, boolean> = {};

  items.filter((item) => item.groupKey != null).forEach(({ groupKey }) => {
    registeredGroupKeys[groupKey!] = true;
  });

  let generatedGroupKey: number | string;
  let isContinuousGroupKey = false;

  items.forEach((item, i) => {
    if (item.groupKey != null) {
      isContinuousGroupKey = false;
    } else if (!item.inserted && items[i - 1]) {
      // In case of framework, inserted is false.
      // If groupKey is not set, the group key of the previous item is followed.
      item.groupKey = items[i - 1].groupKey!;
      isContinuousGroupKey = false;
    } else {
      if (!isContinuousGroupKey) {
        generatedGroupKey = makeKey(registeredGroupKeys);
        isContinuousGroupKey = true;
        registeredGroupKeys[generatedGroupKey] = true;
      }
      item.groupKey = generatedGroupKey;
    }

    const groupKey = item.groupKey;
    let group = groupKeys[groupKey];

    if (!group) {
      group = {
        groupKey,
        items: [],
      };
      groupKeys[groupKey] = group;
      groups.push(group);
    }

    group.items.push(item);
  });
  return groups;
}

export function getNextCursors(
  prevKeys: Array<string | number>,
  nextKeys: Array<string | number>,
  prevStartCursor: number,
  prevEndCursor: number,
) {
  const result = diff(prevKeys, nextKeys, (key) => key);
  let nextStartCursor = -1;
  let nextEndCursor = -1;

  // sync cursors
  result.maintained.forEach(([prevIndex, nextIndex]) => {
    if (prevStartCursor <= prevIndex && prevIndex <= prevEndCursor) {
      if (nextStartCursor === -1) {
        nextStartCursor = nextIndex;
        nextEndCursor = nextIndex;
      } else {
        nextStartCursor = Math.min(nextStartCursor, nextIndex);
        nextEndCursor = Math.max(nextEndCursor, nextIndex);
      }
    }
  });
  return {
    startCursor: nextStartCursor,
    endCursor: nextEndCursor,
  };
}
export function splitVirtualGroups<Group extends { type: GROUP_TYPE, groupKey: string | number }>(
  groups: Group[],
  direction: "start" | "end",
  nextGroups: CategorizedGroup<InfiniteGridItemStatus>[],
) {
  let virtualGroups: Group[] = [];

  if (direction === "start") {
    const index = findIndex(groups, (group) => group.type === GROUP_TYPE.NORMAL);

    if (index === -1) {
      return [];
    }
    // Get the virtual group maintained in the group from the next group.
    const endMaintainedIndex = findIndex(groups, (group) => {
      return findIndex(nextGroups, (nextGroup) => nextGroup.groupKey === group.groupKey) >= 0;
    });
    const endIndex = endMaintainedIndex >= 0 ? Math.min(index, endMaintainedIndex) : index;

    virtualGroups = groups.slice(0, endIndex);
  } else {
    const index = findLastIndex(groups, (group) => group.type === GROUP_TYPE.NORMAL);

    if (index === -1) {
      return [];
    }
    const startMaintainedIndex = findLastIndex(groups, (group) => {
      return findIndex(nextGroups, (nextGroup) => nextGroup.groupKey === group.groupKey) >= 0;
    });
    const startIndex = startMaintainedIndex >= 0 ? Math.max(index, startMaintainedIndex) : index;

    virtualGroups = groups.slice(startIndex + 1);
  }

  return virtualGroups;
}

export function getFirstRenderingItems(
  nextItems: InfiniteGridItemStatus[],
  horizontal: boolean,
) {
  const groups = categorize(nextItems);

  if (!groups[0]) {
    return [];
  }
  return groups[0].items.map((item) => {
    return new InfiniteGridItem(horizontal, {
      ...item,
    });
  });
}
export function getRenderingItemsByStatus(
  groupManagerStatus: GroupManagerStatus,
  nextItems: InfiniteGridItemStatus[],
  usePlaceholder: boolean,
  horizontal: boolean,
) {
  const prevGroups = groupManagerStatus.groups;
  const groups = categorize(nextItems);

  const startVirtualGroups = splitVirtualGroups(prevGroups, "start", groups);
  const endVirtualGroups = splitVirtualGroups(prevGroups, "end", groups);
  const nextGroups = [
    ...startVirtualGroups,
    ...groups,
    ...endVirtualGroups,
  ] as Array<InfiniteGridGroupStatus | CategorizedGroup<InfiniteGridItemStatus>>;
  const {
    startCursor,
    endCursor,
  } = getNextCursors(
    prevGroups.map((group) => group.groupKey),
    nextGroups.map((group) => group.groupKey),
    groupManagerStatus.cursors[0],
    groupManagerStatus.cursors[1],
  );

  let nextVisibleItems = flat(nextGroups.slice(startCursor, endCursor + 1).map((group) => {
    return group.items.map((item) => {
      return new InfiniteGridItem(horizontal, { ...item });
    });
  }));

  if (!usePlaceholder) {
    nextVisibleItems = nextVisibleItems.filter((item) => {
      return item.type !== ITEM_TYPE.VIRTUAL;
    });
  }

  return nextVisibleItems;
}

export function mountRenderingItems(items: InfiniteGridItemInfo[], options: RenderingOptions) {
  const {
    grid,
    usePlaceholder,
    useLoading,
    useFirstRender,
    status,
  } = options;
  if (!grid) {
    return;
  }
  if (usePlaceholder) {
    grid.setPlaceholder({});
  }
  if (useLoading) {
    grid.setLoading({});
  }
  if (status) {
    grid.setStatus(status, true);
  }

  grid.syncItems(items);

  if (useFirstRender && !status && grid.getGroups().length) {
    grid.setCursors(0, 0, true);
  }
}
export function getRenderingItems(items: InfiniteGridItemInfo[], options: RenderingOptions) {
  const {
    status,
    usePlaceholder,
    useLoading,
    horizontal,
    useFirstRender,
    grid,
  } = options;
  let visibleItems: InfiniteGridItem[] = [];

  if (grid) {
    grid.setPlaceholder(usePlaceholder ? {} : null);
    grid.setLoading(useLoading ? {} : null);
    grid.syncItems(items);

    visibleItems = grid.getRenderingItems();
  } else if (status) {
    visibleItems = getRenderingItemsByStatus(status.groupManager, items, !!usePlaceholder, !!horizontal);
  } else if (useFirstRender) {
    visibleItems = getFirstRenderingItems(items, !!horizontal);
  }

  return visibleItems;
}

/* Class Decorator */
export function InfiniteGridGetterSetter(component: {
  prototype: InfiniteGrid<any>,
  propertyTypes: typeof GRID_PROPERTY_TYPES,
}) {
  const {
    prototype,
    propertyTypes,
  } = component;
  for (const name in propertyTypes) {
    const attributes: Record<string, any> = {
      enumerable: true,
      configurable: true,
      get(this: InfiniteGrid) {
        const options = this.groupManager.options;
        if (name in options) {
          return options[name];
        } else {
          return options.gridOptions[name];
        }
      },
      set(this: InfiniteGrid, value: any) {
        const prevValue = this.groupManager[name];

        if (prevValue === value) {
          return;
        }
        this.groupManager.gridOptions = {
          [name]: value,
        };
      },
    };
    Object.defineProperty(prototype, name, attributes);
  }
}

export function makeKey(
  registeredKeys: Record<string, any>,
  prefix = "",
) {
  let index = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const key = `infinitegrid_${prefix}${index++}`;

    if (!(key in registeredKeys)) {
      return key;
    }
  }
}

export function convertHTMLtoElement(html: string) {
  const dummy = document.createElement("div");

  dummy.innerHTML = html;
  return toArray(dummy.children);
}

export function convertInsertedItems(
  items: InfiniteGridInsertedItems,
  groupKey?: string | number,
): InfiniteGridItemInfo[] {
  let insertedItems: Array<string | HTMLElement | InfiniteGridItemInfo>;

  if (isString(items)) {
    insertedItems = convertHTMLtoElement(items);
  } else {
    insertedItems = items;
  }
  return insertedItems.map((item) => {
    let element!: HTMLElement;
    let html = "";
    let key!: string | number;

    if (isString(item)) {
      html = item;
    } else if ("parentNode" in item) {
      element = item;
      html = item.outerHTML;
    } else {
      // inserted is true when adding via a method.
      return { groupKey, inserted: true, ...item };
    }

    // inserted is true when adding via a method.
    return {
      key,
      groupKey,
      html,
      element,
      inserted: true,
    };
  });
}
export function toArray(nodes: HTMLCollection): HTMLElement[];
export function toArray<T>(nodes: { length: number, [key: number]: T }): T[];
export function toArray<T>(nodes: { length: number, [key: number]: T }): T[] {
  const array: T[] = [];

  if (nodes) {
    const length = nodes.length;

    for (let i = 0; i < length; i++) {
      array.push(nodes[i]);
    }
  }
  return array;
}


export function find<T>(arr: T[], callback: (value: T, index: number) => boolean): T | null {
  const length = arr.length;

  for (let i = 0; i < length; ++i) {
    const value = arr[i];

    if (callback(value, i)) {
      return value;
    }
  }

  return null;
}

export function findIndex<T>(arr: T[], callback: (value: T, index: number) => boolean) {
  const length = arr.length;
  for (let i = 0; i < length; ++i) {
    if (callback(arr[i], i)) {
      return i;
    }
  }

  return -1;
}

export function findLastIndex<T>(arr: T[], callback: (value: T, index: number) => boolean) {
  const length = arr.length;
  for (let i = length - 1; i >= 0; --i) {
    if (callback(arr[i], i)) {
      return i;
    }
  }

  return -1;
}

export function getItemInfo(info: InfiniteGridItemInfo) {
  const nextInfo: InfiniteGridItemInfo = {};

  for (const name in info) {
    if (name in ITEM_INFO_PROPERTIES) {
      nextInfo[name] = info[name];
    }
  }

  return nextInfo;
}

export function setPlaceholder(item: InfiniteGridItem, info: InfiniteGridItemStatus) {
  for (const name in info) {
    const value = info[name];

    if (isObject(value)) {
      item[name] = {
        ...item[name],
        ...value,
      };
    } else {
      item[name] = info[name];
    }
  }
}

export function isFlatOutline(start: number[], end: number[]) {
  return start.length === end.length && start.every((pos, i) => end[i] === pos);
}

export function range(length: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < length; ++i) {
    arr.push(i);
  }
  return arr;
}

export function flatGroups(groups: InfiniteGridGroup[]) {
  return flat(groups.map(({ grid }) => grid.getItems() as InfiniteGridItem[]));
}


export function filterVirtuals<T extends InfiniteGridItem | InfiniteGridGroup>(
  items: T[],
  includePlaceholders?: boolean
): T[] {
  if (includePlaceholders) {
    return [...items];
  } else {
    return items.filter((item) => item.type !== ITEM_TYPE.VIRTUAL);
  }
}

/**
 * Decorator that makes the method of InfiniteGrid available in the framework.
 * @ko 프레임워크에서 InfiniteGrid의 메소드를 사용할 수 있게 하는 데코레이터.
 * @private
 * @example
 * ```js
 * import { withInfiniteGridMethods } from "@egjs/infinitegrid";
 *
 * class Grid extends React.Component<Partial<InfiniteGridProps & InfiniteGridOptions>> {
 *   &#64;withInfiniteGridMethods
 *   private grid: NativeGrid;
 * }
 * ```
 */
export const withInfiniteGridMethods = withClassMethods(INFINITEGRID_METHODS);

