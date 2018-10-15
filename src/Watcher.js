import {
	IS_IOS,
} from "./consts";
import {
	addEvent,
	removeEvent,
	scroll,
	scrollTo,
	scrollBy,
} from "./utils";

export default class Watcher {
	constructor(view, options) {
		Object.assign(this.options = {
			container: view,
			resize: () => {},
			check: () => {},
			isOverflowScroll: false,
			horizontal: false,
		}, options);
		this._timer = {
			resize: null,
			// doubleCheck: null,
			// doubleCheckCount: RETRY,
		};
		this.reset();
		this._containerOffset = 0;
		this._view = view;
		this._scrollIssue = IS_IOS;
		this._onCheck = this._onCheck.bind(this);
		this._onResize = this._onResize.bind(this);
		this.attachEvent();
		this.resize();
		this.setScrollPos();
	}
	getStatus() {
		return {
			_prevPos: this._prevPos,
			scrollPos: this.getOrgScrollPos(),
		};
	}
	setStatus(status, applyScrollPos = true) {
		this._prevPos = status._prevPos;
		applyScrollPos && this.scrollTo(status.scrollPos);
	}
	scrollBy(pos) {
		const arrPos = this.options.horizontal ? [pos, 0] : [0, pos];

		scrollBy(this._view, ...arrPos);
		this.setScrollPos();
	}
	scrollTo(pos) {
		const arrPos = this.options.horizontal ? [pos, 0] : [0, pos];

		scrollTo(this._view, ...arrPos);
	}
	getScrollPos() {
		return this._prevPos;
	}
	setScrollPos(pos) {
		let rawPos = pos;

		if (typeof pos === "undefined") {
			rawPos = this.getOrgScrollPos();
		}
		this._prevPos = rawPos - this.getContainerOffset();
	}
	attachEvent() {
		addEvent(this._view, "scroll", this._onCheck);
		addEvent(window, "resize", this._onResize);
	}
	getOrgScrollPos() {
		return scroll(this._view, this.options.horizontal);
	}
	reset() {
		this._prevPos = null;
	}
	_onCheck() {
		const prevPos = this.getScrollPos();
		const orgScrollPos = this.getOrgScrollPos();

		this.setScrollPos(orgScrollPos);
		const scrollPos = this.getScrollPos();

		if (prevPos === null || (this._scrollIssue && orgScrollPos === 0) || prevPos === scrollPos) {
			orgScrollPos && (this._scrollIssue = false);
			return;
		}
		this._scrollIssue = false;
		this.options.check({
			isForward: prevPos < scrollPos,
			scrollPos,
			orgScrollPos,
			horizontal: this.options.horizontal,
		});
	}
	getContainerOffset() {
		return this._containerOffset;
	}
	_getOffset() {
		const {container, horizontal} = this.options;
		const rect = container.getBoundingClientRect();

		return rect[horizontal ? "left" : "top"] + this.getOrgScrollPos();
	}
	resize() {
		this._containerOffset = this.options.isOverflowScroll ? 0 : this._getOffset();
	}
	_onResize() {
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
	detachEvent() {
		removeEvent(this._view, "scroll", this._onCheck);
		removeEvent(window, "resize", this._onResize);
	}
	destroy() {
		this.detachEvent();
		this.reset();
	}
}
