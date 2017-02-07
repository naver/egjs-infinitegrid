import {window, document} from "./browser";

const utils = {
	getElement(el) {
		if (typeof el === "string") {
			return document.querySelector(el);
		} else if (window.jQuery && (el instanceof jQuery) && el.length > 0) {
			// if you were using jQuery
			return el[0];
		} else {
			return el;
		}
	},
	getElements(el) {
		if (typeof el === "string") {
			return Array.from(document.querySelectorAll(el));
		} else if (window.jQuery && (el instanceof jQuery)) {
			// if you were using jQuery
			return el.toArray();
		} else {
			Array.isArray(el) ? el : [el];
		}
	},
	addEvent(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent(`on${type}`, handler);
		} else {
			element[`on${type}`] = handler;
		}
	},
	removeEvent(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent(`on${type}`, handler);
		} else {
			element[`on${type}`] = null;
		}
	},
	scrollTop() {
		return document.body.scrollTop || document.documentElement.scrollTop;
	},
	innerWidth(el) {
		// @todo check it!
		return el.innerWidth;
	},
	innerHeight(el) {
		// @todo check it!
		return el.innerHeight;
	},
	isEmptyObject(obj) {
		let name;
		for (name in obj) {
			return false;
		}
		return true;
	}
};

class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass || class {};
	}
	with(...mixins) {
		return mixins.reduce((c, m) => m(c), this.superclass);
	}
}

const Mixin = superclass => new MixinBuilder(superclass);

export {Mixin, utils};
