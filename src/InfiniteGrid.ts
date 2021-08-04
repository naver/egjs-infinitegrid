import Component from "@egjs/component";
import {
  ContainerManager,
  DEFAULT_GRID_OPTIONS,
  GRID_PROPERTY_TYPES,
  Properties,
  RenderOptions,
  MOUNT_STATE,
  OnContentError,
  ItemRenderer,
} from "@egjs/grid";
import { EVENTS, ITEM_TYPE, STATUS_TYPE } from "./consts";
import { GroupManager } from "./GroupManager";
import {
  Infinite, OnInfiniteChange } from "./Infinite";
import { InfiniteGridItem, InfiniteGridItemStatus } from "./InfiniteGridItem";
import { OnRendererUpdated } from "./Renderer/Renderer";
import { GridRendererItem, VanillaGridRenderer } from "./Renderer/VanillaGridRenderer";
import { ScrollManager } from "./ScrollManager";
import {
  InfiniteGridEvents, InfiniteGridGroup,
  InfiniteGridInsertedItems, InfiniteGridItemInfo,
  InfiniteGridOptions,
  InfiniteGridStatus,
  InsertedPlaceholdersResult,
  OnPickedRenderComplete,
  OnRequestInsert,
  OnScroll,
} from "./types";
import {
  InfiniteGridGetterSetter, toArray, convertInsertedItems, findIndex,
  findLastIndex, isString,
} from "./utils";


/**
 * A module used to arrange items including content infinitely according to layout type. With this module, you can implement various layouts composed of different items whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko 콘텐츠가 있는 아이템를 레이아웃 타입에 따라 무한으로 배치하는 모듈. 다양한 크기의 아이템를 다양한 레이아웃으로 배치할 수 있다. 아이템의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
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
  public static defaultOptions = {
    ...DEFAULT_GRID_OPTIONS,
    container: false,
    renderer: null,
    threshold: 100,
  } as Required<InfiniteGridOptions>;
  public static propertyTypes = GRID_PROPERTY_TYPES;
  protected wrapperElement: HTMLElement;
  protected scrollManager: ScrollManager;
  protected itemRenderer: ItemRenderer;
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
      renderer: new VanillaGridRenderer().on("update", () => this._render()),
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
    const {
      horizontal,
      attributePrefix,
      useTransform,
      percentage,
      isConstantSize,
      isEqualSize,
    } = gridOptions;
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
    }).on("resize", this._onResize);
    const itemRenderer = new ItemRenderer({
      attributePrefix,
      horizontal,
      useTransform,
      percentage,
      isEqualSize,
      isConstantSize,
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
      externalItemRenderer: itemRenderer,
      externalContainerManager: containerManager,
      gridOptions,
    });

    groupManager.on({
      "renderComplete": this._onRenderComplete,
      "contentError": this._onContentError,
    });

    renderer!.setContainer(containerElement);
    renderer!.on("updated", this._onRendererUpdated);

    this.itemRenderer = itemRenderer;
    this.groupManager = groupManager;
    this.wrapperElement = wrapperElement;
    this.scrollManager = scrollManager;
    this.containerManager = containerManager;
    this.infinite = infinite;

    this.containerManager.resize();
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
    if (!this.getItems(true).length) {
      const children = toArray(this.getContainerElement().children);
      if (children.length > 0) {
        this.append(children);
      } else {
        this.infinite.scroll(0);
        return this;
      }
    }
    if (!this.getVisibleGroups(true).length) {
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
    this._syncGroups();

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
   * <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
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
   * <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
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
   * <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ig.insert(2, "&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
   * ig.insert(3, ["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
   * ig.insert(4, [HTMLElement1, HTMLElement2]);
   */
  public insert(index: number, items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    const nextItemInfos: InfiniteGridItemInfo[] = this.groupManager.getGroupItems();
    const itemInfos = convertInsertedItems(items, groupKey);

    if (index === -1) {
      nextItemInfos.push(...itemInfos);
    } else {
      nextItemInfos.splice(index, 0, ...itemInfos);
    }
    return this.syncItems(nextItemInfos);
  }
  /**
   * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
   * @ko 아이템의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
   * @param - STATUS_TYPE.NOT_REMOVE = Get all information about items. STATUS_TYPE.REMOVE_INVISIBLE_ITEMS = Get information on visible items only.
   * STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS = Compress invisible items. You can replace it with a placeholder. STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS = Compress invisible groups.
   * <ko> STATUS_TYPE.NOT_REMOVE = 모든 아이템들의 정보를 가져온다. STATUS_TYPE.REMOVE_INVISIBLE_ITEMS = 보이는 아이템들의 정보만 가져온다.
   * STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS = 안보이는 아이템들을 압축한다. placeholder로 대체가 가능하다. STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS = 안보이는 그룹을 압축한다.</ko>
   */
  public getStatus(type?: STATUS_TYPE): InfiniteGridStatus {
    return {
      containerManager: this.containerManager.getStatus(),
      itemRenderer: this.itemRenderer.getStatus(),
      groupManager: this.groupManager.getGroupStatus(type),
    };
  }

  /**
   * You can set placeholders to restore status or wait for items to be added.
   * @ko status 복구 또는 아이템 추가 대기를 위한 placeholder를 설정할 수 있다.
   * @param - The placeholder status. <ko>placeholder의 status</ko>
   */
  public setPlaceholder(info: Partial<InfiniteGridItemStatus> | null): this {
    this.groupManager.setPlaceholder(info);
    return this;
  }
  /**
   * Add the placeholder at the end.
   * @ko placeholder들을 마지막에 추가한다.
   * @param - Items that correspond to placeholders. If it is a number, it duplicates the number of copies. <ko>placeholder에 해당하는 아이템들. 숫자면 갯수만큼 복제를 한다.</ko>
   * @param - The group key to be configured in items. It is automatically generated by default.
   * <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   */
  public appendPlaceholders(
    items: number | InfiniteGridItemStatus[],
    groupKey?: string | number,
  ): InsertedPlaceholdersResult {
    const result = this.groupManager.appendPlaceholders(items, groupKey);

    this._syncGroups();
    return {
      ...result,
      remove: () => {
        this.removePlaceholders({ groupKey: result.group.groupKey });
      },
    };
  }
  /**
   * Add the placeholder at the start.
   * @ko placeholder들을 처음에 추가한다.
   * @param - Items that correspond to placeholders. If it is a number, it duplicates the number of copies. <ko>placeholder에 해당하는 아이템들. 숫자면 갯수만큼 복제를 한다.</ko>
   * @param - The group key to be configured in items. It is automatically generated by default.
   * <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   */
  public prependPlaceholders(
    items: number | InfiniteGridItemStatus[],
    groupKey?: string | number,
  ): InsertedPlaceholdersResult {
    const result = this.groupManager.prependPlaceholders(items, groupKey);

    this._syncGroups();
    return {
      ...result,
      remove: () => {
        this.removePlaceholders({ groupKey: result.group.groupKey });
      },
    };
  }

  public removePlaceholders(type: "start" | "end" | { groupKey: string | number}) {
    this.groupManager.removePlaceholders(type);
    this._syncGroups();
  }

  /**
   * Sets the status of the InfiniteGrid module with the information returned through a call to the getStatus() method.
   * @ko getStatus() 메서드가 저장한 정보로 InfiniteGrid 모듈의 상태를 설정한다.
   * @param - status object of the InfiniteGrid module
   */
  public setStatus(status: InfiniteGridStatus): this {
    this.itemRenderer.setStatus(status.itemRenderer);
    this.containerManager.setStatus(status.containerManager);
    const groupManager = this.groupManager;
    const prevInlineSize = this.containerManager.getInlineSize();

    groupManager.setGroupStatus(status.groupManager);
    this._syncInfinite();
    this.infinite.setCursors(groupManager.getStartCursor(), groupManager.getEndCursor());

    setTimeout(() => {
      this._getRenderer().updateKey();
      this._render({
        isReisze: this.containerManager.getInlineSize() !== prevInlineSize,
        isRestore: true,
      });
    });
    return this;
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
    const nextItemInfos = this.groupManager.getItems();

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
    const nextItemInfos = this.getItems(true);

    nextItemInfos.splice(index, 1);

    return this.syncItems(nextItemInfos);
  }
  /**
   * Removes the item corresponding to key.
   * @ko key에 해당하는 아이템을 제거 한다.
   */
  public removeByKey(key: string | number): this {
    const nextItemInfos = this.getItems(true);
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
   * @param - Whether to include items corresponding to placeholders. <ko>placeholder에 해당하는 아이템들을 포함할지 여부.</ko>
   */
  public getItems(includePlaceholders?: boolean): InfiniteGridItem[] {
    return this.groupManager.getGroupItems(includePlaceholders);
  }
  /**
   * Return visible items of InfiniteGrid.
   * @ko InfiniteGrid의 보이는 아이템들을 반환한다.
   * @param - Whether to include items corresponding to placeholders. <ko>placeholder에 해당하는 아이템들을 포함할지 여부.</ko>
   */
  public getVisibleItems(includePlaceholders?: boolean): InfiniteGridItem[] {
    return this.groupManager.getVisibleItems(includePlaceholders);
  }
  /**
   * Return all groups of InfiniteGrid.
   * @ko InfiniteGrid의 모든 그룹들을 반환한다.
   * @param - Whether to include groups corresponding to placeholders. <ko>placeholder에 해당하는 그룹들을 포함할지 여부.</ko>
   */
  public getGroups(includePlaceholders?: boolean): InfiniteGridGroup[] {
    return this.groupManager.getGroups(includePlaceholders);
  }
  /**
   * Return visible groups of InfiniteGrid.
   * @ko InfiniteGrid의 보이는 그룹들을 반환한다.
   * @param - Whether to include groups corresponding to placeholders. <ko>placeholder에 해당하는 그룹들을 포함할지 여부.</ko>
   */
  public getVisibleGroups(includePlaceholders?: boolean): InfiniteGridGroup[] {
    return this.groupManager.getVisibleGroups(includePlaceholders);
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
  private _render(state?: Record<string, any>): void {
    const hasPlaceholder = this.groupManager.hasPlaceholder();
    let items = this.getVisibleItems(hasPlaceholder);

    // has placeHolder
    if (!hasPlaceholder) {
      items = items.filter((item) => item.type === ITEM_TYPE.ITEM);
    }
    this._getRenderer().render(items.map((item) => {
      return {
        element: item.element,
        key: `${item.type}_${item.key}`,
        orgItem: item,
      };
    }), state);
  }
  private _update(state: Record<string, any> = {}): void {
    this._getRenderer().update(state);
  }
  private _resizeScroll() {
    const scrollManager = this.scrollManager;

    scrollManager.resize();

    this.infinite.setSize(scrollManager.getContentSize());
  }
  private _syncGroups() {
    const infinite = this.infinite;

    this._syncInfinite();
    this.groupManager.setCursors(infinite.getStartCursor(), infinite.getEndCursor());
    this._render();
  }
  private _syncInfinite() {
    this.infinite.sync(this.getGroups(true).map(({ groupKey, grid }) => {
      const outlines = grid.getOutlines();

      return {
        key: groupKey,
        startOutline: outlines.start,
        endOutline: outlines.end,
      };
    }));
  }
  private _scroll() {
    if (this._checkVirtualGroups()) {
      this.infinite.scroll(this.scrollManager.getRelativeScrollPos());
    }
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
      removed,
      prevList,
    } = e.diffResult;

    removed.forEach((index) => {
      const orgItem = prevList[index].orgItem;

      orgItem.mountState = orgItem.mountState === MOUNT_STATE.UNCHECKED ? MOUNT_STATE.UNCHECKED : MOUNT_STATE.UNMOUNTED;
    });

    const items = renderedItems.map((item) => {
      // set grid element
      const gridItem = item.orgItem;

      gridItem.element = item.element as HTMLElement;

      return gridItem;
    });
    const {
      isRestore,
      isResize,
    } = e.state;

    this.itemRenderer.renderItems(items);

    if (isRestore) {
      this._onRenderComplete({
        mounted: items,
        updated: [],
        isResize: false,
        direction: this.defaultDirection,
      });
      if (isResize) {
        this.groupManager.renderItems();
      }
    } else {
      this.groupManager.renderItems();
    }
  }

  private _onResize = () => {
    this.renderItems({ useResize: true });
  }

  private _onRequestAppend = (e: OnRequestInsert): void => {
    // TODO LOADING
    this.trigger(EVENTS.REQUEST_APPEND, {
      groupKey: e.groupKey,
      nextGroupKey: e.nextGroupKey,
    });
  }

  private _onRequestPrepend = (e: OnRequestInsert): void => {
    // TODO LOADING
    this.trigger(EVENTS.REQUEST_PREPEND, {
      groupKey: e.groupKey,
      nextGroupKey: e.nextGroupKey,
    });
  }

  private _checkVirtualGroups() {
    const groups = this.groupManager.getGroups(true);
    const visibleGroups = this.getVisibleGroups();
    const length = visibleGroups.length;
    const isEndDirection = this.defaultDirection === "end";
    const startCursor = this.getStartCursor();
    const endCursor = this.getEndCursor();


    if (length) {
      const startGroupKey = visibleGroups[0].groupKey;
      const endGroupKey = visibleGroups[length - 1].groupKey;
      const startGroupIndex = findIndex(groups, (item) => item.groupKey === startGroupKey) - 1;
      const endGroupIndex = findIndex(groups, (item) => item.groupKey === endGroupKey) + 1;

      const isEnd = endGroupIndex <= endCursor;
      const isStart = startGroupIndex >= startCursor;

      // Fill the placeholder with the original item.
      if ((isEndDirection || !isStart) && isEnd) {
        this._onRequestAppend({
          groupKey: endGroupKey,
          nextGroupKey: groups[endGroupIndex].groupKey,
        });
        return false;
      } else if ((!isEndDirection || !isEnd) && isStart) {
        this._onRequestPrepend({
          groupKey: startGroupKey,
          nextGroupKey: groups[startGroupIndex].groupKey,
        });
        return false;
      }
    } else {
      const visiblePlaceholderGroups = this.getVisibleGroups(true);
      const placeholderLength = visiblePlaceholderGroups.length;

      if (!placeholderLength) {
        return true;
      }
      if (isEndDirection) {
        this._onRequestAppend({
          nextGroupKey: visiblePlaceholderGroups[0].groupKey,
        });
        return false;
      } else {
        this._onRequestPrepend({
          nextGroupKey: visiblePlaceholderGroups[placeholderLength - 1].groupKey,
        });
        return false;
      }
    }
    return true;
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

  private _onRenderComplete = ({ isResize, mounted, updated, direction }: OnPickedRenderComplete): void => {
    const infinite = this.infinite;
    const prevRenderedGroups = infinite.getRenderedVisibleItems();
    const length = prevRenderedGroups.length;
    const isDirectionEnd = direction === "end";

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
      direction,
      mounted: mounted as InfiniteGridItem[],
      updated: updated as InfiniteGridItem[],
      startCursor: this.getStartCursor(),
      endCursor: this.getEndCursor(),
      items: this.getVisibleItems(true),
      groups: this.getVisibleGroups(true),
    });
    this._scroll();
  }
}

interface InfiniteGrid extends Properties<typeof InfiniteGrid> { }

export default InfiniteGrid;
