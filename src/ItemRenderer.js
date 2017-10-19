import {
	APPEND,
	PREPEND,
	DUMMY_POSITION,
	MULTI,
} from "./consts";
import {
	$,
} from "./utils";

export default class ItemRenderer {
	constructor(element) {
		this._el = $(element);
		this._el.style.position = "relative";
	}
	static renderItem(item, styles) {
		if (item.el) {
			const elStyle = item.el.style;

			// for debugging
			item.el.setAttribute("data-groupkey", item.groupKey);
			elStyle.position = "absolute";
			["left", "top", "width", "height"].forEach(p => {
				(p in styles) && (elStyle[p] = `${styles[p]}px`);
			});
		}
	}
	static removeItems(items) {
		items.forEach(item => {
			if (item.el) {
				item.el.parentNode.removeChild(item.el);
				item.el = null;
			}
		});
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
		this._el.innerHTML = "";
		// this._el.style.height = "";
	}
	createAndInsert(items, isAppend) {
		const elements = $(items.reduce((acc, v) => acc.concat(v.content), []).join(
			""), MULTI);
		const itemsWithElement = items.map((item, index) => {
			item.el = elements[index];
			return item;
		});

		ItemRenderer.render(itemsWithElement);
		this._insert(itemsWithElement, isAppend);
	}
	_insert(items, isAppend, styles) {
		const df = document.createDocumentFragment();

		items.forEach(item => {
			styles && ItemRenderer.renderItem(item, styles);

			isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
		});
		isAppend ? this._el.appendChild(df) : this._el.insertBefore(df, this._el.firstChild);
	}
	static render(items) {
		items.forEach(item => {
			ItemRenderer.renderItem(item, item.rect);
		});
	}
}

