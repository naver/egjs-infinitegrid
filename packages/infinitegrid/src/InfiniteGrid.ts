import Component, { ComponentEvent } from "@egjs/component";
import Grid, {
  ContainerManager,
  DEFAULT_GRID_OPTIONS,
  Properties,
  RenderOptions,
  MOUNT_STATE,
  OnContentError,
  ItemRenderer,
  GridItem,
  ResizeWatcherResizeEvent,
  getUpdatedItems,
} from "@egjs/grid";
import {
  DIRECTION,
  GROUP_TYPE,
  INFINITEGRID_EVENTS, INFINITEGRID_PROPERTY_TYPES,
  ITEM_TYPE, STATUS_TYPE,
} from "./consts";
import { GroupManager } from "./GroupManager";
import {
  Infinite,
  OnInfiniteChange,
  OnInfiniteRequestAppend,
  OnInfiniteRequestPrepend,
} from "./Infinite";
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
  OnChangeScroll,
} from "./types";
import {
  InfiniteGridGetterSetter, toArray, convertInsertedItems, findIndex,
  findLastIndex, isString,
} from "./utils";


/**
 * A module used to arrange items including content infinitely according to layout type. With this module, you can implement various layouts composed of different items whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko 콘텐츠가 있는 아이템을 레이아웃 타입에 따라 무한으로 배치하는 모듈. 다양한 크기의 아이템을 다양한 레이아웃으로 배치할 수 있다. 아이템의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
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
import { MasonryInfiniteGrid } from "@egjs/infinitegrid";
var some = new MasonryInfiniteGrid("#grid").on("renderComplete", function(e) {
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
    containerTag: "div",
    renderer: null,
    threshold: 100,
    useRecycle: true,
    scrollContainer: null,
    appliedItemChecker: (() => false) as (item: InfiniteGridItem, grid: Grid) => boolean,
  } as Required<InfiniteGridOptions>;
  public static propertyTypes = INFINITEGRID_PROPERTY_TYPES;
  protected wrapperElement: HTMLElement;
  protected scrollManager: ScrollManager;
  protected itemRenderer: ItemRenderer;
  protected containerManager: ContainerManager;
  protected infinite: Infinite;
  protected groupManager: GroupManager;
  protected options: Required<Options>;
  private _waitType: "" | "start" | "end" = "";
  /**
   * @param - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
   * @param - The option object of the InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
   */
  constructor(wrapper: HTMLElement | string, options: Options) {
    super();
    this.options = {
      ...((this.constructor as typeof InfiniteGrid).defaultOptions as Required<Options>),
      renderer: new VanillaGridRenderer().on("requestUpdate", () => this._render()),
      ...options,
    };

    const {
      gridConstructor,
      containerTag,
      container,
      renderer,
      threshold,
      useRecycle,
      scrollContainer,
      appliedItemChecker,
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
      autoResize,
      useResizeObserver,
      resizeDebounce,
      maxResizeDebounce,
      defaultDirection,
    } = gridOptions;
    const wrapperElement = isString(wrapper) ? document.querySelector(wrapper) as HTMLElement : wrapper;
    const scrollManager = new ScrollManager(wrapperElement, {
      scrollContainer,
      container,
      containerTag,
      horizontal,
    }).on({
      scroll: this._onScroll,
    });
    const containerElement = scrollManager.getContainer();
    const containerManager = new ContainerManager(containerElement, {
      horizontal,
      autoResize,
      resizeDebounce,
      maxResizeDebounce,
      useResizeObserver,
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
      defaultDirection,
      useRecycle,
      threshold,
    }).on({
      "change": this._onChange,
      "requestAppend": this._onRequestAppend,
      "requestPrepend": this._onRequestPrepend,
    });

    infinite.setSize(scrollManager.getContentSize());
    const groupManager = new GroupManager(containerElement, {
      appliedItemChecker: appliedItemChecker!,
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
   * ```ts
   * import { MasonryInfiniteGrid } from "@egjs/infinitegrid";
   * const grid = new MasonryInfiniteGrid();
   *
   * grid.on("renderComplete", e => {
   *   console.log(e);
   * });
   * grid.renderItems();
   * ```
   */
  public renderItems(options: RenderOptions = {}) {
    this._renderItems(options);
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
   * @param - Whether the first rendering has already been done. <ko>첫 렌더링이 이미 되어있는지 여부.</ko>
   */
  public setCursors(startCursor: number, endCursor: number, useFirstRender?: boolean): this {
    this.groupManager.setCursors(startCursor, endCursor);
    this.infinite.setCursors(startCursor, endCursor);

    if (useFirstRender) {
      this._syncItems();
    } else {
      this._update();
      this._checkEndLoading();
    }
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
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```js
   * ig.append(`<div class="item">test1</div><div class="item">test2</div>`);
   * ig.append([`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
   * ig.append([HTMLElement1, HTMLElement2]);
   * ```
   */
  public append(items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    return this.insert(-1, items, groupKey);
  }
  /**
   * Add items at the top(left) of the grid.
   * @ko 아이템들을 grid 위(왼쪽)에 추가한다.
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```ts
   * ig.prepend(`<div class="item">test1</div><div class="item">test2</div>`);
   * ig.prepend([`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
   * ig.prepend([HTMLElement1, HTMLElement2]);
   * ```
   */
  public prepend(items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    return this.insert(0, items, groupKey);
  }
  /**
   * Add items to a specific index.
   * @ko 아이템들을 특정 index에 추가한다.
   * @param - index to add <ko>추가하기 위한 index</ko>
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```ts
   * ig.insert(2, `<div class="item">test1</div><div class="item">test2</div>`);
   * ig.insert(3, [`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
   * ig.insert(4, [HTMLElement1, HTMLElement2]);
   * ```
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
   * Add items based on group index.
   * @ko group의 index 기준으로 item들을 추가한다.
   * @param - group index to add <ko>추가하기 위한 group의 index</ko>
   * @param - items to be added <ko>추가할 아이템들</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   * @return - An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * ```ts
   * ig.insertByGroupIndex(2, `<div class="item">test1</div><div class="item">test2</div>`);
   * ig.insertByGroupIndex(3, [`<div class="item">test1</div>`, `<div class="item">test2</div>`]);
   * ig.insertByGroupIndex(4, [HTMLElement1, HTMLElement2]);
   * ```
   */
  public insertByGroupIndex(groupIndex: number, items: InfiniteGridInsertedItems, groupKey?: string | number): this {
    const nextGroupInfos: InfiniteGridGroup[] = this.groupManager.getGroups();
    const rightGroup = nextGroupInfos[groupIndex];

    if (!rightGroup) {
      return this.append(items, groupKey);
    }
    const nextItemInfos: InfiniteGridItemInfo[] = this.groupManager.getGroupItems();
    const rightGroupKey = rightGroup.groupKey;
    const rightItemIndex = findIndex(nextItemInfos, (item) => item.groupKey === rightGroupKey);

    return this.insert(rightItemIndex, items, groupKey);
  }
  /**
   * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
   * @ko 아이템의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
   * @param - STATUS_TYPE.NOT_REMOVE = Get all information about items. STATUS_TYPE.REMOVE_INVISIBLE_ITEMS = Get information on visible items only. STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS = Compress invisible items. You can replace it with a placeholder. STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS = Compress invisible groups. <ko> STATUS_TYPE.NOT_REMOVE = 모든 아이템들의 정보를 가져온다. STATUS_TYPE.REMOVE_INVISIBLE_ITEMS = 보이는 아이템들의 정보만 가져온다. STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS = 안보이는 아이템들을 압축한다. placeholder로 대체가 가능하다. STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS = 안보이는 그룹을 압축한다.</ko>
   * @param - Whether to include items corresponding to placeholders. <ko>placeholder에 해당하는 아이템들을 포함할지 여부.</ko>
   */
  public getStatus(type?: STATUS_TYPE, includePlaceholders?: boolean): InfiniteGridStatus {
    return {
      containerManager: this.containerManager.getStatus(),
      itemRenderer: this.itemRenderer.getStatus(),
      groupManager: this.groupManager.getGroupStatus(type, includePlaceholders),
      scrollManager: this.scrollManager.getStatus(),
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
   * You can set placeholders to restore status or wait for items to be added.
   * @ko status 복구 또는 아이템 추가 대기를 위한 placeholder를 설정할 수 있다.
   * @param - The placeholder status. <ko>placeholder의 status</ko>
   */
  public setLoading(info: Partial<InfiniteGridItemStatus> | null): this {
    this.groupManager.setLoading(info);
    return this;
  }
  /**
   * Add the placeholder at the end.
   * @ko placeholder들을 마지막에 추가한다.
   * @param - Items that correspond to placeholders. If it is a number, it duplicates the number of copies. <ko>placeholder에 해당하는 아이템들. 숫자면 갯수만큼 복제를 한다.</ko>
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   */
  public appendPlaceholders(
    items: number | InfiniteGridItemStatus[],
    groupKey?: string | number,
  ): InsertedPlaceholdersResult {
    const result = this.groupManager.appendPlaceholders(items, groupKey);

    this._syncGroups(true);
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
   * @param - The group key to be configured in items. It is automatically generated by default. <ko>추가할 아이템에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
   */
  public prependPlaceholders(
    items: number | InfiniteGridItemStatus[],
    groupKey?: string | number,
  ): InsertedPlaceholdersResult {
    const result = this.groupManager.prependPlaceholders(items, groupKey);

    this._syncGroups(true);
    return {
      ...result,
      remove: () => {
        this.removePlaceholders({ groupKey: result.group.groupKey });
      },
    };
  }

  /**
   * Remove placeholders
   * @ko placeholder들을 삭제한다.
   * @param type - Remove the placeholders corresponding to the groupkey. When "start" or "end", remove all placeholders in that direction. <ko>groupkey에 해당하는 placeholder들을 삭제한다. "start" 또는 "end" 일 때 해당 방향의 모든 placeholder들을 삭제한다.</ko>
   */
  public removePlaceholders(type: "start" | "end" | { groupKey: string | number }) {
    this.groupManager.removePlaceholders(type);
    this._syncGroups(true);
  }

  /**
   * Sets the status of the InfiniteGrid module with the information returned through a call to the getStatus() method.
   * @ko getStatus() 메서드가 저장한 정보로 InfiniteGrid 모듈의 상태를 설정한다.
   * @param - status object of the InfiniteGrid module. <ko>InfiniteGrid 모듈의 status 객체.</ko>
   * @param - Whether the first rendering has already been done. <ko>첫 렌더링이 이미 되어있는지 여부.</ko>
   */
  public setStatus(status: InfiniteGridStatus, useFirstRender?: boolean): this {
    this.itemRenderer.setStatus(status.itemRenderer);
    this.containerManager.setStatus(status.containerManager);
    this.scrollManager.setStatus(status.scrollManager);
    const groupManager = this.groupManager;
    const prevInlineSize = this.containerManager.getInlineSize();

    groupManager.setGroupStatus(status.groupManager);
    this._syncInfinite();
    this.infinite.setCursors(groupManager.getStartCursor(), groupManager.getEndCursor());

    this._getRenderer().updateKey();

    const state = {
      isResize: this.containerManager.getInlineSize() !== prevInlineSize,
      isRestore: true,
    };
    if (useFirstRender) {
      this._syncItems(state);
    } else {
      this._update(state);
    }
    return this;
  }
  /**
   * Removes the group corresponding to index.
   * @ko index에 해당하는 그룹을 제거 한다.
   */
  public removeGroupByIndex(index: number): this {
    const nextGroups = this.getGroups();

    return this.removeGroupByKey(nextGroups[index].groupKey);
  }
  /**
   * Removes the group corresponding to key.
   * @ko key에 해당하는 그룹을 제거 한다.
   */
  public removeGroupByKey(key: number | string): this {
    const nextItemInfos = this.getItems();

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
   * Return rendering items of InfiniteGrid.
   * @ko InfiniteGrid의 렌더링 아이템들을 반환한다.
   */
  public getRenderingItems(): InfiniteGridItem[] {
    return this.groupManager.getRenderingItems();
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
   * Set to wait to request data.
   * @ko 데이터를 요청하기 위해 대기 상태로 설정한다.
   * @param direction - direction in which data will be added. <ko>데이터를 추가하기 위한 방향.</ko>
   */
  public wait(direction: "start" | "end" = DIRECTION.END) {
    this._waitType = direction;
    this._checkStartLoading(direction);
  }
  /**
   * When the data request is complete, it is set to ready state.
   * @ko 데이터 요청이 끝났다면 준비 상태로 설정한다.
   */
  public ready() {
    this._waitType = "";
  }
  /**
   * Returns whether it is set to wait to request data.
   * @ko 데이터를 요청하기 위해 대기 상태로 설정되어 있는지 여부를 반환한다.
   */
  public isWait() {
    return !!this._waitType;
  }
  /**
   * Releases the instnace and events and returns the CSS of the container and elements.
   * @ko 인스턴스와 이벤트를 해제하고 컨테이너와 엘리먼트들의 CSS를 되돌린다.
   */
  public destroy(): void {
    this.off();
    this._getRenderer().destroy();
    this.containerManager.destroy();
    this.groupManager.destroy();
    this.scrollManager.destroy();
    this.infinite.destroy();
  }

  private _getRenderer() {
    return this.options.renderer!;
  }
  private _getRendererItems() {
    return this.getRenderingItems().map((item) => {
      return {
        element: item.element,
        key: `${item.type}_${item.key}`,
        orgItem: item,
      };
    });
  }
  private _syncItems(state?: Record<string, any>): void {
    this._getRenderer().syncItems(this._getRendererItems(), state);
  }
  private _render(state?: Record<string, any>): void {
    this._getRenderer().render(this._getRendererItems(), state);
  }
  private _update(state: Record<string, any> = {}): void {
    this._getRenderer().update(state);
  }
  private _resizeScroll() {
    const scrollManager = this.scrollManager;

    scrollManager.resize();

    this.infinite.setSize(scrollManager.getContentSize());
  }
  private _syncGroups(isUpdate?: boolean) {
    const infinite = this.infinite;
    const scrollManager = this.scrollManager;

    if (!scrollManager.getContentSize()) {
      this._resizeScroll();
    }
    this._syncInfinite();
    this.groupManager.setCursors(infinite.getStartCursor(), infinite.getEndCursor());
    if (isUpdate) {
      this._update();
    } else {
      this._render();
    }
  }
  private _syncInfinite() {
    this.infinite.syncItems(this.getGroups(true).map(({ groupKey, grid, type }) => {
      const outlines = grid.getOutlines();

      return {
        key: groupKey,
        isVirtual: type === GROUP_TYPE.VIRTUAL,
        startOutline: outlines.start,
        endOutline: outlines.end,
      };
    }));
  }
  private _scroll() {
    this.infinite.scroll(this.scrollManager.getRelativeScrollPos());
  }
  private _onScroll = ({ direction, scrollPos, relativeScrollPos }: OnChangeScroll): void => {
    this._scroll();
    /**
     * This event is fired when scrolling.
     * @ko 스크롤하면 발생하는 이벤트이다.
     * @event InfiniteGrid#changeScroll
     * @param {InfiniteGrid.OnChangeScroll} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     */
    this.trigger(new ComponentEvent(INFINITEGRID_EVENTS.CHANGE_SCROLL, {
      direction,
      scrollPos,
      relativeScrollPos,
    }));
  }

  private _onChange = (e: OnInfiniteChange): void => {
    this.setCursors(e.nextStartCursor, e.nextEndCursor);
  }
  private _onRendererUpdated = (e: OnRendererUpdated<GridRendererItem>): void => {
    const renderedItems = e.items;

    renderedItems.forEach((item) => {
      // set grid element
      const gridItem = item.orgItem;

      gridItem.element = item.element as HTMLElement;
    });

    if (!e.isChanged) {
      this._checkEndLoading();
      this._scroll();
      return;
    }

    const {
      added,
      removed,
      prevList,
      list,
    } = e.diffResult;

    removed.forEach((index) => {
      const orgItem = prevList[index].orgItem;

      if (orgItem.mountState !== MOUNT_STATE.UNCHECKED) {
        orgItem.mountState = MOUNT_STATE.UNMOUNTED;
      }
    });


    const horizontal = this.options.horizontal;
    const addedItems = added.map((index) => {
      const gridItem = list[index].orgItem;
      const element = gridItem.element!;

      if (gridItem.type === ITEM_TYPE.VIRTUAL) {
        const cssRect = { ...gridItem.cssRect };
        const rect = gridItem.rect;

        if (!cssRect.width && rect.width) {
          cssRect.width = rect.width;
        }
        if (!cssRect.height && rect.height) {
          cssRect.height = rect.height;
        }
        // virtual item
        return new GridItem(horizontal!, {
          element,
          cssRect,
        });
      }
      return gridItem;
    });

    const containerManager = this.containerManager;
    if (this.options.observeChildren) {
      containerManager.observeChildren(added.map((index) => list[index].element!));
      containerManager.unobserveChildren(removed.map((index) => prevList[index].element!));
    }

    const {
      isRestore,
      isResize,
    } = e.state;

    this.itemRenderer.renderItems(addedItems);

    if (isRestore) {
      this._onRenderComplete({
        mounted: added.map((index) => list[index].orgItem),
        updated: [],
        isResize: false,
        direction: this.defaultDirection,
      });
    }
    if (!isRestore || isResize || e.isItemChanged) {
      this.groupManager.renderItems();
    }
  }

  private _onResize = (e: ResizeWatcherResizeEvent) => {
    if (e.isResizeContainer) {
      this._renderItems({ useResize: true }, true);
    } else {
      const updatedItems = getUpdatedItems(this.getVisibleItems(), e.childEntries) as InfiniteGridItem[];

      if (updatedItems.length > 0) {
        this.updateItems(updatedItems);
      }
    }
  }

  private _onRequestAppend = (e: OnRequestInsert): void => {
    /**
     * The event is fired when scrolling reaches the end or when data for a virtual group is required.
     * @ko 스크롤이 끝에 도달하거나 virtual 그룹에 대한 데이터가 필요한 경우 이벤트가 발생한다.
     * @event InfiniteGrid#requestAppend
     * @param {InfiniteGrid.OnRequestAppend} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     */
    this._onRequestInsert(DIRECTION.END, INFINITEGRID_EVENTS.REQUEST_APPEND, e);
  }

  private _onRequestPrepend = (e: OnInfiniteRequestPrepend): void => {
    /**
     * The event is fired when scrolling reaches the start or when data for a virtual group is required.
     * @ko 스크롤이 끝에 도달하거나 virtual 그룹에 대한 데이터가 필요한 경우 이벤트가 발생한다.
     * @event InfiniteGrid#requestPrepend
     * @param {InfiniteGrid.OnRequestPrepend} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     */
    this._onRequestInsert(DIRECTION.START, INFINITEGRID_EVENTS.REQUEST_PREPEND, e);
  }

  private _onRequestInsert(
    direction: "start" | "end",
    eventType: "requestAppend" | "requestPrepend",
    e: OnInfiniteRequestAppend | OnInfiniteRequestPrepend,
  ) {
    if (this._waitType) {
      this._checkStartLoading(this._waitType);
      return;
    }
    this.trigger(new ComponentEvent(eventType, {
      groupKey: e.key,
      nextGroupKey: e.nextKey,
      nextGroupKeys: e.nextKeys || [],
      isVirtual: e.isVirtual,
      wait: () => {
        this.wait(direction);
      },
      ready: () => {
        this.ready();
      },
    }));
  }

  private _onContentError = ({ element, target, item, update }: OnContentError): void => {
    /**
     * The event is fired when scrolling reaches the start or when data for a virtual group is required.
     * @ko 스크롤이 끝에 도달하거나 virtual 그룹에 대한 데이터가 필요한 경우 이벤트가 발생한다.
     * @event InfiniteGrid#contentError
     * @param {InfiniteGrid.OnContentError} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     */
    this.trigger(new ComponentEvent(INFINITEGRID_EVENTS.CONTENT_ERROR, {
      element,
      target,
      item: item as InfiniteGridItem,
      update,
      remove: () => {
        this.removeByKey(item.key!);
      },
    }));
  }

  private _onRenderComplete = ({ isResize, mounted, updated, direction }: OnPickedRenderComplete): void => {
    const infinite = this.infinite;
    const prevRenderedGroups = infinite.getRenderedVisibleItems();
    const length = prevRenderedGroups.length;
    const isDirectionEnd = direction === DIRECTION.END;

    this._syncInfinite();

    if (length) {
      const prevStandardGroup = prevRenderedGroups[isDirectionEnd ? 0 : length - 1];
      const nextStandardGroup = infinite.getItemByKey(prevStandardGroup.key);
      const offset = isDirectionEnd
        ? Math.min(...nextStandardGroup.startOutline) - Math.min(...prevStandardGroup.startOutline)
        : Math.max(...nextStandardGroup.endOutline) - Math.max(...prevStandardGroup.endOutline);

      this.scrollManager.scrollBy(offset);
    }

    /**
     * This event is fired when the InfiniteGrid has completed rendering.
     * @ko InfiniteGrid가 렌더링이 완료됐을 때 이벤트가 발생한다.
     * @event InfiniteGrid#renderComplete
     * @param {InfiniteGrid.OnRenderComplete} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     */
    this.trigger(new ComponentEvent(INFINITEGRID_EVENTS.RENDER_COMPLETE, {
      isResize,
      direction,
      mounted: (mounted as InfiniteGridItem[]).filter((item) => item.type !== ITEM_TYPE.LOADING),
      updated: (updated as InfiniteGridItem[]).filter((item) => item.type !== ITEM_TYPE.LOADING),
      startCursor: this.getStartCursor(),
      endCursor: this.getEndCursor(),
      items: this.getVisibleItems(true),
      groups: this.getVisibleGroups(true),
    }));

    if (this.groupManager.shouldRerenderItems()) {
      this._update();
    } else {
      this._checkEndLoading();
      this._scroll();
    }
  }
  private _renderItems(options: RenderOptions = {}, isTrusted?: boolean) {
    if (!isTrusted && options.useResize) {
      this.containerManager.resize();
    }
    this._resizeScroll();
    if (!this.getRenderingItems().length) {
      const children = toArray(this.getContainerElement().children);
      if (children.length > 0) {
        // no items, but has children
        this.groupManager.syncItems(convertInsertedItems(children));
        this._syncInfinite();
        this.setCursors(0, 0, true);
        this._getRenderer().updated();
      } else {
        this.infinite.scroll(0);
      }
      return this;
    }
    if (!this.getVisibleGroups(true).length) {
      this.setCursors(0, 0);
    } else {
      this.groupManager.renderItems(options);
    }
    return this;
  }
  private _checkStartLoading(direction: "start" | "end") {
    const groupManager = this.groupManager;
    const infinite = this.infinite;

    if (
      !groupManager.getLoadingType()
      && infinite.isLoading(direction)
      && groupManager.startLoading(direction)
      && groupManager.hasLoadingItem()
    ) {
      this._update();
    }
  }
  private _checkEndLoading() {
    const groupManager = this.groupManager;
    const loadingType = this.groupManager.getLoadingType();

    if (
      loadingType
      && (!this._waitType || !this.infinite.isLoading(loadingType))
      && groupManager.endLoading()
      && groupManager.hasLoadingItem()
    ) {
      this._update();
    }
  }
}

interface InfiniteGrid extends Properties<typeof InfiniteGrid> { }

export default InfiniteGrid;
