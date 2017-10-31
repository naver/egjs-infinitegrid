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
	// addEvent,
	// removeEvent,
	innerHeight,
	innerWidth,
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
	constructor(element, isVertical = true, isOverflowScroll = false) {
		this._isVertical = isVertical;
		this._init(element, isVertical, isOverflowScroll);
		this.resize();
		this._size = {
			container: -1,
			view: -1,
		};
	}
	_init(el, isVertical, isOverflowScroll) {
		const element = $(el);

		// base.style.width = "100%";
		// base.style.height = "100%";

		if (isOverflowScroll) {
			let container = element.querySelector(`.${CONTAINER_CLASSNAME}`);

			if (!container) {
				container = document.createElement("div");
				container.className = CONTAINER_CLASSNAME;

				const children = element.children;
				const length = children.length;	// for IE8
				const target = isVertical ? ["Y", "X"] : ["X", "Y"];

				for (let i = 0; i < length; i++) {
					container.appendChild(children[0]);
				}

				element.style[`overflow${target[0]}`] = "scroll";
				element.style[`overflow${target[1]}`] = "hidden";
				element.appendChild(container);
			}
			this._view = element;
			this._container = container;
		} else {
			this._view = window;
			this._container = element;
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
		this._container.innerHTML = "";
		this._container.style[this._isVertical ? "height" : "width"] = "";
		this._size = {
			container: -1,
			view: -1,
		};
	}
	createAndInsert(items, isAppend) {
		const elements = $(items.reduce((acc, v) => acc.concat(v.content), []).join(
			""), MULTI);
		const itemsWithElement = items.map((item, index) => {
			item.el = elements[index];
			return item;
		});

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
			this._container.appendChild(df) :
			this._container.insertBefore(df, this._container.firstChild);
	}
	_calcSize() {
		return this._isVertical ?
			innerWidth(this._container) : innerHeight(this._container);
	}
	setSize(size) {
		this._container.style[this._isVertical ? "height" : "width"] = `${size}px`;
	}
	getView() {
		return this._view;
	}
	getViewSize() {
		return this._size.view;
	}
	getSize() {
		this.resize();
		return this._size.container;
	}
	resize() {
		if (this.isNeededResize()) {
			this._size = {
				container: this._calcSize(),
				view: this._isVertical ? innerHeight(this._view) : innerWidth(this._view),
			};
			return true;
		}
		return false;
	}
	isNeededResize() {
		return this._calcSize() !== this._size;
	}
	destroy() {
		this._size = -1;
	}
}

