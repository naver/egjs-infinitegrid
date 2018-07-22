import * as Component from "@egjs/component";
import {InfiniteStatus} from "./Infinite";
import {DOMRendererStatus} from "./DOMRenderer";
import {WatcherStatus} from "./Watcher";
import {Item, ItemStatus} from "./ItemManager";

export interface InfiniteGridOption {
	itemSelector?: string;
	isEqualSize?: boolean;
	isOverflowScroll?: boolean;
	threshold?: number;
	useRecycle?: boolean;
	horizontal?: boolean;
	useFit?: boolean;
	isConstantSize?: boolean;
	transitionDuration?: number;
}

export interface InfiniteGridStatus {
	options: InfiniteGridOption;
	_items: ItemStatus;
	_infinite: InfiniteStatus;
	_renderer: DOMRendererStatus;
	_watcher: WatcherStatus;
	_status: {
		loadingSize?: number;
		loadingStyle?: object;
		processingStatus: number;
	},
}

  
declare class InfiniteGrid extends Component {
	constructor(el: string | HTMLElement, options?: InfiniteGridOption);
	append(elements: (string|HTMLElement)[]| string, groupKey?: string|number): this;
	prepend(elements: (string|HTMLElement)[]| string, groupKey?: string|number): this;
	moveTo(index: number, itemIndex?: number): this;
	clear(): this;
	destroy();
	getGroupKeys(includeCached?: boolean): (string|number)[];
	getStatus(startKey?: any, endKey?: any): InfiniteGridStatus;
	isProcessing(): boolean;
	layout(isRelayout?: boolean): this;
	remove(item: HTMLElement): (object|null);
	setLayout(LayoutKlass, options?): this;
	getItems(includeCached?: boolean): Item[];
	setStatus(status: InfiniteGridStatus, applyScrollPos?: boolean): this;
}

export default InfiniteGrid;
