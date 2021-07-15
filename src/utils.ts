import Grid from "@egjs/grid";
import { IGNORE_PROPERITES_MAP } from "./consts";
import { InfiniteGridItem } from "./InfiniteGridItem";
import { CategorizedGroup } from "./types";

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
  const groupKeys: Record<string, CategorizedGroup> = {};

  items.forEach((item) => {
    const { groupKey } = item;
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
