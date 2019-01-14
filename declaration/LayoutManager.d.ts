import ItemManager from "./ItemManager";
import DOMRenderer from "./DOMRenderer";
import { ILayout, ILayoutResult, IInfiniteGridItem, IInfiniteGridGroup, IErrorCallbackOptions } from "./types";
export interface ILayoutManagerOptions {
    attributePrefix?: string;
    isEqualSize?: boolean;
    isConstantSize?: boolean;
    horizontal?: boolean;
}
export interface ICompleteCallbackOptions {
    groups?: ILayoutResult[];
    items?: IInfiniteGridItem[];
    isAppend?: boolean;
}
export interface IEndCallbackOptions {
    remove: HTMLElement[];
    layout?: boolean;
}
export interface ILayoutManagerCallbacks {
    complete: (e: ICompleteCallbackOptions) => void;
    error: (e: IErrorCallbackOptions) => void;
    end: (e: IEndCallbackOptions) => void;
}
export default class LayoutMananger {
    options: Required<ILayoutManagerOptions>;
    _items: ItemManager;
    _renderer: DOMRenderer;
    _layout: ILayout;
    constructor(items: ItemManager, renderer: DOMRenderer, options?: ILayoutManagerOptions);
    setLayout(layout: ILayout): void;
    setSize(size: number): void;
    append({groups, items, isUpdate}: {
        groups: IInfiniteGridGroup[];
        items: IInfiniteGridItem[];
        isUpdate?: boolean;
    }, callbacks: Partial<ILayoutManagerCallbacks>): void;
    prepend({groups, items, isUpdate}: {
        groups: IInfiniteGridGroup[];
        items: IInfiniteGridItem[];
        isUpdate?: boolean;
    }, callbacks: Partial<ILayoutManagerCallbacks>): void;
    layout(isRelayout: boolean, groups: IInfiniteGridGroup[], items: IInfiniteGridItem[]): IInfiniteGridGroup[];
    destroy(): void;
    private _complete(groups, items, isAppend, isUpdate, callback);
    private _error(removeTarget, replaceTarget, target, items, errorIndex, callback);
    private _end(removeTarget, replaceTarget, items, callback);
    private _insert({groups, items, isAppend, isUpdate}, {error, complete, end});
}
