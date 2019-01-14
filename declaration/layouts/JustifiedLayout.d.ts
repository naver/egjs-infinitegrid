import { ILayout, IInfiniteGridItem, IInfiniteGridGroup } from "../types";
declare class JustifiedLayout implements ILayout {
    options: {
        margin: number;
        minSize: number;
        maxSize: number;
        column: number | number[];
        horizontal: boolean;
    };
    private _style;
    private _size;
    constructor(options?: Partial<JustifiedLayout["options"]>);
    setSize(size: number): this;
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
    private _layout(items, outline, isAppend?);
    private _getSize(items, size1Name, size2Name);
    private _getCost(items, i, j, size1Name, size2Name);
    private _setStyle(items, path, outline?, isAppend?);
    private _insert(items?, outline?, isAppend?, cache?);
}
export default JustifiedLayout;
