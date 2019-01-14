import FrameLayout, { IFrameLayoutInterface } from "./FrameLayout";
import { IInfiniteGridItem } from "../types";
export interface ISquareLayoutOptions extends IFrameLayoutInterface {
    column: number;
}
export default class SquareLayout extends FrameLayout {
    options: ISquareLayoutOptions;
    constructor(options?: Partial<ISquareLayoutOptions>);
    protected _checkItemSize(): void;
    protected _layout(items: IInfiniteGridItem[], outline?: number[], isAppend?: boolean): {
        start: number[];
        end: number[];
    };
}
