import { find_path } from "./lib/dijkstra";
import { getStyleNames, assignOptions, cloneItems, isObject, getRangeCost } from "../utils";
import {
	ILayout,
	IRectlProperties,
	SizeType,
	IInfiniteGridItem,
	IInfiniteGridGroup,
} from "../types";

interface Link {
	path: number[];
	cost: number;
	length: number;
	currentNode: number;
	isOver?: boolean;
}

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
 * @param {Array|Number} [options.row=0] The number or range of rows in a group, 0 is not set <ko>한 그룹에 들어가는 열의 개수, 0은 미설정이다</ko>
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
class JustifiedLayout implements ILayout {
	public options: {
		margin: number;
		minSize: number;
		maxSize: number;
		column: number | number[];
		horizontal: boolean;
		row: number | number[];
	};
	private _style: IRectlProperties;
	private _size: number;

	constructor(options: Partial<JustifiedLayout["options"]> = {}) {
		this.options = assignOptions(
			{
				margin: 0,
				horizontal: false,
				minSize: 0,
				maxSize: 0,
				column: [1, 8],
				row: 0,
			},
			options
		);

		this._style = getStyleNames(this.options.horizontal);
		this._size = 0;
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
	public setSize(size: number) {
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
	public append(items: IInfiniteGridItem[], outline?: number[], cache?: boolean) {
		return this._insert(items, outline, true, cache);
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
	public prepend(items: IInfiniteGridItem[], outline?: number[], cache?: boolean) {
		return this._insert(items, outline, false, cache);
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
	public layout(groups: IInfiniteGridGroup[] = [], outline: number[] = []) {
		const length = groups.length;
		let point = outline;

		for (let i = 0; i < length; ++i) {
			const group = groups[i];
			const outlines = this._layout(group.items, point, true);

			group.outlines = outlines;
			point = outlines.end;
		}
		return this;
	}
	private _layout(items: IInfiniteGridItem[], outline: number[], isAppend?: boolean) {
		const row = this.options.row;
		let path: string[] = [];

		if (items.length) {
			path = row ? this._getRowPath(items) : this._getPath(items);
		}
		return this._setStyle(items, path, outline, isAppend);
	}

	private _getPath(items: IInfiniteGridItem[]) {
		const lastNode = items.length;
		const column = this.options.column;
		const [minColumn, maxColumn]: number[] = isObject(column)
			? column
			: [column, column];

		const graph = (nodeKey: string) => {
			const results: { [key: string]: number } = {};
			const currentNode = parseInt(nodeKey, 10);

			for (let nextNode = Math.min(currentNode + minColumn, lastNode); nextNode <= lastNode; ++nextNode) {
				if (nextNode - currentNode > maxColumn) {
					break;
				}
				let cost = this._getCost(
					items,
					currentNode,
					nextNode,
				);

				if (cost < 0 && nextNode === lastNode) {
					cost = 0;
				}
				results[`${nextNode}`] = Math.pow(cost, 2);
			}
			return results;
		};
		// shortest path for items' total height.
		return find_path(graph, "0", `${lastNode}`);
	}
	private _getRowPath(items: IInfiniteGridItem[]) {
		const column = this.options.column;
		const row = this.options.row;
		const columnRange = isObject(column) ? column : [column, column];
		const rowRange: number[] = isObject(row) ? row : [row, row];
		const pathLink = this._getRowLink(items, {
			path: [0],
			cost: 0,
			length: 0,
			currentNode: 0,
		}, columnRange, rowRange);

		return pathLink?.path.map((node) => `${node}`) ?? [];
	}
	private _getRowLink(
		items: IInfiniteGridItem[],
		currentLink: Link,
		columnRange: number[],
		rowRange: number[]
	): Link {
		const [minColumn] = columnRange;
		const [minRow, maxRow] = rowRange;
		const lastNode = items.length;
		const {
			path,
			length: pathLength,
			cost,
			currentNode
		} = currentLink;

		// not reached lastNode but path is exceed or the number of remaining nodes is less than minColumn.
		if (currentNode < lastNode && (maxRow <= pathLength || currentNode + minColumn > lastNode)) {
			const rangeCost = getRangeCost(lastNode - currentNode, columnRange);
			const lastCost = rangeCost * Math.abs(this._getCost(items, currentNode, lastNode));

			return {
				...currentLink,
				length: pathLength + 1,
				path: [...path, lastNode],
				currentNode: lastNode,
				cost: cost + lastCost,
				isOver: true,
			};
		} else if (currentNode >= lastNode) {
			return {
				...currentLink,
				currentNode: lastNode,
				isOver: minRow > pathLength || maxRow < pathLength,
			};
		} else {
			return this._searchRowLink(items, currentLink, lastNode, columnRange, rowRange);
		}

	}
	private _searchRowLink(
		items: IInfiniteGridItem[],
		currentLink: Link,
		lastNode: number,
		columnRange: number[],
		rowRange: number[]
	) {
		const [minColumn, maxColumn] = columnRange;
		const {
			currentNode,
			path,
			length: pathLength,
			cost
		} = currentLink;
		const length = Math.min(lastNode, currentNode + maxColumn);
		const links: Link[] = [];

		for (let nextNode = currentNode + minColumn; nextNode <= length; ++nextNode) {
			if (nextNode === currentNode) {
				continue;
			}
			const nextCost = Math.abs(this._getCost(items, currentNode, nextNode));
			const nextLink = this._getRowLink(items, {
				path: [...path, nextNode],
				length: pathLength + 1,
				cost: cost + nextCost,
				currentNode: nextNode,
			}, columnRange, rowRange);

			if (nextLink) {
				links.push(nextLink);
			}
		}
		links.sort((a, b) => {
			const aIsOver = a.isOver;
			const bIsOver = b.isOver;

			if (aIsOver !== bIsOver) {
				// If it is over, the cost is high.
				return aIsOver ? 1 : -1;
			}
			const aRangeCost = getRangeCost(a.length, rowRange);
			const bRangeCost = getRangeCost(b.length, rowRange);

			return aRangeCost - bRangeCost || a.cost - b.cost;
		});

		// It returns the lowest cost link.
		return links[0];
	}
	private _getSize(items: IInfiniteGridItem[], size1Name: SizeType, size2Name: SizeType) {
		const margin = this.options.margin;
		const size = items.reduce((sum, item) => sum +
			(item.orgSize![size2Name]) / item.orgSize![size1Name], 0);

		return (this._size - margin * (items.length - 1)) / size;
	}
	private _getCost(
		items: IInfiniteGridItem[],
		i: number,
		j: number,
	) {
		const style = this._style;
		const size1Name = style.size1;
		const size2Name = style.size2;
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
	private _setStyle(
		items: IInfiniteGridItem[],
		path: string[],
		outline: number[] = [],
		isAppend?: boolean,
	) {
		const style = this._style;
		// if direction is vertical
		// startPos1 : top, endPos1 : bottom
		// size1 : height
		// startPos2 : left, endPos2 : right
		// size2 : width

		// if direction is horizontal
		// startPos1 : left, endPos1 : right
		// size1 : width
		// startPos2 : top, endPos2 : bottom
		// size2 : height
		const pos1Name = style.startPos1;
		const size1Name = style.size1;
		const pos2Name = style.startPos2;
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
				const size2 = item.orgSize![size2Name] / item.orgSize![size1Name] * size1;
				// item has margin bottom and right.
				// first item has not margin.
				const prevItemRect = j === 0 ? 0 : pathItems[j - 1].rect;
				const pos2 = (prevItemRect ? prevItemRect[pos2Name] + prevItemRect[size2Name]! + margin : 0);

				item.rect = {
					[pos1Name]: pos1,
					[pos2Name]: pos2,
					[size1Name]: size1,
					[size2Name]: size2,
				} as any;
			}
			height += margin + size1;
			endPoint = startPoint + height;
		}
		const itemsLength = items.length;

		if (isAppend) {
			// previous group's end outline is current group's start outline
			return {
				start: [startPoint],
				end: [endPoint],
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
		};
	}
	private _insert(items: IInfiniteGridItem[] = [], outline: number[] = [], isAppend?: boolean, cache?: boolean) {
		// this only needs the size of the item.
		const clone = cache ? items : cloneItems(items);

		return {
			items: clone,
			outlines: this._layout(clone, outline, isAppend),
		};
	}
}

export default JustifiedLayout;
