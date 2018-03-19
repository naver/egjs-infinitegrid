import {APPEND, PREPEND} from "./consts";

function isVisible(group, {threshold, scrollPos, endScrollPos}) {
	const start = group.outlines.start;
	const end = group.outlines.end;

	if (start.legnth === 0 || end.length === 0 || !group.items.length || !group.items[0].el) {
		return 2;
	}
	const min = Math.min(...start);
	const max = Math.max(...end);

	if ((endScrollPos + threshold < min)) {
		return +1;
	} else if ((scrollPos - threshold > max)) {
		return -1;
	}
	return 0;
}

class Infinite {
	constructor(itemManger, options) {
		this.options = Object.assign({
			useRecycle: true,
			threshold: 100,
		}, options);
		this._items = itemManger;
		this.clear();
	}
	setSize(size) {
		this._status.size = size;
	}
	recycle(scrollPos, isForward) {
		if (!this.options.useRecycle) {
			return;
		}
		const {startCursor, endCursor, size} = this._status;

		if (startCursor === -1 || endCursor === -1) {
			return;
		}
		const endScrollPos = scrollPos + size;
		const {threshold, recycle} = this.options;
		const visibleOptions = {threshold, scrollPos, endScrollPos};
		const visibles = this._items.get(startCursor, endCursor)
			.map(group => isVisible(group, visibleOptions));
		const length = visibles.length;
		let start = isForward ? 0 : visibles.lastIndexOf(0);
		let end = isForward ? visibles.indexOf(0) - 1 : visibles.length - 1;

		if (!isForward && start !== -1) {
			start += 1;
		}
		if (start < 0 || end < 0 || start > end || end - start + 1 >= length) {
			return;
		}
		start = startCursor + start;
		end = startCursor + end;

		recycle && recycle({start, end});
		if (isForward) {
			this.setCursor("start", end + 1);
		} else {
			this.setCursor("end", start - 1);
		}
	}
	scroll(scrollPos, isForward) {
		const {startCursor, endCursor, size} = this._status;

		if (startCursor === -1 || endCursor === -1) {
			return;
		}
		const {append, prepend} = this.options;
		const items = this._items;
		const length = items.size();
		const threshold = this.options.threshold;
		const endScrollPos = scrollPos + size;
		const targetItem = items.getData(isForward ? endCursor : startCursor);
		const outlines = targetItem.outlines[isForward ? "end" : "start"];
		const edgePos = Math[isForward ? "min" : "max"](...outlines);

		if (isForward) {
			if (endScrollPos >= edgePos - threshold) {
				append && append({cache: length > endCursor + 1 && items.getData(endCursor + 1)});
			}
		} else if (scrollPos <= edgePos + threshold) {
			prepend && prepend({cache: (startCursor > 0) && items.getData(startCursor - 1)});
		}
	}
	setCursor(cursor, index) {
		if (!this.options.useRecycle) {
			this._status.startCursor = 0;
			this._status.endCursor = this._items.size() - 1;
			return;
		}
		if (cursor === "start") {
			this._status.startCursor = index;
		} else {
			const lastIndex = this._items.size() - 1;

			this._status.endCursor = Math.min(lastIndex, index);
		}
		this._status.startCursor = Math.max(0, this._status.startCursor);
	}
	updateCursor(cursor) {
		const {startCursor, endCursor} = this._status;

		if (cursor === "start") {
			if (startCursor <= 0) {
				this.setCursor("start", 0);
				this.setCursor("end", endCursor + 1);
			} else {
				this.setCursor(cursor, startCursor - 1);
			}
		} else {
			this.setCursor(cursor, endCursor + 1);
		}
	}
	setData(item, isAppend = true) {
		this._items.set(item, item.groupKey);
		this.setCursor(isAppend ? "end" : "start", this._items.indexOf(item));
	}
	_insertData(item, isAppend) {
		item && this._items[isAppend ? "append" : "prepend"](item);
		this.updateCursor(isAppend ? "end" : "start");
	}
	append(item) {
		this._insertData(item, APPEND);
	}
	prepend(item) {
		this._insertData(item, PREPEND);
	}
	setStatus(status) {
		this._status = Object.assign(this._status, status);
	}
	getStatus() {
		const {startCursor, endCursor, size} = this._status;

		return {
			startCursor,
			endCursor,
			size,
		};
	}
	getEdgeOutline(cursor) {
		const {startCursor, endCursor} = this._status;

		if (startCursor === -1 || endCursor === -1) {
			return [];
		}
		return this._items.getOutline(cursor === "start" ? startCursor : endCursor, cursor);
	}
	getEdgeValue(cursor) {
		const outlines = this.getEdgeOutline(cursor);

		return outlines.length ? Math[cursor === "start" ? "min" : "max"](...outlines) : 0;
	}
	getVisibleItems() {
		return this._items.pluck("items", this._status.startCursor, this._status.endCursor);
	}
	getCursor(cursor) {
		return this._status[cursor === "start" ? "startCursor" : "endCursor"];
	}
	getVisibleData() {
		return this._items.get(this._status.startCursor, this._status.endCursor);
	}
	remove(element) {
		return this._items.remove(element, this._status.startCursor, this._status.endCursor);
	}
	clear() {
		this._status = {
			startCursor: -1,
			endCursor: -1,
			size: -1,
		};
	}
}

export default Infinite;
