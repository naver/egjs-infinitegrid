import {APPEND, PREPEND, ALIGN} from "./Constants";
import Layout from "./interface/Layout";

// ALIGN
const {START, CENTER, END} = ALIGN;

/*
Frame
[
[1, 1, 1, 1, 1],
[0, 0, 2, 2, 2],
[0, 0, 2, 2, 2],
[3, 4, 5, 5, 5],
]
*/
function disableFrame(frame, x, y, width, height) {
	for (let i = y; i < y + height; ++i) {
		for (let j = x; j < x + width; ++j) {
			frame[i][j] = 0;
		}
	}
}
function searchShapeInFrame(frame, type, x, y, width, height) {
	const size = {
		x,
		y,
		width: 1,
		height: 1,
	};

	for (let i = x; i < width; ++i) {
		if (frame[y][i] !== type) {
			size.width = i - x + 1;
			break;
		}
	}
	for (let i = y; i < height; ++i) {
		if (frame[i][x] !== type) {
			size.height = i - y + 1;
			break;
		}
	}
	disableFrame(frame, x, y, width, height);
	return size;
}
function getShapes(frame) {
	const height = frame.length;
	const width = height ? frame[0].length : 0;
	const shapes = [];

	for (let i = 0; i < height; ++i) {
		for (let j = 0; j < width; ++j) {
			const type = frame[i][j];

			if (!type) {
				continue;
			}
			shapes.push(searchShapeInFrame(frame, type, j, i, width, height));
		}
	}
	return {
		shapes,
		width,
		height,
	};
}
class FrameLayout extends Layout {
	constructor(options = {}) {
		super({
			itemSize: 0,
			align: START,
			frame: [],
		}, options);
		const frame = this._options.frame.map(row => row.slice());
		const shapes = getShapes(frame);

		this._itemSize = this._options.itemSize || 0;
		this._frameHeight = shapes.height;
		this._frameWidth = shapes.width;
		this._shapes = shapes.shapes;
	}
	_getItemSize() {
		if (this._itemSize) {
			return this._itemSize;
		}
		this._checkItemSize();
		return this._itemSize;
	}
	_checkItemSize() {
		if (this._options.itemSize) {
			return;
		}
		const style = this._style;
		const margin = this._options.margin;

		this._itemSize = (this._viewport[style.size2] + margin) / (this._frameWidth + margin);
	}
	_layout(items, outline, isAppend) {
		const style = this._style;
		const size2Name = style.size2;
		const viewportSize2 = this._viewport[size2Name];
		const itemSize = this._getItemSize();

	}
	layout(groups, outlines) {
		const length = groups.length;
		let point = outlines;

		for (let i = 0; i < length; ++i) {
			const group = groups[i];

			point = this._layout(group.items, point, APPEND);
			group.outlines = point;
			point = point.end;
		}
	}
}

export default FrameLayout;
