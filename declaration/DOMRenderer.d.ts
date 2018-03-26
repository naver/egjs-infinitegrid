export interface DOMRendererStatus {
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