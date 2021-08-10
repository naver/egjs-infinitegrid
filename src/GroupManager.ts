import Grid, {
  GetterSetter,
  GridFunction, GridOptions,
  GridOutlines, MOUNT_STATE, Properties, PROPERTY_TYPE,
  RenderOptions, UPDATE_STATE,
} from "@egjs/grid";
import { GROUP_TYPE, ITEM_TYPE, STATUS_TYPE } from "./consts";
import { InfiniteGridItem, InfiniteGridItemStatus } from "./InfiniteGridItem";
import { CategorizedGroup, InfiniteGridGroup, InfiniteGridItemInfo } from "./types";
import {
  categorize, filterVirtuals, findIndex, findLastIndex,
  flatGroups, getItemInfo, isNumber, makeKey,
  range,
  setPlaceholder,
  splitGridOptions, splitOptions, splitVirtualGroups,
} from "./utils";

export interface InfiniteGridGroupStatus {
  type: GROUP_TYPE;
  groupKey: string | number;
  items: InfiniteGridItemStatus[];
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
  public set gridOptions(options: Record<string, any>) {
    const {
      gridOptions,
      ...otherOptions
    } = splitGridOptions(options);

    const shouldRender = this._checkShouldRender(options);

    this.options.gridOptions = gridOptions;
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
    return filterVirtuals(this.groupItems, includePlaceholders);
  }
  public getVisibleItems(includePlaceholders?: boolean) {
    return filterVirtuals(this.items, includePlaceholders);
  }

  public getGroups(includePlaceholders?: boolean): InfiniteGridGroup[] {
    return filterVirtuals(this.groups, includePlaceholders);
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

    return filterVirtuals(groups, includePlaceholders);
  }


  public applyGrid(items: InfiniteGridItem[], direction: "end" | "start", outline: number[]): GridOutlines {
    items.forEach((item) => {
      item.mountState = MOUNT_STATE.MOUNTED;
    });

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
      const isVirtual = group.type === GROUP_TYPE.VIRTUAL && !gridItems[0];
      const appliedItems = gridItems.filter((item) => item.mountState !== MOUNT_STATE.UNCHECKED);
      let gridOutlines: GridOutlines;

      if (isVirtual) {
        gridOutlines = this._applyVirtualGrid(grid, direction, nextOutline);
      } else if (appliedItems.length) {
        gridOutlines = grid.applyGrid(appliedItems, direction, nextOutline);
      } else {
        gridOutlines = {
          start: [...nextOutline],
          end: [...nextOutline],
        };
      }

      grid.setOutlines(gridOutlines);
      nextOutline = gridOutlines[direction];
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
    const prevGroupKeys = this.groupKeys;
    let nextManagerGroups = categorize(nextItems);

    const startVirtualGroups = this._splitVirtualGroups("start", nextManagerGroups);
    const endVirtualGroups = this._splitVirtualGroups("end", nextManagerGroups);

    nextManagerGroups = [...startVirtualGroups, ...nextManagerGroups, ...endVirtualGroups];

    const nextGroups: InfiniteGridGroup[] = nextManagerGroups.map(({ groupKey, items }) => {
      const isVirtual = !items[0] || items[0].type === ITEM_TYPE.VIRTUAL;
      const grid = prevGroupKeys[groupKey]?.grid ?? this._makeGrid();

      grid.setItems(items);

      return {
        type: isVirtual ? GROUP_TYPE.VIRTUAL : GROUP_TYPE.NORMAL,
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

  public getGroupStatus(type?: STATUS_TYPE): GroupManagerStatus {
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
        type: isVirtualGroup || isVirtualItems ? GROUP_TYPE.VIRTUAL : GROUP_TYPE.NORMAL,
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
    const prevGroupKeys = this.groupKeys;

    const nextGroups: InfiniteGridGroup[] = status.groups.map(({
      type,
      groupKey,
      items,
      outlines,
    }) => {
      const nextItems = this._syncItemInfos(items);
      const grid = prevGroupKeys[groupKey]?.grid ?? this._makeGrid();

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
  public appendPlaceholders(items: number | InfiniteGridItemStatus[], groupKey?: string | number) {
    return this.insertPlaceholders("end", items, groupKey);
  }
  public prependPlaceholders(items: number | InfiniteGridItemStatus[], groupKey?: string | number) {
    return this.insertPlaceholders("start", items, groupKey);
  }
  public removePlaceholders(type: "start" | "end" | { groupKey: string | number}) {
    const groups = this.groups;
    const length = groups.length;

    if (type === "start") {
      const index = findIndex(groups, (group) => group.type === GROUP_TYPE.NORMAL);

      groups.splice(0, index);

    } else if (type === "end") {
      const index = findLastIndex(groups, (group) => group.type === GROUP_TYPE.NORMAL);

      groups.splice(index + 1, length - index - 1);
    } else {
      const groupKey = type.groupKey;

      const index = findIndex(groups, (group) => group.groupKey === groupKey);

      if (index > -1) {
        groups.splice(index, 1);
      }
    }

    this.syncItems(flatGroups(this.getGroups()));
  }
  public insertPlaceholders(
    direction: "start" | "end",
    items: number | InfiniteGridItemStatus[],
    groupKey: string | number = makeKey(this.groupKeys),
  ) {

    let infos: InfiniteGridItemInfo[] = [];

    if (isNumber(items)) {
      infos = range(items).map(() => ({ type: ITEM_TYPE.VIRTUAL, groupKey }));
    } else if (Array.isArray(items)) {
      infos = items.map((status) => ({
        groupKey,
        ...status,
        type: ITEM_TYPE.VIRTUAL,
      }));
    }
    const grid = this._makeGrid();
    const nextItems = this._syncItemInfos(infos, this.itemKeys);

    this._updatePlaceholder(nextItems);
    grid.setItems(nextItems);

    const group = {
      type: GROUP_TYPE.VIRTUAL,
      groupKey,
      grid,
      items: nextItems,
    };
    if (direction === "end") {
      this.groups.push(group);
      this.groupItems.push(...nextItems);
    } else {
      this.groups.splice(0, 0, group);
      this.groupItems.splice(0, 0, ...nextItems);
      if (this.startCursor > -1) {
        ++this.startCursor;
        ++this.endCursor;
      }
    }


    return {
      group,
      items: nextItems,
    };
  }

  private _getGroupItems() {
    return flatGroups(this.getGroups(true));
  }

  private _getGroupVisibleItems() {
    return flatGroups(this.getVisibleGroups(true));
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
        if (info.data) {
          prevItem.data = info.data;
        }
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
  private _splitVirtualGroups(direction: "start" | "end", nextGroups: CategorizedGroup[]) {
    return splitVirtualGroups(this.groups, direction, nextGroups);
  }
  private _updatePlaceholder(items = this.groupItems) {
    const placeholder = this._placeholder;

    if (!placeholder) {
      return;
    }

    items.filter((item) => item.type === ITEM_TYPE.VIRTUAL).forEach((item) => {
      setPlaceholder(item, placeholder);
    });
  }
  private _makeGrid() {
    const GridConstructor = this.options.gridConstructor!;
    const gridOptions = this.gridOptions;
    const container = this.containerElement;

    return new GridConstructor(container, {
      ...gridOptions,
      useFit: false,
      autoResize: false,
      renderOnPropertyChange: false,
      externalContainerManager: this.containerManager,
      externalItemRenderer: this.itemRenderer,
    });
  }
}

export interface GroupManager extends Properties<typeof GroupManager> {
  getItems(): InfiniteGridItem[];
}
