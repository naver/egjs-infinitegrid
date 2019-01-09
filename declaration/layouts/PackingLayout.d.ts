import { ILayout } from "../types";
import { IInfiniteGridItem, IInfiniteGridGroup } from "../ItemManager";
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
    private _findBestFitArea;
    private _layout;
    private _insert;
}
export default PackingLayout;
