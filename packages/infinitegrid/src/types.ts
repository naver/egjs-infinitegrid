import { Ref } from "@cfcs/core";
import Grid, {
  GridOptions,
  GridFunction,
  GridItem,
  ContainerManagerStatus,
  ItemRendererStatus,
  Methods,
} from "@egjs/grid";
import { GROUP_TYPE, INFINITEGRID_METHODS, ITEM_TYPE } from "./consts";
import { GroupManagerStatus } from "./GroupManager";
import InfiniteGrid from "./InfiniteGrid";
import { InfiniteGridItem } from "./InfiniteGridItem";
import { Renderer } from "./Renderer/Renderer";
import { ScrollManagerStatus } from "./ScrollManager";

/**
 * @typedef
 */
export interface InfiniteGridStatus {
  itemRenderer: ItemRendererStatus;
  containerManager: ContainerManagerStatus;
  groupManager: GroupManagerStatus;
  scrollManager: ScrollManagerStatus;
}

export interface InfiniteGridGroup {
  type: GROUP_TYPE;
  groupKey: string | number;
  grid: Grid;
  items: InfiniteGridItem[];
  renderItems: InfiniteGridItem[];
}

export interface CategorizedGroup<Item extends InfiniteGridItemInfo = InfiniteGridItem> {
  groupKey: number | string;
  items: Item[];
}
/**
 * @typedef
 */
export interface InfiniteGridItemInfo {
  type?: ITEM_TYPE;
  groupKey?: string | number;
  key?: string | number;
  element?: HTMLElement | null;
  html?: string;
  data?: Record<string, any>;
}


/**
 * @typedef
 * @extends Grid.GridOptions
 */
export interface InfiniteGridOptions extends GridOptions {
  /**
   * The target to which the container is applied. If false, create itself, if true, create container. A string or HTMLElement specifies the target directly.
   * @ko container를 적용할 대상. false면 자기 자신, true면 container를 생성. string 또는 HTMLElement는 직접 대상을 지정.
   * @default false
   */
  container?: boolean | HTMLElement | string | Ref<HTMLElement>;
  /**
   * If you create a container, you can set the container's tag.
   * @ko container를 생성한다면 container의 tag를 정할 수 있다.
   * @default "div"
   */
  containerTag?: string;
  /**
   * The size of the scrollable area for adding the next group of items.
   * @ko 다음 아이템 그룹을 추가하기 위한 스크롤 영역의 크기.
   * @default 100
   */
  threshold?: number;
  /**
   * Whether to show only the DOM of the visible area.
   * @ko 보이는 영역의 DOM만 보여줄지 여부.
   * @default true
   */
  useRecycle?: boolean;
  /**
   * You can set the scrollContainer directly. In this case, the container becomes the wrapper itself.
   * @ko scrollContainer를 직접 정할 수 있다. 이 경우 container는 wrapper 자기 자신이 된다.
   */
  scrollContainer?: HTMLElement | string | Ref<HTMLElement> | null;
  /**
   * Grid class to apply Infinite function.
   * @ko Infinite 기능을 적용할 Grid 클래스.
   */
  gridConstructor?: GridFunction;
  /**
   * class that renders the DOM.
   * @ko DOM을 렌더하는 클래스.
   */
  renderer?: Renderer | null;
}

/**
 * @typedef
 * @property - Groups corresponding to placeholders <ko>placholder에 해당하는 그룹</ko>
 * @property - Items corresponding to placeholders <ko>placholder에 해당하는 아이템들</ko>
 * @property - Remove the inserted placeholders. <ko>추가한 placeholder들을 삭제한다.</ko>
 */
export interface InsertedPlaceholdersResult {
  group: InfiniteGridGroup;
  items: InfiniteGridItem[];
  remove(): void;
}


/**
 * @typedef
 * @property - An InfiniteGrid instance that triggered this event. <ko>이 이벤트를 트리거한 InfiniteGrid의 인스턴스</ko>
 * @property - Last group key. <ko>마지막 그룹의 키.</ko>
 * @property - The key of the next group that should replace Virtual Item(placeholder)s. <ko>Virtual Item(placeholder)들을 대체해야 할 다음 그룹의 키.</ko>
 * @property - Array of the following group keys that need to be replaced with Virtual Item(placeholder)s. <ko>Virtual Item(placeholder)들을 대체해야 할 다음 그룹키 배열.</ko>
 * @property - Whether to request virtual groups corresponding to Virtual Item(placeholder)s. <ko>Virtual Item(placeholder)들에 해당하는 가상의 그룹을 요청하는지 여부</ko>
 * @property - Set to standby to request data. <ko>데이터를 요청하기 위해 대기 상태로 설정한다.</ko>
 * @property - When the data request is complete, it is set to ready state. <ko>데이터 요청이 끝났다면 준비 상태로 설정한다.</ko>
 */
export interface OnRequestAppend {
  currentTarget: InfiniteGrid;
  groupKey: string | number | undefined;
  nextGroupKey?: string | number | undefined;
  nextGroupKeys: Array<string | number>;
  isVirtual: boolean;
  wait(): void;
  ready(): void;
}

/**
 * @typedef
 * @property - An InfiniteGrid instance that triggered this event. <ko>이 이벤트를 트리거한 InfiniteGrid의 인스턴스</ko>
 * @property - First group key. <ko>첫번째 그룹의 키.</ko>
 * @property - The key of the next group that should replace Virtual Item(placeholder)s. <ko>Virtual Item(placeholder)들을 대체해야 할 다음 그룹의 키.</ko>
 * @property - Array of the following group keys that need to be replaced with Virtual Item(placeholder)s. <ko>Virtual Item(placeholder)들을 대체해야 할 다음 그룹키 배열.</ko>
 * @property - Whether to request virtual groups corresponding to Virtual Item(placeholder)s. <ko>Virtual Item(placeholder)들에 해당하는 가상의 그룹을 요청하는지 여부</ko>
 * @property - Set to standby to request data. <ko>데이터를 요청하기 위해 대기 상태로 설정한다.</ko>
 * @property - When the data request is complete, it is set to ready state. <ko>데이터 요청이 끝났다면 준비 상태로 설정한다.</ko>
 */
export interface OnRequestPrepend {
  currentTarget: InfiniteGrid;
  groupKey: string | number | undefined;
  nextGroupKey?: string | number | undefined;
  nextGroupKeys: Array<string | number>;
  isVirtual: boolean;
  wait(): void;
  ready(): void;
}


/**
 * @typedef
 * @property - An InfiniteGrid instance that triggered this event. <ko>이 이벤트를 트리거한 InfiniteGrid의 인스턴스</ko>
 * @property - The items rendered for the first time. <ko>처음 렌더링한 아이템들.</ko>
 * @property - The items updated in size. <ko>사이즈 업데이트한 아이템들.</ko>
 * @property - The direction InfiniteGrid was rendered. <ko>InfiniteGrid가 렌더링된 방향.</ko>
 * @property - Whether rendering was done using the resize event or the useResize option. <ko>resize 이벤트 또는 useResize 옵션을 사용하여 렌더링를 했는지 여부.</ko>
 * @property - The key of the first group that has been rendered. <ko>렌더링이 완료된 첫번째 그룹의 키.</ko>
 * @property - The key of the last group that has been rendered. <ko>렌더링이 완료된 마지막 그룹의 키.</ko>
 * @property - Items that have been rendered. <ko>렌더링이 완료된 아이템들.</ko>
 * @property - Groups that have been rendered. <ko>렌더링이 완료된 그룹들.</ko>
 */
export interface OnRenderComplete {
  currentTarget: InfiniteGrid;
  mounted: InfiniteGridItem[];
  updated: InfiniteGridItem[];
  direction: "start" | "end";
  isResize: boolean;
  startCursor: number;
  endCursor: number;
  items: InfiniteGridItem[];
  groups: InfiniteGridGroup[];
}

/**
 * @typedef
 * @property - An InfiniteGrid instance that triggered this event. <ko>이 이벤트를 트리거한 InfiniteGrid의 인스턴스</ko>
 * @property - The item's element.<ko>아이템의 엘리먼트.</ko>
 * @property - The content element with error.<ko>에러난 발생한 콘텐츠 엘리먼트.</ko>
 * @property - The item with error content.<ko>에러난 콘텐츠를 가지고 있는 아이템</ko>
 * @property - If you have fixed the error and want to recheck it, call update(). If you remove an element, call the syncElements() method.<ko>에러를 해결했고 재검사하고 싶으면 update()를 호출해라. 만약 엘리먼트를 삭제한 경우 syncElements() 메서드를 호출해라.</ko>
 * @property - If you want to remove the item corresponding to the error, call remove(). <ko>에러에 해당하는 아이템을 제거하고 싶으면 remove()를 호출해라.</ko>
 */
export interface OnContentError {
  currentTarget: InfiniteGrid;
  element: HTMLElement;
  target: HTMLElement;
  item: InfiniteGridItem;
  update(): void;
  remove(): void;
}

/**
 * @typedef
 * @property - An InfiniteGrid instance that triggered this event. <ko>이 이벤트를 트리거한 InfiniteGrid의 인스턴스</ko>
 * @property - The scroll direction. <ko>스크롤 방향.</ko>
 * @property - The scroll position. <ko>스크롤 포지션.</ko>
 * @property - The scroll position relative to container. <ko>컨테이너 기준의 스크롤 포지션.</ko>
 */
export interface OnChangeScroll {
  currentTarget: InfiniteGrid;
  direction: "start" | "end";
  scrollPos: number;
  relativeScrollPos: number;
}

export interface InfiniteGridEvents {
  changeScroll: OnChangeScroll;
  requestAppend: OnRequestAppend;
  requestPrepend: OnRequestPrepend;
  renderComplete: OnRenderComplete;
  contentError: OnContentError;
}



export interface OnPickedRenderComplete {
  mounted: GridItem[];
  updated: GridItem[];
  isResize: boolean;
  direction: "start" | "end";
}

export interface OnRequestInsert {
  key: string | number | undefined;
  nextKey: string | number | undefined;
  isVirtual: boolean;
}

export interface RenderingOptions {
  grid: InfiniteGrid<any> | null | undefined;
  status: InfiniteGridStatus | null | undefined;
  useFirstRender: boolean | null | undefined;
  usePlaceholder: boolean | null | undefined;
  useLoading: boolean | null | undefined;
  horizontal: boolean | null | undefined;
}
export type InfiniteGridInsertedItems = string | Array<string | InfiniteGridItemInfo | HTMLElement>;

export type InfiniteGridMethods<Component> = Methods<Component, InfiniteGrid, typeof INFINITEGRID_METHODS>;
export type InfiniteGridFunction
  = (new (container: HTMLElement, options: Partial<GridOptions>) => InfiniteGrid)
  & { propertyTypes: any, defaultOptions: any };
