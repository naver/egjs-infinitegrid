import {APPEND, PREPEND, VERTICAL, HORIZONTAL, STYLE, DEFAULT_OPTIONS, ALIGN} from "./Constants";

// ALIGN
const {START, CENTER, END, JUSTIFY} = ALIGN;

function fill(length, pos) {
	return new Array(length).fill(pos);
}
class GridLayout {
	constructor(options = {}) {
		this._options = Object.assign({},
			DEFAULT_OPTIONS,
			{
				align: START,
			},
			options);
		this._viewport = {};
		this._isHorizontal = this._options.direction === HORIZONTAL;
		this._columnSize = 0;
		this._columnLength = 0;
		this._style = this.getStyleNames();
	}
	getStyleNames() {
		const direction = this._options.direction in STYLE ? this._options.direction : VERTICAL;
		const style = STYLE[direction];

		return style;
	}
	getPoints(outlines) {
		const pos = this._isHorizontal ? "left" : "top";

		return outlines.map(outline => outline[pos]);
	}
	checkColumn(item) {
		const margin = this._options.margin;
		// if direction is horizontal, fixed dimension is height
		// if direction is vertical, fixed dimension is width
		const sizeName = this._isHorizontal ? "height" : "width";
		const columnSize = item.size[sizeName];

		this._columnSize = columnSize;
		this._columnLength = parseInt((this._viewport[sizeName] + margin) / (columnSize + margin), 10);
	}
	_layout(items, outline, isAppend) {
		const length = items.length;
		const margin = this._options.margin;
		const align = this._options.align;
		const style = this._style;

		const size1Name = style.size1;
		const size2Name = style.size2;
		const pos1Name = style.pos1;
		const pos2Name = style.pos2;
		const endPos1Name = style.endPos1;
		const endPos2Name = style.endPos2;
		const columnSize = this._columnSize;
		const columnLength = this._columnLength;

		const viewSize2 = this._viewport[size2Name];
		const viewDist = (viewSize2 - (columnSize + margin) * columnLength + margin);

		const pointCaculateName = isAppend ? "min" : "max";
		const startOutline = outline.slice();
		const endOutline = outline.slice();

		for (let i = 0; i < length; ++i) {
			const point = Math[pointCaculateName](...endOutline);
			const index = endOutline.indexOf(point);
			const item = items[isAppend ? i : length - 1 - i];
			const size1 = item.size[size1Name];
			const size2 = item.size[size2Name];
			const pos1 = isAppend ? point : point - margin - size1;
			const endPos1 = pos1 + size1 + margin;
			let pos2 = (columnSize + margin) * index;

			// ALIGN
			if (align === CENTER) {
				pos2 += viewDist / 2;
			} else if (align === END) {
				pos2 += viewDist + columnSize - size2;
			} else if (align === JUSTIFY) {
				pos2 = (viewSize2 - columnSize) / (columnLength - 1) * index;
			}
			const endPos2 = pos2 + columnSize + margin;

			// tetris
			item.rect = {
				[pos1Name]: pos1,
				[pos2Name]: pos2,
				[endPos1Name]: endPos1,
				[endPos2Name]: endPos2,
			};
			item.column = index;
			endOutline[index] = isAppend ? endPos1 : pos1;
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

export default GridLayout;

