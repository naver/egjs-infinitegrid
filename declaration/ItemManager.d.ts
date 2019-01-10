import { CursorType, IInfiniteGridItemElement, ISize, IPosition, IJQuery } from "./types";
export interface IInfiniteGridItem {
    groupKey: string | number;
    content: string;
    el?: IInfiniteGridItemElement;
    orgSize?: ISize;
    size?: ISize;
    rect?: Partial<ISize & IPosition>;
    prevRect?: Partial<ISize & IPosition>;
    [key: string]: any;
}
export interface IInfiniteGridGroup {
    groupKey: string | number;
    items: IInfiniteGridItem[];
    outlines: {
        start: number[];
        end: number[];
    };
}
export interface IItemManagerStatus {
    _data: IInfiniteGridGroup[];
}
export default class ItemManager {
    static from(elements: HTMLElement[] | string | string[] | IJQuery, selector: string, { groupKey }: {
        groupKey: string | number;
    }): {
        el: HTMLElement;
        groupKey: string | number;
        content: string;
        rect: {
            top: number;
            left: number;
        };
    }[];
    static selectItems(elements: HTMLElement[], selector?: string): HTMLElement[];
    static pluck<A extends {
        [key: string]: any;
    }, B extends keyof A>(data: A[], property: B): A[B] extends any[] ? A[B] : Array<A[B]>;
    _data: IInfiniteGridGroup[];
    constructor();
    getStatus(startKey?: string | number, endKey?: string | number): IItemManagerStatus;
    setStatus(status: IItemManagerStatus): void;
    size(): number;
    fit(base: number, horizontal: boolean): void;
    pluck<T extends keyof IInfiniteGridGroup>(property: T, start?: number, end?: number): IInfiniteGridGroup[T] extends any[] ? IInfiniteGridGroup[T] : IInfiniteGridGroup[T][];
    getOutline(index: number, property: keyof IInfiniteGridGroup["outlines"]): number[];
    getEdgeIndex(cursor: CursorType, start: number, end: number): number;
    getEdgeValue(cursor: CursorType, start: number, end: number): number;
    clearOutlines(startCursor?: number, endCursor?: number): void;
    getMaxEdgeValue(): number;
    append(layouted: IInfiniteGridGroup): IInfiniteGridItem[];
    prepend(layouted: IInfiniteGridGroup): IInfiniteGridItem[];
    clear(): void;
    remove(element: HTMLElement, start: number, end: number): {
        items: IInfiniteGridItem[];
        groups: IInfiniteGridGroup[];
    };
    indexOf(data: IInfiniteGridGroup | string | number): number;
    get(start?: number, end?: number): IInfiniteGridGroup[];
    set(data: IInfiniteGridGroup | IInfiniteGridGroup[], key?: string | number): void;
    getData(index: number): IInfiniteGridGroup;
}
