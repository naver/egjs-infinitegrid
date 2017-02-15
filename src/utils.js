import {window, document} from "./browser";

const SUPPORT_COMPUTEDSTYLE = !!("getComputedStyle" in window);
const SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document);
const SUPPORT_PASSIVE = (() => {
	let supportsPassiveOption = false;

	try {
		if (SUPPORT_ADDEVENTLISTENER && Object.defineProperty) {
			document.addEventListener("test", null, Object.defineProperty({}, "passive", {
				get() {
					supportsPassiveOption = true;
				}
			}));
		}
	} catch (e) {}
	return supportsPassiveOption;
})();

const utils = {
	getElement(el) {
		if (typeof el === "string") {
			return document.querySelector(el);
		} else if (window.jQuery && (el instanceof jQuery)) {
			// if you were using jQuery
			return el.length > 0 ? el[0] : null;
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
			return Array.isArray(el) ? el : [el];
		}
	},
	addEvent(element, type, handler, eventListenerOptions) {
		if (SUPPORT_ADDEVENTLISTENER) {
			let options = eventListenerOptions || false;

			if (typeof eventListenerOptions === "object") {
				options = SUPPORT_PASSIVE ? eventListenerOptions : false;
			}
			element.addEventListener(type, handler, options);
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
	getSize(el, name, hasBorder = false, hasMargin = false) {
		if (el === window) {	// WINDOW
			return el.document.documentElement[`client${name}`];
		} else if (el.nodeType === 9) {	// DOCUMENT_NODE
			const doc = el.documentElement;

			return Math.max(
				el.body[`scroll${name}`], doc[`scroll${name}`],
				el.body[`offset${name}`], doc[`offset${name}`],
				doc[`client${name}`]
			);
		} else { // NODE
			const style = SUPPORT_COMPUTEDSTYLE ?
				window.getComputedStyle(el) : el.currentStyle;
			const p1 = name === "Height" ? "Top" : "Left";
			const p2 = name === "Height" ? "Bottom" : "Right";

			return parseFloat(style[name.toLowerCase()]) +
				parseFloat(style[`padding${p1}`]) + parseFloat(style[`padding${p2}`]) +
				(hasBorder ? parseFloat(style[`border${p1}`]) + parseFloat(style[`border${p2}`]) : 0) +
				(hasMargin ? parseFloat(style[`margin${p1}`]) + parseFloat(style[`margin${p2}`]) : 0);
		}
	},
	innerWidth(el) {
		return this.getSize(el, "Width");
	},
	innerHeight(el) {
		return this.getSize(el, "Height");
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
