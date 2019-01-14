import { IJQuery, IInfiniteGridItem, WindowMockType, IDOMRendererStatus, IDOMRendererSize } from "./types";
export declare function resetSize(item: IInfiniteGridItem): void;
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
export default class DOMRenderer {
    static renderItem(item: IInfiniteGridItem, rect: IInfiniteGridItem["rect"], transitionDuration?: number): void;
    static renderItems(items: IInfiniteGridItem[], transitionDuration?: number): void;
    static removeItems(items: IInfiniteGridItem[]): void;
    static removeElement(element: HTMLElement): void;
    static createElements(items: IInfiniteGridItem[]): void;
    container: HTMLElement;
    view: WindowMockType | HTMLElement;
    options: IDOMRendererOptions;
    _size: IDOMRendererSize;
    _orgStyle: IDOMRendererOrgStyle;
    constructor(element: string | HTMLElement | IJQuery, options: IDOMRendererOptions);
    getStatus(): {
        cssText: string;
        _size: IDOMRendererSize;
    };
    setStatus(status: IDOMRendererStatus): void;
    updateSize(items: IInfiniteGridItem[]): IInfiniteGridItem[];
    append(items: IInfiniteGridItem[]): void;
    prepend(items: IInfiniteGridItem[]): void;
    createAndInsert(items: IInfiniteGridItem[], isAppend?: boolean): void;
    getViewSize(): number;
    getViewportSize(): number;
    getContainerSize(): number;
    setContainerSize(size: number): void;
    resize(): boolean;
    isNeededResize(): boolean;
    clear(): void;
    destroy(): void;
    private _init(el);
    private _insert(items, isAppend?, styles?);
    private _calcSize();
}
