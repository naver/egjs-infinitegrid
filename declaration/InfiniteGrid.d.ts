import * as Component from "@egjs/component";



interface InfiniteGridOption {
	itemSelector?: string;
	isEqualSize?: boolean;
	isOverflowScroll?: boolean;
	threshold?: number;
	useRecycle?: boolean;
	horizontal?: boolean;
	loadingBar?: string | {
	  append?: string | HTMLElement;
	  prepend?: string | HTMLElement;
	}
  }


interface Item {
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
	} 
	size?: {
	  width: number,
	  height: number;
	},
	column? : number
  }

interface DOMRendererStatus {
	cssText: string;
	options: {
		isEqualSize: boolean;
		isOverflowScroll: boolean;
		horizontal: boolean;
	}
	_size: {
		container: number;
		view: number;
		viewport: number;
		item?: {
			width: number;
			height: number;
		}
	}
}
interface InfiniteGridStatus {
	options: InfiniteGridOption;
	_items: {
	  _data: Array<Item>;
	}
	_renderer: DOMRendererStatus;
	_infinite: {
		startCursor: number;
		endCursor: number;
		size: number;
	}
	_size: {
	  containerOffset: number;
	  item?: number;
	  view: number;
	  viewport: number;
	},
	_status: {
		end: Item;
		endCursor: number;
		start: Item;
		startCursor: number;
		loadingBar?: string | {
		append?: string | HTMLElement;
		prepend?: string | HTMLElement;
		},
		processingStatus: number;
	},
	_watcher: {
		scrollPos: number;
		_prevPos: number;
	}
}
  
export default class InfiniteGrid extends Component {
	constructor(el: string | HTMLElement, options?: InfiniteGridOption);
	append(elements: (string|HTMLElement)[]| string, groupKey?: string|number): InfiniteGrid;
	prepend(elements: (string|HTMLElement)[]| string, groupKey?: string|number): InfiniteGrid;
	moveTo(index: number, itemIndex?: number): InfiniteGrid;
	clear(): InfiniteGrid;
	destroy();
	getGroupKeys(includeCached?: boolean): (string|number)[];
	getStatus(): object;
	isProcessing(): boolean;
	layout(isRelayout?: boolean): InfiniteGrid;
	remove(item: HTMLElement): (object|null);
	setLayout(LayoutKlass, options?): InfiniteGrid;
	getItems(includeCached?: boolean): Array<Item>;
	setStatus(status: InfiniteGridStatus, applyScrollPos: boolean): InfiniteGrid;
  }