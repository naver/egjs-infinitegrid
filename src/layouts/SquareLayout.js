import FrameLayout from "./FrameLayout";
import {fill} from "../utils";

function makeShapeOutline(outline, itemSize, columnLength, isAppend) {
	const point = Math[isAppend ? "min" : "max"](...outline) || 0;

	if (outline.length !== columnLength) {
		return fill(columnLength, 0);
	}
	return outline.map(l => parseInt((l - point) / itemSize, 10));
}
function getColumn(item) {
	if (item.column) {
		return item.column;
	}
	if (item.el) {
		const dataset = item.el.dataset;

		if (dataset) {
			item.column = dataset.column || 1;
		} else {
			item.column = item.el.getAttribute("column") || 1;
		}
		return item.column;
	}
	item.column = 1;
	return 1;
}
class SquareLayout extends FrameLayout {
	_checkItemSize() {
		const column = this.options.column;

		if (!column) {
			super._checkItemSize();
			return;
		}
		const margin = this.options.margin;

		// if itemSize is not in options, caculate itemSize from size.
		this._itemSize = (this._size + margin) / column - margin;
	}
	_layout(items, outline = [], isAppend) {
		const itemSize = this._getItemSize();
		const margin = this.options.margin;
		const columnLength = this.options.column ||
				parseInt((this._size + margin) / (itemSize + margin), 10);
		const length = items.length;
		const endOutline = makeShapeOutline(outline, itemSize, columnLength, isAppend);
		const pointCaculateName = isAppend ? "min" : "max";
		const shapes = [];
		const sign = isAppend ? 1 : -1;
		const style = this._style;
		const pos1Name = style.pos1;
		const pos2Name = style.pos2;

		for (let i = 0; i < length; ++i) {
			const point = Math[pointCaculateName](...endOutline);
			const index = endOutline.indexOf(point);
			const item = items[isAppend ? i : length - 1 - i];
			const column = getColumn(item);
			let columnCount = 1;

			if (column > 1) {
				for (let j = 1; j < column && index + j < columnLength; ++j) {
					if ((isAppend && endOutline[index + j] <= point) ||
						(!isAppend && endOutline[index + j] >= point)) {
						++columnCount;
						continue;
					}
					break;
				}
			}
			shapes.push({
				width: columnCount,
				height: columnCount,
				[pos1Name]: point - (!isAppend ? columnCount : 0),
				[pos2Name]: index,
			});
			for (let j = 0; j < columnCount; ++j) {
				endOutline[index + j] = point + sign * columnCount;
			}
		}

		this._shapes = {
			shapes,
			[style.size2]: columnLength,
		};
		const result = super._layout(items, outline, isAppend);

		shapes.sort((shape1, shape2) => {
			const item1pos1 = shape1[pos1Name];
			const item1pos2 = shape1[pos2Name];
			const item2pos1 = shape2[pos1Name];
			const item2pos2 = shape2[pos2Name];

			if (item1pos1 - item2pos1) {
				return item1pos1 - item2pos1;
			}
			return item1pos2 - item2pos2;
		});
		items.sort((a, b) => {
			const item1pos1 = a.rect[pos1Name];
			const item1pos2 = a.rect[pos2Name];
			const item2pos1 = b.rect[pos1Name];
			const item2pos2 = b.rect[pos2Name];

			if (item1pos1 - item2pos1) {
				return item1pos1 - item2pos1;
			}
			return item1pos2 - item2pos2;
		});
		return result;
	}
}

export default SquareLayout;
