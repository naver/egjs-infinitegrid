import {
	APPEND,
	PREPEND,
	DUMMY_POSITION,
	MULTI,
	GROUPKEY_ATT,
	CONTAINER_CLASSNAME,
} from "./consts";
import {
	$,
	scrollBy,
	innerHeight,
	innerWidth,
	getStyles,
} from "./utils";

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
		element.parentNode.removeChild(element);
	}
	static createElements(items) {
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
			isVertical: true,
		}, options);
		this._size = {
			containerOffset: 0,
			container: -1,
			view: -1,
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
	setStatus(status, items) {
		this.container.style.cssText = status.cssText;
		Object.assign(this.options, status.options);
		Object.assign(this._size, status._size);

		DOMRenderer.renderItems(items);
		this._insert(items, APPEND);
	}
	updateSize(items) {
		return items.map(item => {
			if (item.el) {
				if (this.options.isEqualSize) {
					this._size.item = this._size.item || {
						width: innerWidth(item.el),
						height: innerHeight(item.el),
					};
				} else {
					item.size = {
						width: innerWidth(item.el),
						height: innerHeight(item.el),
					};
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
			let container = element.querySelector(`.${CONTAINER_CLASSNAME}`);

			if (!container) {
				container = document.createElement("div");
				container.className = CONTAINER_CLASSNAME;

				const children = element.children;
				const length = children.length;	// for IE8
				const target = this.options.isVertical ? ["Y", "X"] : ["X", "Y"];

				for (let i = 0; i < length; i++) {
					container.appendChild(children[0]);
				}
				this._orgStyle.overflowX = element.style.overflowX;
				this._orgStyle.overflowY = element.style.overflowY;
				element.style[`overflow${target[0]}`] = "scroll";
				element.style[`overflow${target[1]}`] = "hidden";
				element.appendChild(container);
			}
			this.view = element;
			this.container = container;
		} else {
			this.view = window;
			this.container = element;
		}
	}
	append(items) {
		this._insert(items, APPEND, {
			top: DUMMY_POSITION,
		});
	}
	prepend(items) {
		this._insert(items, PREPEND, {
			top: DUMMY_POSITION,
		});
	}
	clear() {
		this.container.innerHTML = "";
		this.container.style[this.options.isVertical ? "height" : "width"] = "";
		this._size = {
			containerOffset: 0,
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
		return this.options.isVertical ?
			innerWidth(this.container) : innerHeight(this.container);
	}
	getViewSize() {
		return this._size.view;
	}
	scrollBy(point) {
		const pos = this.options.isVertical ? [0, point] : [point, 0];

		scrollBy(this.view, ...pos);
	}
	getContainerOffset() {
		return this._size.containerOffset;
	}
	getContainerSize() {
		this.resize();
		return this._size.container;
	}
	setContainerSize(size) {
		this.container.style[this.options.isVertical ? "height" : "width"] = `${size}px`;
	}
	resize() {
		if (this.isNeededResize()) {
			const isVertical = this.options.isVertical;

			this._size = {
				containerOffset: this.container[`offset${isVertical ? "Top" : "Left"}`],
				container: this._calcSize(),
				view: isVertical ? innerHeight(this.view) : innerWidth(this.view),
				item: null,
			};
			return true;
		}
		return false;
	}
	isNeededResize() {
		return this._calcSize() !== this._size.container;
	}
	destroy() {
		this._size = {
			containerOffset: 0,
			container: -1,
			view: -1,
			item: null,
		};
		this.container.style[this.options.isVertical ? "height" : "width"] = "";
		for (const p in this._orgStyle) {
			this[this.options.isOverflowScroll ? "view" : "container"].style[p] = this._orgStyle[p];
		}
	}
}

