import { PackingGrid, PackingGridOptions } from "@egjs/grid";
import InfiniteGrid from "../InfiniteGrid";
import { InfiniteGridOptions } from "../types";
import { InfiniteGridGetterSetter } from "../utils";

/**
 * @typedef
 * @extends InfiniteGridOptions
 * @extends Grid.PackingGrid.PackingGridOptions
 */
export interface PackingInfiniteGridOptions extends PackingGridOptions, InfiniteGridOptions {
}

/**
 * The PackingInfiniteGrid is a grid that shows the important items bigger without sacrificing the weight of the items.
 * Rows and columns are separated so that items are dynamically placed within the horizontal and vertical space rather than arranged in an orderly fashion.
 * If `sizeWeight` is higher than `ratioWeight`, the size of items is preserved as much as possible.
 * Conversely, if `ratioWeight` is higher than `sizeWeight`, the ratio of items is preserved as much as possible.
 * @ko PackingInfiniteGrid는 아이템의 본래 크기에 따른 비중을 해치지 않으면서 중요한 카드는 더 크게 보여 주는 레이아웃이다.
 * 행과 열이 구분돼 아이템을 정돈되게 배치하는 대신 가로세로 일정 공간 내에서 동적으로 아이템을 배치한다.
 * `sizeWeight`가 `ratioWeight`보다 높으면 아이템들의 size가 최대한 보존이 된다.
 * 반대로 `ratioWeight`가 `sizeWeight`보다 높으면 아이템들의 비율이 최대한 보존이 된다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {PackingInfiniteGridOptions} options - The option object of the PackingInfiniteGrid module <ko>PackingInfiniteGrid 모듈의 옵션 객체</ko>
 */
@InfiniteGridGetterSetter
export class PackingInfiniteGrid extends InfiniteGrid<PackingInfiniteGridOptions> {
  public static propertyTypes = {
    ...InfiniteGrid.propertyTypes,
    ...PackingGrid.propertyTypes,
  };
  public static defaultOptions: Required<PackingInfiniteGridOptions> = {
    ...InfiniteGrid.defaultOptions,
    ...PackingGrid.defaultOptions,
    gridConstructor: PackingGrid,
  };
}
