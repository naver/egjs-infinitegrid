import Grid, { GRID_PROPERTY_TYPES, withMethods } from "@egjs/grid";
import { IGNORE_PROPERITES_MAP, INFINITEGRID_METHODS, ITEM_INFO_PROPERTIES, ITEM_TYPE } from "./consts";
import InfiniteGrid from "./InfiniteGrid";
import { InfiniteGridItem, InfiniteGridItemStatus } from "./InfiniteGridItem";
import { CategorizedGroup, InfiniteGridGroup, InfiniteGridInsertedItems, InfiniteGridItemInfo } from "./types";

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

  items.forEach((item) => {
    if (item.groupKey != null) {
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
        this.groupManager.setGridOptions({
          [name]: value,
        });
      },
    };
    Object.defineProperty(prototype, name, attributes);
  }
}

export function makeKey(registeredKeys: Record<string, any>) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const key = new Date().getTime() + Math.floor(Math.random() * 1000);

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
      return { groupKey, ...item };
    }

    return {
      key,
      groupKey,
      html,
      element,
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
  const nextInfo: InfiniteGridItemInfo  = {};

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
    return items;
  } else {
    return items.filter((item) => item.type !== ITEM_TYPE.VIRTUAL);
  }
}

/**
 * Decorator that makes the method of InfiniteGrid available in the framework.
 * @ko 프레임워크에서 InfiniteGrid의 메소드를 사용할 수 있게 하는 데코레이터.
 * @memberof InfiniteGrid
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
export const withInfiniteGridMethods = withMethods(INFINITEGRID_METHODS);

