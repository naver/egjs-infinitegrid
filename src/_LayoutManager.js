import {utils} from "./utils";

export default class LayoutManager {
	static itemize(elements, groupKey, isAppend) {
		return utils.toArray(elements).map(v => ({
			el: v,
			position: {
				x: 0,
				y: 0,
			},
			groupKey: typeof groupKey === "undefined" ? null : groupKey,
		}));
	}
	constructor(el, options) {
		this.options = options;
		this.size = {
			columnWidth: null,
			containerWidth: null,
			equalItemSize: null,
		};
		this.el = el;
		this.el.style.position = "relative";
		this.clear();
		this.prependCols = [];
		this.appendCols = [];
	}
	appendItems(items) {
		this.items = this.items.concat(items);
	}
	prependItems(items) {
		// insert items (when prepending)
		this.items = items.concat(this.items);
		const y = this.getTopPositonY();

		if (y !== 0) {
			this.items.forEach(v => {
				v.position.y -= y;
			});
			this.syncCols(false);	// for prepending
			this.syncCols(true);	// for appending
			return this.items;
		}
		return items;
	}
	removeItem(element) {
		let item = null;
		let idx = -1;

		for (let i = 0, len = this.items.length; i < len; i++) {
			if (this.items[i].el === element) {
				idx = i;
				break;
			}
		}
		if (~idx) {
			// remove item information
			item = Object.assign({}, this.items[idx]);
			this.items.splice(idx, 1);

			// remove item element
			item.el.parentNode.removeChild(item.el);
		}
		return item;
	}
	prepareLayout(isRelayout, addItems, isAppend) {
		const isInit = !this.items.length;

		// insert items (when appending)
		if (addItems && isAppend) {
			this.appendItems(addItems);
		}
		if (isInit && addItems) {
			addItems.forEach(v => {
				v.el.style.position = "absolute";
			});
		}
		if (isInit || isRelayout) {
			this.resetCols(this.measureColumns());
		} else if (!addItems) {
			this.appendCols = [...this.prependCols];
		}
	}
	layoutItems(isRelayout, addItems, options) {
		this.prepareLayout(isRelayout, addItems, options.isAppend);
		let items = addItems || this.items;

		items.forEach(v => {
			v.position = this.getItemPosition(isRelayout, v, options.isAppend);
		});
		if (addItems && !options.isAppend) {
			// insert items (when prepending)
			items = this.prependItems(addItems.sort((p, c) => p.position.y - c.position.y));
		}

		// for performance
		let style;

		items.forEach(v => {
			if (v.el) {
				style = v.el.style;
				style.left = `${v.position.x}px`;
				style.top = `${v.position.y}px`;
			}
		});
	}
	resetCols(count) {
		const arr = [];
		let tmpCount = count || this.appendCols.length || 0;

		while (tmpCount--) {
			arr.push(0);
		}
		this.appendCols = arr.concat();
		this.prependCols = arr.concat();
	}
	clear() {
		this.items = [];
	}
	getItemPosition(isRelayout, item, isAppend) {
		if (!item || !item.el) {
			return {
				x: 0,
				y: 0,
			};
		}

		if (isRelayout || !item.size) {
			item.size = this.getItemSize(item.el);
		}
		const cols = isAppend ? this.appendCols : this.prependCols;
		const y = Math[isAppend ? "min" : "max"](...cols);
		let shortColIndex;

		if (isAppend) {
			shortColIndex = cols.indexOf(y);
		} else {
			let i = cols.length;

			while (i-- >= 0) {
				if (cols[i] === y) {
					shortColIndex = i;
					break;
				}
			}
		}
		cols[shortColIndex] = y + (isAppend ? item.size.height : -item.size.height);

		return {
			x: this.size.columnWidth * shortColIndex,
			y: isAppend ? y : y - item.size.height,
		};
	}
	getGroupKeys() {
		return this.items.map(v => v.groupKey);
	}
	syncCols(isBottom) {
		if (!this.items.length) {
			return;
		}
		const items = this.getColItems(isBottom);
		const col = isBottom ? this.appendCols : this.prependCols;
		const len = col.length;

		for (let i = 0; i < len; i++) {
			col[i] = items[i].position.y + (isBottom ? items[i].size.height : 0);
		}
	}

	getTopPositonY() {
		const item = this.getTopItem();

		return item ? item.position.y : 0;
	}
	getTopItem() {
		let item = null;
		let min = Infinity;

		this.getColItems(false).forEach(v => {
			if (v && v.position.y < min) {
				min = v.position.y;
				item = v;
			}
		});
		return item;
	}
	getBottomItem() {
		let max = -Infinity;
		let item = null;
		let pos;

		this.getColItems(true).forEach(v => {
			pos = v ? v.position.y + v.size.height : 0;
			if (pos >= max) {
				max = pos;
				item = v;
			}
		});
		return item;
	}
	getColIdx(item) {
		return parseInt(item.position.x / parseInt(this.size.columnWidth, 10), 10);
	}
	getColItems(isBottom) {
		const len = this.appendCols.length;
		const colItems = new Array(len);
		let item;
		let idx;
		let count = 0;
		let i = isBottom ? this.items.length - 1 : 0;

		while ((item = this.items[i])) {
			idx = this.getColIdx(item);
			if (!colItems[idx]) {
				colItems[idx] = item;
				if (++count === len) {
					return colItems;
				}
			}
			i += isBottom ? -1 : 1;
		}
		return colItems;
	}
	// fit size
	fit() {
		// for caching
		if (this.options.count <= 0) {
			this.fit = () => 0;
			return false;
		}

		const y = this.getTopPositonY();

		if (y !== 0) {
			// need to fit
			this.items.forEach(v => {
				v.position.y -= y;
				v.el.style.top = `${v.position.y}px`;
			});
			this.syncCols(false);	// for prepending
			this.syncCols(true);	// for appending
		}
		return y;
	}

	getLogicalHeight() {
		return Math.max(...this.appendCols);
	}

	getDelimiterIndex(isTop, removeCount) {
		const len = this.items.length;

		if (len === removeCount) {
			return len;
		}
		let i;
		let idx = 0;
		const baseIdx = isTop ? removeCount - 1 : len - removeCount;
		const targetIdx = baseIdx + (isTop ? 1 : -1);
		const groupKey = this.items[baseIdx].groupKey;

		if (groupKey != null && groupKey === this.items[targetIdx].groupKey) {
			if (isTop) {
				for (i = baseIdx; i > 0; i--) {
					if (groupKey !== this.items[i].groupKey) {
						break;
					}
				}
				idx = i === 0 ? -1 : i + 1;
			} else {
				for (i = baseIdx; i < len; i++) {
					if (groupKey !== this.items[i].groupKey) {
						break;
					}
				}
				idx = i === len ? -1 : i;
			}
		} else {
			idx = isTop ? targetIdx : baseIdx;
		}
		return idx;
	}
	adjustItems(isTop, idx) {
		let targets;

		if (isTop) {
			targets = this.items.splice(0, idx);
			this.syncCols(false);	// for prepending
		} else {
			targets = idx === this.items.length ?
				this.items.splice(0) :
				this.items.splice(idx, this.items.length - idx);
			this.syncCols(true);	// for appending;
		}
		return targets;
	}
	measureColumns() {
		this.el.style.width = null;
		this.size.containerWidth = utils.innerWidth(this.el);
		this.size.columnWidth = this.getColumnWidth() || this.size.containerWidth;
		let cols = this.size.containerWidth / this.size.columnWidth;
		const excess = this.size.columnWidth - this.size.containerWidth % this.size.columnWidth;

		// if overshoot is less than a pixel, round up, otherwise floor it
		cols = Math.max(Math[excess && excess <= 1 ? "round" : "floor"](cols), 1);
		return cols || 0;
	}
	getItemSize(el) {
		return this.size.equalItemSize || {
			width: utils.innerWidth(el),
			height: utils.innerHeight(el),
		};
	}
	getColumnWidth() {
		let width = 0;
		const el = this.items[0] && this.items[0].el;

		if (el) {
			width = utils.innerWidth(el);
			if (this.options.isEqualSize) {
				this.size.equalItemSize = {
					width,
					height: utils.innerHeight(el),
				};
			}
		}
		return width;
	}
	isNeededResize() {
		return utils.innerWidth(this.el) !== this.size.containerWidth;
	}
	getStatus() {
		const data = {};

		for (const p in this) {
			if (Object.prototype.hasOwnProperty.call(this, p) &&
				typeof this[p] !== "function" && !(this[p] instanceof Element)) {
				data[p] = this[p];
			}
		}
		return {
			prop: data,
			items: this.items.map(v => {
				const clone = Object.assign({}, v);

				delete clone.el;
				return clone;
			}),
		};
	}
	setStatus(status) {
		if (!status || !status.prop || !status.items) {
			return this;
		}
		Object.assign(this, status.prop);
		this.items = utils.toArray(this.el.children).map((v, i) => {
			status.items[i].el = v;
			return status.items[i];
		});
		return this;
	}
}