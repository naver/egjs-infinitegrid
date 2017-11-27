import {APPEND, PREPEND} from "../consts";
import {getStyleNames, assignOptions, fill} from "../utils";


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
/**
 * FrameLayout is a layout that allows you to place items in a given frame. It is a layout that corresponds to a level intermediate between the placement of the image directly by the designer and the layout using the algorithm.
 * @ko FrameLayout은 주어진 프레임에 맞춰 아이템을 배치하는 레이아웃입니다. 디자이너가 직접 이미지를 배치하는 것과 알고리즘을 사용한 배치의 중간 정도 수준에 해당하는 레이아웃이다.
 * @class eg.InfiniteGrid.FrameLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.FrameLayout module <ko>eg.InfiniteGrid.FrameLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.itemSize=0] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @param {Boolean} [options.frame=[]] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @param {Boolean} [options.frameFill=true] Make sure that the frame can be attached after the previous frame. <ko> 다음 프레임이 전 프레임에 이어 붙일 수 있는지 있는지 확인한다. </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 10,
	itemSize: 200,
	frame: [
		[1, 1, 1, 1, 1],
		[0, 0, 2, 2, 2],
		[0, 0, 2, 2, 2],
		[3, 4, 5, 5, 5],
	],
});

// or

var layout = new eg.InfiniteGrid.FrameLayout({
	margin: 10,
	itemSize: 200,
	horizontal: true,
	frame: [
		[1, 1, 1, 1, 1],
		[0, 0, 2, 2, 2],
		[0, 0, 2, 2, 2],
		[3, 4, 5, 5, 5],
	],
});

</script>
```
 **/
class FrameLayout {
	constructor(options = {}) {
		this.options = assignOptions({
			itemSize: 0,
			frame: [],
			frameFill: true,
		}, options);
		const frame = this.options.frame.map(row => row.slice());
		// divide frame into shapes.
		const shapes = getShapes(frame);

		this._itemSize = this.options.itemSize || 0;
		this._shapes = shapes;
		this._size = 0;
		this._style = getStyleNames(this.options.horizontal);
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
		const {margin, frameFill} = this.options;
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
		const startOutline = fill(shapesSize, -99999);
		const endOutline = fill(shapesSize, -99999);
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
				const pos1 = end - dist + shapePos1 * (itemSize1 + margin);
				const pos2 = shapePos2 * (itemSize2 + margin);
				const size1 = shapeSize1 * (itemSize1 + margin) - margin;
				const size2 = shapeSize2 * (itemSize2 + margin) - margin;

				for (let k = shapePos2; k < shapePos2 + shapeSize2 && k < shapesSize; ++k) {
					if (startOutline[k] === -99999) {
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
				if (startOutline[j] === -99999) {
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
			prevOutlineDist = 99999999;
			for (let i = 0; i < shapesSize; ++i) {
				if (startOutline[i] === endOutline[i]) {
					continue;
				}
				// if appending type is PREPEND, subtract dist from appending group's height.

				prevOutlineDist = Math.min(targetOutline[i] + prevOutlineEnd - outline[i], prevOutlineDist);
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
	/**
	 * Adds items of groups at the bottom of a outline.
	 * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
	 * @method eg.InfiniteGrid.FrameLayout#layout
	 * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
	 * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
	 * @return {eg.InfiniteGrid.FrameLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * layout.layout(groups, [100, 200, 300, 400]);
	 */
	layout(groups, outlines) {
		const length = groups.length;
		let point = outlines;

		for (let i = 0; i < length; ++i) {
			const group = groups[i];

			point = this._layout(group.items, point, APPEND);
			group.outlines = point;
			point = point.end;
		}
		return this;
	}
	/**
	 * Set the viewport size of the layout.
	 * @ko 레이아웃의 가시 사이즈를 설정한다.
	 * @method eg.InfiniteGrid.FrameLayout#setSize
	 * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
	 * @return {eg.InfiniteGrid.FrameLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * layout.setSize(800);
	 */
	setSize(size) {
		this._size = size;
		return this;
	}
	/**
	 * Adds items at the bottom of a outline.
	 * @ko 아이템들을 아웃라인 아래에 추가한다.
	 * @method eg.InfiniteGrid.FrameLayout#append
	 * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
	 * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
	 * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
	 * @example
	 * layout.prepend(items, [100]);
	 */
	append(items, outline) {
		return this._insert(items, outline, APPEND);
	}
	/**
	 * Adds items at the top of a outline.
	 * @ko 아이템을 아웃라인 위에 추가한다.
	 * @method eg.InfiniteGrid.FrameLayout#prepend
	 * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
	 * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
	 * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
	 * @example
	 * layout.prepend(items, [100]);
	 */
	prepend(items, outline) {
		return this._insert(items, outline, PREPEND);
	}
}

export default FrameLayout;
