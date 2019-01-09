import {
	IS_IOS,
} from "./consts";
import {
	window, WindowMockType,
} from "./browser";
import {
	addEvent,
	removeEvent,
	scroll,
	scrollTo,
	scrollBy,
	assign,
} from "./utils";

export interface IWatcherOptions {
	container: HTMLElement;
	isOverflowScroll: boolean;
	horizontal: boolean;
	resize: () => void;
	check: (e?: {
		isForward: boolean,
		scrollPos: number,
		orgScrollPos: number,
		horizontal: boolean,
	}) => void;
}
export interface IWatchStatus {
	_prevPos: number;
	scrollPos: number;
}
export default class Watcher {
	public options: IWatcherOptions;
	private _timer: {
		resize: any;
	};
	private _containerOffset: number;
	private _view: WindowMockType | HTMLElement;
	private _isScrollIssue: boolean;
	private _prevPos: number;
	constructor(view: WindowMockType | HTMLElement, options: Partial<IWatcherOptions> = {}) {
		assign(this.options = {
			container: view as HTMLElement,
			resize: () => void 0,
			check: () => void 0,
			isOverflowScroll: false,
			horizontal: false,
		}, options);
		this._timer = {
			resize: null,
		};
		this.reset();
		this._containerOffset = 0;
		this._view = view;
		this._isScrollIssue = IS_IOS;
		this._onCheck = this._onCheck.bind(this);
		this._onResize = this._onResize.bind(this);
		this.attachEvent();
		this.resize();
		this.setScrollPos();
	}
	public getStatus(): IWatchStatus {
		return {
			_prevPos: this._prevPos,
			scrollPos: this.getOrgScrollPos(),
		};
	}
	public setStatus(status: IWatchStatus, applyScrollPos = true) {
		this._prevPos = status._prevPos;
		applyScrollPos && this.scrollTo(status.scrollPos);
	}
	public scrollBy(pos: number) {
		const arrPos = this.options.horizontal ? [pos, 0] : [0, pos];

		scrollBy(this._view, arrPos[0], arrPos[1]);
		this.setScrollPos();
	}
	public scrollTo(pos: number) {
		const arrPos = this.options.horizontal ? [pos, 0] : [0, pos];

		scrollTo(this._view, arrPos[0], arrPos[1]);
	}
	public getScrollPos() {
		return this._prevPos;
	}
	public setScrollPos(pos = this.getOrgScrollPos()) {
		let rawPos = pos;

		if (typeof pos === "undefined") {
			rawPos = this.getOrgScrollPos();
		}
		this._prevPos = rawPos - this.getContainerOffset();
	}
	public attachEvent() {
		addEvent(this._view, "scroll", this._onCheck);
		addEvent(window, "resize", this._onResize);
	}
	public getOrgScrollPos() {
		return scroll(this._view, this.options.horizontal);
	}
	public reset() {
		this._prevPos = null;
	}
	public getContainerOffset() {
		return this._containerOffset;
	}
	public resize() {
		this._containerOffset = this._getOffset();
	}
	public detachEvent() {
		removeEvent(this._view, "scroll", this._onCheck);
		removeEvent(window, "resize", this._onResize);
	}
	public destroy() {
		this.detachEvent();
		this.reset();
	}
	private _onCheck() {
		const prevPos = this.getScrollPos();
		const orgScrollPos = this.getOrgScrollPos();

		this.setScrollPos(orgScrollPos);
		const scrollPos = this.getScrollPos();

		if (prevPos === null || (this._isScrollIssue && orgScrollPos === 0) || prevPos === scrollPos) {
			orgScrollPos && (this._isScrollIssue = false);
			return;
		}
		this._isScrollIssue = false;
		this.options.check({
			isForward: prevPos < scrollPos,
			scrollPos,
			orgScrollPos,
			horizontal: this.options.horizontal,
		});
	}
	private _getOffset() {
		const { container, horizontal } = this.options;
		const rect = container.getBoundingClientRect();

		return rect[horizontal ? "left" : "top"] + this.getOrgScrollPos();
	}
	private _onResize() {
		if (this._timer.resize) {
			clearTimeout(this._timer.resize);
		}
		this._timer.resize = setTimeout(() => {
			this.resize();
			this.options.resize();
			this._timer.resize = null;
			this.reset();
		}, 100);
	}

}
