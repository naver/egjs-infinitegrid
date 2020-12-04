
import { window, document } from "./browser";
import {
	SUPPORT_COMPUTEDSTYLE,
	SUPPORT_ADDEVENTLISTENER,
	SUPPORT_PASSIVE,
	VERTICAL,
	HORIZONTAL,
	DEFAULT_LAYOUT_OPTIONS,
	DUMMY_POSITION,
	INFINITEGRID_METHODS,
} from "./consts";
import InfiniteGrid from "./InfiniteGrid";
import { IJQuery, IRectlProperties, InnerSizeType, ClientSizeType, ScrollSizeType, OffsetSizeType, IItem, IGroup, IArrayFormat, IInfiniteGridItem } from "./types";
export function toArray(nodes: HTMLCollection): HTMLElement[];
export function toArray<T extends Node>(nodes: IArrayFormat<T>): T[];
export function toArray<T extends Node>(nodes: IArrayFormat<T>): T[] {
	// SCRIPT5014 in IE8
	const array: T[] = [];

	if (nodes) {
		const length = nodes.length;

		for (let i = 0; i < length; i++) {
			array.push(nodes[i]);
		}
	}
	return array;
}
export function matchHTML(html: string) {
	return html.match(/^<([A-z]+)\s*([^>]*)>/);
}
/**
 * Select or create element
 * @param {String|HTMLElement|jQuery} param
 *  when string given is as HTML tag, then create element
 *  otherwise it returns selected elements
 * @param {Boolean} multi
 * @returns {HTMLElement}
 */
export function $(param: Window, multi?: false): Window;
export function $(
	param: string | HTMLElement | Array<string | HTMLElement> | IJQuery,
	multi: true,
): HTMLElement[];
export function $(
	param: string | HTMLElement | Array<string | HTMLElement> | IJQuery,
	multi?: false,
): HTMLElement;
export function $(
	param: string | HTMLElement | Window | IJQuery,
	multi?: false,
): HTMLElement | Window;
export function $(
	param: string | Window | HTMLElement | Array<string | HTMLElement> | IJQuery,
	multi = false,
): HTMLElement | Window | HTMLElement[] {
	let el: Window | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> | undefined;

	if (typeof param === "string") { // String (HTML, Selector)
		// check if string is HTML tag format
		const match = matchHTML(param);

		// creating element
		if (match) { // HTML
			const dummy = document.createElement("div");

			dummy.innerHTML = param;
			el = dummy.childNodes as NodeListOf<HTMLElement>;
		} else { // Selector
			el = document.querySelectorAll<HTMLElement>(param);
		}
		if (multi) {
			return toArray(el as NodeListOf<HTMLElement>);
		} else {
			return el && (el as NodeListOf<HTMLElement>)[0];
		}
	} else if (isWindow(param)) { // window
		el = param;
	} else if (isJQuery(param)) { // jQuery
		el = multi ? $(param.toArray(), true) :
			$(param.get(0), false);
	} else if (Array.isArray(param)) {
		el = param.map(v => $(v));
		if (!multi) {
			el = el.length >= 1 ? (el as HTMLElement[])[0] : undefined;
		}
	} else if (param.nodeName &&
		(param.nodeType === 1 || param.nodeType === 9)) { // HTMLElement, Document
		el = param;
	} else {
		el = [].slice.call(el);
	}
	return el as Window | HTMLElement | HTMLElement[];
}
export function addEvent(
	element: Element | Window,
	type: string,
	handler: (...args: any[]) => any,
	eventListenerOptions?: boolean | { [key: string]: any },
) {
	if (SUPPORT_ADDEVENTLISTENER) {
		let options = eventListenerOptions || false;

		if (typeof eventListenerOptions === "object") {
			options = SUPPORT_PASSIVE ? eventListenerOptions : false;
		}
		element.addEventListener(type, handler, options);
	} else if ((element as any).attachEvent) {
		(element as any).attachEvent(`on${type}`, handler);
	} else {
		(element as any)[`on${type}`] = handler;
	}
}
export function removeEvent(
	element: Element | Window,
	type: string,
	handler: (...args: any[]) => any,
) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else if ((element as any).detachEvent) {
		(element as any).detachEvent(`on${type}`, handler);
	} else {
		(element as any)[`on${type}`] = null;
	}
}
export function addOnceEvent(
	element: Element,
	type: string,
	handler: (...args: any[]) => any,
	eventListenerOptions?: boolean | { [key: string]: any },
) {
	const callback = (e: any) => {
		removeEvent(element, type, callback);
		handler(e);
	};

	addEvent(element, type, callback, eventListenerOptions);
}
export function scroll(el: HTMLElement | Window, horizontal = false) {
	const prop = `scroll${horizontal ? "Left" : "Top"}` as "scrollLeft" | "scrollTop";

	if (isWindow(el)) {
		return window[horizontal ? "pageXOffset" : "pageYOffset"] || document.body[prop] || document.documentElement[prop];
	} else {
		return el[prop];
	}
}
export function scrollTo(el: Window | Element, x: number, y: number) {
	if (isWindow(el)) {
		el.scroll(x, y);
	} else {
		el.scrollLeft = x;
		el.scrollTop = y;
	}
}
export function scrollBy(el: Window | Element, x: number, y: number) {
	if (isWindow(el)) {
		el.scrollBy(x, y);
	} else {
		el.scrollLeft += x;
		el.scrollTop += y;
	}
}
export function getStyle(el: Element) {
	return (SUPPORT_COMPUTEDSTYLE ?
		window.getComputedStyle(el) : (el as any).currentStyle) || {};
}
function _getSize(el: Window | Document | HTMLElement, name: "Width" | "Height", isOffset?: boolean) {
	if (isWindow(el)) { // WINDOW
		return window[`inner${name}` as InnerSizeType] || document.body[`client${name}` as ClientSizeType];
	} else if (isDocument(el)) { // DOCUMENT_NODE
		const doc = (el as Document).documentElement;
		const body = (el as Document).body;

		return Math.max(
			body[`scroll${name}` as ScrollSizeType], doc[`scroll${name}` as ScrollSizeType],
			body[`offset${name}` as OffsetSizeType], doc[`offset${name}` as OffsetSizeType],
			doc[`client${name}` as ClientSizeType],
		);
	} else { // NODE
		let size = 0;

		if (isOffset) {
			const clientRect = el.getBoundingClientRect();

			size = name === "Width" ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top;
		} else {
			size = el[`client${name}` as ClientSizeType] || el[`offset${name}` as OffsetSizeType];
		}
		if (size) {
			return size;
		}
		const cssSize = getStyle(el)[name.toLowerCase()];

		return (~cssSize.indexOf("px") && parseFloat(cssSize)) || 0;
	}
}

export function innerWidth(el: Window | Document | HTMLElement) {
	return _getSize(el, "Width", false);
}
export function innerHeight(el: Window | Document | HTMLElement) {
	return _getSize(el, "Height", false);
}
export function outerWidth(el: Window | Document | HTMLElement) {
	return _getSize(el, "Width", true);
}
export function outerHeight(el: Window | Document | HTMLElement) {
	return _getSize(el, "Height", true);
}
export function getSize(el: HTMLElement) {
	return {
		width: outerWidth(el),
		height: outerHeight(el),
	};
}
export const STYLE: {
	vertical: IRectlProperties,
	horizontal: IRectlProperties,
} = {
	vertical: {
		startPos1: "top",
		endPos1: "bottom",
		size1: "height",
		startPos2: "left",
		endPos2: "right",
		size2: "width",
	},
	horizontal: {
		startPos1: "left",
		endPos1: "right",
		size1: "width",
		startPos2: "top",
		endPos2: "bottom",
		size2: "height",
	},
};

export function getStyleNames(isHorizontal: boolean): IRectlProperties {
	return STYLE[isHorizontal ? HORIZONTAL : VERTICAL];
}
export function assign<A, B>(target: A, source: B): A & B;
export function assign<A, B, C>(target: A, source1: B, source2: C): A & B & C;
export function assign<A, B, C, D>(target: A, source1: B, source2: C, source3: D): A & B & C & D;
export function assign(target: { [key: string]: any }, ...sources: Array<{ [key: string]: any }>): { [key: string]: any };
export function assign(target: { [key: string]: any }, ...sources: Array<{ [key: string]: any }>) {
	sources.forEach(source => {
		for (const key in source) {
			target[key] = source[key];
		}
	});
	return target;
}
export function assignOptions<A extends { [key: string]: any }, B extends { [key: string]: any }>(
	defaultOptions: A, options: B): typeof DEFAULT_LAYOUT_OPTIONS & A & B {
	return assign({},
		DEFAULT_LAYOUT_OPTIONS,
		defaultOptions,
		options);
}

export function toZeroArray(outline?: number[]) {
	if (!outline || !outline.length) {
		return [0];
	}
	return outline;
}
export function cloneItems<T extends { [key: string]: any }>(items: T[]) {
	return items.map(item => assign({}, item));
}
export function isJQuery(el: any): el is IJQuery {
	return (typeof (window as any).jQuery === "function" && el instanceof (window as any).jQuery) ||
		el.constructor.prototype.jquery && el.toArray;
}
export function isWindow(el: any): el is Window {
	return el === window;
}
export function isDocument(el: Node): el is Document {
	return el.nodeType === 9;
}

export function fill<T>(arr: T[], value: T) {
	const length = arr.length;

	for (let i = length - 1; i >= 0; --i) {
		arr[i] = value;
	}

	return arr;
}

export function isUndefined(target: any): target is undefined {
	return typeof target === "undefined";
}

export function find<T>(arr: T[], callback: (target: T) => any) {
	const length = arr.length;

	for (let i = 0; i < length; ++i) {
		if (callback(arr[i])) {
			return arr[i];
		}
	}
	return null;
}
export function findLast<T>(arr: T[], callback: (target: T) => any) {
	const length = arr.length;

	for (let i = length - 1; i >= 0; --i) {
		if (callback(arr[i])) {
			return arr[i];
		}
	}
	return null;
}
export function categorize(newItems: IItem[]) {
	const newGroups: IGroup[] = [];
	const groupKeys: { [key: string]: IGroup } = {};

	newItems.forEach(item => {
		const { groupKey } = item;
		let group = groupKeys[groupKey];

		if (!group) {
			group = {
				groupKey,
				items: [],
			};
			groupKeys[groupKey] = group;
			newGroups.push(group);
		}

		group.items.push(item);
	});

	return newGroups;
}

export function resetSize(item: IInfiniteGridItem) {
	item.orgSize = null;
	item.size = null;
}

export function makeItem(groupKey: string | number, el?: HTMLElement) {
	return {
		el,
		groupKey,
		mounted: false,
		needUpdate: true,
		content: el ? el.outerHTML : "",
		rect: {
			top: DUMMY_POSITION,
			left: DUMMY_POSITION,
		},
	};
}

/**
 * Decorator that makes the method of infinitegrid available in the framework.
 * @ko 프레임워크에서 인피니트그리드의 메소드를 사용할 수 있게 하는 데코레이터.
 * @memberof eg.InfiniteGrid
 * @private
 * @example
 * ```js
 * import NativeInfiniteGrid, { withInfiniteGridMethods } from "@egjs/infinitegrid";
 *
 * class InfiniteGrid extends React.Component<Partial<InfiniteGridProps & InfiniteGridOptions>> {
 *   &#64;withInfiniteGridMethods
 *   private infinitegrid: NativeInfiniteGrid;
 * }
 * ```
 */
export function withInfiniteGridMethods(prototype: any, infinitegridName: string) {
	Object.keys(INFINITEGRID_METHODS).forEach((name: keyof InfiniteGrid) => {
		if (prototype[name]) {
			return;
		}
		prototype[name] = function(...args) {
			const result = this[infinitegridName][name](...args);

			// fix `this` type to return your own `infinitegrid` instance to the instance using the decorator.
			if (result === this[infinitegridName]) {
				return this;
			} else {
				return result;
			}
		};
	});
}

export function hasClass(element: HTMLElement, className: string) {
	if (element.classList) {
		return element.classList.contains(className);
	}
	return !!element.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}

export function addClass(element: HTMLElement, className: string) {
	if (element.classList) {
		element.classList.add(className);
	} else {
		element.className += ` ${className}`;
	}
}
