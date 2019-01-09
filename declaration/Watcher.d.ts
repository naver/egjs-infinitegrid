import { WindowMockType } from "./browser";
export interface IWatcherOptions {
    container: HTMLElement;
    isOverflowScroll: boolean;
    horizontal: boolean;
    resize: () => void;
    check: (e?: {
        isForward: boolean;
        scrollPos: number;
        orgScrollPos: number;
        horizontal: boolean;
    }) => void;
}
export interface IWatchStatus {
    _prevPos: number;
    scrollPos: number;
}
export default class Watcher {
    options: IWatcherOptions;
    private _timer;
    private _containerOffset;
    private _view;
    private _isScrollIssue;
    private _prevPos;
    constructor(view: WindowMockType | HTMLElement, options?: Partial<IWatcherOptions>);
    getStatus(): IWatchStatus;
    setStatus(status: IWatchStatus, applyScrollPos?: boolean): void;
    scrollBy(pos: number): void;
    scrollTo(pos: number): void;
    getScrollPos(): number;
    setScrollPos(pos?: number): void;
    attachEvent(): void;
    getOrgScrollPos(): number;
    reset(): void;
    getContainerOffset(): number;
    resize(): void;
    detachEvent(): void;
    destroy(): void;
    private _onCheck;
    private _getOffset;
    private _onResize;
}
