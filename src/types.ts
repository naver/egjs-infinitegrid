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

/**
 * @typedef
 */
export interface InfiniteGridStatus {
  itemRenderer: ItemRendererStatus;
  containerManager: ContainerManagerStatus;
  groupManager: GroupManagerStatus;
}

export interface InfiniteGridGroup {
  type: GROUP_TYPE;
  groupKey: string | number;
  grid: Grid;
  items: InfiniteGridItem[];
}

export interface CategorizedGroup<Item extends InfiniteGridItemInfo = InfiniteGridItem> {
  groupKey: number | string;
  items: Item[];
}
/**
 * @typedef
 * @memberof InfiniteGrid
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
 * @memberof InfiniteGrid
 * @property - Grid class to apply Infinite function. <ko>Infinite 기능을 적용할 Grid 클래스.</ko>
 * @property - The target to which the container is applied. If false, create itself, if true, create container. A string or HTMLElement specifies the target directly. (default: false) <ko>container를 적용할 대상. false면 자기 자신, true면 container를 생성. string 또는 HTMLElement는 직접 대상을 지정. (default: false)</ko>
 * @property - The size of the scrollable area for adding the next group of items. (default: 100) <ko>다음 아이템 그룹을 추가하기 위한 스크롤 영역의 크기. (default: 100)</ko>
 */
export interface InfiniteGridOptions extends GridOptions {
  gridConstructor?: GridFunction;
  renderer?: Renderer | null;
  container?: boolean | string | HTMLElement;
  threshold?: number;
}

/**
 * @typedef
 * @memberof InfiniteGrid
 * @property - Last group key. <ko>마지막 그룹의 키.</ko>
 * @property - The key of the next group that should replace the placeholder. <ko>placeholder를 대체해야 할 다음 그룹의 키.</ko>
 */
export interface OnRequestAppend {
  groupKey: string | number | undefined;
  nextGroupKey?: string | number | undefined;
}

/**
 * @typedef
 * @memberof InfiniteGrid
 * @property - First group key. <ko>첫번째 그룹의 키.</ko>
 * @property - The key of the next group that should replace the placeholder. <ko>placeholder를 대체해야 할 다음 그룹의 키.</ko>
 */
export interface OnRequestPrepend {
  groupKey: string | number | undefined;
  nextGroupKey?: string | number | undefined;
}

/**
 * @typedef
 * @memberof InfiniteGrid
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
 * @memberof InfiniteGrid
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
 * @memberof InfiniteGrid
 * @property - The item's element.<ko>아이템의 엘리먼트.</ko>
 * @property - The content element with error.<ko>에러난 발생한 콘텐츠 엘리먼트.</ko>
 * @property - The item with error content.<ko>에러난 콘텐츠를 가지고 있는 아이템</ko>
 * @property - If you have fixed the error and want to recheck it, call update(). If you remove an element, call the syncElements() method.<ko>에러를 해결했고 재검사하고 싶으면 update()를 호출해라. 만약 엘리먼트를 삭제한 경우 syncElements() 메서드를 호출해라.</ko>
 * @property - If you want to remove the item corresponding to the error, call remove(). <ko>에러에 해당하는 아이템을 제거하고 싶으면 remove()를 호출해라.</ko>
 */
export interface OnContentError {
  element: HTMLElement;
  target: HTMLElement;
  item: InfiniteGridItem;
  update(): void;
  remove(): void;
}

/**
 * @typedef
 * @memberof InfiniteGrid
 * @property - The scroll direction. <ko>스크롤 방향.</ko>
 * @property - The scroll position. <ko>스크롤 포지션.</ko>
 * @property - The scroll position relative to container. <ko>컨테이너 기준의 스크롤 포지션.</ko>
 */
export interface OnScroll {
  direction: "start" | "end";
  scrollPos: number;
  relativeScrollPos: number;
}

export interface InfiniteGridEvents {
  scroll: OnScroll;
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
  groupKey?: string | number;
  nextGroupKey?: string | number;
}
export type InfiniteGridInsertedItems = string | Array<string | InfiniteGridItemInfo | HTMLElement>;

export type InfiniteGridMethods<Component> = Methods<Component, InfiniteGrid, typeof INFINITEGRID_METHODS>;
export type InfiniteGridFunction
  = (new (container: HTMLElement, options: Partial<GridOptions>) => InfiniteGrid)
  & { propertyTypes: any, defaultOptions: any };
