import ItemManager from "./ItemManager";

export interface InfiniteStatus {
	startCursor: number;
	endCursor: number;
	size: number;
}

export interface InfiniteOption {
	useRecycle?: boolean;
	threshold?: number;
	append?: (event?: {cache: any[]}) => any;
	prepend?: (event?: {cache: any[]}) => any;
	recycle?: (event?: {start: number, end: number}) => any;
}
declare class Infinite {
	constructor(itemManager: ItemManager, options?: InfiniteOption);
	setSize(size: number): this;
	recycle(scrollPos: number, isForward: boolean): this;
	scroll(scrollPos: number): this;
	setCursor(cursor: string, index: number): this;
	updateCursor(cursor: string): this;
	setData(item: object, isAppend?: boolean): this;
	setStatus(status: InfiniteStatus): this;
	getStatus(startKey?: any, endKey?: any): InfiniteStatus;
	getCursor(cursor: string): number;
	getEdgeOutline(cursor: string): any[];
	getEdgeValue(cursor: string): number;
	getVisibleData(): any[];
	getVisibleItems(): any[];
	remove(element: Element): any[];
	clear(): void;
}

export default Infinite;