
export interface Item {
	el?: HTMLElement;
	content: string;
	groupKey?: number|string;
	orgSize?: {
		width: number,
		height: number;
	},
	rect?: {
		top: number,
		left: number;
		width?: number;
		height?: number;
	},
	prevRect?: {
		top: number,
		left: number;
		width?: number;
		height?: number;
	}
	size?: {
		width: number,
		height: number;
	},
	[others: string]: any,
}


export interface ItemStatus  {
	_data: Item[];
}

declare class ItemManager {
	static from(elements: any[] | string, selector: string, options: {groupKey?: any, isAppend?: boolean}): any[];
	static selectItems(elements: any[], selector: string): any[];
	static pluck(data: any[], property: string): any[];
	constructor();
	getStatus(startKey?: any, endKey?: any);
	setStatus(status?: ItemStatus);
	size(): number;
	fit(base: number, horizontal: boolean): void;
	pluck(property: string, start?: number, end?: number): any[];
	getOutline(index: number, property: string): any[];
	getEdgeIndex(cursor: string, start: number, end: number): number;
	getEdgeValue(cursor: string, start: number, end: number): number;
	clearOutlines(startCursor?: number, endCursor?: number);
	getMaxEdgeValue(): number;
	append(layouted: any): any[];
	prepend(layouted: any): any[];
	clear(): void;
	remove(element: HTMLElement, start?: number, end?: number): any[];
	indexOf(data: any): number;
	get(start?: number, end?: number): any[];
	set(data?: any, key?: any): void;
	getData(index?: number): any;
}

export default ItemManager;