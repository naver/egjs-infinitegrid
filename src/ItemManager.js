import {MULTI, GROUPKEY_ATT} from "./consts";
import {$, toArray, innerWidth, innerHeight} from "./utils";

export default class ItemManager {
	static from(elements, selector, {groupKey, maxCount, isAppend}) {
		const filted = ItemManager.selectItems($(elements, MULTI), selector);

		// trim
		if (maxCount <= filted.length) {
			isAppend ?
				filted.splice(0, filted.length - maxCount) :
				filted.splice(maxCount);
		}
		// Item Structure
		return toArray(filted).map(el => ({
			el,
			groupKey,
			content: el.outerHTML,
		}));
	}
	static selectItems(elements, selector) {
		return elements.filter(v => {
			if (selector === "*") {
				return /DIV|SPAN|LI/.test(v.tagName);
			} else {
				return v.className.split(" ")
					.some(c => c === selector);
			}
		});
	}
	static pluck(data, property) {
		return data.reduce((acc, v) => acc.concat(v[property]), []);
	}
	// @todo you should check imagesize from data-attribute
	static updateSize(items) {
		return items.map(item => {
			if (item.el) {
				item.size = {
					width: innerWidth(item.el),
					height: innerHeight(item.el),
				};
			}
			return item;
		});
	}

	constructor() {
		this.clear();
	}
	size() {
		return this._data.length;
	}
	fit(base, isVertical) {
		if (!this._data.length) {
			return;
		}
		const property = isVertical ? "top" : "left";

		if (base !== 0) {
			this._data = this._data.map(v => {
				v.items = v.items.map(item => {
					item.rect[property] -= base;
					return item;
				});
				v.outlines.start = v.outlines.start.map(start => start - base);
				v.outlines.end = v.outlines.end.map(end => end - base);
				return v;
			});
		}
	}
	pluck(property, start, end) {
		if (typeof start !== "undefined") {
			if (typeof end !== "undefined") {
				return ItemManager.pluck(this._data.slice(start, end + 1), property);
			} else {
				return ItemManager.pluck(this._data.slice(start, start + 1), property);
			}
		} else {
			return ItemManager.pluck(this._data, property);
		}
	}
	getOutline(index, property) {
		if (this._data.length) {
			return this._data[index].outlines[property];
		} else {
			return [];
		}
	}
	append(layouted) {
		this._data.push(layouted);
		return layouted.items;
	}
	prepend(layouted) {
		this._data.unshift(layouted);
		return layouted.items;
	}
	clear() {
		this._data = [];
	}
	remove(element, start, end) {
		let items = null;
		const key = element.getAttribute(GROUPKEY_ATT);
		let data = this.get(start, end)
			.filter(v => String(v.groupKey) === key);

		if (!data.length) {
			return items;
		}
		data = data[0];

		const len = data.items.length;
		let idx = -1;

		for (let i = 0; i < len; i++) {
			if (data.items[i].el === element) {
				idx = i;
				break;
			}
		}
		if (~idx) {
			// remove item information
			data.items.splice(idx, 1);
			this.set(data, key);
			items = data.items;
		}
		return items;
	}
	get(start, end) {
		if (typeof start !== "undefined") {
			if (typeof end !== "undefined") {
				return this._data.slice(start, end + 1);
			} else {
				return this._data.slice(start, start + 1);
			}
		} else {
			return this._data.concat();
		}
	}
	set(data, key) {
		if (typeof key !== "undefined" && !Array.isArray(data)) {
			const len = this._data.length;
			let idx = -1;

			for (let i = 0; i < len; i++) {
				if (this._data[i].groupKey === key) {
					idx = i;
					break;
				}
			}
			~idx && (this._data[idx] = data);
		} else {
			this._data = data.concat();
		}
	}
}
