import {
	IS_IOS,
	SUPPORT_INTERSECTIONOBSERVER,
} from "./consts";
import {
	addEvent,
	removeEvent,
	scroll,
	scrollTo,
} from "./utils";

export default class Watcher {
	constructor(view, options) {
		Object.assign(this.options = {
			threshold: 300,
			direction: "vertical",
			callback: {
				layout: null,
				append: null,
				prepend: null,
			},
		});
		this._timer = {
			resize: null,
			// doubleCheck: null,
			// doubleCheckCount: RETRY,
		};
		this._prevPos = -1;
		this._target = view;
		this._onCheck = this._onCheck.bind(this);
		this._onResize = this._onResize.bind(this);
		this.attachEvent();
		this.setScrollPos();
	}
	_attachEvent() {
		// if (SUPPORT_INTERSECTIONOBSERVER) {
		// 	this._observer = new IntersectionObserver(this._onCheck, {
		// 		root: this._target,
		// 		rootMargin: `${this.options.threshold}px`,
		// 		threshold: [0],
		// 	});
		// } else {
			addEvent(this._target, "scroll", this._onCheck);
		// }
		addEvent(window, "resize", this._onResize);
	}
	_onCheck() {
		// if (SUPPORT_INTERSECTIONOBSERVER) {

		// }
		// if (this.isProcessing()) {
		// 	return;
		// }
		const scrollPos = scroll(this._target, this.options.direction);
		const prevPos = this._prevPos;

		console.log("scrollPos", scrollPos);
		if ((IS_IOS && scrollPos === 0) || prevPos === scrollPos) {
			return;
		}
		// let ele;
		// let rect;

		if (prevPos < scrollPos) {
			// if (utils.isEmptyObject(this._status.bottomElement)) {
			// 	this._status.bottomElement = this.getBottomElement();
			// 	if (this._status.bottomElement == null) {
			// 		return;
			// 	}
			// }
		// 	ele = this._status.bottomElement;
		// 	rect = ele.getBoundingClientRect();
			// if (rect.top <= this._status.clientHeight + this.options.threshold) {
			// 	this.options.callback.append && this.options.callback.append({
			// 		scrollPos,
			// 		isTrusted: true,
			// 	});
			// }
		} else {
		// 	if (utils.isEmptyObject(this._status.topElement)) {
		// 		this._status.topElement = this.getTopElement();
		// 		if (this._status.topElement == null) {
		// 			return;
		// 		}
		// 	}
		// 	ele = this._status.topElement;
		// 	rect = ele.getBoundingClientRect();
			// if (rect.bottom >= -this.options.threshold) {
			// 	const croppedDistance = this._fitItems();

			// 	if (croppedDistance > 0) {
			// 		scrollTop -= croppedDistance;
			// 		scrollTo(this.view, 0, scrollTop);
			// 	}
			// 	this.options.callback.prepend && this.options.callback.prepend({
			// 		scrollPos,
			// 		isTrusted: true,
			// 	});
		}
		this._prevPos = scrollPos;
	}
	_onResize() {
		if (this._timer.resize) {
			clearTimeout(this._timer.resize);
		}
		this._timer.resize = setTimeout(() => {
			this.options.callback.layout && this.options.callback.layout();
			this._timer.resize = null;
			this._prevPos = -1;
		}, 100);
	}
	detachEvent() {
		removeEvent(window, "resize", this._onResize);
	}
	destroy() {
		this._detachEvent();
	}
}

