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
	addEvent,
	removeEvent,
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
	constructor(element, isOverflowScroll) {
		this._init(element, isOverflowScroll);
		this.resizeViewport();
	}
	_init(el, isOverflowScroll) {
		const base = $(el);

		base.style.position = "relative";
		base.style.width = "100%";
		base.style.height = "100%";

		if (isOverflowScroll) {
			let container = base.querySelector(`.${CONTAINER_CLASSNAME}`);

			if (!container) {
				container = document.createElement("div");
				container.className = CONTAINER_CLASSNAME;

				const children = base.children;
				const length = children.length;	// for IE8

				for (let i = 0; i < length; i++) {
					container.appendChild(children[0]);
				}
				base.style.overflowY = "scroll";
				base.style.overflowX = "hidden";
				base.appendChild(container);
			}
			this._view = base;
			this._container = container;
		} else {
			this._view = window;
			this._container = base;
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
		// this._container.style.height = "";
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
		isAppend ? this._container.appendChild(df) : this._container.insertBefore(df, this._container.firstChild);
	}
	resizeViewport() {
		this._size = {
			width: innerWidth(this._container),
			height: innerHeight(this._container),
		};
	}
	getViewport() {
		return Object.assign({}, this._size);
	}
	isNeededResize() {
		// return innerWidth(this._container) !== this._containerWidth;
	}

							// _attachEvent() {
							// 	addEvent(window, "resize", this._onResize);
							// }
	// _onResize() {
	// 	if (this._timer.resize) {
	// 		clearTimeout(this._timer.resize);
	// 	}
	// 	this._timer.resize = setTimeout(() => {
	// 		if (this.isNeededResize()) {
	// 			this._resizeViewport();
	// 			this.layout();
	// 		}
	// 		this._timer.resize = null;
	// 		this._status.prevScrollTop = -1;
	// 	}, 100);
	// }
	// _detachEvent() {
	// 	removeEvent(window, "resize", this._onResize);
	// }
}

