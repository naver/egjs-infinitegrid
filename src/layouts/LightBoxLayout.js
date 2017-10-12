import {APPEND, PREPEND, HORIZONTAL} from "./Constants";
import {getStyleNames, assignOptions} from "./utils";

function fill(length, pos) {
	return new Array(length).fill(pos);
}

class LightBoxLayout {
	constructor(options = {}) {
		this._options = assignOptions({
			tolerance: 1,
		}, options);
		this._viewport = {};
		this._isHorizontal = this._options.direction === HORIZONTAL;
		this._columnSize = 0;
		this._columnLength = 0;
		this._style = getStyleNames(this._options.direction);
	}
	checkColumn(item) {
		const margin = this._options.margin;
		// if direction is horizontal, fixed dimension is height
		// if direction is vertical, fixed dimension is width
		const sizeName = this._style.size2;
		const columnSize = item.size[sizeName];
		const columnLength = parseInt((this._viewport[sizeName] + margin) / (columnSize + margin), 10);

		this._columnLength = Math.max(columnLength, 1);
		this._columnSize = columnSize;
	}
	_layout(items, outline, isAppend) {
		const length = items.length;
		const margin = this._options.margin;
		const tolerance = this._options.tolerance || 1;
		const style = this._style;
		const size1Name = style.size1;
		const size2Name = style.size2;
		const pos1Name = style.pos1;
		const pos2Name = style.pos2;
		const columnSize = this._columnSize;
		const pointCaculateName = isAppend ? "min" : "max";
		const startOutline = outline.slice();
		const endOutline = outline.slice();
		const columnLength = this._columnLength;

		for (let i = 0; i < length; ++i) {
			const point = Math[pointCaculateName](...endOutline);
			const index = endOutline.indexOf(point);
			const item = items[isAppend ? i : length - 1 - i];
			const originalSize1 = item.size[size1Name];
			const originalSize2 = item.size[size2Name];
			const pos2 = (columnSize + margin) * index;
			let size1 = originalSize1;
			let size2 = originalSize2;
			let columnCount = 1;

			if (item.column > 1) {
				// 1(min) <= real column count <= item.column(max)
				for (let j = 1; j < item.column && index + j < columnLength; ++j) {
					if ((isAppend && endOutline[index + j] <= point) ||
						(!isAppend && endOutline[index + j] >= point)) {
						++columnCount;
						continue;
					}
					break;
				}
				// resize according to column count
				size2 = (columnSize + margin) * columnCount - margin;
				size1 = size2 * originalSize1 / originalSize2;
			}
			size1 -= (point < 0 ? (-point + margin + size1) : (point + size1)) % tolerance;
			const pos1 = isAppend ? point : point - margin - size1;
			const endPos1 = pos1 + size1 + margin;

			// tetris
			item.rect = {
				[pos1Name]: pos1,
				[pos2Name]: pos2,
				[size1Name]: size1,
				[size2Name]: size2,
			};
			for (let j = 0; j < columnCount; ++j) {
				endOutline[index + j] = isAppend ? endPos1 : pos1;
			}
		}
		// if append items, startOutline is low, endOutline is high
		// if prepend items, startOutline is high, endOutline is low
		return {
			start: isAppend ? startOutline : endOutline,
			end: isAppend ? endOutline : startOutline,
		};
	}
	_insert(items, outline, type) {
		const clone = items.map(item => Object.assign({}, item));

		let startOutline = outline;

		if (!this._columnLength) {
			this.checkColumn(items[0]);
		}
		if (outline.length !== this._columnLength) {
			startOutline = fill(this._columnLength, Math[type === APPEND ? "min" : "max"](...outline));
		}

		const result = this._layout(clone, startOutline, type);

		return {
			items: clone,
			outlines: result,
		};
	}
	append(items, outline) {
		return this._insert(items, outline, APPEND);
	}
	prepend(items, outline) {
		return this._insert(items, outline, PREPEND);
	}
	layout(groups, outline) {
		this.checkColumn(groups[0].items[0]);
		// if outlines' length and columns' length are now same, re-caculate outlines.
		let startOutline;

		if (outline.length !== this._columnLength) {
			const pos = Math.min(...outline);

			// re-layout items.
			startOutline = fill(this._columnLength, pos);
		} else {
			startOutline = outline.slice();
		}
		groups.forEach(group => {
			const items = group.items;
			const result = this._layout(items, startOutline, APPEND);

			group.outlines = result;
			startOutline = result.end;
		});
	}
	setViewport(width, height) {
		const viewport = this._viewport;

		viewport.width = width;
		viewport.height = height;
	}
}

export default LightBoxLayout;
