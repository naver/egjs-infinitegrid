import { MasonryGrid, MasonryGridOptions } from "@egjs/grid";
import InfiniteGrid from "../InfiniteGrid";
import { InfiniteGridOptions } from "../types";
import { InfiniteGridGetterSetter } from "../utils";

/**
 * @typedef
 * @extends InfiniteGridOptions
 * @extends Grid.MasonryGrid.MasonryGridOptions
 */
export interface MasonryInfiniteGridOptions extends MasonryGridOptions, InfiniteGridOptions {
}

/**
 * MasonryInfiniteGrid is a grid that stacks items with the same width as a stack of bricks. Adjust the width of all images to the same size, find the lowest height column, and insert a new item.
 * @ko MasonryInfiniteGrid는 벽돌을 쌓아 올린 모양처럼 동일한 너비를 가진 아이템을 쌓는 레이아웃이다. 모든 이미지의 너비를 동일한 크기로 조정하고, 가장 높이가 낮은 열을 찾아 새로운 이미지를 삽입한다. 따라서 배치된 아이템 사이에 빈 공간이 생기지는 않지만 배치된 레이아웃의 아래쪽은 울퉁불퉁해진다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {MasonryInfiniteGridOptions} options - The option object of the MasonryInfiniteGrid module <ko>MasonryInfiniteGrid 모듈의 옵션 객체</ko>
 */
@InfiniteGridGetterSetter
export class MasonryInfiniteGrid extends InfiniteGrid<MasonryInfiniteGridOptions> {
  public static propertyTypes = {
    ...InfiniteGrid.propertyTypes,
    ...MasonryGrid.propertyTypes,
  };
  public static defaultOptions: Required<MasonryInfiniteGridOptions> = {
    ...InfiniteGrid.defaultOptions,
    ...MasonryGrid.defaultOptions,
    gridConstructor: MasonryGrid,
    appliedItemChecker: (item, grid) => {
      const column = parseFloat(item.attributes.column) || 0;

      return column >= grid.outlineLength;
    },
  } as const;
}
