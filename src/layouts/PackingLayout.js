import BoxModel from "./lib/BoxModel.js";
import {APPEND, PREPEND} from "../consts";
import {getStyleNames, assignOptions, toZeroArray} from "../utils";


function getCost(originLength, length) {
	let cost = originLength / length;

	if (cost < 1) {
		cost = 1 / cost;
	}

	return cost - 1;
}
function fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical) {
	item.height = itemFitSize.height;
	item.width = itemFitSize.width;

	bestFitArea.height = containerFitSize.height;
	bestFitArea.width = containerFitSize.width;

	if (layoutVertical) {
		item.top = bestFitArea.top + bestFitArea.height;
		item.left = bestFitArea.left;
	} else {
		item.left = bestFitArea.left + bestFitArea.width;
		item.top = bestFitArea.top;
	}
}
class PackingLayout {
	constructor(options = {}) {
		this.options = assignOptions({
			aspectRatio: 1,
			sizeWeight: 1,
			ratioWeight: 1,
		}, options);
		this._size = 0;
		this.options.horizontal = this.options.direction === "horizontal";
		this._style = getStyleNames(this.options.horizontal);
	}
	_findBestFitArea(container, item) {
		if (container.getRatio() === 0) { // 아이템 최초 삽입시 전체영역 지정
			container.originWidth = item.width;
			container.originHeight = item.height;
			container.width = item.width;
			container.height = item.height;
			return;
		}

		let bestFitArea = null;
		let minCost = 10000000;
		let layoutVertical = false;
		const itemFitSize = {
			width: 0,
			height: 0,
		};
		const containerFitSize = {
			width: 0,
			height: 0,
		};
		const {sizeWeight, ratioWeight} = this.options;

		container.innerItem.forEach(v => {
			const containerSizeCost = getCost(v.getOriginSize(), v.getSize()) * sizeWeight;
			const containerRatioCost = getCost(v.getOriginRatio(), v.getRatio()) * ratioWeight;
			let cost;

			for (let i = 0; i < 2; ++i) {
				let itemWidth;
				let itemHeight;
				let containerWidth;
				let containerHeight;

				if (i === 0) {
					// 상하에 아이템 추가
					itemWidth = v.width;
					itemHeight = v.height * (item.height / (v.originHeight + item.height));
					containerWidth = v.width;
					containerHeight = v.height - itemHeight;
				} else {
					// 좌우에 아이템 추가
					itemHeight = v.height;
					itemWidth = v.width * (item.width / (v.originWidth + item.width));
					containerHeight = v.height;
					containerWidth = v.width - itemWidth;
				}

				const itemSize = itemWidth * itemHeight;
				const itemRatio = itemWidth / itemHeight;
				const containerSize = containerWidth * containerHeight;
				const containerRatio = containerHeight / containerHeight;

				cost = getCost(item.getSize(), itemSize) * sizeWeight;
				cost += getCost(item.getRatio(), itemRatio) * ratioWeight;
				cost += getCost(v.getOriginSize(), containerSize) * sizeWeight - containerSizeCost;
				cost += getCost(v.getOriginRatio(), containerRatio) * ratioWeight - containerRatioCost;

				if (cost === Math.min(cost, minCost)) {
					minCost = cost;
					bestFitArea = v;
					layoutVertical = (i === 0);
					itemFitSize.width = itemWidth;
					itemFitSize.height = itemHeight;
					containerFitSize.width = containerWidth;
					containerFitSize.height = containerHeight;
				}
			}
		});

		fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical);
	}
	_layout(items, outline = [], isAppend) {
		const style = this._style;
		const isHorizontal = this.options.horizontal;
		const aspectRatio = this.options.aspectRatio;
		const margin = this.options.margin;
		const pos1Name = style.pos1;
		const size1Name = style.size1;
		const containerWidth = this._size * (isHorizontal ? aspectRatio : 1);
		const containerHeight = this._size / (isHorizontal ? 1 : aspectRatio);
		const containerSize1 = isHorizontal ? containerWidth : containerHeight;
		const prevOutline = toZeroArray(outline);
		const start = isAppend ? Math.max(...prevOutline) :
			Math.min(...prevOutline) - containerSize1 - margin;
		const end = start + containerSize1 + margin;
		const container = new BoxModel({});

		let startIndex = -1;
		let endIndex = -1;
		let startPos = -1;
		let endPos = -1;

		items.forEach(item => {
			const model = new BoxModel({
				originWidth: item.orgSize.width,
				originHeight: item.orgSize.height,
				width: item.orgSize.width,
				height: item.orgSize.height,
			});

			this._findBestFitArea(container, model);
			container.pushItem(model);
			container.scaleTo(containerWidth + margin, containerHeight + margin);
		});
		items.forEach((item, i) => {
			const {left, top, width, height} = container.innerItem[i];

			item.rect = {top, left, width: width - margin, height: height - margin};
			item.rect[pos1Name] += start;

			if (startIndex === -1) {
				startIndex = i;
				endIndex = i;
				startPos = item.rect[pos1Name];
				endPos = startPos;
			}
			if (startPos > item.rect[pos1Name]) {
				startPos = item.rect[pos1Name];
				startIndex = i;
			}
			if (endPos < item.rect[pos1Name] + item.rect[size1Name] + margin) {
				endPos = item.rect[pos1Name] + item.rect[size1Name] + margin;
				endIndex = i;
			}
		});

		return {
			start: [start],
			end: [end],
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
	setSize(size) {
		this._size = size;
	}
}

export default PackingLayout;
