import FrameLayout from "./FrameLayout";

function makeShapeOutline(outline, itemSize, columnLength, isAppend) {
	const point = Math[isAppend ? "min" : "max"](...outline);

	if (outline.length !== columnLength) {
		return new Array(columnLength).fill(0);
	}
	return outline.map(l => parseInt((l - point) / itemSize, 10));
}

class FacebookLayout extends FrameLayout {
	_checkItemSize() {
		const column = this._options.column;

		if (!column) {
			super._checkItemSize();
			return;
		}
		const style = this._style;
		const size = style.size2;
		const margin = this._options.margin;

		// if itemSize is not in options, caculate itemSize from viewport.
		this._itemSize = (this._viewport[size] + margin) / column - margin;
	}
	_layout(items, outline, isAppend) {
		const style = this._style;
		const itemSize = this._getItemSize();
		const margin = this._options.margin;
		const columnLength = this._options.column ||
				parseInt((this._viewport[style.size2] + margin) / (itemSize + margin), 10);
		const length = items.length;
		const endOutline = makeShapeOutline(outline, itemSize, columnLength, isAppend);
		const pointCaculateName = isAppend ? "min" : "max";
		const shapes = [];
		const sign = isAppend ? 1 : -1;

		for (let i = 0; i < length; ++i) {
			const point = Math[pointCaculateName](...endOutline);
			const index = endOutline.indexOf(point);
			const item = items[isAppend ? i : length - 1 - i];
			const column = item.column;
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
				top: point - (!isAppend ? columnCount : 0),
				left: index,
			});
			for (let j = 0; j < columnCount; ++j) {
				endOutline[index + j] = point + sign * columnCount;
			}
		}
		this._shapes = {
			shapes,
			[style.size2]: columnLength,
		};
		return super._layout(items, outline, isAppend);
	}
}

export default FacebookLayout;
