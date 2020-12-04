import Component from "@egjs/component";
import InfiniteGrid from "./index.squarelayout";
export declare type CursorType = "start" | "end";
export declare type SizeType = "width" | "height";
export declare type PositionType = "left" | "top";
export declare type ReversePositionType = "right" | "bottom";
export declare type RectType = SizeType | PositionType;
export declare type InnerSizeType = "innerWidth" | "innerHeight";
export declare type ClientSizeType = "clientWidth" | "clientHeight";
export declare type OffsetSizeType = "offsetWidth" | "offsetHeight";
export declare type ScrollSizeType = "scrollWidth" | "scrollHeight";
export interface IInfiniteGridOptions {
    itemSelector: string;
    isOverflowScroll: boolean;
    threshold: number;
    isEqualSize: boolean;
    isConstantSize: boolean;
    useRecycle: boolean;
    horizontal: boolean;
    transitionDuration: number;
    useFit: boolean;
    attributePrefix: string;
    renderExternal: boolean;
    resizeDebounce: number;
    maxResizeDebounce: number;
    percentage: boolean | Array<"size" | "position">;
}
export interface IInfiniteGridGroup {
    groupKey: string | number;
    items: IInfiniteGridItem[];
    outlines: {
        start: number[];
        end: number[];
    };
}
export interface IWatcherOptions {
    container: HTMLElement;
    isOverflowScroll: boolean;
    horizontal: boolean;
    resizeDebounce: number;
    maxResizeDebounce: number;
    resize: () => void;
    check: (e: {
        isForward: boolean;
        scrollPos: number;
        orgScrollPos: number;
        horizontal: boolean;
    }) => void;
}
export interface IInfiniteOptions {
    useRecycle: boolean;
    threshold: number;
    append: (e: {
        cache: IInfiniteGridGroup[];
    }) => void;
    prepend: (e: {
        cache: IInfiniteGridGroup[];
    }) => void;
    recycle: (e: {
        start: number;
        end: number;
    }) => void;
}
export interface IInfiniteGridStatus {
    _status: {
        processingStatus: number;
        loadingSize: number;
        loadingStyle: StyleType;
    };
    _itemManager: IItemManagerStatus;
    _renderer: IDOMRendererStatus;
    _watcher: IWatchStatus;
    _infinite: IInfiniteStatus;
}
export interface IItemManagerStatus {
    _data: IInfiniteGridGroup[];
}
export interface IInfiniteStatus {
    startCursor: number;
    endCursor: number;
    size: number;
}
export interface IDOMRendererSize {
    container: number;
    view: number;
    viewport: number;
    item?: ISize | null;
}
export interface IDOMRendererStatus {
    cssText: string;
    _size: IDOMRendererSize;
}
export interface IWatchStatus {
    _prevPos: number | null;
    scrollPos: number;
}
export interface IRemoveResult {
    group: IInfiniteGridGroup | null;
    items: IInfiniteGridItem[];
}
export interface IErrorCallbackOptions {
    target: HTMLImageElement;
    element: HTMLElement;
    items: IInfiniteGridItem[];
    item: IInfiniteGridItem;
    itemIndex: number;
    totalIndex: number;
    replace: (src?: string | HTMLElement) => void;
    replaceItem: (content: string) => void;
    remove: () => void;
    removeItem: () => void;
}
export interface IInfiniteGridItem {
    groupKey: string | number;
    itemKey?: string | number;
    content: string;
    el?: IInfiniteGridItemElement | null;
    orgSize?: ISize | null;
    size?: ISize | null;
    rect: IPosition & Partial<ISize>;
    prevRect?: (IPosition & Partial<ISize>) | null;
    needUpdate: boolean;
    mounted: boolean;
    [key: string]: any;
}
export interface IIndexes {
    groupIndex?: number;
    itemIndex?: number;
}
export interface IGroup {
    groupKey: string | number;
    [key: string]: any;
}
export interface IItem {
    groupKey: string | number;
    itemKey?: string | number;
    [key: string]: any;
}
export declare type Equals<X, Y, A, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
export declare type ExcludeReadOnly<T> = Pick<T, {
    [K in keyof T]: (Equals<{
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
export interface IImageLoadedOptions {
    prefix?: string;
    length?: number;
    type?: 1 | 2;
    complete?: () => void;
    end?: () => void;
    error?: (e: {
        target: LoadingImageElement;
        itemIndex: number;
    }) => void;
}
export interface LoadingImageElement extends HTMLImageElement {
    __ITEM_INDEX__?: number;
}
export interface IDOMRendererOptions {
    isEqualSize: boolean;
    isConstantSize: boolean;
    horizontal: boolean;
    container: boolean | HTMLElement;
    percentage: boolean | Array<"size" | "position">;
}
export interface IDOMRendererOrgStyle {
    position?: CSSStyleDeclaration["position"];
    overflowX?: CSSStyleDeclaration["overflowX"];
    overflowY?: CSSStyleDeclaration["overflowY"];
}
export interface IArrayFormat<T> {
    length: number;
    [index: number]: T;
}
export interface IDOMRendererOptions {
    isEqualSize: boolean;
    isConstantSize: boolean;
    horizontal: boolean;
    container: boolean | HTMLElement;
}
export interface IDOMRendererOrgStyle {
    position?: CSSStyleDeclaration["position"];
    overflowX?: CSSStyleDeclaration["overflowX"];
    overflowY?: CSSStyleDeclaration["overflowY"];
}
export declare type ExcludeKeys = keyof Component | "clear" | "destroy" | "remove" | "prepend" | "append" | "setLayout" | "removeByIndex" | "setLoadingBar" | "beforeSync" | "sync" | "getRenderingItems";
export declare type InfiniteGridMethodsKeys = Exclude<keyof InfiniteGrid, ExcludeKeys>;
export declare type InfiniteGridMethods = Pick<InfiniteGrid, InfiniteGridMethodsKeys>;
export declare type OnAppend = {
    isTrusted: boolean;
    groupKey: string | number | undefined;
    startLoading: (userStyle: StyleType) => void;
    endLoading: (userStyle: StyleType) => void;
};
export declare type OnPrepend = {
    isTrusted: boolean;
    groupKey: string | number | undefined;
    startLoading: (userStyle: StyleType) => void;
    endLoading: (userStyle: StyleType) => void;
};
export declare type OnLayoutComplete = {
    target: IInfiniteGridItem[];
    isAppend: boolean;
    isTrusted: boolean;
    fromCache: boolean;
    isLayout: boolean;
    isScroll: boolean;
    scrollPos: number | null;
    orgScrollPos: number;
    size: number;
    endLoading: (userStyle: StyleType) => void;
};
export declare type OnContentError = {
    target: HTMLElement;
    element: HTMLElement;
    items: IInfiniteGridItem[];
    item: IInfiniteGridItem;
    itemIndex: number;
    totalIndex: number;
    replace: (element?: string | HTMLElement) => void;
    replaceItem: (content: string) => void;
    remove: () => void;
    removeItem: () => void;
};
export declare type OnImageError = {
    target: HTMLImageElement;
    element: HTMLElement;
    items: IInfiniteGridItem[];
    item: IInfiniteGridItem;
    itemIndex: number;
    totalIndex: number;
    replace: (src?: string | HTMLImageElement) => void;
    replaceItem: (content: string) => void;
    remove: () => void;
    removeItem: () => void;
};
export declare type OnRender = {
    next: () => void;
};
export declare type OnChange = {
    isForward: boolean;
    horizontal: boolean;
    scrollPos: number;
    orgScrollPos: number;
};
export declare type RenderManagerEvents = {
    preReady: void;
    readyElement: {
        item: IInfiniteGridItem;
    };
    ready: {
        remove: HTMLElement[];
        layout?: boolean;
    };
    imageError: OnImageError;
    contentError: OnContentError;
    renderComplete: {
        start: number;
        end: number;
    };
    layoutComplete: {
        items: IInfiniteGridItem[];
        isAppend: boolean;
    };
};
export declare type InfiniteGridEvents = {
    append: OnAppend;
    prepend: OnPrepend;
    render: OnRender;
    layoutComplete: OnLayoutComplete;
    imageError: OnImageError;
    contentError: OnContentError;
    change: OnChange;
};
