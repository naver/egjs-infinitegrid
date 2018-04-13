import dijkstra from "./lib/dijkstra";
import {APPEND, PREPEND} from "../consts";
import {getStyleNames, assignOptions, cloneItems} from "../utils";

/**
 * @classdesc 'justified' is a printing term with the meaning that 'it fits in one row wide'. JustifiedLayout is a layout that the card is filled up on the basis of a line given a size.
 * @ko 'justified'는 '1행의 너비에 맞게 꼭 들어찬'이라는 의미를 가진 인쇄 용어다. 용어의 의미대로 너비가 주어진 사이즈를 기준으로 카드가 가득 차도록 배치하는 레이아웃이다.
 * @class eg.InfiniteGrid.JustifiedLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.JustifiedLayout module <ko>eg.InfiniteGrid.JustifiedLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Number} [options.minSize=0] Minimum size of item to be resized <ko> 아이템이 조정되는 최소 크기 </ko>
 * @param {Number} [options.maxSize=0] Maximum size of item to be resized <ko> 아이템이 조정되는 최대 크기 </ko>
 * @param {Array|Number} [options.column=[1, 8]] The number of items in a line <ko> 한 줄에 들어가는 아이템의 개수 </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.JustifiedLayout, {
	margin: 10,
	minSize: 100,
	maxSize: 300,
});

// or

var layout = new eg.InfiniteGrid.JustifiedLayout({
	margin: 10,
	minSize: 100,
	maxSize: 300,
	column: 5,
	horizontal: true,
});

</script>
```
 **/
class JustifiedLayout {
	constructor(options = {}) {
		this.options = assignOptions({
			margin: 0,
			horizontal: false,
			minSize: 0,
			maxSize: 0,
			column: [1, 8],
		}, options);

		this._style = getStyleNames(this.options.horizontal);
		this._size = 0;
	}
	_layout(items, outline, isAppend) {
		const style = this._style;
		const size1Name = style.size1;
		const size2Name = style.size2;
		const startIndex = 0;
		const endIndex = items.length;
		let column = this.options.column;

		if (typeof column !== "object") {
			column = [column, column];
		}

		const graph = _start => {
			const results = {};
			const start = +_start.replace(/[^0-9]/g, "");
			const length = endIndex + 1;

			for (let i = Math.min(start + column[0], length - 1); i < length; ++i) {
				if (i - start > column[1]) {
					break;
				}
				let cost = this._getCost(items, start, i, size1Name, size2Name);

				if (cost === null) {
					continue;
				}
				if (cost < 0 && i === length - 1) {
					cost = 0;
				}
				results[`${i}`] = Math.pow(cost, 2);
			}
			return results;
		};
		// shortest path for items' total height.
		const path = dijkstra.find_path(graph, `${startIndex}`, `${endIndex}`);

		return this._setStyle(items, path, outline, isAppend);
	}
	_getSize(items, size1Name, size2Name) {
		const margin = this.options.margin;
		const size = items.reduce((sum, item) => sum +
							(item.size[size2Name]) / item.size[size1Name], 0);

		return (this._size - margin * (items.length - 1)) / size;
	}
	_getCost(items, i, j, size1Name, size2Name) {
		const size = this._getSize(items.slice(i, j), size1Name, size2Name);
		const min = this.options.minSize || 0;
		const max = this.options.maxSize || Infinity;

		if (isFinite(max)) {
			// if this size is not in range, the cost increases sharply.
			if (size < min) {
				return Math.pow(size - min, 2) + Math.pow(max, 2);
			} else if (size > max) {
				return Math.pow(size - max, 2) + Math.pow(max, 2);
			} else {
				// if this size in range, the cost is negative or low.
				return Math.min(size - max, min - size);
			}
		}
		// if max is infinite type, caculate cost only with "min".
		if (size < min) {
			return Math.max(Math.pow(min, 2), Math.pow(size, 2));
		}
		return size - min;
	}
	_setStyle(items, path, outline = [], isAppend) {
		const style = this._style;
		// if direction is vertical
		// pos1 : top, pos11 : bottom
		// size1 : height
		// pos2 : left, pos22 : right
		// size2 : width

		// if direction is horizontal
		// pos1 : left, pos11 : right
		// size1 : width
		// pos2 : top, pos22 : bottom
		// size2 : height
		const pos1Name = style.pos1;
		const size1Name = style.size1;
		const pos2Name = style.pos2;
		const size2Name = style.size2;
		const length = path.length;
		const margin = this.options.margin;
		const startPoint = outline[0] || 0;
		let endPoint = startPoint;
		let height = 0;

		for (let i = 0; i < length - 1; ++i) {
			const path1 = parseInt(path[i], 10);
			const path2 = parseInt(path[i + 1], 10);
			// pathItems(path1 to path2) are in 1 line.
			const pathItems = items.slice(path1, path2);
			const pathItemsLength = pathItems.length;
			const size1 = this._getSize(pathItems, size1Name, size2Name);
			const pos1 = endPoint;

			for (let j = 0; j < pathItemsLength; ++j) {
				const item = pathItems[j];
				const size2 = item.orgSize[size2Name] / item.orgSize[size1Name] * size1;
				// item has margin bottom and right.
				// first item has not margin.
				const prevItemRect = j === 0 ? 0 : pathItems[j - 1].rect;
				const pos2 = (prevItemRect ? prevItemRect[pos2Name] + prevItemRect[size2Name] + margin : 0);

				item.rect = {
					[pos1Name]: pos1,
					[pos2Name]: pos2,
					[size1Name]: size1,
					[size2Name]: size2,
				};
			}
			height += margin + size1;
			endPoint = startPoint + height;
		}
		const itemsLength = items.length;
		const startIndex = itemsLength ? 0 : -1;
		const endIndex = itemsLength ? itemsLength - 1 : -1;

		if (isAppend) {
			// previous group's end outline is current group's start outline
			return {
				start: [startPoint],
				end: [endPoint],
				startIndex,
				endIndex,
			};
		}
		// for prepend, only substract height from position.
		// always start is lower than end.

		for (let i = 0; i < itemsLength; ++i) {
			const item = items[i];

			// move items as long as height for prepend
			item.rect[pos1Name] -= height;
		}
		return {
			start: [startPoint - height],
			end: [startPoint], // endPoint - height = startPoint
			startIndex,
			endIndex,
		};
	}
	_insert(items, outline, type) {
		// this only needs the size of the item.
		const clone = cloneItems(items);

		return {
			items: clone,
			outlines: this._layout(clone, outline, type),
		};
	}
	/**
	 * Set the viewport size of the layout.
	 * @ko 레이아웃의 가시 사이즈를 설정한다.
	 * @method eg.InfiniteGrid.JustifiedLayout#setSize
	 * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
	 * @return {eg.InfiniteGrid.JustifiedLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
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
	 * @method eg.InfiniteGrid.JustifiedLayout#append
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
	 * @method eg.InfiniteGrid.JustifiedLayout#prepend
	 * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
	 * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
	 * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
	 * @example
	 * layout.prepend(items, [100]);
	 */
	prepend(items, outline) {
		return this._insert(items, outline, PREPEND);
	}
	/**
	 * Adds items of groups at the bottom of a outline.
	 * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
	 * @method eg.InfiniteGrid.JustifiedLayout#layout
	 * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
	 * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
	 * @return {eg.InfiniteGrid.JustifiedLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * layout.layout(groups, [100]);
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
}

export default JustifiedLayout;
