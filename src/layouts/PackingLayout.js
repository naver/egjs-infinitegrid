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
	item.setHeight(itemFitSize.height);
	item.setWidth(itemFitSize.width);
	bestFitArea.setHeight(containerFitSize.height);
	bestFitArea.setWidth(containerFitSize.width);

	if (layoutVertical) {
		item.setTop(bestFitArea.getTop() + bestFitArea.getHeight());
		item.setLeft(bestFitArea.getLeft());
	} else {
		item.setLeft(bestFitArea.getLeft() + bestFitArea.getWidth());
		item.setTop(bestFitArea.getTop());
	}
}

/**
 * @classdesc The PackingLayout is a layout that shows the important cards bigger without sacrificing the weight of the cards. Rows and columns are separated so that cards are dynamically placed within the horizontal and vertical space rather than arranged in an orderly fashion.
 * @ko PackingLayout은 카드의 본래 크기에 따른 비중을 해치지 않으면서 중요한 카드는 더 크게 보여 주는 레이아웃이다. 행과 열이 구분돼 이미지를 정돈되게 배치하는 대신 가로세로 일정 공간 내에서 동적으로 카드를 배치한다.
 * @class eg.InfiniteGrid.PackingLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.PackingLayout module <ko>eg.InfiniteGrid.PackingLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.aspectRatio=1] The aspect ratio of the group <ko> 그룹의 가로 세로 비 </ko>
 * @param {Boolean} [options.sizeWeight=1] The size weight when placing an image <ko> 이미지를 배치할 때 사이즈 가중치 </ko>
 * @param {Boolean} [options.ratioWeight=1] The ratio weight when placing an image <ko> 이미지를 배치할 때 비율 가중치 </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.PackingLayout, {
	margin: 10,
	aspectRatio: 1,
	sizeWeight: 1,
	ratioWeight: 2,
});

// or

var layout = new eg.InfiniteGrid.PackingLayout({
	horizontal: true,
	margin: 10,
	aspectRatio: 1,
	sizeWeight: 1,
	ratioWeight: 2,
});

</script>
```
 **/
class PackingLayout {
	constructor(options = {}) {
		this.options = assignOptions({
			aspectRatio: 1,
			sizeWeight: 1,
			ratioWeight: 1,
		}, options);
		this._size = 0;
		this._style = getStyleNames(this.options.horizontal);
	}
	_findBestFitArea(container, item) {
		if (container.getRatio() === 0) { // 아이템 최초 삽입시 전체영역 지정
			container.setOriginWidth(item.getWidth());
			container.setOriginHeight(item.getHeight());
			container.setWidth(item.getWidth());
			container.setHeight(item.getHeight());
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

		container.innerItem().forEach(v => {
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
					itemWidth = v.getWidth();
					itemHeight = v.getHeight() * (item.getHeight() / (v.getOriginHeight() + item.getHeight()));
					containerWidth = v.getWidth();
					containerHeight = v.getHeight() - itemHeight;
				} else {
					// 좌우에 아이템 추가
					itemHeight = v.getHeight();
					itemWidth = v.getWidth() * (item.getWidth() / (v.getOriginWidth() + item.getWidth()));
					containerHeight = v.getHeight();
					containerWidth = v.getWidth() - itemWidth;
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
			const boxItem = container.innerItem()[i];
			// console.log("boxItem", boxItem, boxItem instanceof BoxModel);
			const width = boxItem.getWidth();
			const height = boxItem.getHeight();
			const top = boxItem.getTop();
			const left = boxItem.getLeft();

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
	_insert(items = [], outline = [], type) {
		// this only needs the size of the item.
		const clone = items.map(item => Object.assign({}, item));

		return {
			items: clone,
			outlines: this._layout(clone, outline, type),
		};
	}
	/**
	 * Adds items at the bottom of a outline.
	 * @ko 아이템들을 아웃라인 아래에 추가한다.
	 * @method eg.InfiniteGrid.PackingLayout#append
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
	 * @method eg.InfiniteGrid.PackingLayout#prepend
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
	 * @method eg.InfiniteGrid.PackingLayout#layout
	 * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
	 * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
	 * @return {eg.InfiniteGrid.PackingLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * layout.layout(groups, [100, 200, 300, 400]);
	 */
	layout(groups = [], outline = []) {
		const length = groups.length;
		let point = outline;

		for (let i = 0; i < length; ++i) {
			const group = groups[i];

			point = this._layout(group.items, point, APPEND);
			group.outlines = point;
			point = point.end;
		}
		return this;
	}
	/**
	 * Set the viewport size of the layout.
	 * @ko 레이아웃의 가시 사이즈를 설정한다.
	 * @method eg.InfiniteGrid.PackingLayout#setSize
	 * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
	 * @return {eg.InfiniteGrid.PackingLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * layout.setSize(800);
	 */
	setSize(size) {
		this._size = size;
		return this;
	}
}

export default PackingLayout;
