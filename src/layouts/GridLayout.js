import {APPEND, PREPEND, HORIZONTAL, ALIGN} from "../consts";
import {getStyleNames, assignOptions, fill} from "../utils";

// ALIGN
const {START, CENTER, END, JUSTIFY} = ALIGN;


/**
 * A module used to arrange card elements including content infinitely according to layout type. With this module, you can implement various layouts composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko GridLayout는 벽돌을 쌓아 올린 모양처럼 동일한 너비를 가진 이미지가 엇갈려 배열되는 레이아웃이다. 모든 이미지의 너비를 동일한 크기로 조정하고, 가장 높이가 낮은 열을 찾아 새로운 이미지를 삽입한다. 따라서 배치된 이미지 사이에 빈 공간이 생기지는 않지만 배치된 레이아웃의 아래쪽은 울퉁불퉁해진다.
 * @class eg.InfiniteGrid.GridLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.GridLayout module <ko>eg.InfiniteGrid.GridLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal="vertical"] Direction of the scroll movement (vertical, horizontal) <ko>스크롤 이동 방향 (vertical 세로방향, horizontal 가로방향)</ko>
 * @param {Boolean} [options.align=START] Align of the position of the items (START, CENTER, END, JUSTIFY) <ko>아이템들의 위치의 정렬 (START, CENTER, END, JUSTIFY)</ko>
 * @param {Boolean} [options.itemSize=0] Direction of the scroll movement (true: horizontal, false: vertical) <ko>스크롤 이동 방향 (true 가로방향, false 세로방향</ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid");

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: 10,
	align: "start",
	itemSize: 200
});

// or

var layout = new eg.InfiniteGrid.GridLayout({
	margin: 10,
	align: "center",
	itemSize: 200,
	direction: "horizontal"
});

</script>
```
 **/
class GridLayout {
	constructor(options = {}) {
		this.options = assignOptions({
			align: START,
			itemSize: 0,
		}, options);
		this._size = 0;
		this._isHorizontal = this.options.direction === HORIZONTAL;
		this._columnSize = 0;
		this._columnLength = 0;
		this._style = getStyleNames(this.options.direction);
	}
	getPoints(outlines) {
		const pos = this._isHorizontal ? "left" : "top";

		return outlines.map(outline => outline[pos]);
	}
	checkColumn(item) {
		const margin = this.options.margin;
		// if direction is horizontal, fixed dimension is height
		// if direction is vertical, fixed dimension is width
		const sizeName = this._isHorizontal ? "height" : "width";
		const columnSize = this.options.itemSize || (item && item.size[sizeName]) || 0;

		this._columnSize = columnSize;
		if (!columnSize) {
			this._columnLength = 1;
			return;
		}
		this._columnLength = Math.max(parseInt((this._size + margin) / (columnSize + margin), 10), 1);
	}
	_layout(items, outline, isAppend) {
		const length = items.length;
		const margin = this.options.margin;
		const align = this.options.align;
		const style = this._style;

		const size1Name = style.size1;
		const size2Name = style.size2;
		const pos1Name = style.pos1;
		const pos2Name = style.pos2;
		const columnSize = this._columnSize;
		const columnLength = this._columnLength;

		const size = this._size;
		const viewDist = (size - (columnSize + margin) * columnLength + margin);

		const pointCaculateName = isAppend ? "min" : "max";
		const startOutline = outline.slice();
		const endOutline = outline.slice();
		const startIndex = 0;
		let endIndex = -1;
		let endPos = -1;

		for (let i = 0; i < length; ++i) {
			const point = Math[pointCaculateName](...endOutline) || 0;
			let index = endOutline.indexOf(point);
			const item = items[isAppend ? i : length - 1 - i];
			const size1 = item.size[size1Name];
			const size2 = item.size[size2Name];
			const pos1 = isAppend ? point : point - margin - size1;
			const endPos1 = pos1 + size1 + margin;

			if (index === -1) {
				index = 0;
			}
			let pos2 = (columnSize + margin) * index;

			// ALIGN
			if (align === CENTER) {
				pos2 += viewDist / 2;
			} else if (align === END) {
				pos2 += viewDist + columnSize - size2;
			} else if (align === JUSTIFY) {
				pos2 = (size - columnSize) / (columnLength - 1) * index;
			}
			// tetris
			item.rect = {
				[pos1Name]: pos1,
				[pos2Name]: pos2,
			};
			item.column = index;
			endOutline[index] = isAppend ? endPos1 : pos1;
			if (endIndex === -1) {
				endIndex = i;
				endPos = endPos1;
			} else if (endPos < endPos1) {
				endIndex = i;
				endPos = endPos1;
			}
		}
		if (!isAppend) {
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
			endIndex = length - 1;
		}
		// if append items, startOutline is low, endOutline is high
		// if prepend items, startOutline is high, endOutline is low
		return {
			start: isAppend ? startOutline : endOutline,
			end: isAppend ? endOutline : startOutline,
			startIndex,
			endIndex,
		};
	}
	_insert(items = [], outline = [], type) {
		const clone = items.map(item => Object.assign({}, item));

		let startOutline = outline;

		if (!this._columnLength) {
			this.checkColumn(items[0]);
		}
		if (outline.length !== this._columnLength) {
			startOutline = fill(this._columnLength, outline.length === 0 ? 0 : (Math[type === APPEND ? "min" : "max"](...outline) || 0));
		}

		const result = this._layout(clone, startOutline, type);

		return {
			items: clone,
			outlines: result,
		};
	}
	/**
	 * Adds items at the bottom of a outline.
	 * @ko 아이템들을 아웃라인 아래에 추가한다.
	 * @method eg.InfiniteGrid.GridLayout#append
	 * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
	 * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
	 * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
	 * @example
	 * layout.prepend(items, [100, 200, 300, 400]);
	 */
	append(items, outline) {
		return this._insert(items, outline, APPEND);
	}
	/**
	 * Adds items at the top of a outline.
	 * @ko 아이템을 아웃라인 위에 추가한다.
	 * @method eg.InfiniteGrid.GridLayout#prepend
	 * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
	 * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
	 * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
	 * @example
	 * layout.prepend(items, [100, 200, 300, 400]);
	 */
	prepend(items, outline) {
		return this._insert(items, outline, PREPEND);
	}
	/**
	 * Adds items of groups at the bottom of a outline.
	 * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
	 * @method eg.InfiniteGrid.GridLayout#layout
	 * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
	 * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
	 * @return {eg.InfiniteGrid.GridLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * layout.layout(groups, [100, 200, 300, 400]);
	 */
	layout(groups = [], outline = []) {
		const firstItem = (groups.length && groups[0].items.length && groups[0].items[0]) || 0;

		this.checkColumn(firstItem);

		// if outlines' length and columns' length are now same, re-caculate outlines.
		let startOutline;

		if (outline.length !== this._columnLength) {
			const pos = outline.length === 0 ? 0 : Math.min(...outline);

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

		return this;
	}
	/**
	 * Set the viewport size of the layout.
	 * @ko 레이아웃의 가시 사이즈를 설정한다.
	 * @method eg.InfiniteGrid.GridLayout#setSize
	 * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
	 * @return {eg.InfiniteGrid.GridLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * layout.layout(groups, [100, 200, 300, 400]);
	 */
	setSize(size) {
		this._size = size;
		return this;
	}
}

export default GridLayout;

