import {
	IS_IOS,
} from "./consts";
import {
	addEvent,
	removeEvent,
	scroll,
	scrollTo,
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
		this.reset();
		this._renderer = renderer;
		this._onCheck = this._onCheck.bind(this);
		this._onResize = this._onResize.bind(this);
		this.attachEvent();
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
	scrollTo(pos) {
		const arrPos = this._renderer.options.isVertical ? [0, pos] : [pos, 0];

		scrollTo(this._renderer.view, ...arrPos);
	}
	getScrollPos() {
		return this._prevPos;
	}
	setScrollPos(pos) {
		let rawPos = pos;

		if (typeof pos === "undefined") {
			rawPos = this.getOrgScrollPos();
		}
		this._prevPos = rawPos - this._renderer.getContainerOffset();
	}
	attachEvent() {
		addEvent(this._renderer.view, "scroll", this._onCheck);
		addEvent(window, "resize", this._onResize);
	}
	getOrgScrollPos() {
		return scroll(this._renderer.view, this._renderer.options.isVertical);
	}
	reset() {
		this._prevPos = null;
	}
	_onCheck() {
		const orgScrollPos = this.getOrgScrollPos();
		const prevPos = this.getScrollPos();

		this.setScrollPos(orgScrollPos);
		const scrollPos = this.getScrollPos();

		// fix that null < 1 is true
		if (prevPos === null || (IS_IOS && orgScrollPos === 0) || prevPos === scrollPos) {
			return;
		}

		this._callback.check && this._callback.check({
			isForward: prevPos < scrollPos,
			scrollPos,
			orgScrollPos,
			horizontal: !this._renderer.options.isVertical,
		});
	}
	_onResize() {
		if (this._timer.resize) {
			clearTimeout(this._timer.resize);
		}
		this._timer.resize = setTimeout(() => {
			this._renderer.isNeededResize() &&
				this._callback.layout &&
				this._callback.layout();
			this._timer.resize = null;
		}, 100);
	}
	detachEvent() {
		removeEvent(window, "resize", this._onResize);
	}
	destroy() {
		this.detachEvent();
		this.reset();
	}
}

