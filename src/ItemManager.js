import {MULTI, GROUPKEY_ATT, IGNORE_CLASSNAME} from "./consts";
import {$, toArray, isUndefined} from "./utils";

export default class ItemManager {
	static from(elements, selector, {groupKey, isAppend}) {
		const filted = ItemManager.selectItems($(elements, MULTI), selector);

		// Item Structure
		return toArray(filted).map(el => ({
			el,
			groupKey,
			content: el.outerHTML,
		}));
	}
	static selectItems(elements, selector) {
		return elements.filter(v => {
			const classNames = v.className.split(" ");

			if (classNames.some(c => c === IGNORE_CLASSNAME)) {
				return false;
			} else if (!selector || selector === "*") {
				return v;
			} else {
				return classNames.some(c => c === selector);
			}
		});
	}
	static pluck(data, property) {
		return data.reduce((acc, v) => acc.concat(v[property]), []);
	}
	constructor() {
		this.clear();
	}
	getStatus() {
		return {
			_data: this._data.map(data => {
				const items = data.items.map(item => {
					const item2 = Object.assign({}, item);

					delete item2.el;
					return item2;
				});
				const data2 = Object.assign({}, data);

				data2.items = items;
				return data2;
			}),
		};
	}
	setStatus(status) {
		const data = status._data;

		this.set(data);
	}
	size() {
		return this._data.length;
	}
	fit(base, horizontal) {
		if (!this._data.length) {
			return;
		}
		const property = horizontal ? "left" : "top";

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
		const data = isUndefined(start) ? this._data :
			this._data.slice(start, (isUndefined(end) ? start : end) + 1);

		return ItemManager.pluck(data, property);
	}
	getOutline(index, property) {
		const data = this._data[index];

		return data ? data.outlines[property] : [];
	}
	getEdgeIndex(cursor, start, end) {
		const prop = cursor === "start" ? "min" : "max";
		let index = -1;
		let targetValue = cursor === "start" ? Infinity : -Infinity;

		for (let i = start; i <= end; i++) {
			const value = Math[prop](...this.getOutline(i, cursor));

			if ((cursor === "start" && targetValue > value) ||
				(cursor === "end" && targetValue < value)) {
				targetValue = value;
				index = i;
			}
		}
		return index;
	}
	getEdgeValue(cursor, start, end) {
		const outlines = this.pluck("outlines", this.getEdgeIndex(cursor, start, end))
			.reduce((acc, v) => acc.concat(v[cursor]), []);

		return outlines.length ? Math[cursor === "start" ? "min" : "max"](...outlines) : 0;
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
		let items = [];
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
	indexOf(data) {
		const groupKey = typeof data === "object" ? data.groupKey : data;
		const datas = this._data;
		const length = datas.length;

		for (let i = 0; i < length; ++i) {
			if (groupKey === datas[i].groupKey) {
				return i;
			}
		}
		return -1;
	}
	get(start, end) {
		if (isUndefined(start)) {
			return this._data.concat();
		}
		return this._data.slice(start, (isUndefined(end) ? start : end) + 1);
	}
	set(data, key) {
		if (!isUndefined(key) && !Array.isArray(data)) {
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
	getData(index) {
		return this._data[index];
	}
}
