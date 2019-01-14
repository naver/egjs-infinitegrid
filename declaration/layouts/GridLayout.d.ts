import { ILayout, IAlign, IInfiniteGridItem, IInfiniteGridGroup } from "../types";
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
    private checkColumn(item);
    private _layout(items, outline, isAppend?);
    private _insert(items?, outline?, isAppend?, cache?);
}
export default GridLayout;
