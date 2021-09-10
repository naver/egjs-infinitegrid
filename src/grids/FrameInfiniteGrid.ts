import { FrameGrid, FrameGridOptions } from "@egjs/grid";
import InfiniteGrid from "../InfiniteGrid";
import { InfiniteGridOptions } from "../types";
import { InfiniteGridGetterSetter } from "../utils";

/**
 * @typedef
 * @extends InfiniteGridOptions
 * @extends Grid.FrameGrid.FrameGridOptions
 */
export interface FrameInfiniteGridOptions extends FrameGridOptions, InfiniteGridOptions {
}

/**
 * 'Frame' is a printing term with the meaning that 'it fits in one row wide'. FrameInfiniteGrid is a grid that the item is filled up on the basis of a line given a size.
 * @ko 'Frame'는 '1행의 너비에 맞게 꼭 들어찬'이라는 의미를 가진 인쇄 용어다. FrameInfiniteGrid는 용어의 의미대로 너비가 주어진 사이즈를 기준으로 아이템이 가득 차도록 배치하는 Grid다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {FrameInfiniteGridOptions} options - The option object of the FrameInfiniteGrid module <ko>FrameGrid 모듈의 옵션 객체</ko>
 */
@InfiniteGridGetterSetter
export class FrameInfiniteGrid extends InfiniteGrid<FrameInfiniteGridOptions> {
  public static propertyTypes = {
    ...InfiniteGrid.propertyTypes,
    ...FrameGrid.propertyTypes,
  };
  public static defaultOptions: Required<FrameInfiniteGridOptions> = {
    ...InfiniteGrid.defaultOptions,
    ...FrameGrid.defaultOptions,
    gridConstructor: FrameGrid,
  } as const;
}
