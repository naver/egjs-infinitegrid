import Grid, {
  GetterSetter,
  GridFunction, GridOptions,
  GridOutlines, Properties, PROPERTY_TYPE,
  RenderOptions, UPDATE_STATE,
} from "@egjs/grid";
import { diff } from "@egjs/list-differ";
import { GROUP_TYPE, ITEM_TYPE, STATUS_TYPE } from "./consts";
import { InfiniteGridItem, InfiniteGridItemStatus } from "./InfiniteGridItem";
import { CategorizedGroup, InfiniteGridGroup, InfiniteGridItemInfo } from "./types";
import {
  categorize, findIndex, findLastIndex,
  flat, getItemInfo, makeKey,
  setPlaceholder,
  splitGridOptions, splitOptions,
} from "./utils";

export interface InfiniteGridGroupStatus {
  type: GROUP_TYPE;
  groupKey: string | number;
  items: Array<Partial<InfiniteGridItemStatus>>;
  outlines: GridOutlines;
}

export interface GroupManagerOptions extends GridOptions {
  gridConstructor: GridFunction | null;
  gridOptions: Record<string, any>;
}

export interface GroupManagerStatus {
  startCursor: number;
  endCursor: number;
  groups: InfiniteGridGroupStatus[];
}

@GetterSetter
export class GroupManager extends Grid<GroupManagerOptions> {
  public static defaultOptions: Required<GroupManagerOptions> = {
    ...Grid.defaultOptions,
    gridConstructor: null,
    gridOptions: {},
  };
  public static propertyTypes = {
    ...Grid.propertyTypes,
    gridConstructor: PROPERTY_TYPE.PROPERTY,
    gridOptions: PROPERTY_TYPE.PROPERTY,
  } as const;
  protected items: InfiniteGridItem[];
  protected groupItems: InfiniteGridItem[] = [];
  protected groups: InfiniteGridGroup[] = [];
  protected itemKeys: Record<string | number, InfiniteGridItem> = {};
  protected groupKeys: Record<string | number, InfiniteGridGroup> = {};
  protected startCursor = 0;
  protected endCursor = 0;
  private _placeholder: Partial<InfiniteGridItemStatus> | null = null;

  constructor(container: HTMLElement, options: GroupManagerOptions) {
    super(container, splitOptions(options));
  }
  public setGridOptions(options: Record<string, any>): void {
    const {
      gridOptions,
      ...otherOptions
    } = splitGridOptions(options);

    const shouldRender = this._checkShouldRender(options);

    this.gridOptions = gridOptions;
    this.groups.forEach(({ grid }) => {
      for (const name in options) {
        (grid as any)[name] = options[name];
      }
    });
    for (const name in otherOptions) {
      this[name] = otherOptions[name];
    }
    if (shouldRender) {
      this.scheduleRender();
    }
  }

  public getItemByKey(key: string | number): InfiniteGridItem | null {
    return this.itemKeys[key] || null;
  }

  public getGroupItems(includePlaceholders?: boolean) {
    const items = this.groupItems;

    if (includePlaceholders) {
      return items;
    } else {
      return items.filter((item) => item.type !== ITEM_TYPE.VIRTUAL);
    }
  }
  public getVisibleItems(includePlaceholders?: boolean) {
    const items = this.items;

    if (includePlaceholders) {
      return items;
    } else {
      return items.filter((item) => item.type !== ITEM_TYPE.VIRTUAL);
    }
  }

  public getGroups(includePlaceholders?: boolean): InfiniteGridGroup[] {
    const groups = this.groups;

    if (includePlaceholders) {
      return groups;
    } else {
      return groups.filter((group) => {
        return group.type !== GROUP_TYPE.VIRTUAL && group.items[0].type !== ITEM_TYPE.VIRTUAL;
      });
    }
  }

  public hasPlaceholder() {
    return !!this._placeholder;
  }

  public setPlaceholder(placeholder: Partial<InfiniteGridItemStatus> | null) {
    this._placeholder = placeholder;
    this._updatePlaceholder();
  }

  public getVisibleGroups(includePlaceholders?: boolean): InfiniteGridGroup[] {
    const groups = this.groups.slice(this.startCursor, this.endCursor + 1);

    if (includePlaceholders) {
      return groups;
    } else {
      return groups.filter((group) => {
        return group.type !== GROUP_TYPE.VIRTUAL && group.items[0].type !== ITEM_TYPE.VIRTUAL;
      });
    }
  }


  public applyGrid(items: InfiniteGridItem[], direction: "end" | "start", outline: number[]): GridOutlines {
    let nextOutline = outline;

    const originalGroups = this.groups;
    const length = originalGroups.length;

    if (!length) {
      return {
        start: [],
        end: [],
      };
    }

    const groups = originalGroups.slice();

    if (direction === "start") {
      groups.reverse();
    }
    groups.forEach((group) => {
      const grid = group.grid;
      const gridItems = grid.getItems();
      const isVirtual = group.type === GROUP_TYPE.VIRTUAL && !gridItems.length;
      const gridOutline = isVirtual
        ? this._applyVirtualGrid(grid, direction, outline)
        : grid.applyGrid(gridItems, direction, nextOutline);

      grid.setOutlines(gridOutline);

      nextOutline = gridOutline[direction];
    });

    return {
      start: originalGroups[0].grid.getOutlines().start,
      end: originalGroups[length - 1].grid.getOutlines().end,
    };
  }

  public syncItems(nextItemInfos: InfiniteGridItemInfo[]) {
    const prevItemKeys = this.itemKeys;

    this.itemKeys = {};
    const nextItems = this._syncItemInfos(nextItemInfos.map((info) => getItemInfo(info)), prevItemKeys);
    const container = this.getContainerElement();
    const prevGroupKeys = this.groupKeys;
    let nextManagerGroups = categorize(nextItems);
    const GridConstructor = this.options.gridConstructor!;
    const gridOptions = this.gridOptions;

    const startVirtualGroups = this._getVirtualGroups("start", nextManagerGroups);
    const endVirtualGroups = this._getVirtualGroups("end", nextManagerGroups);

    nextManagerGroups = [...startVirtualGroups, ...nextManagerGroups, ...endVirtualGroups];

    const nextGroups: InfiniteGridGroup[] = nextManagerGroups.map(({ groupKey, items }) => {
      const firstItem = items[0];
      const isVirtual = firstItem.type !== ITEM_TYPE.ITEM;
      const grid = prevGroupKeys[groupKey]?.grid ?? new GridConstructor(container, {
        ...gridOptions,
        useFit: false,
        autoResize: false,
        renderOnPropertyChange: false,
        externalContainerManager: this.containerManager,
        externalItemRenderer: this.itemRenderer,
      });

      grid.setItems(items);

      return {
        type: isVirtual ? GROUP_TYPE.VIRTUAL : GROUP_TYPE.GROUP,
        groupKey,
        grid,
        items,
      };
    });

    this._registerGroups(nextGroups);
  }

  public renderItems(options: RenderOptions = {}) {
    if (options.useResize) {
      this.groupItems.forEach((item) => {
        item.updateState = UPDATE_STATE.NEED_UPDATE;
      });
    }
    return super.renderItems(options);
  }

  public setCursors(startCursor: number, endCursor: number) {
    this.startCursor = startCursor;
    this.endCursor = endCursor;
    this.items = this._getGroupVisibleItems();
  }

  public getStartCursor() {
    return this.startCursor;
  }

  public getEndCursor() {
    return this.endCursor;
  }

  public getGroupStatus(type: STATUS_TYPE): GroupManagerStatus {
    let startCursor = this.startCursor;
    let endCursor = this.endCursor;
    const isMinimizeItems = type === STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS;
    const isMinimizeGroups = type === STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS;
    let groups: InfiniteGridGroup[];

    if (type === STATUS_TYPE.REMOVE_INVISIBLE_GROUPS) {
      groups = this.getVisibleGroups();
      endCursor -= startCursor;
      startCursor = 0;
    } else {
      groups = this.getGroups();
    }

    const groupStatus: InfiniteGridGroupStatus[] = groups.map(({ grid, groupKey }, i) => {
      const isOutsideCursor = i < startCursor || endCursor < i;
      const isVirtualItems = isMinimizeItems && isOutsideCursor;
      const isVirtualGroup = isMinimizeGroups && isOutsideCursor;
      const gridItems = grid.getItems() as InfiniteGridItem[];
      const items = isVirtualGroup
        ? []
        : gridItems.map((item) => isVirtualItems ? item.getVirtualStatus() : item.getStatus());

      return {
        type: isVirtualGroup ? GROUP_TYPE.VIRTUAL : GROUP_TYPE.GROUP,
        groupKey: groupKey,
        outlines: grid.getOutlines(),
        items,
      };
    });

    return {
      startCursor,
      endCursor,
      groups: groupStatus,
    };
  }
  public setGroupStatus(status: GroupManagerStatus) {
    this.itemKeys = {};
    this.groupItems = [];
    this.items = [];
    const container = this.getContainerElement();
    const prevGroupKeys = this.groupKeys;
    const GridConstructor = this.options.gridConstructor!;
    const gridOptions = this.gridOptions;

    const nextGroups: InfiniteGridGroup[] = status.groups.map(({
      type,
      groupKey,
      items,
      outlines,
    }) => {
      const nextItems = this._syncItemInfos(items);
      const grid = prevGroupKeys[groupKey]?.grid ?? new GridConstructor(container, {
        ...gridOptions,
        useFit: false,
        autoResize: false,
        renderOnPropertyChange: false,
        externalContainerManager: this.containerManager,
        externalItemRenderer: this.itemRenderer,
      });

      grid.setOutlines(outlines);
      grid.setItems(nextItems);

      return {
        type,
        groupKey,
        grid,
        items: nextItems,
      };
    });

    this._registerGroups(nextGroups);
    this._updatePlaceholder();
    this.setCursors(status.startCursor, status.endCursor);
  }

  private _getGroupItems() {
    return flat(this.getGroups(true).map(({ grid }) => grid.getItems() as InfiniteGridItem[]));
  }

  private _getGroupVisibleItems() {
    return flat(this.getVisibleGroups(true).map(({ grid }) => grid.getItems() as InfiniteGridItem[]));
  }

  private _checkShouldRender(options: Record<string, any>) {
    const GridConstructor = this.options.gridConstructor!;
    const prevOptions = this.gridOptions;
    const propertyTypes = GridConstructor.propertyTypes;

    for (const name in prevOptions) {
      if (!(name in options) && propertyTypes[name] === PROPERTY_TYPE.RENDER_PROPERTY) {
        return true;
      }
    }
    for (const name in options) {
      if (prevOptions[name] !== options[name] && propertyTypes[name] === PROPERTY_TYPE.RENDER_PROPERTY) {
        return true;
      }
    }
    return false;
  }
  private _applyVirtualGrid(grid: Grid, direction: "start" | "end", outline: number[]) {
    const prevOutlines = grid.getOutlines();
    const prevOutline = prevOutlines[direction === "end" ? "start" : "end"];

    if (
      prevOutline.length !== outline.length
      || prevOutline.some((value, i) => value !== outline[i])
    ) {
      return {
        start: [...outline],
        end: [...outline],
      };
    }
    return prevOutlines;
  }
  private _syncItemInfos(
    nextItemInfos: InfiniteGridItemStatus[],
    prevItemKeys: Record<string | number, InfiniteGridItem> = {},
  ) {
    const horizontal = this.options.horizontal;
    const nextItemKeys = this.itemKeys;

    nextItemInfos.filter((info) => info.key != null).forEach((info) => {
      const key = info.key!;
      const prevItem = prevItemKeys[key];

      if (!prevItem) {
        nextItemKeys[key] = new InfiniteGridItem(horizontal, {
          ...info,
        });
      } else if (prevItem.type === ITEM_TYPE.VIRTUAL && info.type !== ITEM_TYPE.VIRTUAL) {
        nextItemKeys[key] = new InfiniteGridItem(horizontal, {
          orgRect: prevItem.orgRect,
          rect: prevItem.rect,
          ...info,
        });
      } else {
        nextItemKeys[key] = prevItem;
      }
    });
    const nextItems = nextItemInfos.map((info) => {
      let key = info.key!;

      if (info.key == null) {
        key = makeKey(nextItemKeys);
        nextItemKeys[key] = new InfiniteGridItem(horizontal, {
          ...info,
          key,
        });
      }
      return nextItemKeys[key];
    });
    return nextItems;
  }
  private _registerGroups(groups: InfiniteGridGroup[]) {
    const nextGroupKeys: Record<string | number, InfiniteGridGroup> = {};

    groups.forEach((group) => {
      nextGroupKeys[group.groupKey] = group;
    });

    this.groups = groups;
    this.groupKeys = nextGroupKeys;
    this.groupItems = this._getGroupItems();
  }
  private _getVirtualGroups(direction: "start" | "end", nextGroups: CategorizedGroup[]) {
    const groups = this.groups;
    let virtualGroups: InfiniteGridGroup[] = [];

    if (direction === "start") {
      const index = findIndex(groups, (group) => group.type === GROUP_TYPE.GROUP);

      if (index === -1) {
        return [];
      }
      virtualGroups = groups.slice(0, index);
    } else {
      const index = findLastIndex(groups, (group) => group.type === GROUP_TYPE.GROUP);

      if (index === -1) {
        return [];
      }
      virtualGroups = groups.slice(index + 1);
    }
    virtualGroups = diff(virtualGroups, nextGroups, ({ groupKey }) => groupKey).removed.map((index) => {
      return virtualGroups[index];
    }).reverse();

    return virtualGroups;
  }
  private _updatePlaceholder() {
    const placeholder = this._placeholder;

    if (!placeholder) {
      return;
    }

    this.groupItems.filter((item) => item.type === ITEM_TYPE.VIRTUAL).forEach((item) => {
      setPlaceholder(item, placeholder);
    });
  }
}

export interface GroupManager extends Properties<typeof GroupManager> {
  getItems(): InfiniteGridItem[];
}
