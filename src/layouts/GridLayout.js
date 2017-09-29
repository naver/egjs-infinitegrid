const APPEND = true;
const PREPEND = false;

function fill(length, pos) {
	return new Array(length).fill(pos);
}
class GridLayout {
	constructor(options = {}) {
		this.options = Object.assign(
			{
				direction: "vertical",
				margin: 0,
			},
			options);
		this.isHorizontal = this.options.direction === "horizontal";
		this.columnSize = 0;
		this.coulmnLength = 0;
	}
	getPoints(outlines) {
		const pos = this.isHorizontal ? "left" : "top";

		return outlines.map(outline => outline[pos]);
	}
	checkColumn(item) {
		const margin = this.options.margin;
		// if direction is horizontal, fixed dimension is height
		// if direction is vertical, fixed dimension is width
		const sizeName = this.isHorizontal ? "height" : "width";

		this.columnSize = item.size[sizeName];
		this.columnLength = parseInt((this[sizeName] + margin) / (this.columnSize + margin), 10);
	}
	_insert(items, outline, isAppend) {
		const columnSize = this.columnSize;
		const length = items.length;
		const margin = this.options.margin;
		const isHorizontal = this.isHorizontal;
		const sizeName = isHorizontal ? "width" : "height";
		const pointCaculateName = isAppend ? "min" : "max";
		const startOutline = outline.slice();
		const endOutline = outline.slice();

		for (let i = 0; i < length; ++i) {
			const point = Math[pointCaculateName](...endOutline);
			const index = endOutline.indexOf(point);
			const item = items[i];
			const size = item.size[sizeName];
			const pos1 = isAppend ? point : point - margin - size;
			const endPos1 = pos1 + size + margin;
			const pos2 = (columnSize + margin) * index;
			const endPos2 = pos2 + columnSize + margin;

			// tetris
			items[i].rect = {
				left: isHorizontal ? pos1 : pos2,
				right: isHorizontal ? endPos1 : endPos2,
				top: isHorizontal ? pos2 : pos1,
				bottom: isHorizontal ? endPos2 : endPos1,
			};
			items[i].column = index;

			endOutline[index] = isAppend ? endPos1 : pos1;
		}
		if (isAppend) {
			return {
				start: startOutline,
				end: endOutline,
			};
		}
		return {
			start: endOutline,
			end: startOutline,
		};
	}
	append(items, outline) {
		const clone = items.map(item => ({
			size: Object.assign({}, item.size),
		}));
		let startOutline = outline;

		if (!this.columnLength) {
			this.checkColumn(items[0]);
		}
		if (outline.length !== this.columnLength) {
			startOutline = fill(this.columnLength, Math.min(...outline));
		}
		const result = this._insert(clone, startOutline, APPEND);

		return {
			items: clone,
			outlines: result,
		};
	}
	prepend(items, outline) {
		const clone = items.map(item => ({
			size: Object.assign({}, item.size),
		}));
		let startOutline = outline;

		if (!this.columnLength) {
			this.checkColumn(items[0]);
		}
		if (outline.length !== this.columnLength) {
			startOutline = fill(this.columnLength, Math.max(...outline));
		}
		const result = this._insert(clone, startOutline, PREPEND);

		return {
			items: clone,
			outlines: result,
		};
	}
	layout(groups, outline) {
		this.checkColumn(groups[0].items[0]);
		// if outlines' length and columns' length are now same, re-caculate outlines.
		let startOutline;

		if (outline.length !== this.columnLength) {
			const pos = Math.min(...outline);

			// re-layout items.
			startOutline = fill(this.columnLength, pos);
		} else {
			startOutline = outline.slice();
		}
		groups.forEach(group => {
			const items = group.items;
			const result = this._insert(items, startOutline, APPEND);

			group.outlines = result;
			startOutline = result.end;
		});
	}
	setViewport(width, height) {
		this.width = width;
		this.height = height;
	}
}

export default GridLayout;
