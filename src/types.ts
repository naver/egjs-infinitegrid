import Grid, {
  GridOptions,
  GridFunction,
} from "@egjs/grid";
import { InfiniteGridItem } from "./InfiniteGridItem";
import { Renderer } from "./Renderer/Renderer";

export interface InfiniteGridGroup {
  groupKey: string | number;
  grid: Grid;
}

export interface CategorizedGroup {
  groupKey: number | string;
  items: InfiniteGridItem[];
}
/**
 * @typedef
 * @memberof eg.InfiniteGrid
 */
export interface InfiniteGridItemInfo {
  groupKey?: string | number;
  key?: string | number;
  element?: HTMLElement | null;
  html?: string;
  data?: Record<string, any>;
}



export interface InfiniteGridOptions extends GridOptions {
  gridConstructor?: GridFunction | null;
  container?: boolean | string | HTMLElement;
  renderer?: Renderer | null;
}

/**
 * @typedef
 * @memberof InfiniteGrid
 * @property - Last group key. <ko>마지막 그룹의 키.</ko>
 */
export interface OnRequestAppend {
  groupKey: string | number | undefined;
}

/**
 * @typedef
 * @memberof InfiniteGrid
 * @property - First group key. <ko>첫번째 그룹의 키.</ko>
 */
export interface OnRequestPrepend {
  groupKey: string | number | undefined;
}


/**
 * @typedef
 * @memberof InfiniteGrid
 * @property - First group key. <ko>첫번째 그룹의 키.</ko>
 */
export interface OnRequestPrepend {
  groupKey: string | number | undefined;
}

/**
 * @typedef
 * @memberof InfiniteGrid
 * @property - The items rendered for the first time. <ko>처음 렌더링한 아이템들.</ko>
 * @property - The items updated in size. <ko>사이즈 업데이트한 아이템들.</ko>
 * @property - Whether rendering was done using the resize event or the useResize option. <ko>resize 이벤트 또는 useResize 옵션을 사용하여 렌더링를 했는지 여부.</ko>
 * @property - The key of the first group that has been rendered. <ko>렌더링이 완료된 첫번째 그룹의 키.</ko>
 * @property - The key of the last group that has been rendered. <ko>렌더링이 완료된 마지막 그룹의 키.</ko>
 * @property - Items that have been rendered. <ko>렌더링이 완료된 아이템들.</ko>
 * @property - Groups that have been rendered. <ko>렌더링이 완료된 그룹들.</ko>
 */
export interface OnRenderComplete {
  mounted: InfiniteGridItem[];
  updated: InfiniteGridItem[];
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



export type InfiniteGridInsertedItems = string | Array<string | InfiniteGridItemInfo | HTMLElement>;
