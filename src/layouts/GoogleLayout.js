import dijkstra from "./lib/dijkstra";

const _style = {
	vertical: ["top", "height", "left", "width"],
	horizontal: ["left", "width", "top", "height"],
};

class GoogleLayout {
	constructor(options) {
		this.startPoint = 0;
		this.endPoint = 0;
	}
	append(items) {
		this._layout(items, 0, items.length, true);
	}
	prepend(items) {
		this._layout(items, 0, items.length, false);
	}
	_layout(items, _i, _j, isAppend) {
		const graph = _start => {
			const results = {};
			const start = +_start.replace(/[^0-9]/g, "");
			const length = _j + 1;

			for (let i = start + 1; i < length; ++i) {
				if (i - start > 8) {
					break;
				}
				let cost = this._getCost(items, start, i);

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

		this._setStyle(items, path, isAppend);
	}
	layout() {
		this.startPoint = 0;
		this.endPoint = 0;
		const items = this.items;
		const length = items.length;
		let j = 0;

		for (let i = 0; i < length; i = j) {
			const item = items[i];
			const groupKey = item.groupKey;

			for (j = i; j < length; ++j) {
				if (items[j].groupKey !== groupKey) {
					break;
				}
			}
			this._layout(items, i, j, true);
		}
	}
	setViewport(width, height) {
		this.width = width;
		this.height = height;
	}
	getMinPoint() {
		return this.startPoint;
	}
	getMaxPoint() {
		return this.endPoint;
	}
	getStartPoint() {
		return this.startPoint;
	}
	getEndPoint() {
		return this.endPoint;
	}
	_getWidth(items) {
		const w = items.reduce((sum, item) => sum + item.size.height / item.size.width, 0);
		const margin = this.options.margin;

		return (this.height - (margin ? margin * (items.length - 1) : 0)) / w;
	}
	_getHeight(items) {
		const h = items.reduce((sum, item) => sum + item.size.width / item.size.height, 0);
		const margin = this.options.margin;

		return (this.width - (margin ? margin * (items.length - 1) : 0)) / h;
	}
	_getSize(items, _size1, _size2) {
		const size = items.reduce((sum, item) => sum + item.size[_size2] / item.size[_size1], 0);
		const margin = this.options.margin;

		return (this[_size2] - (margin ? margin * (items.length - 1) : 0)) / size;
	}
	_getCost(items, i, j) {
		const direction = this.options.direction;
		const size = direction === "horizontal" ?
			this._getWidth(items.slice(i, j)) : this._getHeight(items.slice(i, j));
		const min = this.options.minSize || 0;
		const max = ("maxSize" in this.options) ? this.options.maxSize : Infinity;

		if (size < min) {
			return Math.pow(size - min, 2);
		} else if (size > max) {
			return Math.pow(size - max, 2);
		}
		return 0;
	}
	_setStyle(items, path, isAppend) {
		const direction = _style[this.options.direction] ? this.options.direction : "vertical";
		const style = _style[direction];
		// if direction is vertical, [pos1, size1, pos2, size2] is [top, height, left, width]
		// if direction is horizontal, [pos1, size1, pos2, size2] is [left, width, top, height]
		const [_pos1, _size1, _pos2, _size2] = style;
		const length = path.length;
		const margin = this.options.margin || 0;
		const _point = isAppend ? "endPoint" : "startPoint";
		const mark = (isAppend ? 1 : -1);

		for (let i = 0; i < length - 1; ++i) {
			const path1 = parseInt(path[i].replace("node", ""), 10);
			const path2 = parseInt(path[i + 1].replace("node", ""), 10);
			const _items = items.slice(path1, path2);
			const _length = _items.length;
			const size1 = this._getSize(_items, _size1, _size2);
			// The same startPoint and endPoint means that the layout is initialized.
			const pos1Margin = this.startPoint === this.endPoint ? 0 : margin;
			// The position of the item being prepended is subtracted from size.
			const pos1 = mark * pos1Margin + (isAppend ? 0 : -size1) + this[_point];

			for (let j = 0; j < _length; ++j) {
				const item = _items[j];
				const size2 = item.size[_size2] / item.size[_size1] * size1;
				// First item's margin is zero.
				// Next item have margin.
				const pos2 = j === 0 ? 0 :
					(_items[j - 1].position[_pos2] + _items[j - 1].size[_size2] + margin);

				item.position[_pos1] = pos1;
				item.position[_pos2] = pos2;
				item.size[_size1] = size1;
				item.size[_size2] = size2;
			}
			this[_point] += mark * (pos1Margin + size1);
		}
	}
}

export default GoogleLayout;
