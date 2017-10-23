import Controller from "../../lib/PackingLayout/src/js/Controller.js";
import BoxModel from "../../lib/PackingLayout/src/js/BoxModel.js";
import {HORIZONTAL, APPEND, PREPEND} from "./Constants";
import {getStyleNames, assignOptions, toZeroArray} from "./utils";

function option(name) {
	return this[name];
}
class PackingLayout {
	constructor(options = {}) {
		this.options = assignOptions({
			aspectRatio: 1,
		}, options);
		this._viewport = {};
		this._style = getStyleNames(this.options.direction);
		this._isHorizontal = this.options.direction === HORIZONTAL;
	}
	_layout(items, outline = [], isAppend) {
		const style = this._style;
		const isHorizontal = this._isHorizontal;
		const aspectRatio = this.options.aspectRatio;
		const margin = this.options.margin;
		const pos1Name = style.pos1;
		const containerWidth = this._viewport.width * (isHorizontal ? aspectRatio : 1);
		const containerHeight = this._viewport.height / (isHorizontal ? 1 : aspectRatio);
		const containerSize1 = isHorizontal ? containerWidth : containerHeight;
		const prevOutline = toZeroArray(outline);
		const start = isAppend ? Math.max(...prevOutline) :
			Math.min(...prevOutline) - containerSize1 - margin;
		const end = start + containerSize1 + margin;
		const container = new BoxModel({});
		const controller = {
			option,
			_container: container,
			sizeWeight: 1,
			ratioWeight: 1,
		};

		items.forEach(item => {
			const model = new BoxModel({
				originWidth: item.size.width,
				originHeight: item.size.height,
				width: item.size.width,
				height: item.size.height,
			});

			Controller.prototype._findBestFitArea.call(controller, model);
			container.pushItem(model);
			container.scaleTo(containerWidth + margin, containerHeight + margin);
		});
		items.forEach((item, i) => {
			const {left, top, width, height} = container.innerItem[i];

			item.rect = {top, left, width: width - margin, height: height - margin};
			item.rect[pos1Name] += start;
		});

		return {
			start: [start],
			end: [end],
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
	append(items, outline) {
		return this._insert(items, outline, APPEND);
	}
	prepend(items, outline) {
		return this._insert(items, outline, PREPEND);
	}
	layout(groups, outline = []) {
		const length = groups.length;
		let point = outline;

		for (let i = 0; i < length; ++i) {
			const group = groups[i];

			point = this._layout(group.items, point, APPEND);
			group.outlines = point;
			point = point.end;
		}
	}
	setViewport(width, height) {
		const viewport = this._viewport;

		viewport.width = width;
		viewport.height = height;
	}
}

export default PackingLayout;
