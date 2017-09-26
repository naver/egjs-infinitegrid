import dijkstra from "./lib/dijkstra";

const _style = {
	vertical: ["top", "bottom", "height", "left", "right", "width"],
	horizontal: ["left", "right", "width", "top", "bottom", "height"],
};
const APPEND = true;
const PREPEND = false;
// const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

function getTopPoint(outlines, pos) {
	return Math.min(...outlines.map(outline => outline[pos]));
}
function getBottomPoint(outlines, pos) {
	return Math.max(...outlines.map(outline => outline[pos]));
}

class GoogleLayout {
	constructor(options = {}) {
		this.options = options;
	}
	remove(removedItem, items, outline) {
		const direction = _style[this.options.direction] ? this.options.direction : VERTICAL;
		const style = _style[direction];
		const _pos1 = style[0];
		const _pos2 = style[1];

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

		const pos2 = items[end].position[`_${_pos2}`];
		const margin = this.options.margin || 0;

		let point = !start ? items[start].position[`_${_pos1}`] - margin : items[start - 1].position[`_${_pos2}`];

		point = this._layout(group, 0, group.length, point, APPEND);
		const dist = point - pos2;

		for (let i = end + 1; i < items.length; ++i) {
			items[i].position[`_${_pos1}`] += dist;
			items[i].position[`_${_pos2}`] += dist;
		}
	}
	getStyleNames() {
		const direction = _style[this.options.direction] ? this.options.direction : VERTICAL;
		const style = _style[direction];

		return style;
	}
	append(items, outlines) {
		const _pos1 = this.getStyleNames()[0];
		const point = getBottomPoint(outlines, _pos1);

		this._layout(items, 0, items.length, point, APPEND);
	}
	prepend(items, outlines) {
		const _pos1 = this.getStyleNames()[0];
		const point = getTopPoint(outlines, _pos1);

		this._layout(items, 0, items.length, point, PREPEND);
	}
	_layout(items, _i, _j, point, isAppend) {
		const style = this.getStyleNames();
		const _size1 = style[2];
		const _size2 = style[5];
		const graph = _start => {
			const results = {};
			const start = +_start.replace(/[^0-9]/g, "");
			const length = _j + 1;

			for (let i = start + 1; i < length; ++i) {
				if (i - start > 8) {
					break;
				}
				let cost = this._getCost(items, start, i, _size1, _size2);

				if (cost < 0 && i === length - 1) {
					cost = 0;
				}
				if (cost !== null) {
					results[`node${i}`] = Math.pow(cost, 2);
				}
			}

			return results;
		};
		const path = dijkstra.find_path(graph, `node${_i}`, `node${_j}`);

		return this._setStyle(items, path, point, isAppend);
	}
	layout(items, outlines) {
		const length = items.length;
		const _pos1 = this.getStyleNames()[0];
		let point = getBottomPoint(outlines, _pos1);
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
	_getSize(items, _size1, _size2) {
		const size = items.reduce((sum, item) => sum + item.size[_size2] / item.size[_size1], 0);
		const margin = this.options.margin || 0;

		return (this[_size2] - (margin ? margin * (items.length - 1) : 0)) / size;
	}
	_getCost(items, i, j, _size1, _size2) {
		const size = this._getSize(items.slice(i, j), _size1, _size2);
		const min = this.options.minSize || 0;
		const max = ("maxSize" in this.options) ? this.options.maxSize : Infinity;

		if (size < min) {
			return Math.pow(size + min, 2);
		} else if (size > max) {
			return Math.pow(size + max, 2);
		}
		return size;
	}
	_setStyle(items, path, _point, isAppend) {
		const direction = _style[this.options.direction] ? this.options.direction : VERTICAL;
		const style = _style[direction];
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
		const [_pos1, _pos11, _size1, _pos2, _pos22, _size2] = style;
		const length = path.length;
		const margin = this.options.margin || 0;
		let point = _point;
		let height = 0;

		for (let i = 0; i < length - 1; ++i) {
			const path1 = parseInt(path[i].replace("node", ""), 10);
			const path2 = parseInt(path[i + 1].replace("node", ""), 10);
			const _items = items.slice(path1, path2);
			const _length = _items.length;
			const size1 = this._getSize(_items, _size1, _size2);
			const pos1Margin = point === 0 ? 0 : margin;
			const pos1 = pos1Margin + point;

			for (let j = 0; j < _length; ++j) {
				const item = _items[j];
				const size2 = item.size[_size2] / item.size[_size1] * size1;
				// First item's margin is zero.
				// Next item have margin.
				const pos2 = j === 0 ? 0 :
					(_items[j - 1].position[`_${_pos22}`] + margin);

				item.position[`_${_pos1}`] = pos1;
				item.position[`_${_pos11}`] = pos1 + size1;
				item.position[`_${_pos2}`] = pos2;
				item.position[`_${_pos22}`] = pos2 + size2;
				item.size[`_${_size1}`] = size1;
				item.size[`_${_size2}`] = size2;
			}
			height += pos1Margin + size1;
			point = _point + height;
		}
		if (isAppend) {
			return point;
		}
		// prepend
		height += margin;
		const itemsLength = items.length;

		for (let i = 0; i < itemsLength; ++i) {
			const item = items[i];

			item.position[`_${_pos1}`] -= height;
			item.position[`_${_pos11}`] -= height;
		}
		return point - height;
	}
}

export default GoogleLayout;
