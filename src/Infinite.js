
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
	constructor(options) {
		this.options = options;
		this._items = {};
		this._status = {
			startCursor: 0,
			endCursor: 0,
			size: 0,
		};
	}
	updateSize(size) {
		this._status.size = size;
	}
	recycle({scrollPos, isForward}) {
		const {startCursor, endCursor, size} = this._status;
		const endScrollPos = scrollPos + size;
		const data = this._items._data;
		const length = data.length;
		const {threshold, recycle} = this.options;
		const visibleOptions = {threshold, scrollPos, endScrollPos};
		const visibles = data.slice(startCursor, endCursor)
			.map(group => isVisible(group, visibleOptions));
		let start = isForward ? 0 : visibles.indexOf(1);
		let end = isForward ? visibles.lastIndexOf(-1) : visibles.length - 1;

		if (start === -1 || end === -1 || start > end || end - start + 1 >= length) {
			return;
		}
		start = startCursor + start;
		end = endCursor + end;
		recycle && recycle(start, end);
		if (isForward) {
			this._status.startCursor = end + 1;
		} else {
			this._status.endCursor = start - 1;
		}
	}
	scroll({scrollPos, isForward}) {
		const {startCursor, endCursor, size} = this._status;
		const {append, prepend} = this.options;
		const data = this._items._data;
		const length = data.length;
		const threshold = this.options.threshold;
		const endScrollPos = scrollPos + size;
		const targetItem = data[isForward ? endCursor : startCursor];
		const outlines = targetItem.outlines[isForward ? "end" : "start"];
		const targetPos = Math[isForward ? "min" : "max"](...outlines);

		if (isForward) {
			if (endScrollPos >= targetPos - threshold) {
				append && append({cache: length > endCursor + 1 && data[endCursor + 1]});
			}
		} else if (scrollPos <= targetPos + threshold) {
			prepend && prepend({cache: (startCursor > 0) && data[startCursor - 1]});
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
			this._status.endCursor = this._items._data.length - 1;
		}
	}

	setStatus(status) {
		this._status = status;
	}
	getStatus() {
		const {startCursor, endCursor, size} = this._status;

		return {
			startCursor,
			endCursor,
			size,
		};
	}
}

export default Infinite;
