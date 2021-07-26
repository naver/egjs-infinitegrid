import Component from "@egjs/component";
import {
  ContainerManager,
  DEFAULT_GRID_OPTIONS,
  GRID_PROPERTY_TYPES,
  Properties,
  RenderOptions,
  MOUNT_STATE,
  OnRenderComplete,
  OnContentError,
} from "@egjs/grid";
import { isString } from "node:util";
import { EVENTS } from "./consts";
import { GroupManager } from "./GroupManager";
import { Infinite, OnInfiniteChange, OnInfiniteRequestAppend, OnInfiniteRequestPrepend } from "./Infinite";
import { InfiniteGridItem } from "./InfiniteGridItem";
import { OnRendererUpdated } from "./Renderer/Renderer";
import { GridRendererItem, VanillaGridRenderer } from "./Renderer/VanillaGridRenderer";
import { ScrollManager } from "./ScrollManager";
import {
  InfiniteGridEvents, InfiniteGridGroup,
  InfiniteGridInsertedItems, InfiniteGridItemInfo,
  InfiniteGridOptions,
  OnScroll,
} from "./types";
import { InfiniteGridGetterSetter, toArray, convertInsertedItems, findIndex, findLastIndex } from "./utils";


/**
 * A module used to arrange card elements including content infinitely according to layout type. With this module, you can implement various layouts composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko 콘텐츠가 있는 카드 엘리먼트를 레이아웃 타입에 따라 무한으로 배치하는 모듈. 다양한 크기의 카드 엘리먼트를 다양한 레이아웃으로 배치할 수 있다. 카드 엘리먼트의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
 * @extends Component
 * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
 * @example
```html
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
@InfiniteGridGetterSetter
class InfiniteGrid<Options extends InfiniteGridOptions = InfiniteGridOptions> extends Component<InfiniteGridEvents> {
  public static defaultOptions: Required<InfiniteGridOptions> = {
    ...DEFAULT_GRID_OPTIONS,
    gridConstructor: null,
    container: false,
    renderer: null,
    threshold: 100,
  };
  public static propertyTypes = GRID_PROPERTY_TYPES;
  protected wrapperElement: HTMLElement;
  protected scrollManager: ScrollManager;
  protected containerManager: ContainerManager;
  protected infinite: Infinite;
  protected groupManager: GroupManager;
  protected options: Required<Options>;
  /**
   * @param - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
   * @param - The option object of the InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
   */
  constructor(wrapper: HTMLElement | string, options: Options) {
    super();
    this.options = {
      ...((this.constructor as typeof InfiniteGrid).defaultOptions as Required<Options>),
      renderer: new VanillaGridRenderer(),
      ...options,
    };

    const {
      gridConstructor,
      container,
      renderer,
      threshold,
      ...gridOptions
    } = this.options;
    // options.container === false, wrapper = container, scrollContainer = document.body
    // options.container === true, wrapper = scrollContainer, container = wrapper's child
    // options.container === string,
    const horizontal = gridOptions.horizontal;
    const wrapperElement = isString(wrapper) ? document.querySelector(wrapper) as HTMLElement : wrapper;
    const scrollManager = new ScrollManager(wrapperElement, {
      container,
      containerTag: "div",
      horizontal,
    }).on({
      scroll: this._onScroll,
    });
    const containerElement = scrollManager.getContainer();
    const containerManager = new ContainerManager(containerElement, {
      horizontal,
    });
    const infinite = new Infinite({
      useRecyle: false,
      threshold,
    }).on({
      "change": this._onChange,
      "requestAppend": this._onRequestAppend,
      "requestPrepend": this._onRequestPrepend,
    });

    infinite.setSize(scrollManager.getContentSize());
    const groupManager = new GroupManager(containerElement, {
      gridConstructor: gridConstructor!,
      externalContainerManager: containerManager,
      gridOptions,
    });

    groupManager.on({
      "renderComplete": this._onRenderComplete,
      "contentError": this._onContentError,
    });

    renderer!.setContainer(containerElement);
    renderer!.on("updated", this._onRendererUpdated);

    this.groupManager = groupManager;
    this.wrapperElement = wrapperElement;
    this.scrollManager = scrollManager;
    this.containerManager = containerManager;
    this.infinite = infinite;
  }
  /**
   * Rearrange items to fit the grid and render them. When rearrange is complete, the `renderComplete` event is fired.
   * @ko grid에 맞게 아이템을 재배치하고 렌더링을 한다. 배치가 완료되면 `renderComplete` 이벤트가 발생한다.
   * @param - Options for rendering. <ko>렌더링을 하기 위한 옵션.</ko>
   * @example
   * import { MasonryGrid } from "@egjs/infinitegrid";
   * const grid = new MasonryGrid();
   *
   * grid.on("renderComplete", e => {
   *   console.log(e);
   * });
   * grid.renderItems();
   */
  public renderItems(options: RenderOptions = {}) {
    this._resizeScroll();
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
        return this;
      }
    }
    if (!this.getVisibleItems().length) {
      this.setCursors(0, 0);
    } else {
      this.groupManager.renderItems(options);
    }
    return this;
  }
  /**
   * Returns the wrapper element specified by the user.
   * @ko 컨테이너 엘리먼트를 반환한다.
   */
  public getWrapperElement() {
    return this.scrollManager.getWrapper();
  }
  /**
   * Returns the container element corresponding to the scroll area.
   * @ko 스크롤 영역에 해당하는 컨테이너 엘리먼트를 반환한다.
   */
  public getScrollContainerElement() {
    return this.scrollManager.getScrollContainer();
  }
  /**
   * Returns the container element containing item elements.
   * @ko 아이템 엘리먼트들을 담긴 컨테이너 엘리먼트를 반환한다.
   */
  public getContainerElement() {
    return this.scrollManager.getContainer();
  }
  /**
   * When items change, it synchronizes and renders items.
   * @ko items가 바뀐 경우 동기화를 하고 렌더링을 한다.
   * @param - Options for rendering. <ko>렌더링을 하기 위한 옵션.</ko>
   */
  public syncItems(items: InfiniteGridItemInfo[]): this {
    this.groupManager.syncItems(items);

    const infinite = this.infinite;

    this._syncInfinite();

    this.groupManager.setCursors(infinite.getStartCursor(), infinite.getEndCursor());
    this._render();

    return this;
  }
  /**
   * Change the currently visible groups.
   * @ko 현재 보이는 그룹들을 바꾼다.
   * @param - first index of visible groups. <ko>보이는 그룹의 첫번째 index.</ko>
   * @param - last index of visible groups. <ko>보이는 그룹의 마지막 index.</ko>
   */
  public setCursors(startCursor: number, endCursor: number): this {
    this.groupManager.setCursors(startCursor, endCursor);
    this.infinite.setCursors(startCursor, endCursor);
    this._update();
    return this;
  }
  /**
   * Returns the first index of visible groups.
   * @ko 보이는 그룹들의 첫번째 index를 반환한다.
   */
  public getStartCursor(): number {
    return this.infinite.getStartCursor();
  }
  /**
   * Returns the last index of visible groups.
   * @ko 보이는 그룹들의 마지막 index를 반환한다.
   */
  public getEndCursor(): number {
    return this.infinite.getEndCursor();
  }
  /**
   * Add items at the bottom(right) of the grid.
   * @ko 아이템들을 grid 아래(오른쪽)에 추가한다.
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default.
   * <ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ig.append("&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
   * ig.append(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
   * ig.append([HTMLElement1, HTMLElement2]);
   */
  public append(items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    return this.insert(-1, items, groupKey);
  }
  /**
   * Add items at the top(left) of the grid.
   * @ko 아이템들을 grid 위(왼쪽)에 추가한다.
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default.
   * <ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ig.prepend("&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
   * ig.prepend(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
   * ig.prepend([HTMLElement1, HTMLElement2]);
   */
  public prepend(items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    return this.insert(0, items, groupKey);
  }
  /**
   * Add items to a specific index.
   * @ko 아이템들을 특정 index에 추가한다.
   * @param - index to add <ko>추가하기 위한 index</ko>
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default.
   * <ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ig.insert(2, "&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
   * ig.insert(3, ["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
   * ig.insert(4, [HTMLElement1, HTMLElement2]);
   */
  public insert(index: number, items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    const nextItemInfos = this.groupManager.getItemInfos();
    const itemInfos = convertInsertedItems(items, groupKey);

    if (index === -1) {
      nextItemInfos.push(...itemInfos);
    } else {
      nextItemInfos.splice(index, 0, ...itemInfos);
    }
    return this.syncItems(nextItemInfos);
  }
  /**
   * Removes the group corresponding to index.
   * @ko index에 해당하는 그룹을 제거 한다.
   */
  public removeGroupByIndex(index: number): this {
    const nextGroups = this.groupManager.getGroups();

    return this.removeGroupByKey(nextGroups[index].groupKey);
  }
  /**
   * Removes the group corresponding to key.
   * @ko key에 해당하는 그룹을 제거 한다.
   */
  public removeGroupByKey(key: number | string): this {
    const nextItemInfos = this.groupManager.getItemInfos();

    const firstIndex = findIndex(nextItemInfos, (item) => item.groupKey === key);
    const lastIndex = findLastIndex(nextItemInfos, (item) => item.groupKey === key);

    if (firstIndex === -1) {
      return this;
    }
    nextItemInfos.splice(firstIndex, lastIndex - firstIndex + 1);
    return this.syncItems(nextItemInfos);
  }
  /**
   * Removes the item corresponding to index.
   * @ko index에 해당하는 아이템을 제거 한다.
   */
  public removeByIndex(index: number): this {
    const nextItemInfos = this.groupManager.getItemInfos();

    nextItemInfos.splice(index, 1);

    return this.syncItems(nextItemInfos);
  }
  /**
   * Removes the item corresponding to key.
   * @ko key에 해당하는 아이템을 제거 한다.
   */
  public removeByKey(key: string | number): this {
    const nextItemInfos = this.getItems();
    const index = findIndex(nextItemInfos, (item) => item.key === key);

    return this.removeByIndex(index);
  }
  /**
   * Update the size of the items and render them.
   * @ko 아이템들의 사이즈를 업데이트하고 렌더링을 한다.
   * @param - Items to be updated. <ko>업데이트할 아이템들.</ko>
   * @param - Options for rendering. <ko>렌더링을 하기 위한 옵션.</ko>
   */
  public updateItems(items?: InfiniteGridItem[], options: RenderOptions = {}) {
    this.groupManager.updateItems(items, options);
    return this;
  }
  /**
   * Return all items of InfiniteGrid.
   * @ko InfiniteGrid의 모든 아이템들을 반환한다.
   */
  public getItems(): InfiniteGridItem[] {
    return this.groupManager.getGroupItems();
  }
  /**
   * Return visible items of InfiniteGrid.
   * @ko InfiniteGrid의 보이는 아이템들을 반환한다.
   */
  public getVisibleItems(): InfiniteGridItem[] {
    return this.groupManager.getItems();
  }
  /**
   * Return all groups of InfiniteGrid.
   * @ko InfiniteGrid의 모든 그룹들을 반환한다.
   */
  public getGroups(): InfiniteGridGroup[] {
    return this.groupManager.getGroups();
  }
  /**
   * Return visible groups of InfiniteGrid.
   * @ko InfiniteGrid의 보이는 그룹들을 반환한다.
   */
  public getVisibleGroups(): InfiniteGridGroup[] {
    return this.groupManager.getVisibleGroups();
  }
  /**
   * Releases the instnace and events and returns the CSS of the container and elements.
   * @ko 인스턴스와 이벤트를 해제하고 컨테이너와 엘리먼트들의 CSS를 되돌린다.
   */
  public destroy(): void {
    this.off();
    this.groupManager.destroy();
    this.scrollManager.destroy();
    this.infinite.destroy();
  }

  private _getRenderer() {
    return this.options.renderer!;
  }
  private _render(): void {
    this._getRenderer().render(this.getVisibleItems().map((item) => {
      return {
        element: item.element,
        key: item.key,
        orgItem: item,
      };
    }));
  }
  private _update(): void {
    if (this._getRenderer().update()) {
      this._render();
    }
  }
  private _resizeScroll() {
    const scrollManager = this.scrollManager;

    scrollManager.resize();

    this.infinite.setSize(scrollManager.getContentSize());
  }
  private _syncInfinite() {
    this.infinite.sync(this.getGroups().map(({ groupKey, grid }) => {
      const outlines = grid.getOutlines();

      return {
        key: groupKey,
        startOutline: outlines.start,
        endOutline: outlines.end,
      };
    }));
  }
  private _scroll() {
    this.infinite.scroll(this.scrollManager.getRelativeScrollPos());
  }
  private _onScroll = ({ direction, scrollPos, relativeScrollPos }: OnScroll): void => {
    this._scroll();
    this.trigger(EVENTS.SCROLL, {
      direction,
      scrollPos,
      relativeScrollPos,
    });
  }
  private _onChange = (e: OnInfiniteChange): void => {
    this.setCursors(e.nextStartCursor, e.nextEndCursor);
  }
  private _onRendererUpdated = (e: OnRendererUpdated<GridRendererItem>): void => {
    if (!e.isChanged) {
      this._scroll();
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
    this.groupManager.renderItems();
  }

  private _onRequestAppend = (e: OnInfiniteRequestAppend): void => {
    // TODO LOADING
    this.trigger(EVENTS.REQUEST_APPEND, {
      groupKey: e.groupKey,
    });
  }

  private _onRequestPrepend = (e: OnInfiniteRequestPrepend): void => {
    // TODO LOADING
    this.trigger(EVENTS.REQUEST_PREPEND, {
      groupKey: e.groupKey,
    });
  }

  private _onContentError = ({ element, target, item, update }: OnContentError): void => {
    this.trigger(EVENTS.CONTENT_ERROR, {
      element,
      target,
      item: item as InfiniteGridItem,
      update,
      remove: () => {
        this.removeByKey(item.key!);
      },
    });
  }

  private _onRenderComplete = ({ isResize, mounted, updated }: OnRenderComplete): void => {
    // TODO: grid에서 e.direction
    const infinite = this.infinite;
    const prevRenderedGroups = infinite.getRenderedVisibleItems();
    const length = prevRenderedGroups.length;
    const isDirectionEnd = this.defaultDirection === "end";

    this._syncInfinite();

    if (length) {
      const prevStandardGroup = prevRenderedGroups[isDirectionEnd ? 0 : length - 1];
      const nextStandardGroup = infinite.getItemByKey(prevStandardGroup.key);
      const offset = isDirectionEnd
        ? Math.min(...nextStandardGroup.startOutline) - Math.min(...prevStandardGroup.startOutline)
        : Math.max(...nextStandardGroup.endOutline) - Math.max(...prevStandardGroup.endOutline);

      this.scrollManager.scrollBy(offset);
    }
    this.trigger(EVENTS.RENDER_COMPLETE, {
      isResize,
      mounted: mounted as InfiniteGridItem[],
      updated: updated as InfiniteGridItem[],
      startCursor: this.getStartCursor(),
      endCursor: this.getEndCursor(),
      items: this.getVisibleItems(),
      groups: this.getVisibleGroups(),
    });
    this._scroll();
  }
}

interface InfiniteGrid extends Properties<typeof InfiniteGrid> { }

export default InfiniteGrid;
