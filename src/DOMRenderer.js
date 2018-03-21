import {
	APPEND,
	PREPEND,
	DUMMY_POSITION,
	MULTI,
	GROUPKEY_ATT,
	CONTAINER_CLASSNAME,
	DEFENSE_BROWSER,
} from "./consts";
import {
	$,
	innerHeight,
	innerWidth,
	getStyles,
} from "./utils";


function _defense(element) {
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
export default class DOMRenderer {
	static renderItem(item, styles) {
		if (item.el) {
			const elStyle = item.el.style;

			// for debugging
			item.el.setAttribute(GROUPKEY_ATT, item.groupKey);
			elStyle.position = "absolute";
			["left", "top", "width", "height"].forEach(p => {
				(p in styles) && (elStyle[p] = `${styles[p]}px`);
			});
		}
	}
	static renderItems(items) {
		items.forEach(item => {
			DOMRenderer.renderItem(item, item.rect);
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
			return items;
		} else if (items[0].el) {
			return items;
		}
		const elements = $(items.reduce((acc, v, i) => {
			acc.push(v.content.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ""));
			return acc;
		}, []).join(""), MULTI);

		return items.map((item, index) => {
			item.el = elements[index];
			return item;
		});
	}
	constructor(element, options) {
		Object.assign(this.options = {
			isOverflowScroll: false,
			isEqualSize: false,
			horizontal: false,
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
			options: Object.assign({}, this.options),
			_size: Object.assign({}, this._size),
		};
	}
	setStatus(status) {
		this.container.style.cssText = status.cssText;
		Object.assign(this.options, status.options);
		Object.assign(this._size, status._size);
	}
	updateSize(items) {
		return items.map(item => {
			if (item.el) {
				if (this.options.isEqualSize) {
					this._size.item = this._size.item || {
						width: innerWidth(item.el),
						height: innerHeight(item.el),
					};
					item.size = Object.assign({}, this._size.item);
				} else {
					item.size = {
						width: innerWidth(item.el),
						height: innerHeight(item.el),
					};
				}
				if (!item.orgSize) {
					item.orgSize = Object.assign({}, item.size);
				}
			}
			return item;
		});
	}
	_init(el) {
		const element = $(el);
		const style = getStyles(element);

		this._orgStyle = {};

		if (style.position === "static") {
			this._orgStyle.position = element.style.position;
			element.style.position = "relative";
		}
		if (this.options.isOverflowScroll) {
			const target = this.options.horizontal ? ["X", "Y"] : ["Y", "X"];

			this._orgStyle.overflowX = element.style.overflowX;
			this._orgStyle.overflowY = element.style.overflowY;
			element.style[`overflow${target[0]}`] = "scroll";
			element.style[`overflow${target[1]}`] = "hidden";
			this.view = element;
			// defense code for android < 4.4 or webkit < 537
			this.container = this.options.horizontal && DEFENSE_BROWSER ? _defense(element) : element;
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
	clear() {
		this.container.innerHTML = "";
		if (!this.options.isOverflowScroll) {
			this.container.style[this.options.horizontal ? "width" : "height"] = "";
		}
		this._size = {
			item: null,
			viewport: -1,
			container: -1,
			view: -1,
		};
	}
	createAndInsert(items, isAppend) {
		const itemsWithElement = DOMRenderer.createElements(items);

		DOMRenderer.renderItems(itemsWithElement);
		this._insert(itemsWithElement, isAppend);
	}
	_insert(items, isAppend, styles) {
		const df = document.createDocumentFragment();

		items.forEach(item => {
			styles && DOMRenderer.renderItem(item, styles);
			isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
		});
		isAppend ?
			this.container.appendChild(df) :
			this.container.insertBefore(df, this.container.firstChild);
	}
	_calcSize() {
		return this.options.horizontal ?
			innerHeight(this.container) : innerWidth(this.container);
	}
	getViewSize() {
		return this._size.view;
	}
	getViewportSize() {
		this.resize();
		return this._size.viewport;
	}
	setContainerSize(size) {
		if (!this.options.isOverflowScroll || (this.options.horizontal && DEFENSE_BROWSER)) {
			this.container.style[this.options.horizontal ? "width" : "height"] = `${size}px`;
		}
	}
	resize() {
		const horizontal = this.options.horizontal;

		if (this.isNeededResize()) {
			this._size = {
				viewport: this._calcSize(),
				view: horizontal ? innerWidth(this.view) : innerHeight(this.view),
				item: null,
			};
			return true;
		} else {
			this._size.view = horizontal ? innerWidth(this.view) : innerHeight(this.view);
		}
		return false;
	}
	isNeededResize() {
		return this._calcSize() !== this._size.viewport;
	}
	destroy() {
		this._size = {
			viewport: -1,
			view: -1,
			item: null,
		};
		this.container.style[this.options.horizontal ? "width" : "height"] = "";
		for (const p in this._orgStyle) {
			this[this.options.isOverflowScroll ? "view" : "container"].style[p] = this._orgStyle[p];
		}
	}
}

