
function isVisible(group, {threshold, scrollPos, endScrollPos}) {
	const min = Math.min(...group.outlines.start);
	const max = Math.max(...group.outlines.end);

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
		let start = isForward ? 0 : visibles.indexOf(1);
		let end = isForward ? visibles.lastIndexOf(-1) : visibles.length - 1;

		if (start < 0 || end < 0 || start > end || end - start + 1 >= length) {
			return;
		}
		start = startCursor + start;
		end = startCursor + end;
		recycle && recycle({start, end});
		if (isForward) {
			this._status.startCursor = end + 1;
		} else {
			this._status.endCursor = start - 1;
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
		const targetPos = Math[isForward ? "min" : "max"](...outlines);

		if (isForward) {
			if (endScrollPos >= targetPos - threshold) {
				append && append({cache: length > endCursor + 1 && items.getData(endCursor + 1)});
			}
		} else if (scrollPos <= targetPos + threshold) {
			prepend && prepend({cache: (startCursor > 0) && items.getData(startCursor - 1)});
		}
	}
	updateCursor(isAppend) {
		if (this.options.useRecycle) {
			if (isAppend) {
				this._status.endCursor++;
			} else if (this._status.startCursor > 0) {
				this._status.startCursor--;
			} else {
				this._status.endCursor++; // outside prepend
			}
			if (this._status.startCursor < 0) {
				this._status.startCursor = 0;
			}
		} else {
			this._status.startCursor = 0;
			this._status.endCursor = this._items.size() - 1;
		}
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
	getEdgeItem(cursor) {
		const {startCursor, endCursor} = this._status;

		if (startCursor === -1 || endCursor === -1) {
			return null;
		}
		const data = this._items.getData(cursor === "start" ? startCursor : endCursor);
		const index = data.outlines[cursor === "start" ? "startIndex" : "endIndex"];

		return data.items[index];
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
	getInvisibleData() {
		const {startCursor, endCursor} = this._status;
		const data = this._items._data.concat();

		data.splice(startCursor, endCursor - startCursor + 1);

		return data;
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
