import Component from "@egjs/component";
import {
  ContainerManager,
  GridOptions,
  DEFAULT_GRID_OPTIONS,
  GRID_PROPERTY_TYPES,
  GridFunction,
  Properties,
} from "@egjs/grid";
import { DEFAULT_INFINITEGRID_OPTIONS } from "./consts";
import { GroupManager } from "./GroupManager";
import { Infinite } from "./Infinite";
import { InfiniteGridItem } from "./InfiniteGridItem";
import { OnRendererUpdated, Renderer } from "./Renderer/Renderer";
import { GridRendererItem } from "./Renderer/VanillaGridRenderer";
import { OnScroll, ScrollManager } from "./ScrollManager";
import { InfiniteGridGroup, InfiniteGridInsertedItems, InfiniteGridItemInfo } from "./types";
import { convertInsertedItems, GetterSetter, isString } from "./utils";

export interface InfiniteGridOptions extends GridOptions {
  gridConstructor: GridFunction | null;
}

export interface InfiniteGridEvents {
  scroll: OnScroll;
  renderComplete: {};
  contentError: {};

}

/**
 * @extends eg.Component
 */
@GetterSetter
class InfiniteGrid<Options extends InfiniteGridOptions = InfiniteGridOptions> extends Component<{}> {
  public static defaultOptions: Required<InfiniteGridOptions> = {
    ...DEFAULT_GRID_OPTIONS,
    ...DEFAULT_INFINITEGRID_OPTIONS,
  };
  public static propertyTypes = GRID_PROPERTY_TYPES;
  protected wrapperElement: HTMLElement;
  protected scrollManager: ScrollManager;
  protected containerManager: ContainerManager;
  protected infinite: Infinite;
  protected renderer: Renderer;
  protected groupManager: GroupManager;
  constructor(wrapper: HTMLElement | string, options: InfiniteGridOptions) {
    super();
    const {
      gridConstructor,
      ...gridOptions
    } = options;
    // options.container === false, wrapper = container, scrollContainer = document.body
    // options.container === true, wrapper = scrollContainer, container = wrapper's child
    // options.container === string,
    const wrapperElement = isString(wrapper) ? document.querySelector(wrapper) as HTMLElement : wrapper;
    const scrollManager = new ScrollManager(wrapperElement, {
      container: false,
      containerTag: "div",
      horizontal: false,
    });
    const container = scrollManager.getContainer();
    const containerManager = new ContainerManager(container, {
      horizontal: false,
    });
    const infinite = new Infinite({
      useRecyle: false,
    }).on({
      "change": this._onChange,
      "requestAppend": this._onRequestAppend,
      "requestPrepend": this._onRequestPrepend,
    });
    const groupManager = new GroupManager(container, {
      gridConstructor: gridConstructor!,
      externalContainerManager: containerManager,
      gridOptions,
    });

    groupManager.on({
      "renderComplete": this._onRenderComplete,
      "contentError": this._onContentError,
    });
    const renderer: Renderer = null as any;

    renderer.setContainer(container);
    renderer.on("updated", this._onRendererUpdated);

    this.groupManager = groupManager;
    this.wrapperElement = wrapperElement;
    this.scrollManager = scrollManager;
    this.containerManager = containerManager;
    this.infinite = infinite;
  }

  public syncItems(items: InfiniteGridItemInfo[]): this {
    this.groupManager.syncItems(items);

    const groups = this.groupManager.getGroups();
    const infinite = this.infinite;

    infinite.sync(groups.map(({ groupKey, grid }) => {
      const outlines = grid.getOutlines();

      return {
        key: groupKey,
        startOutline: outlines.start,
        endOutline: outlines.end,
      };
    }));

    this.groupManager.setCursors(infinite.getStartCursor(), infinite.getEndCursor());
    this._render();

    return this;
  }

  public setCursors(startCursor: number, endCursor: number): void {
    this.groupManager.setCursors(startCursor, endCursor);
    this.infinite.setCursors(startCursor, endCursor);
    this._update();
  }

  public append(items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    return this.insert(-1, items, groupKey);
  }

  public prepend(items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    return this.insert(0, items, groupKey);
  }

  public insert(index: number, items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    const prevItemInfos = this.groupManager.getItemInfos();
    const itemInfos = convertInsertedItems(items, groupKey);

    if (index === -1) {
      prevItemInfos.push(...itemInfos);
    } else {
      prevItemInfos.splice(index, 0, ...itemInfos);
    }
    return this.syncItems(itemInfos);
  }
  public getItems(): InfiniteGridItem[] {
    return this.groupManager.getGroupItems();
  }

  public getVisibleItems(): InfiniteGridItem[] {
    return this.groupManager.getItems();
  }

  public getGroups(): InfiniteGridGroup[] {
    return this.groupManager.getGroups();
  }

  public getVisibleGroups(): InfiniteGridGroup[] {
    return this.groupManager.getVisibleGroups();
  }

  private _render(): void {
    this.renderer.render(this.getVisibleItems().map((item) => {
      return {
        element: item.element,
        key: item.key,
        orgItem: item,
      };
    }));
  }
  private _update(): void {
    if (this.renderer.update()) {
      this._render();
    }
  }
  private _onChange = (): void => {
    //
  }
  private _onRequestAppend = (): void => {
    //
  }
  private _onRequestPrepend = (): void => {
    //
  }
  private _onRendererUpdated = (e: OnRendererUpdated<GridRendererItem>): void => {
    if (!e.isChanged) {
      return;
    }
    const rendererItems = e.items;

    // const {
    //   added,
    //   removed,
    //   prevList,
    //   list,
    // } = e.diffResult;

    // removed.forEach((index) => {
    //   const orgItem = prevList[index].orgItem;

    //   orgItem.mountState = MOUNT_STATE.UNMOUNTED;
    // });
    // added.forEach((index) => {
    //   const orgItem = list[index].orgItem;

    //   orgItem.mountState = MOUNT_STATE.MOUNTED;
    // });

    rendererItems.forEach((item) => {
      if (item.key === "infinite_unique_loading") {
        // set loading element
      } else {
        // set grid element
        // const gridItem = this.groupManager.findItemByKey(item.key);

        // gridItem.element = item.element;
      }
    });
    // this.renderItems();
  }
  private _onContentError = (): void => {
    //
  }
  private _onRenderComplete = (): void => {
    //
  }
}

interface InfiniteGrid extends Properties<typeof InfiniteGrid> { }

export default InfiniteGrid;
