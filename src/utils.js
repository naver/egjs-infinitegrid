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
				},
			}));
		}
	} catch (e) {}
	return supportsPassiveOption;
})();

const utils = {
	/**
	 * Select or create element
	 * @param {String|HTMLElement|jQuery} param
	 *  when string given is as HTML tag, then create element
	 *  otherwise it returns selected elements
	 * @param {Boolean} multi
	 * @returns {HTMLElement}
	 */
	$(param, multi = false) {
		let el;

		if (typeof param === "string") {	// String (HTML, Selector)
			// check if string is HTML tag format
			const match = param.match(/^<([a-z]+)\s*([^>]*)>/);

			// creating element
			if (match) {	 // HTML
				const dummy = document.createElement("div");

				dummy.innerHTML = param;
				el = Array.prototype.slice.call(dummy.childNodes);
			} else {	// Selector
				el = Array.prototype.slice.call(document.querySelectorAll(param));
			}
			if (!multi) {
				el = el.length >= 1 ? el[0] : undefined;
			}
		} else if (param.nodeName && param.nodeType === 1) {	// HTMLElement
			el = param;
		} else if ((window.jQuery && param instanceof jQuery) || param.constructor.prototype.jquery) {	// jQuery
			el = multi ? param.toArray() : param.get(0);
		} else if (Array.isArray(param)) {
			el = param.map(v => utils.$(v));
			if (!multi) {
				el = el.length >= 1 ? el[0] : undefined;
			}
		}

		return el;
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
	},
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
