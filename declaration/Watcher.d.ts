export interface WatcherStatus {
	scrollPos: number;
	_prevPos: number;
}
export interface WatcherOptions {
	container?: HTMLElement;
	resize?: () => {},
	check?: (params?: {
		isForward?: boolean,
		scrollPos?: number | null,
		orgScrollPos?: number,
		horizontal?: boolean,
	}) => {},
	isOverflowScroll?: false;
	horizontal?: false;
}
declare class Watcher {
	constructor(view: HTMLElement, options?: WatcherOptions);
	getStatus(): WatcherStatus;
	setStatus(status: WatcherStatus, applyScrollPos?: boolean): void;
	scrollBy(pos: number): void;
	scrollTo(pos: number): void;
	getScrollPos(): number | null;
	setScrollPos(pos?: number): void;
	attachEvent(): void;
	getOrgScrollPos(): number;
	reset(): void;
	getContainerOffset(): number;
	resize(): void;
	detachEvent(): void;
	destroy(): void;
}
export default Watcher;
