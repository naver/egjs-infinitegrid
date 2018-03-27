import ItemManager from "./ItemManager";

export interface InfiniteStatus {
	startCursor: number;
	endCursor: number;
	size: number;
}

export interface InfiniteOption {
	useRecycle?: boolean;
	threshold?: number;
	append?: (event?: {cache: any}) => any;
	prepend?: (event?: {cache: any}) => any;
	recycle?: (event?: {cache: any}) => any;
}
declare class Infinite {
	constructor(itemManager: ItemManager, options?: InfiniteOption);
	setSize(size: number): this;
	recycle(scrollPos: number, isForward: boolean): this;
	scroll(scrollPos: number, isForward: boolean): this;
	setCursor(cursor: string, index: number): this;
	updateCursor(cursor: string): this;
	setData(item: object, isAppend?: boolean): this;
	append(item: object): this;
	prepend(item: object): this;
	setStatus(status: InfiniteStatus);
	getStatus(): InfiniteStatus;
	getCursor(cursor: string): number;
	getEdgeOutline(cursor: string): any[];
	getEdgeValue(cursor: string): number;
	getVisibleData(): any[];
	getVisibleItems(): any[];
	remove(element: Element): any[];
	clear(): void;
}

export default Infinite;