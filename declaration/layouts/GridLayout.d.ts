import { ILayout, IAlign } from "../types";
import { IInfiniteGridItem, IInfiniteGridGroup } from "../ItemManager";
declare class GridLayout implements ILayout {
    options: {
        horizontal: boolean;
        margin: number;
        align: IAlign[keyof IAlign];
        itemSize: number;
    };
    private _size;
    private _columnSize;
    private _columnLength;
    private _style;
    constructor(options?: Partial<GridLayout["options"]>);
    append(items: IInfiniteGridItem[], outline?: number[], cache?: boolean): {
        items: IInfiniteGridItem[];
        outlines: {
            start: number[];
            end: number[];
        };
    };
    prepend(items: IInfiniteGridItem[], outline?: number[], cache?: boolean): {
        items: IInfiniteGridItem[];
        outlines: {
            start: number[];
            end: number[];
        };
    };
    layout(groups?: IInfiniteGridGroup[], outline?: number[]): this;
    setSize(size: number): this;
    private checkColumn;
    private _layout;
    private _insert;
}
export default GridLayout;
