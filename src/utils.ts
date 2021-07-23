import Grid, { GRID_PROPERTY_TYPES } from "@egjs/grid";
import { IGNORE_PROPERITES_MAP } from "./consts";
import InfiniteGrid from "./InfiniteGrid";
import { InfiniteGridItem } from "./InfiniteGridItem";
import { CategorizedGroup, InfiniteGridInsertedItems, InfiniteGridItemInfo } from "./types";

export function isWindow(el: Window | Element): el is Window {
  return el === window;
}

export function isString(val: any): val is string {
  return typeof val === "string";
}

export function flat<T>(arr: T[][]): T[] {
  return arr.reduce((prev, cur) => {
    return [...prev, ...cur];
  }, []);
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

export function categorize(items: InfiniteGridItem[]) {
  const groups: CategorizedGroup[] = [];
  const groupKeys: Record<string | number, CategorizedGroup> = {};
  const registeredGroupKeys: Record<string | number, boolean> = {};

  items.filter((item) => item.groupKey != null).forEach(({ groupKey }) => {
    registeredGroupKeys[groupKey] = true;
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
export function GetterSetter(component: {
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
