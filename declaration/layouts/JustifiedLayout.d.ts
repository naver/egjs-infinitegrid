import { ILayout } from "../types";
import { IInfiniteGridItem, IInfiniteGridGroup } from "../ItemManager";
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
    private _layout;
    private _getSize;
    private _getCost;
    private _setStyle;
    private _insert;
}
export default JustifiedLayout;
