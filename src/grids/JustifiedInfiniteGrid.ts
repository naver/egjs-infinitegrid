import { JustifiedGrid, JustifiedGridOptions } from "@egjs/grid";
import InfiniteGrid from "../InfiniteGrid";
import { InfiniteGridOptions } from "../types";
import { InfiniteGridGetterSetter } from "../utils";

/**
 * @typedef
 * @extends InfiniteGridOptions
 * @extends Grid.JustifiedGrid.JustifiedGridOptions
 */
export interface JustifiedInfiniteGridOptions extends JustifiedGridOptions, InfiniteGridOptions {
}

/**
 * 'justified' is a printing term with the meaning that 'it fits in one row wide'. JustifiedInfiniteGrid is a grid that the item is filled up on the basis of a line given a size.
 * If 'data-grid-inline-offset' or 'data-grid-content-offset' are set for item element, the ratio is maintained except for the offset value.
 * If 'data-grid-maintained-target' is set for an element whose ratio is to be maintained, the item is rendered while maintaining the ratio of the element.
 * @ko 'justified'는 '1행의 너비에 맞게 꼭 들어찬'이라는 의미를 가진 인쇄 용어다. JustifiedInfiniteGrid는 용어의 의미대로 너비가 주어진 사이즈를 기준으로 아이템가 가득 차도록 배치하는 Grid다.
 * 아이템 엘리먼트에 'data-grid-inline-offset' 또는 'data-grid-content-offset'를 설정하면 offset 값을 제외하고 비율을 유지한다.
 * 비율을 유지하고 싶은 엘리먼트에 'data-grid-maintained-target'을 설정한다면 해당 엘리먼트의 비율을 유지하면서 아이템이 렌더링이 된다.
 * @param {HTMLElement | string} container - A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
 * @param {JustifiedInfiniteGridOptions} options - The option object of the JustifiedInfiniteGrid module <ko>JustifiedInfiniteGrid 모듈의 옵션 객체</ko>
 */
@InfiniteGridGetterSetter
export class JustifiedInfiniteGrid extends InfiniteGrid<JustifiedInfiniteGridOptions> {
  public static propertyTypes = {
    ...InfiniteGrid.propertyTypes,
    ...JustifiedGrid.propertyTypes,
  };
  public static defaultOptions: Required<JustifiedInfiniteGridOptions> = {
    ...InfiniteGrid.defaultOptions,
    ...JustifiedGrid.defaultOptions,
    gridConstructor: JustifiedGrid,
  } as const;
}
