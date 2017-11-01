import {
	IS_IOS,
} from "./consts";
import {
	addEvent,
	removeEvent,
	scroll,
} from "./utils";

export default class Watcher {
	constructor(renderer, callback) {
		Object.assign(this._callback = {
			layout: null,
			check: null,
		}, callback);
		this._timer = {
			resize: null,
			// doubleCheck: null,
			// doubleCheckCount: RETRY,
		};
		this._prevPos = -1;
		this._renderer = renderer;
		this._onCheck = this._onCheck.bind(this);
		this._onResize = this._onResize.bind(this);
		this._attachEvent();
	}
	getScrollPos() {
		return this._prevPos;
	}
	setScrollPos(pos) {
		let rawPos = pos;

		if (typeof pos === "undefined") {
			rawPos = scroll(this._renderer.view, this._renderer.isVertical);
		}
		this._prevPos = rawPos - this._renderer.getContainerOffset();
	}
	_attachEvent() {
		addEvent(this._renderer.view, "scroll", this._onCheck);
		addEvent(window, "resize", this._onResize);
	}
	_onCheck() {
		const orgScrollPos = scroll(this._renderer.view, this._renderer.isVertical);
		const prevPos = this.getScrollPos();

		this.setScrollPos(orgScrollPos);
		const scrollPos = this.getScrollPos();

		if ((IS_IOS && orgScrollPos === 0) || prevPos === scrollPos) {
			return;
		}
		this._callback.check && this._callback.check({
			direction: prevPos < scrollPos ? "end" : "start",
			scrollPos,
			orgScrollPos,
			isVertical: this._renderer.isVertical,
		});
	}
	_onResize() {
		if (this._timer.resize) {
			clearTimeout(this._timer.resize);
		}
		this._timer.resize = setTimeout(() => {
			this._renderer.isNeededResize() && this._callback.layout && this._callback.layout();
			this._timer.resize = null;
			this._prevPos = -1;
		}, 100);
	}
	_detachEvent() {
		removeEvent(window, "resize", this._onResize);
	}
	destroy() {
		this._detachEvent();
	}
}

