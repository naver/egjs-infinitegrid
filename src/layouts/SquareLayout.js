import FrameLayout from "./FrameLayout";
import {indexOf, fill} from "../utils";

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
	let column = 0;

	if (item.el) {
		const dataset = item.el.dataset;

		if (dataset) {
			column = dataset.column || 1;
		} else {
			column = item.el.getAttribute("column") || 1;
		}
	} else {
		column = 1;
	}
	item.column = column;
	return column;
}

/**
 * FrameLayout is a layout that allows you to place items in a given frame. It is a layout that corresponds to a level intermediate between the placement of the image directly by the designer and the layout using the algorithm.
 * @ko FrameLayout은 주어진 프레임에 맞춰 아이템을 배치하는 레이아웃입니다. 디자이너가 직접 이미지를 배치하는 것과 알고리즘을 사용한 배치의 중간 정도 수준에 해당하는 레이아웃이다.
 * @class eg.InfiniteGrid.SquareLayout
 * @extends eg.InfiniteGrid.FrameLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.SquareLayout module <ko>eg.InfiniteGrid.SquareLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.itemSize=0] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.SquareLayout, {
	margin: 10,
	itemSize: 200,
});

// or

var layout = new eg.InfiniteGrid.SquareLayout({
	margin: 10,
	itemSize: 200,
	horizontal: true,
});


var item1 = '<div data-column="2"></div>';
var item2 = "<div></div>"
layout.append([item1, item2]);
</script>
```
 **/
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
			let index = indexOf(endOutline, point, !isAppend);
			const item = items[i];
			const columnWidth = item.columnWidth;
			const column = (columnWidth && columnWidth[0] === columnLength &&
					columnWidth[1]) || getColumn(item);
			let columnCount = 1;

			if (column > 1) {
				for (let j = 1; j < column &&
						((isAppend && index + j < columnLength) || (!isAppend && index - j >= 0)); ++j) {
					if ((isAppend && endOutline[index + sign * j] <= point) ||
						(!isAppend && endOutline[index + sign * j] >= point)) {
						++columnCount;
						continue;
					}
					break;
				}
				if (!isAppend) {
					index -= columnCount - 1;
				}
			}
			item.columnWidth = [columnLength, columnCount];
			shapes.push({
				width: columnCount,
				height: columnCount,
				[pos1Name]: point - (!isAppend ? columnCount : 0),
				[pos2Name]: index,
				index: i,
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

		if (!isAppend) {
			const lastItem = items[items.length - 1];

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
			result.startIndex = 0;
			result.endIndex = items.indexOf(lastItem);
		}
		return result;
	}
}

export default SquareLayout;
