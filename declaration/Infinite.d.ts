import ItemManager, { IInfiniteGridGroup } from "./ItemManager";
import { CursorType } from "./types";
export interface IInfiniteOptions {
    useRecycle?: boolean;
    threshold?: number;
    append?: (e?: {
        cache: IInfiniteGridGroup[];
    }) => void;
    prepend?: (e?: {
        cache: IInfiniteGridGroup[];
    }) => void;
    recycle?: (e?: {
        start: number;
        end: number;
    }) => void;
}
export interface IInfiniteStatus {
    startCursor: number;
    endCursor: number;
    size: number;
}
declare class Infinite {
    options: Required<IInfiniteOptions>;
    private _items;
    private _status;
    constructor(itemManger: ItemManager, options: IInfiniteOptions);
    setSize(size: number): void;
    recycle(scrollPos: number, isForward?: boolean): void;
    scroll(scrollPos: number): void;
    setCursor(cursor: CursorType, index: number): void;
    setStatus(status: IInfiniteStatus): void;
    getStatus(startKey: string | number, endKey: string | number): IInfiniteStatus;
    getEdgeOutline(cursor: CursorType): number[];
    getEdgeValue(cursor: CursorType): number;
    getVisibleItems(): import("./ItemManager").IInfiniteGridItem[];
    getCursor(cursor: CursorType): number;
    getVisibleData(): IInfiniteGridGroup[];
    remove(element: HTMLElement): import("./ItemManager").IInfiniteGridItem[];
    clear(): void;
}
export default Infinite;
