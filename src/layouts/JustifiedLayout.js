import dijkstra from "../../lib/dijkstra";

const STYLE = {
	vertical: {
		pos1: "top",
		endPos1: "bottom",
		size1: "height",
		pos2: "left",
		endPos2: "right",
		size2: "width",
	},
	horizontal: {
		pos1: "left",
		endPos1: "right",
		size1: "width",
		pos2: "top",
		endPos2: "bottom",
		size2: "height",
	},
};
const APPEND = true;
const PREPEND = false;
const VERTICAL = "vertical";
// const HORIZONTAL = "horizontal";

function getTopPoint(outlines, pos) {
	return Math.min(...outlines.map(outline => outline[pos]));
}
function getBottomPoint(outlines, pos) {
	return Math.max(...outlines.map(outline => outline[pos]));
}

class JustifiedLayout {
	constructor(options = {}) {
		this.options = Object.assign(
			{
				direction: "vertical",
				margin: 0,
				minSize: 0,
				maxSize: 0,
			},
			options);
		this.style = this.getStyleNames();
	}
	remove(removedItem, items, outline) {
		const style = this.style;
		const pos1Name = style.pos1;
		const endPos1Name = style.endPos1;

		const groupKey = removedItem.groupKey;
		const index = items.indexOf(removedItem);
		const length = items.length;
		let start = index;
		let end = index;

		while (start >= 1) {
			if (items[start - 1].groupKey !== groupKey) {
				break;
			}
			--start;
		}
		while (end <= length - 2) {
			if (items[end + 1].groupKey !== groupKey) {
				break;
			}
			++end;
		}
		const group = items.slice(start, end + 1);

		group.splice(group.indexOf(removedItem), 1);

		const endPos1 = items[end].rect[endPos1Name];
		const margin = this.options.margin;

		let point = !start ? items[start].rect[pos1Name] - margin : items[start - 1].rect[endPos1Name];

		point = this._layout(group, 0, group.length, point, APPEND);
		const dist = point - endPos1;

		for (let i = end + 1; i < items.length; ++i) {
			items[i].rect[pos1Name] += dist;
			items[i].rect[endPos1Name] += dist;
		}
	}
	getStyleNames() {
		const direction = this.options.direction in STYLE ? this.options.direction : VERTICAL;
		const style = STYLE[direction];

		return style;
	}
	append(items, outlines) {
		const pos1Name = this.style.pos1;
		const point = getBottomPoint(outlines, pos1Name);

		this._layout(items, 0, items.length, point, APPEND);
	}
	prepend(items, outlines) {
		const pos1Name = this.style.pos1;
		const point = getTopPoint(outlines, pos1Name);

		this._layout(items, 0, items.length, point, PREPEND);
	}
	_layout(items, startIndex, endIndex, point, isAppend) {
		const style = this.style;
		const size1Name = style.size1;
		const size2Name = style.size2;
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
		const path = dijkstra.find_path(graph, `node${startIndex}`, `node${endIndex}`);

		return this._setStyle(items, path, point, isAppend);
	}
	layout(items, outlines) {
		const length = items.length;
		const pos1Name = this.style.pos1;
		let point = getBottomPoint(outlines, pos1Name);
		let j = 0;

		for (let i = 0; i < length; i = j) {
			const item = items[i];
			const groupKey = item.groupKey;

			for (j = i; j < length; ++j) {
				if (items[j].groupKey !== groupKey) {
					break;
				}
			}
			point = this._layout(items, i, j, point, APPEND);
		}
	}
	setViewport(width, height) {
		this.width = width;
		this.height = height;
	}
	_getSize(items, size1Name, size2Name) {
		const size = items.reduce((sum, item) => sum + item.size[size2Name] / item.size[size1Name], 0);
		const margin = this.options.margin;

		return (this[size2Name] - (margin ? margin * (items.length - 1) : 0)) / size;
	}
	_getCost(items, i, j, size1Name, size2Name) {
		const size = this._getSize(items.slice(i, j), size1Name, size2Name);
		const min = this.options.minSize;
		const max = this.options.maxSize || Infinity;

		if (size < min) {
			return Math.pow(size + min, 2);
		} else if (size > max) {
			return Math.pow(size + max, 2);
		}
		return size;
	}
	_setStyle(items, path, startPoint, isAppend) {
		const style = this.style;
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
		const endPos1Name = style.endPos1;
		const size1Name = style.size1;
		const pos2Name = style.pos2;
		const endPos2Name = style.endPos2;
		const size2Name = style.size2;
		const length = path.length;
		const margin = this.options.margin;
		let point = startPoint;
		let height = 0;

		for (let i = 0; i < length - 1; ++i) {
			const path1 = parseInt(path[i].replace("node", ""), 10);
			const path2 = parseInt(path[i + 1].replace("node", ""), 10);
			const pathItems = items.slice(path1, path2);
			const pathItemsLength = pathItems.length;
			const size1 = this._getSize(pathItems, size1Name, size2Name);
			const pos1Margin = point === 0 ? 0 : margin;
			const pos1 = pos1Margin + point;

			for (let j = 0; j < pathItemsLength; ++j) {
				const item = pathItems[j];
				const size2 = item.size[size2Name] / item.size[size1Name] * size1;
				// First item's margin is zero.
				// Next item have margin.
				const pos2 = j === 0 ? 0 :
					(pathItems[j - 1].rect[endPos2Name] + margin);

				item.rect = {
					[pos1Name]: pos1,
					[endPos1Name]: pos1 + size1,
					[pos2Name]: pos2,
					[endPos2Name]: pos2 + size2,
					[size1Name]: size1,
					[size2Name]: size2,
				};
			}
			height += pos1Margin + size1;
			point = startPoint + height;
		}
		if (isAppend) {
			return point;
		}
		// prepend
		height += margin;
		const itemsLength = items.length;

		for (let i = 0; i < itemsLength; ++i) {
			const item = items[i];

			item.rect[pos1Name] -= height;
			item.rect[endPos1Name] -= height;
		}
		return point - height;
	}
}

export default JustifiedLayout;
