import {APPEND, PREPEND, ALIGN} from "../consts";
import {getStyleNames, assignOptions} from "../utils";

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
function disableFrame(frame, type, x, y, width, height) {
	for (let i = y; i < y + height; ++i) {
		for (let j = x; j < x + width; ++j) {
			if (type !== frame[i][j]) {
				continue;
			}
			frame[i][j] = 0;
		}
	}
}
function searchShapeInFrame(frame, type, top, left, width, height) {
	const size = {
		left,
		top,
		type,
		width: 1,
		height: 1,
	};

	for (let i = left; i < width; ++i) {
		if (frame[top][i] === type) {
			size.width = i - left + 1;
			continue;
		}
		break;
	}
	for (let i = top; i < height; ++i) {
		if (frame[i][left] === type) {
			size.height = i - top + 1;
			continue;
		}
		break;
	}
	// After finding the shape, it will not find again.
	disableFrame(frame, type, left, top, size.width, size.height);
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
			// Separate shapes with other numbers.
			shapes.push(searchShapeInFrame(frame, type, i, j, width, height));
		}
	}
	shapes.sort((a, b) => (a.type < b.type ? -1 : 1));
	return {
		shapes,
		width,
		height,
	};
}
class FrameLayout {
	constructor(options = {}) {
		this.options = assignOptions({
			itemSize: 0,
			frame: [],
			fitSize: 0,
			align: START,
			frameFill: true,
		}, options);
		const frame = this.options.frame.map(row => row.slice());
		// divide frame into shapes.
		const shapes = getShapes(frame);

		this._itemSize = this.options.itemSize || 0;
		this._shapes = shapes;
		this._size = 0;
		this._style = getStyleNames(this.options.direction);
	}
	_getItemSize() {
		this._checkItemSize();

		return this._itemSize;
	}
	_checkItemSize() {
		if (this.options.itemSize) {
			this._itemSize = this.options.itemSize;
			return;
		}
		const style = this._style;
		const size = style.size2;
		const margin = this.options.margin;

		// if itemSize is not in options, caculate itemSize from size.
		this._itemSize = (this._size + margin) / this._shapes[size] - margin;
	}
	_layout(items, outline = [], isAppend) {
		const length = items.length;
		const style = this._style;
		const {margin, align, frameFill} = this.options;
		const size1Name = style.size1;
		const size2Name = style.size2;
		const pos1Name = style.pos1;
		const pos2Name = style.pos2;
		const itemSize = this._getItemSize();
		const isItemObject = typeof itemSize === "object";
		const itemSize2 = isItemObject ? itemSize[size2Name] : itemSize;
		const itemSize1 = isItemObject ? itemSize[size1Name] : itemSize;
		const shapesSize = this._shapes[size2Name];
		const shapes = this._shapes.shapes;
		const shapesLength = shapes.length;
		const startOutline = new Array(shapesSize).fill(-1);
		const endOutline = new Array(shapesSize).fill(0);
		const shapesSize1 = shapes.height * (itemSize1 + margin) - margin;
		let fitSize = this.options.fitSize;
		let fitStartPos = 0;

		if (fitSize < shapesSize1) {
			fitSize = 0;
		}
		if (fitSize) {
			if (align === CENTER) {
				fitStartPos = (fitSize - shapesSize1) / 2;
			} else if (align === END) {
				fitStartPos = fitSize - shapesSize1;
			}
		}
		let dist = 0;
		let end = 0;
		let startIndex = -1;
		let endIndex = -1;
		let minPos = -1;
		let maxPos = -1;

		if (!shapesLength) {
			return {start: outline, end: outline, startIndex, endIndex};
		}
		for (let i = 0; i < length; i += shapesLength) {
			for (let j = 0; j < shapesLength && i + j < length; ++j) {
				const item = items[i + j];
				const shape = shapes[j];
				const shapePos1 = shape[pos1Name];
				const shapePos2 = shape[pos2Name];
				const shapeSize1 = shape[size1Name];
				const shapeSize2 = shape[size2Name];
				const pos1 = end - dist + shapePos1 * (itemSize1 + margin) + fitStartPos;
				const pos2 = shapePos2 * (itemSize2 + margin);
				const size1 = shapeSize1 * (itemSize1 + margin) - margin;
				const size2 = shapeSize2 * (itemSize2 + margin) - margin;

				for (let k = shapePos2; k < shapePos2 + shapeSize2 && k < shapesSize; ++k) {
					if (startOutline[k] === -1) {
						startOutline[k] = pos1;
					}
					if (startIndex === -1) {
						minPos = pos1;
						startIndex = i + j;
						maxPos = pos1 + size1 + margin;
						endIndex = i + j;
					}
					if (minPos > pos1) {
						minPos = pos1;
						startIndex = i + j;
					}
					if (maxPos < pos1 + size1 + margin) {
						maxPos = pos1 + size1 + margin;
						endIndex = i + j;
					}
					startOutline[k] = Math.min(startOutline[k], pos1);
					endOutline[k] = Math.max(endOutline[k], pos1 + size1 + margin);
				}
				item.rect = {
					[pos1Name]: pos1,
					[pos2Name]: pos2,
					[size1Name]: size1,
					[size2Name]: size2,
				};
			}
			if (fitSize) {
				for (let k = 0; k < shapesSize; ++k) {
					endOutline[k] = end + fitSize;
				}
			}
			end = Math.max(...endOutline);
			// check dist once
			if (i !== 0) {
				continue;
			}
			// find & fill empty block
			if (!frameFill) {
				dist = 0;
				continue;
			}
			dist = end;
			for (let j = 0; j < shapesSize; ++j) {
				if (startOutline[j] === -1) {
					startOutline[j] = Math.max(...startOutline);
					endOutline[j] = startOutline[j];
					continue;
				}
				// the dist between frame's end outline and next frame's start outline
				// expect that next frame's start outline is startOutline[j] + end
				dist = Math.min(startOutline[j] + end - endOutline[j], dist);
			}
		}
		// The target outline is start outline when type is APPENDING
		const targetOutline = isAppend ? startOutline : endOutline;
		const prevOutlineEnd = outline.length === 0 ? 0 : Math[isAppend ? "max" : "min"](...outline);
		let prevOutlineDist = isAppend ? 0 : end;

		if (frameFill && outline.length === shapesSize) {
			prevOutlineDist = isAppend ? Math.abs(prevOutlineEnd) : 0;
			for (let i = 0; i < shapesSize; ++i) {
				if (startOutline[i] === endOutline[i]) {
					continue;
				}
				// if appending type is PREPEND, subtract dist from appending group's height.
				prevOutlineDist = Math[isAppend ? "min" : "max"](targetOutline[i] + prevOutlineEnd - outline[i], prevOutlineDist);
			}
		}
		for (let i = 0; i < shapesSize; ++i) {
			startOutline[i] += prevOutlineEnd - prevOutlineDist;
			endOutline[i] += prevOutlineEnd - prevOutlineDist;
		}
		items.forEach(item => {
			item.rect[pos1Name] += prevOutlineEnd - prevOutlineDist;
		});
		return {
			start: startOutline,
			end: endOutline,
			startIndex,
			endIndex,
		};
	}
	_insert(items, outline, type) {
		// this only needs the size of the item.
		const clone = items.map(item => Object.assign({}, item));

		return {
			items: clone,
			outlines: this._layout(clone, outline, type),
		};
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
	append(items, outline) {
		return this._insert(items, outline, APPEND);
	}
	prepend(items, outline) {
		return this._insert(items, outline, PREPEND);
	}
	setSize(size) {
		this._size = size;
	}
}

export default FrameLayout;
