import Grid, {
  GetterSetter,
  GridFunction, GridItem, GridOptions,
  GridOutlines, MOUNT_STATE, Properties, PROPERTY_TYPE,
  RenderOptions, UPDATE_STATE,
} from "@egjs/grid";
import { GROUP_TYPE, ITEM_TYPE, STATUS_TYPE } from "./consts";
import { InfiniteGridItem, InfiniteGridItemStatus } from "./InfiniteGridItem";
import { LoadingGrid, LOADING_GROUP_KEY } from "./LoadingGrid";
import { CategorizedGroup, InfiniteGridGroup, InfiniteGridItemInfo } from "./types";
import {
  categorize, filterVirtuals, findIndex, findLastIndex,
  flat,
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
  appliedItemChecker?: (item: InfiniteGridItem, grid: Grid) => boolean;
  gridConstructor: GridFunction | null;
  gridOptions: Record<string, any>;
}

export interface GroupManagerStatus {
  cursors: [number, number];
  orgCursors: [number, number];
  itemCursors: [number, number];
  startGroupKey: number | string;
  endGroupKey: number | string;
  groups: InfiniteGridGroupStatus[];
  outlines: GridOutlines;
}

@GetterSetter
export class GroupManager extends Grid<GroupManagerOptions> {
  public static defaultOptions: Required<GroupManagerOptions> = {
    ...Grid.defaultOptions,
    appliedItemChecker: () => false,
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
  private _loadingGrid!: LoadingGrid;
  private _mainGrid!: Grid;

  constructor(container: HTMLElement, options: GroupManagerOptions) {
    super(container, splitOptions(options));

    this._loadingGrid = new LoadingGrid(container, {
      externalContainerManager: this.containerManager,
      useFit: false,
      autoResize: false,
      renderOnPropertyChange: false,
      gap: this.gap,
    });
    this._mainGrid = this._makeGrid();
  }
  public set gridOptions(options: Record<string, any>) {
    const {
      gridOptions,
      ...otherOptions
    } = splitGridOptions(options);

    const shouldRender = this._checkShouldRender(options);
    this.options.gridOptions = {
      ...this.options.gridOptions,
      ...gridOptions,
    };
    [this._mainGrid, ...this.groups.map(({ grid }) => grid)].forEach((grid) => {
      for (const name in options) {
        (grid as any)[name] = options[name];
      }
    });
    for (const name in otherOptions) {
      this[name] = otherOptions[name];
    }

    this._loadingGrid.gap = this.gap;
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

  public getRenderingItems() {
    if (this.hasPlaceholder()) {
      return this.items;
    } else {
      return this.items.filter((item) => item.type !== ITEM_TYPE.VIRTUAL);
    }
  }

  public getGroups(includePlaceholders?: boolean): InfiniteGridGroup[] {
    return filterVirtuals(this.groups, includePlaceholders);
  }

  public hasVisibleVirtualGroups() {
    return this.getVisibleGroups(true).some((group) => group.type === GROUP_TYPE.VIRTUAL);
  }
  public hasPlaceholder() {
    return !!this._placeholder;
  }
  public hasLoadingItem() {
    return !!this._getLoadingItem();
  }

  public updateItems(items = this.groupItems, options?: RenderOptions) {
    return super.updateItems(items, options);
  }
  public setPlaceholder(placeholder: Partial<InfiniteGridItemStatus> | null) {
    this._placeholder = placeholder;
    this._updatePlaceholder();
  }

  public getLoadingType() {
    return this._loadingGrid.type;
  }

  public startLoading(type: "start" | "end") {
    this._loadingGrid.type = type;
    this.items = this._getRenderingItems();

    return true;
  }

  public endLoading() {
    const prevType = this._loadingGrid.type;

    this._loadingGrid.type = "";
    this.items = this._getRenderingItems();
    return !!prevType;
  }

  public setLoading(loading: Partial<InfiniteGridItemStatus> | null) {
    this._loadingGrid.setLoadingItem(loading);
    this.items = this._getRenderingItems();
  }

  public getVisibleGroups(includePlaceholders?: boolean): InfiniteGridGroup[] {
    const groups = this.groups.slice(this.startCursor, this.endCursor + 1);

    return filterVirtuals(groups, includePlaceholders);
  }

  public getComputedOutlineLength(items = this.items) {
    return this._mainGrid.getComputedOutlineLength(items);
  }
  public getComputedOutlineSize(items = this.items) {
    return this._mainGrid.getComputedOutlineSize(items);
  }

  public applyGrid(items: InfiniteGridItem[], direction: "end" | "start", outline: number[]): GridOutlines {
    const renderingGroups = this.groups.slice();

    if (!renderingGroups.length) {
      return {
        start: [],
        end: [],
      };
    }


    const loadingGrid = this._loadingGrid;

    if (loadingGrid.getLoadingItem()) {
      if (loadingGrid.type === "start") {
        renderingGroups.unshift(this._getLoadingGroup());
      } else if (loadingGrid.type === "end") {
        renderingGroups.push(this._getLoadingGroup());
      }
    }

    const groups = renderingGroups.slice();

    let nextOutline = outline;

    if (direction === "start") {
      groups.reverse();
    }

    const appliedItemChecker = this.options.appliedItemChecker;
    const groupItems = this.groupItems;
    const outlineLength = this.getComputedOutlineLength(groupItems);
    const outlineSize = this.getComputedOutlineSize(groupItems);
    const itemRenderer = this.itemRenderer;

    groups.forEach((group) => {
      const grid = group.grid;
      const gridItems = grid.getItems() as InfiniteGridItem[];
      const isVirtual = group.type === GROUP_TYPE.VIRTUAL && !gridItems[0];

      grid.outlineLength = outlineLength;
      grid.outlineSize = outlineSize;

      const appliedItems = gridItems.filter((item) => {
        if (item.mountState === MOUNT_STATE.UNCHECKED || !item.rect.width) {
          itemRenderer.updateItem(item, true);
        }
        return (item.orgRect.width && item.rect.width) || appliedItemChecker(item, grid);
      });
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
      start: renderingGroups[0].grid.getOutlines().start,
      end: renderingGroups[renderingGroups.length - 1].grid.getOutlines().end,
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
    nextManagerGroups = [...startVirtualGroups, ...this._mergeVirtualGroups(nextManagerGroups), ...endVirtualGroups];

    const nextGroups: InfiniteGridGroup[] = nextManagerGroups.map(({ groupKey, items }) => {
      const isVirtual = !items[0] || items[0].type === ITEM_TYPE.VIRTUAL;
      const grid = prevGroupKeys[groupKey]?.grid ?? this._makeGrid();
      const gridItems = isVirtual ? items : items.filter(({ type }) => type === ITEM_TYPE.NORMAL);

      grid.setItems(gridItems);

      return {
        type: isVirtual ? GROUP_TYPE.VIRTUAL : GROUP_TYPE.NORMAL,
        groupKey,
        grid,
        items: gridItems,
        renderItems: items,
      };
    });

    this._registerGroups(nextGroups);
  }

  public renderItems(options: RenderOptions = {}) {
    if (options.useResize) {
      this.groupItems.forEach((item) => {
        item.updateState = UPDATE_STATE.NEED_UPDATE;
      });
      const loadingItem = this._getLoadingItem();

      if (loadingItem) {
        loadingItem.updateState = UPDATE_STATE.NEED_UPDATE;
      }
    }
    return super.renderItems(options);
  }

  public setCursors(startCursor: number, endCursor: number) {
    this.startCursor = startCursor;
    this.endCursor = endCursor;
    this.items = this._getRenderingItems();
  }

  public getStartCursor() {
    return this.startCursor;
  }

  public getEndCursor() {
    return this.endCursor;
  }

  public getGroupStatus(type?: STATUS_TYPE, includePlaceholders?: boolean): GroupManagerStatus {
    const orgStartCursor = this.startCursor;
    const orgEndCursor = this.endCursor;
    const orgGroups = this.groups;
    const startGroup = orgGroups[orgStartCursor];
    const endGroup = orgGroups[orgEndCursor];

    let startCursor = orgStartCursor;
    let endCursor = orgEndCursor;

    const isMinimizeItems = type === STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS;
    const isMinimizeGroups = type === STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS;
    let groups: InfiniteGridGroup[];

    if (type === STATUS_TYPE.REMOVE_INVISIBLE_GROUPS) {
      groups = this.getVisibleGroups(includePlaceholders);
      endCursor = groups.length - 1;
      startCursor = 0;
    } else {
      groups = this.getGroups(includePlaceholders);

      if (!includePlaceholders) {
        startCursor = -1;
        endCursor = -1;

        for (let orgIndex = orgStartCursor; orgIndex <= orgEndCursor; ++orgIndex) {
          const orgGroup = orgGroups[orgIndex];

          if (orgGroup && orgGroup.type !== GROUP_TYPE.VIRTUAL) {
            startCursor = groups.indexOf(orgGroup);
            break;
          }
        }
        for (let orgIndex = orgEndCursor; orgIndex >= orgStartCursor; --orgIndex) {
          const orgGroup = orgGroups[orgIndex];

          if (orgGroup && orgGroup.type !== GROUP_TYPE.VIRTUAL) {
            endCursor = groups.lastIndexOf(orgGroup);
            break;
          }
        }
      }
    }

    const groupStatus: InfiniteGridGroupStatus[] = groups.map(({ grid, groupKey }, i) => {
      const isOutsideCursor = i < startCursor || endCursor < i;
      const isVirtualItems = isMinimizeItems && isOutsideCursor;
      const isVirtualGroup = isMinimizeGroups && isOutsideCursor;
      const gridItems = grid.getItems() as InfiniteGridItem[];
      const items = isVirtualGroup
        ? []
        : gridItems.map((item) => isVirtualItems ? item.getVirtualStatus() : item.getMinimizedStatus());

      return {
        type: isVirtualGroup || isVirtualItems ? GROUP_TYPE.VIRTUAL : GROUP_TYPE.NORMAL,
        groupKey: groupKey,
        outlines: grid.getOutlines(),
        items,
      };
    });


    const totalItems = this.getGroupItems();

    const itemStartCursor = totalItems.indexOf(startGroup?.items[0]);
    const itemEndCursor = totalItems.indexOf(endGroup?.items.slice().reverse()[0]);

    return {
      cursors: [startCursor, endCursor],
      orgCursors: [orgStartCursor, orgEndCursor],
      itemCursors: [itemStartCursor, itemEndCursor],
      startGroupKey: startGroup?.groupKey,
      endGroupKey: endGroup?.groupKey,
      groups: groupStatus,
      outlines: this.outlines,
    };
  }
  protected fitOutlines(useFit = this.useFit) {
    const groups = this.groups;
    const firstGroup = groups[0];

    if (!firstGroup) {
      return;
    }
    const outlines = firstGroup.grid.getOutlines();
    const startOutline = outlines.start;
    const outlineOffset = startOutline.length ? Math.min(...startOutline) : 0;

    // If the outline is less than 0, a fit occurs forcibly.
    if (!useFit && outlineOffset > 0) {
      return;
    }

    groups.forEach(({ grid }) => {
      const { start, end } = grid.getOutlines();

      grid.setOutlines({
        start: start.map((point) => point - outlineOffset),
        end: end.map((point) => point - outlineOffset),
      });
    });

    this.groupItems.forEach((item) => {
      const contentPos = item.cssContentPos;

      if (!isNumber(contentPos)) {
        return;
      }
      item.cssContentPos = contentPos - outlineOffset;
    });
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
        renderItems: nextItems,
      };
    });

    this.setOutlines(status.outlines);
    this._registerGroups(nextGroups);
    this._updatePlaceholder();
    this.setCursors(status.cursors[0], status.cursors[1]);
  }
  public appendPlaceholders(items: number | InfiniteGridItemStatus[], groupKey?: string | number) {
    return this.insertPlaceholders("end", items, groupKey);
  }
  public prependPlaceholders(items: number | InfiniteGridItemStatus[], groupKey?: string | number) {
    return this.insertPlaceholders("start", items, groupKey);
  }
  public removePlaceholders(type: "start" | "end" | { groupKey: string | number }) {
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
    groupKey: string | number = makeKey(this.groupKeys, "virtual_"),
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
      renderItems: nextItems,
    };

    this.groupKeys[groupKey] = group;

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

  public shouldRerenderItems() {
    let isRerender = false;

    this.getVisibleGroups().forEach((group) => {
      const items = group.items;

      if (
        items.length === group.renderItems.length
        || items.every((item) => item.mountState === MOUNT_STATE.UNCHECKED)
      ) {
        return;
      }
      isRerender = true;
      group.renderItems = [...items];
    });
    if (isRerender) {
      this.items = this._getRenderingItems();
    }
    return isRerender;
  }

  protected _updateItems(items: GridItem[]): void {
    this.itemRenderer.updateEqualSizeItems(items, this.groupItems);
  }

  private _getGroupItems() {
    return flatGroups(this.getGroups(true));
  }

  private _getRenderingItems() {
    const items = flat(this.getVisibleGroups(true).map((item) => item.renderItems));


    const loadingGrid = this._loadingGrid;
    const loadingItem = loadingGrid.getLoadingItem();

    if (loadingItem) {
      if (loadingGrid.type === "end") {
        items.push(loadingItem);
      } else if (loadingGrid.type === "start") {
        items.unshift(loadingItem);
      }
    }

    return items;
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
    const startOutline = outline.length ? [...outline] : [0];
    const prevOutlines = grid.getOutlines();
    const prevOutline = prevOutlines[direction === "end" ? "start" : "end"];

    if (
      prevOutline.length !== startOutline.length
      || prevOutline.some((value, i) => value !== startOutline[i])
    ) {
      return {
        start: [...startOutline],
        end: [...startOutline],
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
        if (info.groupKey != null) {
          prevItem.groupKey = info.groupKey!;
        }
        if (info.element) {
          prevItem.element = info.element;
        }
        nextItemKeys[key] = prevItem;
      }
    });
    const nextItems = nextItemInfos.map((info) => {
      let key = info.key!;

      if (info.key == null) {
        key = makeKey(nextItemKeys, info.type === ITEM_TYPE.VIRTUAL ? "virtual_" : "");
      }
      let item = nextItemKeys[key];

      if (!item) {
        const prevItem = prevItemKeys[key];

        if (prevItem) {
          item = prevItem;

          if (info.data) {
            item.data = info.data;
          }
          if (info.element) {
            item.element = info.element;
          }
        } else {
          item = new InfiniteGridItem(horizontal, {
            ...info,
            key,
          });
        }
        nextItemKeys[key] = item;
      }
      return item;
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
    const groups = splitVirtualGroups(this.groups, direction, nextGroups);
    const itemKeys = this.itemKeys;

    groups.forEach(({ renderItems }) => {
      renderItems.forEach((item) => {
        itemKeys[item.key] = item;
      });
    });

    return groups;
  }
  private _mergeVirtualGroups(groups: Array<CategorizedGroup<InfiniteGridItem>>) {
    const itemKeys = this.itemKeys;
    const groupKeys = this.groupKeys;

    groups.forEach((group) => {
      const prevGroup = groupKeys[group.groupKey];

      if (!prevGroup) {
        return;
      }
      const items = group.items;

      if (items.every((item) => item.mountState === MOUNT_STATE.UNCHECKED)) {
        prevGroup.renderItems.forEach((item) => {
          if (item.type === ITEM_TYPE.VIRTUAL && !itemKeys[item.key]) {
            items.push(item);
            itemKeys[item.key] = item;
          }
        });
      }
    });
    return groups;
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
      useResizeObserver: false,
      observeChildren: false,
      renderOnPropertyChange: false,
      externalContainerManager: this.containerManager,
      externalItemRenderer: this.itemRenderer,
    });
  }
  private _getLoadingGroup(): InfiniteGridGroup {
    const loadingGrid = this._loadingGrid;
    const items = loadingGrid.getItems() as InfiniteGridItem[];

    return {
      groupKey: LOADING_GROUP_KEY,
      type: GROUP_TYPE.NORMAL,
      grid: loadingGrid,
      items,
      renderItems: items,
    };
  }
  private _getLoadingItem() {
    return this._loadingGrid.getLoadingItem();
  }
}

export interface GroupManager extends Properties<typeof GroupManager> {
  getItems(): InfiniteGridItem[];
}
