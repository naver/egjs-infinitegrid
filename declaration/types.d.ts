import { IInfiniteGridItem, IInfiniteGridGroup } from "./ItemManager";
export declare type CursorType = "start" | "end";
export declare type SizeType = "width" | "height";
export declare type PositionType = "left" | "top";
export declare type ReversePositionType = "right" | "bottom";
export declare type RectType = SizeType | PositionType;
export declare type InnerSizeType = "innerWidth" | "innerHeight";
export declare type ClientSizeType = "clientWidth" | "clientHeight";
export declare type OffsetSizeType = "offsetWidth" | "offsetHeight";
export declare type ScrollSizeType = "scrollWidth" | "scrollHeight";
export declare type Equals<X, Y, A, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
declare type ExcludeReadOnly<T> = Pick<T, {
    [K in keyof T]?: (Equals<{
        -readonly [P in K]: T[K];
    }, {
        [P in K]: T[K];
    }, K>);
}[string & keyof T]>;
export declare type StyleType = Partial<ExcludeReadOnly<CSSStyleDeclaration>>;
export interface IInfiniteGridItemElement extends HTMLElement {
    _INFINITEGRID_TRANSITION?: boolean;
    __IMAGE__?: -1 | IInfiniteGridItemElement;
    __BOX__?: IInfiniteGridItemElement;
    __SIZE__?: number;
    __TRANSLATE__?: number;
    __RATIO__?: number;
}
export interface ITransitionProperties {
    property: "transition-property";
    duration: "transition-duration";
    delay: "transition-delay";
}
export interface IRectlProperties {
    startPos1: PositionType;
    endPos1: ReversePositionType;
    size1: SizeType;
    startPos2: PositionType;
    endPos2: ReversePositionType;
    size2: SizeType;
}
export interface IAlign {
    START: "start";
    CENTER: "center";
    END: "end";
    JUSTIFY: "justify";
}
export interface IPosition {
    top: number;
    left: number;
}
export interface ISize {
    width: number;
    height: number;
}
export interface IJQuery {
    length: number;
    jquery: string;
    toArray(): Array<string | HTMLElement>;
    get(index: number): string | HTMLElement;
}
export interface ILayoutResult {
    items: IInfiniteGridItem[];
    outlines: {
        start: number[];
        end: number[];
    };
}
export interface ILayout {
    options: {
        horizontal: boolean;
        margin: number;
        [key: string]: any;
    };
    append(groupItems: IInfiniteGridItem[], outline: number[], cache?: boolean): ILayoutResult;
    prepend(groupItems: IInfiniteGridItem[], outline: number[], cache?: boolean): ILayoutResult;
    setSize(size: number): this;
    layout(groups: IInfiniteGridGroup[], outline: number[]): this;
}
export {};
