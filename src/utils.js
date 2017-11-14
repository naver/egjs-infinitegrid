import {window, document} from "./browser";
import {
	SUPPORT_COMPUTEDSTYLE,
	SUPPORT_ADDEVENTLISTENER,
	SUPPORT_PASSIVE,
	VERTICAL,
	DEFAULT_OPTIONS,
} from "./consts";

export function toArray(nodes) {
	// SCRIPT5014 in IE8
	const array = [];

	if (nodes) {
		for (let i = 0, len = nodes.length; i < len; i++) {
			array.push(nodes[i]);
		}
	}
	return array;
}
export function fill(length, value) {
	let array = typeof length === "array" ? length :  new Array(length);
	const len = array.length;

	for (let i = length - 1; i >= 0; --i) {
		array[i] = value;
	}
	return array;
}
/**
 * Select or create element
 * @param {String|HTMLElement|jQuery} param
 *  when string given is as HTML tag, then create element
 *  otherwise it returns selected elements
 * @param {Boolean} multi
 * @returns {HTMLElement}
 */
export function $(param, multi = false) {
	let el;

	if (typeof param === "string") { // String (HTML, Selector)
		// check if string is HTML tag format
		const match = param.match(/^<([a-z]+)\s*([^>]*)>/);

		// creating element
		if (match) { // HTML
			const dummy = document.createElement("div");

			dummy.innerHTML = param;
			el = toArray(dummy.childNodes);
		} else { // Selector
			el = toArray(document.querySelectorAll(param));
		}
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	} else if (param === window) { // window
		el = param;
	} else if (param.nodeName &&
		(param.nodeType === 1 || param.nodeType === 9)) { // HTMLElement, Document
		el = param;
	} else if (("jQuery" in window && param instanceof jQuery) ||
		param.constructor.prototype.jquery) { // jQuery
		el = multi ? param.toArray() : param.get(0);
	} else if (Array.isArray(param)) {
		el = param.map(v => $(v));
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	}
	return el;
}
export function addEvent(element, type, handler, eventListenerOptions) {
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
}
export function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else if (element.detachEvent) {
		element.detachEvent(`on${type}`, handler);
	} else {
		element[`on${type}`] = null;
	}
}
export function scroll(el, isVertical) {
	const prop = `scroll${isVertical ? "Top" : "Left"}`;

	if (el === window) {
		return document.body[prop] || document.documentElement[prop];
	} else {
		return el[prop];
	}
}
export function scrollTo(el, x, y) {
	if (el === window) {
		el.scroll(x, y);
	} else {
		el.scrollLeft = x;
		el.scrollTop = y;
	}
}
export function scrollBy(el, x, y) {
	if (el === window) {
		el.scrollBy(x, y);
	} else {
		el.scrollLeft += x;
		el.scrollTop += y;
	}
}
function _getSize(el, name) {
	if (el === window) { // WINDOW
		return el.document.documentElement[`client${name}`];
	} else if (el.nodeType === 9) { // DOCUMENT_NODE
		const doc = el.documentElement;

		return Math.max(
			el.body[`scroll${name}`], doc[`scroll${name}`],
			el.body[`offset${name}`], doc[`offset${name}`],
			doc[`client${name}`]
		);
	} else { // NODE
		const style = SUPPORT_COMPUTEDSTYLE ?
			window.getComputedStyle(el) : el.currentStyle;
		const value = style[name.toLowerCase()];

		return parseFloat(/auto|%/.test(value) ? el[`offset${name}`] : style[name.toLowerCase()]);
	}
}
export function innerWidth(el) {
	return _getSize(el, "Width");
}
export function innerHeight(el) {
	return _getSize(el, "Height");
}

export const STYLE = {
	vertical: {
		pos1: "top",
		endPos1: "bottom",
		size1: "height",
		pos2: "left",
		endPos2: "right",
		size2: "width",
	},
	horizontal: {
		pos1: "left",
		endPos1: "right",
		size1: "width",
		pos2: "top",
		endPos2: "bottom",
		size2: "height",
	},
};

export function getStyleNames(direction) {
	const style = STYLE[direction in STYLE ? direction : VERTICAL];

	return style;
}

export function assignOptions(defaultOptions, options) {
	return Object.assign({},
		DEFAULT_OPTIONS,
		defaultOptions,
		options);
}

export function toZeroArray(outline) {
	if (!outline || !outline.length) {
		return [0];
	}
	return outline;
}
