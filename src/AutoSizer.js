import {window} from "./browser";
import {addEvent, removeEvent, innerWidth, innerHeight} from "./utils";

const elements = [];
/* eslint-disable */
function onResize(e) {
	AutoSizer.resizeAll();
}
/* eslint-enable */

export default class AutoSizer {
	static add(element, prefix = "data-") {
		if (!element.length) {
			addEvent(window, "resize", onResize);
		}
		element.__PREFIX__ = prefix;
		elements.push(element);
		AutoSizer.resize(element);
	}
	static remove(element, isFixed = false) {
		const fixed = element.getAttribute(`${element.__PREFIX__}fixed`) || "width";

		if (!isFixed) {
			element.style[fixed === "width" ? "height" : "width"] = "";
		}
		const index = elements.indexOf(element);

		if (!~index) {
			return;
		}
		elements.splice(index, 1);
		if (!elements.length) {
			removeEvent(window, "reisze", onResize);
		}
	}
	static resize(element, prefix = "data-") {
		const elementPrefix = typeof element.__PREFIX__ === "string" ? element.__PREFIX__ : prefix;
		const dataWidth = element.getAttribute(`${elementPrefix}width`);
		const dataHeight = element.getAttribute(`${elementPrefix}height`);
		const fixed = element.getAttribute(`${elementPrefix}fixed`) || "width";

		if (fixed === "width") {
			const size = innerWidth(element) || dataWidth;

			element.style.height = `${dataHeight / dataWidth * size}px`;
		} else if (fixed === "height") {
			const size = innerHeight(element) || dataHeight;

			element.style.width = `${dataWidth / dataHeight * size}px`;
		}
	}
	static resizeAll() {
		elements.forEach(element => AutoSizer.resize(element));
	}
}
