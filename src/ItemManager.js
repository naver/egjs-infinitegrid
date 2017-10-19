import {MULTI} from "./consts";
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
	static pluckItems(data) {
		return data.reduce((acc, v) => acc.concat(v.items), []);
	}
	static updateSize(items) {
		return items.map(item => {
			item.size = {
				width: innerWidth(item.el),
				height: innerHeight(item.el),
			};
			return item;
		});
	}

	constructor() {
		this.clear();
	}
	size() {
		return this.data.length;
	}
	getItems(start, end) {
		if (typeof start !== "undefined") {
			if (typeof end !== "undefined") {
				return ItemManager.pluckItems(this.data.slice(start, end + 1));
			} else {
				return ItemManager.pluckItems(this.data.slice(start, start + 1));
			}
		} else {
			return ItemManager.pluckItems(this.data);
		}
	}
	getOutline(index, isAppend) {
		if (this.data.length) {
			return this.data[index].outlines[isAppend ? "end" : "start"];
		} else {
			return [];
		}
	}
	append(layouted) {
		this.data.push(layouted);
		console.log("append", this.data);
		return layouted.items;
	}
	prepend(layouted) {
		this.data.unshift(layouted);
		console.log("prepend", this.data);
		return layouted.items;
	}
	clear() {
		this.data = [];
	}
}
