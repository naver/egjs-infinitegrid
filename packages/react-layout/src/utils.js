import {SUPPORT_COMPUTEDSTYLE} from "./consts";

export function getStyles(el) {
	return SUPPORT_COMPUTEDSTYLE ?
		window.getComputedStyle(el) : el.currentStyle;
}
function _getSize(el, name) {
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
		const style = getStyles(el);
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
