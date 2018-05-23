import {SUPPORT_COMPUTEDSTYLE} from "./consts";

export function getStyles(el) {
	return SUPPORT_COMPUTEDSTYLE ?
		window.getComputedStyle(el) : el.currentStyle;
}

export function matchHTML(html) {
	return html.match(/^<([A-z]+)\s*([^>]*)>/);
}

function _getSize(el, name, isOffset) {
	if (el === window) { // WINDOW
		return window[`inner${name}`] || document.body[`client${name}`];
	} else if (el.nodeType === 9) { // DOCUMENT_NODE
		const doc = el.documentElement;

		return Math.max(
			el.body[`scroll${name}`], doc[`scroll${name}`],
			el.body[`offset${name}`], doc[`offset${name}`],
			doc[`client${name}`]
		);
	} else { // NODE
		const size = el[`${isOffset ? "offset" : "client"}${name}`] || el[`${isOffset ? "client" : "offset"}${name}`];

		return parseFloat(size || getStyles(el)[name.toLowerCase()]) || 0;
	}
}
export function innerWidth(el) {
	return _getSize(el, "Width", false);
}
export function innerHeight(el) {
	return _getSize(el, "Height", false);
}
export function outerWidth(el) {
	return _getSize(el, "Width", true);
}
export function outerHeight(el) {
	return _getSize(el, "Height", true);
}
