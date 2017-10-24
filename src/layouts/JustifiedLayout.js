import dijkstra from "./lib/dijkstra";
import {APPEND, PREPEND} from "./Constants";
import {getStyleNames, assignOptions} from "./utils";

class JustifiedLayout {
	constructor(options = {}) {
		this.options = assignOptions({
			minSize: 0,
			maxSize: 0,
		}, options);
		this._style = getStyleNames(this.options.direction);
		this._size = 0;
	}
	_layout(items, outline, isAppend) {
		const style = this._style;
		const size1Name = style.size1;
		const size2Name = style.size2;
		const startIndex = 0;
		const endIndex = items.length;
		const graph = _start => {
			const results = {};
			const start = +_start.replace(/[^0-9]/g, "");
			const length = endIndex + 1;

			for (let i = start + 1; i < length; ++i) {
				if (i - start > 8) {
					break;
				}
				let cost = this._getCost(items, start, i, size1Name, size2Name);

				if (cost < 0 && i === length - 1) {
					cost = 0;
				}
				if (cost !== null) {
					results[`node${i}`] = Math.pow(cost, 2);
				}
			}

			return results;
		};
		// shortest path for items' total height.
		const path = dijkstra.find_path(graph, `node${startIndex}`, `node${endIndex}`);

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
		const min = this.options.minSize;
		const max = this.options.maxSize || Infinity;

		if (isFinite(max)) {
			// if this size is not in range, the cost increases sharply.
			if (size < min) {
				return Math.pow(size - min, 2);
			} else if (size > max) {
				return Math.pow(size - max, 2);
			} else {
				// if this size in range, the cost is negative or low.
				return size - max;
			}
		}
		// if max is infinite type, caculate cost only with "min".
		if (size < min) {
			return Math.max(Math.pow(min, 2), Math.pow(size, 2));
		}
		return size - min;
	}
	_setStyle(items, path, outline, isAppend) {
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
		const endPos2Name = style.endPos2;
		const size2Name = style.size2;
		const length = path.length;
		const margin = this.options.margin;
		const startPoint = outline[0] || 0;
		let endPoint = startPoint;
		let height = 0;

		for (let i = 0; i < length - 1; ++i) {
			const path1 = parseInt(path[i].replace("node", ""), 10);
			const path2 = parseInt(path[i + 1].replace("node", ""), 10);
			// pathItems(path1 to path2) are in 1 line.
			const pathItems = items.slice(path1, path2);
			const pathItemsLength = pathItems.length;
			const size1 = this._getSize(pathItems, size1Name, size2Name);
			const pos1 = endPoint;

			for (let j = 0; j < pathItemsLength; ++j) {
				const item = pathItems[j];
				const size2 = item.size[size2Name] / item.size[size1Name] * size1;
				// item has margin bottom and right.
				// first item has not margin.
				const prevItemRect = j === 0 ? 0 : pathItems[j - 1].rect;
				const pos2 = (prevItemRect ? prevItemRect[pos2Name] + prevItemRect[size2Name] + margin : 0);

				item.rect = {
					[pos1Name]: pos1,
					[pos2Name]: pos2,
					[endPos2Name]: pos2 + size2,
					[size1Name]: size1,
					[size2Name]: size2,
				};
			}
			height += margin + size1;
			endPoint = startPoint + height;
		}
		const startIndex = length ? 0 : -1;
		const endIndex = length ? length - 1 : -1;

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
		const itemsLength = items.length;

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
		const clone = items.map(item => Object.assign({}, item));
		const result = this._layout(clone, outline, type);

		return {
			items: clone,
			outlines: result,
		};
	}
	setSize(size) {
		this._size = size;
	}
	append(items, outline) {
		return this._insert(items, outline, APPEND);
	}
	prepend(items, outline) {
		return this._insert(items, outline, PREPEND);
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

export default JustifiedLayout;
