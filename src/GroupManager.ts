import Grid, {
  GridFunction, GridOptions,
  GridOutlines, Properties, PROPERTY_TYPE,
  RenderOptions, UPDATE_STATE,
} from "@egjs/grid";
import { IGNORE_PROPERITES_MAP } from "./consts";
import { InfiniteGridItem } from "./InfiniteGridItem";
import { InfiniteGridGroup } from "./types";
import { flat } from "./utils";

export interface GroupManagerOptions extends GridOptions {
  gridContructor: GridFunction;
  gridOptions: Record<string, any>;
}

interface CategorizedGroup {
  groupKey: number | string;
  items: InfiniteGridItem[];
}

function splitGridOptions(options: Record<string, any>) {
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

function categorize(items: InfiniteGridItem[]) {
  const groups: CategorizedGroup[] = [];
  const groupKeys: { [key: string]: CategorizedGroup } = {};

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

export class GroupManager extends Grid<GroupManagerOptions> {
  public static propertyTypes = {
    ...Grid.propertyTypes,
    gridConstructor: PROPERTY_TYPE.PROPERTY,
  };
  protected items: InfiniteGridItem[];
  protected groupItems: InfiniteGridItem[] = [];
  protected groups: InfiniteGridGroup[] = [];
  protected groupKeys: Record<string | number, InfiniteGridGroup> = {};
  protected startCursor = 0;
  protected endCursor = 0;
  protected gridOptions: Record<string, any> = {};
  constructor(container: HTMLElement, options: GroupManagerOptions) {
    super(container, {
      ...options,
      ...splitGridOptions(options.gridOptions!),
    });
  }
  public setGridOptions(options: Record<string, any>) {
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

  public getGroupItems() {
    return this.groupItems;
  }

  public getVisibleGroups(): InfiniteGridGroup[] {
    return this.groups.slice(this.startCursor, this.endCursor + 1);
  }

  public getGroups(): InfiniteGridGroup[] {
    return this.groups;
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

      const gridOutline = grid.applyGrid(grid.getItems(), direction, nextOutline);

      grid.setOutlines(gridOutline);

      nextOutline = gridOutline[direction];
    });

    return {
      start: originalGroups[0].grid.getOutlines().start,
      end: originalGroups[length - 1].grid.getOutlines().end,
    };
  }

  public syncItems(nextItems: InfiniteGridItem[]) {
    const container = this.getContainerElement();
    const prevGroupKeys = this.groupKeys;
    const nextManagerGroups = categorize(nextItems);
    const nextGroupKeys: Record<string | number, InfiniteGridGroup> = {};
    const GridContructor = this.options.gridContructor;
    const gridOptions = this.gridOptions;
    const nextGroups: InfiniteGridGroup[] = nextManagerGroups.map(({ groupKey, items }) => {
      const grid = prevGroupKeys[groupKey]?.grid ?? new GridContructor(container, {
        ...gridOptions,
        useFit: false,
        autoResize: false,
        renderOnPropertyChange: false,
        externalContainerManager: this.containerManager,
        externalItemRenderer: this.itemRenderer,
      });

      grid.setItems(items);

      return {
        groupKey,
        grid,
      };
    });

    nextGroups.forEach((group) => {
      nextGroupKeys[group.groupKey] = group;
    });

    this.groupItems = nextItems;
    this.groups = nextGroups;
    this.groupKeys = nextGroupKeys;
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
    this.items = this._getVisibleItems();
  }

  private _getVisibleItems() {
    return flat(this.getVisibleGroups().map(({ grid }) => grid.getItems() as InfiniteGridItem[]));
  }

  private _checkShouldRender(options: Record<string, any>) {
    const GridContructor = this.options.gridContructor;
    const prevOptions = this.gridOptions;
    const propertyTypes = GridContructor.propertyTypes;

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
}

export interface GroupManager extends Properties<typeof GroupManager> {
  getItems(): InfiniteGridItem[];
}
