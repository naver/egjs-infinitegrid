const BoxModel = require("./BoxModel.js");

module.exports = class PackingLayout extends eg.Component {
	constructor(customOption) {
		super();

		const defaultOption = {
			containerSelector: "._layout",
			itemSelector: "._item",
			containerWidth: 1000,
			containerHeight: 1000,
			sort: true,
			sizeWeight: 1,
			ratioWeight: 1,
		};

		this.option(defaultOption);
		this.option(customOption || {});

		this._initVars();
		this._layoutBox();
		this._drawBox();
	}

	_initVars() {
		this._$item = $(this.option("itemSelector"), this.option("containerSelector"));

		this._itemList = [];

		this._$item.each((i, v) => {
			$(v).attr("style", "");
			const $img = $(v).find("img")
				.attr("style", "");
			const width = $img.width();
			const height = $img.height();

			this._itemList.push(new BoxModel({
				originWidth: width,
				originHeight: height,
				width,
				height,
				item: $(v),
			}));
		});

		if (this.option("sort")) {
			this._itemList.sort((a, b) => b.width * b.height - a.width * a.height);
		}

		this._container = new BoxModel({
			width: 0,
			height: 0,
			left: 0,
			top: 0,
		});
	}

	_layoutBox() {
		this._itemList.forEach(item => {
			this._findBestFitArea(item);
			this._container.pushItem(item);
			this._container.scaleTo(this.option("containerWidth"), this.option("containerHeight"));
		});
	}

	_findBestFitArea(item) {
		if (this._container.getRatio() === 0) { // 아이템 최초 삽입시 전체영역 지정
			this._container.originWidth = item.width;
			this._container.originHeight = item.height;
			this._container.width = item.width;
			this._container.height = item.height;
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

		this._container.innerItem.forEach(v => {
			const containerSizeCost = PackingLayout.cost(v.getOriginSize(), v.getSize()) * this.option("sizeWeight");
			const containerRatioCost = PackingLayout.cost(v.getOriginRatio(), v.getRatio()) * this.option("ratioWeight");
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

				cost = PackingLayout.cost(item.getSize(), itemSize) * this.option("sizeWeight");
				cost += PackingLayout.cost(item.getRatio(), itemRatio) * this.option("ratioWeight");
				cost += PackingLayout.cost(v.getOriginSize(), containerSize) * this.option("sizeWeight") - containerSizeCost;
				cost += PackingLayout.cost(v.getOriginRatio(), containerRatio) * this.option("ratioWeight") - containerRatioCost;

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

		PackingLayout.fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical);
	}

	static fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical) {
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

	static cost(originLength, length) {
		let cost = originLength / length;

		if (cost < 1) {
			cost = 1 / cost;
		}

		return cost - 1;
	}

	_drawBox() {
		let sum1 = 0;
		let sum2 = 0;

		this._itemList.forEach((v, i) => {
			const $img = v.item.find("img");
			const width = $img.width();
			const height = $img.height();
			const imgRatio = width / height;

			v.item.find("._text").text(i + 1);
			v.item.css({
				position: "absolute",
				top: v.top,
				left: v.left,
				width: v.width,
				height: v.height,
			})
				.attr("data-order", i + 1);

			if (imgRatio >= v.width / v.height) { // 가로비가 줄었을 경우
				$img.css("height", "100%");
				$img.css("marginLeft", -($img.width() - v.width) / 2);
			} else { // 가로비가 늘었을 경우
				$img.css("width", "100%");
				$img.css("marginTop", -($img.height() - v.height) / 2);
			}

			sum1 += PackingLayout.cost(v.originWidth, v.width);
			sum1 += PackingLayout.cost(v.originHeight, v.height);
			sum2 += PackingLayout.cost(v.getRatio(), v.getOriginRatio());
		});

		const average1 = Math.round(sum1 / (this._itemList.length * 2) * 100);
		const average2 = Math.round(sum2 / (this._itemList.length) * 100);

		$("._info").html(`사이즈 왜곡 평균: ${average1}%<br />비율 왜곡 평균: ${average2}%`);
	}

	layout() {
		this._initVars();
		this._layoutBox();
		this._drawBox();
		// this._drawSpace();

		return this._containerHeight * this._gridSize;
	}
};
