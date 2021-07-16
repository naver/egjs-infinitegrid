import Component from "@egjs/component";
import {
  ContainerManager,
  GridOptions,
  DEFAULT_GRID_OPTIONS,
  GRID_PROPERTY_TYPES,
  GridFunction,
  Properties,
  RenderOptions,
  MOUNT_STATE,
} from "@egjs/grid";
import { DEFAULT_INFINITEGRID_OPTIONS } from "./consts";
import { GroupManager } from "./GroupManager";
import { Infinite } from "./Infinite";
import { InfiniteGridItem } from "./InfiniteGridItem";
import { OnRendererUpdated, Renderer } from "./Renderer/Renderer";
import { GridRendererItem } from "./Renderer/VanillaGridRenderer";
import { OnScroll, ScrollManager } from "./ScrollManager";
import { InfiniteGridGroup, InfiniteGridInsertedItems, InfiniteGridItemInfo } from "./types";
import { convertInsertedItems, GetterSetter, isString, toArray } from "./utils";

export interface InfiniteGridOptions extends GridOptions {
  gridConstructor: GridFunction | null;
}

export interface InfiniteGridEvents {
  scroll: OnScroll;
  renderComplete: {};
  contentError: {};

}

/**
 * A module used to arrange card elements including content infinitely according to layout type. With this module, you can implement various layouts composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko 콘텐츠가 있는 카드 엘리먼트를 레이아웃 타입에 따라 무한으로 배치하는 모듈. 다양한 크기의 카드 엘리먼트를 다양한 레이아웃으로 배치할 수 있다. 카드 엘리먼트의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
 * @extends Component
 * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
 * @example
```
<ul id="grid">
  <li class="card">
    <div>test1</div>
  </li>
  <li class="card">
    <div>test2</div>
  </li>
  <li class="card">
    <div>test3</div>
  </li>
  <li class="card">
    <div>test4</div>
  </li>
  <li class="card">
    <div>test5</div>
  </li>
  <li class="card">
    <div>test6</div>
  </li>
</ul>
<script>
import { MasonryGrid } from "@egjs/infinitegrid";
var some = new MasonryGrid("#grid").on("renderComplete", function(e) {
  // ...
});
// If you already have items in the container, call "layout" method.
some.renderItems();
</script>
```
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
  /**
	 * @param - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
	 * @param - The option object of the InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
	 */
  constructor(wrapper: HTMLElement | string, options: InfiniteGridOptions) {
    super();
    const {
      gridConstructor,
      ...gridOptions
    } = options;
    // options.container === false, wrapper = container, scrollContainer = document.body
    // options.container === true, wrapper = scrollContainer, container = wrapper's child
    // options.container === string,
    const horizontal = gridOptions.horizontal;
    const wrapperElement = isString(wrapper) ? document.querySelector(wrapper) as HTMLElement : wrapper;
    const scrollManager = new ScrollManager(wrapperElement, {
      container: false,
      containerTag: "div",
      horizontal,
    }).on({
      scroll: this._onScroll,
    });
    const container = scrollManager.getContainer();
    const containerManager = new ContainerManager(container, {
      horizontal,
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

  public renderItems(options: RenderOptions = {}) {
    if (!this.getItems().length) {
      const children = toArray(this.getContainerElement().children);
      if (children.length > 0) {
        this.append(children);
      } else {
        if (this.defaultDirection === "end") {
          // request append
        } else {
          // request prepend
        }
      }
    } else {
      this.groupManager.renderItems(options);
    }
    return this;
  }

  public getWrapperElement() {
    return this.scrollManager.getWrapper();
  }

  public getScrollContainerElement() {
    return this.scrollManager.getScrollContainer();
  }

  public getContainerElement() {
    return this.scrollManager.getContainer();
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
  private _onScroll = (e: OnScroll) => {
    this.infinite.scroll(e.relativeScrollPos);
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
    const renderedItems = e.items;

    const {
      added,
      removed,
      prevList,
      list,
    } = e.diffResult;

    removed.forEach((index) => {
      const orgItem = prevList[index].orgItem;

      orgItem.mountState = MOUNT_STATE.UNMOUNTED;
    });
    added.forEach((index) => {
      const orgItem = list[index].orgItem;

      orgItem.mountState = MOUNT_STATE.MOUNTED;
    });

    renderedItems.forEach((item) => {
      // set grid element
      const gridItem = this.groupManager.getItemByKey(item.key)!;

      gridItem.element = item.element as HTMLElement;
    });
    this.renderItems();
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
