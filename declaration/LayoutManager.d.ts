import ItemManager, { IInfiniteGridGroup, IInfiniteGridItem } from "./ItemManager";
import DOMRenderer from "./DOMRenderer";
import { ILayout, ILayoutResult } from "./types";
export interface ILayoutManagerOptions {
    attributePrefix?: string;
    isEqualSize?: boolean;
    isConstantSize?: boolean;
    horizontal?: boolean;
}
export interface ILayoutManagerErrorCallbackOptions {
    target: HTMLImageElement;
    element: HTMLElement;
    items: IInfiniteGridItem[];
    item: IInfiniteGridItem;
    itemIndex?: number;
    replace: (src: string) => void;
    replaceItem: (content: string) => void;
    remove: () => void;
    removeItem: () => void;
}
export interface ILayoutManagerCompleteCallbackOptions {
    groups?: ILayoutResult[];
    items?: IInfiniteGridItem[];
    isAppend?: boolean;
}
export interface ILayoutManagerEndCallbackOptions {
    remove: HTMLElement[];
    layout?: boolean;
}
export interface ILayoutManagerCallbacks {
    complete: (e?: ILayoutManagerCompleteCallbackOptions) => void;
    error: (e?: ILayoutManagerErrorCallbackOptions) => void;
    end: (e?: ILayoutManagerEndCallbackOptions) => void;
}
export default class LayoutMananger {
    options: Required<ILayoutManagerOptions>;
    _items: ItemManager;
    _renderer: DOMRenderer;
    _layout: ILayout;
    constructor(items: ItemManager, renderer: DOMRenderer, options?: ILayoutManagerOptions);
    setLayout(layout: ILayout): void;
    setSize(size: number): void;
    append({ groups, items, isUpdate, }: {
        groups: IInfiniteGridGroup[];
        items: IInfiniteGridItem[];
        isUpdate?: boolean;
    }, callbacks: Partial<ILayoutManagerCallbacks>): void;
    prepend({ groups, items, isUpdate, }: {
        groups: IInfiniteGridGroup[];
        items: IInfiniteGridItem[];
        isUpdate?: boolean;
    }, callbacks: Partial<ILayoutManagerCallbacks>): void;
    layout(isRelayout: boolean, groups: IInfiniteGridGroup[], items: IInfiniteGridItem[]): IInfiniteGridGroup[];
    destroy(): void;
    private _complete;
    private _error;
    private _end;
    private _insert;
}
