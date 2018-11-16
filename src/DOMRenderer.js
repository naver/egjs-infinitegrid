import {
	APPEND,
	PREPEND,
	DUMMY_POSITION,
	MULTI,
	GROUPKEY_ATT,
	CONTAINER_CLASSNAME,
	TRANSITION_NAME,
	TRANSITION,
	TRANSITION_END,
	TRANSFORM,
} from "./consts";
import {window, document} from "./browser";
import {
	$,
	innerHeight,
	innerWidth,
	getSize,
	getStyles,
	addOnceEvent,
} from "./utils";


export function resetSize(item) {
	item.orgSize = 0;
	item.size = 0;
}
function createContainer(element) {
	const container = document.createElement("div");

	container.className = CONTAINER_CLASSNAME;
	container.style.position = "relative";
	container.style.height = "100%";

	const children = element.children;
	const length = children.length;	// for IE8

	for (let i = 0; i < length; i++) {
		container.appendChild(children[0]);
	}
	element.appendChild(container);
	return container;
}
function render(properties, rect, styles) {
	properties.forEach(p => {
		(p in rect) && (styles[p] = `${rect[p]}px`);
	});
}
function setTransition(styles, transitionDuration, pos1, pos2) {
	styles[`${TRANSITION}-property`] = transitionDuration ? `${TRANSFORM},width,height` : "";
	styles[`${TRANSITION}-duration`] = transitionDuration ? `${transitionDuration}s` : "";
	styles[`${TRANSITION}-delay`] = transitionDuration ? `0s` : "";
	styles[TRANSFORM] = transitionDuration ? `translate(${pos1.left - pos2.left}px,${pos1.top - pos2.top}px)` : "";
}

export default class DOMRenderer {
	static renderItem(item, rect, transitionDuration) {
		if (!item.el) {
			return;
		}
		const {el, prevRect} = item;
		const styles = el.style;

		// for debugging
		el.setAttribute(GROUPKEY_ATT, item.groupKey);
		styles.position = "absolute";
		render(["width", "height"], rect, styles);
		if (transitionDuration && TRANSITION && prevRect) {
			setTransition(styles, transitionDuration, rect, prevRect);
			if (el[TRANSITION_NAME]) {
				return;
			}
			el[TRANSITION_NAME] = true;
			addOnceEvent(el, TRANSITION_END, () => {
				const itemRect = item.rect;

				setTransition(styles);
				render(["left", "top"], itemRect, styles);
				item.prevRect = itemRect;
				el[TRANSITION_NAME] = false;
			});
		} else {
			render(["left", "top"], rect, styles);
			item.prevRect = rect;
		}
	}
	static renderItems(items, transitionDuration) {
		items.forEach(item => {
			DOMRenderer.renderItem(item, item.rect, transitionDuration);
		});
	}
	static removeItems(items) {
		items.forEach(item => {
			if (item.el) {
				DOMRenderer.removeElement(item.el);
				item.el = null;
			}
		});
	}
	static removeElement(element) {
		const parentNode = element && element.parentNode;

		if (!parentNode) {
			return;
		}
		parentNode.removeChild(element);
	}
	static createElements(items) {
		if (!items.length) {
			return;
		}
		const noElementItems = items.filter(item => !item.el);

		if (!noElementItems.length) {
			return;
		}
		const elements = $(noElementItems.map(({content}) =>
			content.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "")).join(""), MULTI);

		noElementItems.forEach((item, index) => {
			item.el = elements[index];
		});
	}
	constructor(element, options) {
		Object.assign(this.options = {
			isEqualSize: false,
			isConstantSize: false,
			horizontal: false,
			container: false,
		}, options);
		this._size = {
			container: -1,
			view: -1,
			viewport: -1,
			item: null,
		};
		this._init(element);
		this.resize();
	}
	getStatus() {
		return {
			cssText: this.container.style.cssText,
			_size: Object.assign({}, this._size),
		};
	}
	setStatus(status) {
		this.container.style.cssText = status.cssText;
		Object.assign(this._size, status._size);
	}
	updateSize(items) {
		const {isEqualSize, isConstantSize} = this.options;
		const size = this._size;

		return items.map(item => {
			if (!item.el) {
				return item;
			}
			if (isEqualSize && !size.item) {
				size.item = getSize(item.el);
			}
			item.size = (isEqualSize && Object.assign(size.item)) ||
						(isConstantSize && item.orgSize && Object.assign(item.orgSize)) ||
						getSize(item.el);
			if (!item.orgSize) {
				item.orgSize = Object.assign({}, item.size);
			}
			return item;
		});
	}
	_init(el) {
		const element = $(el);
		const style = getStyles(element);
		const {container, horizontal} = this.options;

		this._orgStyle = {};

		if (style.position === "static") {
			this._orgStyle.position = element.style.position;
			element.style.position = "relative";
		}
		if (container) {
			const target = horizontal ? ["X", "Y"] : ["Y", "X"];

			this._orgStyle.overflowX = element.style.overflowX;
			this._orgStyle.overflowY = element.style.overflowY;
			element.style[`overflow${target[0]}`] = "scroll";
			element.style[`overflow${target[1]}`] = "hidden";
			this.view = element;
			this.container = container === true ? createContainer(this.view) : container;
		} else {
			this.view = window;
			this.container = element;
		}
	}
	append(items) {
		this._insert(items, APPEND, {
			top: DUMMY_POSITION,
			left: DUMMY_POSITION,
		});
	}
	prepend(items) {
		this._insert(items, PREPEND, {
			top: DUMMY_POSITION,
			left: DUMMY_POSITION,
		});
	}
	createAndInsert(items, isAppend) {
		DOMRenderer.createElements(items);

		DOMRenderer.renderItems(items);
		this._insert(items, isAppend);
	}
	_insert(items, isAppend, styles) {
		const container = this.container;
		const df = document.createDocumentFragment();

		items.forEach(item => {
			styles && DOMRenderer.renderItem(item, styles);
			isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
		});
		isAppend ?
			container.appendChild(df) :
			container.insertBefore(df, container.firstChild);
	}
	_calcSize() {
		return this.options.horizontal ?
			innerHeight(this.container) : innerWidth(this.container);
	}
	getViewSize() {
		return this._size.view;
	}
	getViewportSize() {
		return this._size.viewport;
	}
	setContainerSize(size) {
		this.container.style[this.options.horizontal ? "width" : "height"] = `${size}px`;
	}
	resize() {
		const horizontal = this.options.horizontal;
		const view = this.view;
		const isResize = this.isNeededResize();

		if (isResize) {
			this._size = {
				viewport: this._calcSize(),
				item: null,
			};
		}
		this._size.view = horizontal ? innerWidth(view) : innerHeight(view);
		return isResize;
	}
	isNeededResize() {
		return this._calcSize() !== this._size.viewport;
	}
	clear() {
		this.container.innerHTML = "";
		this.container.style[this.options.horizontal ? "width" : "height"] = "";

		this._size = {
			item: null,
			viewport: -1,
			container: -1,
			view: -1,
		};
	}
	destroy() {
		this.clear();
		const container = this.options.container;

		for (const p in this._orgStyle) {
			this[container ? "view" : "container"].style[p] = this._orgStyle[p];
		}
		container && this.container.parentNode.removeChild(this.container);
	}
}

