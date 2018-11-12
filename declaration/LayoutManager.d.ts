import DOMRenderer from "./DOMRenderer";
import ItemManager from "./ItemManager";

export interface LayoutManagerOptions {
	attributePrefix?: string,
	isEqualSize?: boolean,
	isConstantSize?: boolean,
	horizontal?: boolean,
}
export interface LayoutManagerCallbacks {
	complete?: (params?: {
		groups?: any[],
		items?: any[],
		isAppend?: boolean,
	}) => void;
	error?: (params?: {
		target?: HTMLElement,
		element?: HTMLElement,
		items?: any[],
		item?: any,
		itemIndex?: number,
		replace: (src: any) => void,
		replaceItem: (content?: string) => void,
		remove: () => void,
		removeItem: () => void,
	}) => void;
	end?: (params?: {
		remove?: any[],
		layout?: boolean,
	}) => void;
}
  
declare class LayoutManager {
	constructor(items: ItemManager, renderer: DOMRenderer, options?: LayoutManagerOptions);
	setLayout(layout: any): void;
	setSize(size: number): void;
	append(params: {groups?: any[], items?: any[], isUpdate?: boolean}, callbacks?: LayoutManagerCallbacks): void;
	prepend(params: {groups?: any[], items?: any[], isUpdate?: boolean}, callbacks?: LayoutManagerCallbacks): void;
	layout(isRelayout: boolean, groups: any[], items: any[]): any[];
	destroy(): void;
}

export default LayoutManager;
