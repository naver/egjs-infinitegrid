import {APPEND, PREPEND, MULTI, DUMMY_POSITION} from "./consts";
import {$, toArray, innerWidth, innerHeight} from "./utils";

export default class ItemManager {
	static from(elements, selector, {groupKey, maxCount, isAppend}) {
		const filted = ItemManager.selectItems($(elements, MULTI), selector);

		// Item Structure
		return toArray(filted).map(el => ({
			el,
			groupKey,
			content: el.outerHTML,
		}));

		// trim
		if (maxCount <= items.length) {
			isAppend ?
				items.splice(0, items.length - maxCount) :
				items.splice(maxCount);
		}
		return items;
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

	constructor(options) {
		Object.assign(this.options = {
		}, options);
		this.clear();
	}
	size() {
		return this.data.length;
	}
	getItems(start, end) {
		if (typeof start !== "undefined" && typeof end !== "undefined") {
			return ItemManager.pluckItems(this.data.slice(start, end));
		} else {
			return ItemManager.pluckItems(this.data);
		}
	}
	getOutline(index, isAppend) {
		if (this.data.length) {
			return this.data[index - 1].outlines[isAppend ? "end" : "start"];
		} else {
			return [];
		}
	}
	append(layouted) {
		this.data.push(layouted);
		this.endCursor++;
		console.log("append", this.data);

		// 레이아웃에 의해 변경된 아이템 정보
		return layouted.items;
	}
	prepend(layouted) {
		// ItemManager.setGroupKey(layouted, groupKey);
		this.data.unshift(layouted);
		this.startCursor = 0;
		this.endCursor++;
		console.log("prepend", this.data);

		// 레이아웃에 의해 변경된 아이템 정보
		return layouted.items;
	}




	// append(items, groupKey) {
	// 	let layouted;

	// 	if (this._layout) {
	// 		layouted = this._layout.append(items);
	// 	} else {
	// 		layouted = {
	// 			items,
	// 		};
	// 	}
	// 	// const obj = layout.append(items, 전의 bottom || []);
	// 	// // obj.items
	// 	// // obj.outlines.start
	// 	// // obj.outlines.end
	// 	ItemManager.setGroupKey(layouted, groupKey);

	// 	this.data = this.data.concat(layouted);
	// 	this.endCursor += layouted.items.length - 1;
	// }
	// prepend(items, groupKey) {
	// 	const layouted = {
	// 		items,
	// 	};
	// 	// const obj = layout.append(items, 전의 bottom || []);
	// 	// // obj.items
	// 	// // obj.outlines.start
	// 	// // obj.outlines.end

	// 	ItemManager.setGroupKey(layouted, groupKey);
	// 	this.data = items.concat(this.data);
	// 	this.endCursor += layouted.items.length - 1;
	// }
	// remove() {
	// 	// const relayoutItems = layout.remove(item, this.items);
	// 	// // relayoutItems[0].items
	// 	// relayoutItems[0].outlines.start
	// 	// relayoutItems[0].outlines.end
	// 	// relayoutItems[0].groupKey
	// 	// 아이템이 하나도 없을경우라도 group은 삭제하지 않는다.
	// }
	// layout() {
	// 	// layout.layout(this.items);
	// }

	clear() {
		this.data = [];
	}
	// // called by recycleDOM
	// // return removed items
	// recycle(count, isAppend) {
	// 	let targets;

	// 	// if (isAppend) {
	// 	// 	// remove prepend items
	// 	// 	targets = this.items.splice(0, count);
	// 	// } else {
	// 	// 	// remove append items
	// 	// 	targets = count >= this.items.length ?
	// 	// 		this.items.splice(0) :
	// 	// 		this.items.splice(this.itmes.length - count, this.items.length - 1);
	// 	// }
	// 	return targets;
	// }
};

