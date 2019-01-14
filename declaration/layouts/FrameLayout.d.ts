import { ILayout, IRectlProperties, ISize, IInfiniteGridGroup, IInfiniteGridItem } from "../types";
export declare type FrameType = number[][];
export interface IFrameShape {
    left?: number;
    top?: number;
    type: any;
    width: number;
    height: number;
    index?: number;
}
export interface IFrameLayoutInterface {
    horizontal: boolean;
    margin: number;
    frame: FrameType;
    frameFill: boolean;
    itemSize: number | ISize;
    [key: string]: any;
}
declare class FrameLayout implements ILayout {
    options: IFrameLayoutInterface;
    protected _itemSize: number | ISize;
    protected _shapes: {
        shapes: IFrameShape[];
        width?: number;
        height?: number;
    };
    protected _size: number;
    protected _style: IRectlProperties;
    constructor(options?: Partial<IFrameLayoutInterface>);
    layout(groups?: IInfiniteGridGroup[], outline?: number[]): this;
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
    protected _getItemSize(): number | ISize;
    protected _checkItemSize(): void;
    protected _layout(items: IInfiniteGridItem[], outline?: number[], isAppend?: boolean): {
        start: number[];
        end: number[];
    };
    private _insert(items?, outline?, isAppend?, cache?);
}
export default FrameLayout;
