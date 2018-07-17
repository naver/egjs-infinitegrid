export interface DOMRendererStatus {
	cssText: string;
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
export interface DOMRendererOptions {
	isEqualSize: boolean;
	isConstantSize: boolean;
	horizontal: boolean;
	container: boolean | HTMLElement;
}

declare class DOMRenderer {
	static renderItems(items: any[], transitionDuration?: number): void;
	constructor(element: HTMLElement, options: DOMRendererOptions);
	getStatus(): DOMRendererStatus;
	setStatus(status: DOMRendererStatus): void;
	updateSize(items: any[]): void;
	append(items: any[]): void;
	prepend(items: any[]): void;
	createAndInsert(items: any[], isAppend: boolean);
	getViewSize(): number;
	getViewportSize(): number;
	setContainerSize(size: number): void;
	resize(): boolean;
	isNeededResize(): boolean;
	clear(): void;
	destroy(): void;
}
export default DOMRenderer;
