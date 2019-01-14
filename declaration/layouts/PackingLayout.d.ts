import { ILayout, IInfiniteGridItem, IInfiniteGridGroup } from "../types";
declare class PackingLayout implements ILayout {
    options: {
        horizontal: boolean;
        margin: number;
        aspectRatio: number;
        sizeWeight: number;
        ratioWeight: number;
    };
    private _size;
    private _style;
    constructor(options?: Partial<PackingLayout["options"]>);
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
    private _findBestFitArea(container, item);
    private _layout(items, outline?, isAppend?);
    private _insert(items?, outline?, isAppend?, cache?);
}
export default PackingLayout;
