import { window } from "./browser";
import { addEvent, removeEvent, innerWidth, innerHeight } from "./utils";

const elements: HTMLElement[] = [];

function onResize() {
	AutoSizer.resizeAll();
}
export interface IAutoSizierElemenet extends HTMLElement {
	__PREFIX__?: string;
}
export default class AutoSizer {
	public static add(element: IAutoSizierElemenet, prefix = "data-") {
		if (!elements.length) {
			addEvent(window, "resize", onResize);
		}
		element.__PREFIX__ = prefix;
		elements.push(element);
		AutoSizer.resize(element);
	}
	public static remove(element: IAutoSizierElemenet, isFixed = false) {
		const fixed = element.getAttribute(`${element.__PREFIX__}fixed`) || "width";

		if (!isFixed) {
			element.style[fixed === "width" ? "height" : "width"] = "";
		}
		const index = elements.indexOf(element);

		if (index < 0) {
			return;
		}
		elements.splice(index, 1);
		if (!elements.length) {
			removeEvent(window, "reisze", onResize);
		}
	}
	public static resize(element: IAutoSizierElemenet, prefix = "data-") {
		const elementPrefix = typeof element.__PREFIX__ === "string" ? element.__PREFIX__ : prefix;
		const dataWidth = parseInt(element.getAttribute(`${elementPrefix}width`), 10) || 0;
		const dataHeight = parseInt(element.getAttribute(`${elementPrefix}height`), 10) || 0;
		const fixed = element.getAttribute(`${elementPrefix}fixed`);

		if (fixed === "height") {
			const size = innerHeight(element) || dataHeight;

			element.style.width = `${dataWidth / dataHeight * size}px`;
		} else {
			const size = innerWidth(element) || dataWidth;

			element.style.height = `${dataHeight / dataWidth * size}px`;
		}
	}
	public static resizeAll() {
		elements.forEach(element => AutoSizer.resize(element));
	}
}
