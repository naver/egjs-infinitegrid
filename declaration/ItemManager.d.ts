
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
	} 
	size?: {
		width: number,
		height: number;
	},
	column? : number
}


export interface ItemStatus  {
	_data: Item[];
}

declare class ItemManager {
}

export default ItemManager;