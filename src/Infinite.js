import ItemManager from "./ItemManager";
import DOMRenderer from "./DOMRenderer";
import ImageLoaded from "./ImageLoaded";
import Watcher from "./Watcher";
import {
	APPEND,
	PREPEND,
	CACHE,
	NO_CACHE,
	IS_ANDROID2,
} from "./consts";

export default class Infinite {
	constructor(element, options, callback) {
		Object.assign(this.callback = {
			append: null,
			prepend: null,
			layoutComplete: null,
		}, callback);
		Object.assign(this.options = {
			itemSelector: "*",
			useRecycle: true,
			useCache: true,
			isOverflowScroll: false,
			widthAttr: "data-width",
			heightAttr: "data-height",
			threshold: 30,
			direction: "vertical", // @todo change const
			isEqualSize: false,
			defaultGroupKey: null,
		}, options);
		IS_ANDROID2 && (this.options.isOverflowScroll = false);
		this._isVertical = this.options.direction === "vertical";
		this._status = {
			isProcessing: false,
			startCursor: -1,
			endCursor: -1,
			start: null,
			end: null,
		};
		this._items = new ItemManager();
		this._renderer = new DOMRenderer(
			element,
			this.options.direction === "vertical",
			this.options.isOverflowScroll);
		this._watcher = new Watcher(
			this._renderer,
			{
				layout: () => this.layout(),
				check: param => this._onCheck(param),
			});
	}
	/**
	 * Adds a card element at the bottom of a grid layout. This method is available only if the isProcessing() method returns false.
	 * @ko 카드 엘리먼트를 그리드 레이아웃의 아래에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
	 * 이 메소드는 isProcessing()의 반환값이 false일 경우에만 사용 가능하다.
	 * @param {Array|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트의 배열</ko>
	 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 'undefined'로 설정된다</ko>
	 * @return {Number} The number of added card elements <ko>추가된 카드 엘리먼트의 개수</ko>
	 */
	append(elements, groupKey) {
		this._layout && this._insert(elements, groupKey, APPEND);
	}
	/**
	 * Adds a card element at the top of a grid layout. This method is available only if the isProcessing() method returns false and the isRecycling() method returns true.
	 * @ko 카드 엘리먼트를 그리드 레이아웃의 위에 추가한다. isProcessing() 메서드의 반환값이 'false'이고, isRecycling() 메서드의 반환값이 'true'일 때만 이 메서드를 사용할 수 있다
	 * @param {Array|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트 배열</ko>
	 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 'undefined'로 설정된다</ko>
	 * @return {Number} The number of added card elements <ko>추가된 카드 엘리먼트의 개수</ko>
	 */
	prepend(elements, groupKey) {
		this._layout && this._insert(elements, groupKey, PREPEND);
	}
	setLayout(LayoutKlass, options) {
		this._layout = new LayoutKlass(Object.assign(options || {}, {
			direction: this.options.direction,
		}));
		this._layout.setSize(this._renderer.getContainerSize());
	}
	getVisibleItems() {
		return this._items.pluck("items", this._status.startCursor, this._status.endCursor);
	}
	_getEdgeIndex(cursor) {
		const prop = cursor === "start" ? "min" : "max";
		let index = this._status[`${cursor}Cursor`];
		let targetValue = cursor === "start" ? Infinite : -Infinite;

		for (let i = this._status.startCursor; i <= this._status.endCursor; i++) {
			const value = Math[prop](...this._items.getOutline(i, cursor));

			if ((cursor === "start" && targetValue > value) ||
				(cursor === "end" && targetValue < value)) {
				targetValue = value;
				index = i;
			}
		}
		return index;
	}
	_getEdgePos(cursor) {
		return Math[cursor === "start" ? "min" : "max"](
			...this._items.pluck("outlines", this._getEdgeIndex(cursor))
				.reduce((acc, v) => acc.concat(v[cursor]), []));
	}
	_getEdge(cursor) {
		const dataIdx = this._getEdgeIndex(cursor);
		const items = this._items.pluck("items", dataIdx);

		if (items.length) {
			const itemIdx = this._items.getOutline(dataIdx, `${cursor}Index`);

			return items.length > itemIdx ? items[itemIdx] : null;
		}
		return null;
	}
	_updateEdge() {
		this._status.start = this._getEdge("start");
		this._status.end = this._getEdge("end");
		// console.warn("update edge", this._status);
	}
	_getEdgeOffset(cursor) {
		let rect = null;

		if (!this._status[cursor]) {
			const item = this._getEdge(cursor);

			this._status[cursor] = item;
		}

		if (this._status[cursor]) {
			rect = this._status[cursor].rect;
			if (cursor === "start") {
				rect.bottom = rect.top + this._status[cursor].size.height;
				rect.right = rect.left + this._status[cursor].size.width;
			}
		}
		return rect;
	}
	// called by visible
	_fit(scrollCycle = "after") {
		// for caching
		if (!this.options.useRecycle) {
			this._fit = () => {};
			return;
		}

		if (this._layout) {
			const base = this._getEdgePos("start");

			if (base !== 0) {
				scrollCycle === "before" && this._renderer.scrollBy(-Math.abs(base));
				this._items.fit(base, this._isVertical);
				DOMRenderer.renderItems(this.getVisibleItems());
				this._renderer.setContainerSize(this._getEdgePos("end"));
				scrollCycle === "after" && this._renderer.scrollBy(Math.abs(base));
			}
		}
	}
	/**
	 * Rearranges a layout.
	 * @ko 레이아웃을 다시 배치한다.
	 * @param {Boolean} [isRelayout=true] Indicates whether a card element is being relayouted <ko>카드 엘리먼트 재배치 여부</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 *
	 */
	layout(isRelayout = true) {
		if (!this._layout || this.isProcessing() || !this._items.size()) {
			return this;
		}
		this._status.isProcessing = true;
		let data;
		let outline;

		if (isRelayout) { // remove cache
			data = this._items.get(this._status.startCursor, this._status.endCursor);
			this._renderer.resize() &&
				data.forEach(v => {
					data.items = ItemManager.updateSize(v.items);
				});
		} else {
			data = this._items.get(this._status.startCursor, this._items.size());
			outline = this._items.getOutline(this._status.startCursor, "start");
		}
		if (!data.length) {
			return this;
		}
		this._layout.layout(data, outline);

		if (isRelayout) {
			this._items.set(data);
			this._status.startCursor = 0;
			this._status.endCursor = data.length - 1;
		} else {
			data.forEach(v => this._items.set(v, v.groupKey));
		}
		this._onLayoutComplete(data, true, true);
		DOMRenderer.renderItems(this.getVisibleItems());
		return this;
	}
	/**
	 * Removes a item element on a grid layout.
	 * @ko 그리드 레이아웃의 카드 엘리먼트를 삭제한다.
	 * @param {HTMLElement} item element to be removed <ko>삭제될 아이템 엘리먼트</ko>
	 * @return {Object}  Removed item element <ko>삭제된 아이템 엘리먼트 정보</ko>
	 */
	remove(element) {
		if (element) {
			const items = this._items.remove(element, this._status.startCursor, this._status
				.endCursor);

			if (items) {
				DOMRenderer.removeElement(element);
				return items;
			}
		}
		return null;
	}
	_getItems(isAppend) {
		let items = [];
		const size = this._items.size();

		// from cache
		if (size > 0 && this._status.startCursor !== -1 && this._status.endCursor !==
			-1) {
			if (isAppend && size > this._status.endCursor + 1) {
				items = this._items.pluck("items", this._status.endCursor + 1);
			} else if (!isAppend && this._status.startCursor > 0) {
				items = this._items.pluck("items", this._status.startCursor - 1);
			}
		}
		return items;
	}
	clear() {
		this._items.clear();
		this._renderer.clear();
		this._status = {
			isProcessing: false,
			startCursor: -1,
			endCursor: -1,
			start: null,
			end: null,
		};
	}
	/**
	 * Checks whether a card element is being added.
	 * @ko 카드 엘리먼트 추가가 진행 중인지 확인한다
	 * @return {Boolean} Indicates whether a card element is being added <ko>카드 엘리먼트 추가 진행 중 여부</ko>
	 */
	isProcessing() {
		return this._status.isProcessing;
	}
	_insert(elements, groupKey, isAppend) {
		if (this.isProcessing() || elements.length === 0) {
			return;
		}
		this._status.isProcessing = true;
		const key = typeof groupKey === "undefined" ? (new Date().getTime() + Math
			.floor(
				Math.random() * 1000)) : groupKey;

		const items = ItemManager.from(elements, this.options.itemSelector, {
			isAppend,
			groupKey: key,
			maxCount: this.options.count,
		});

		if (!items.length) {
			return;
		}
		this._recycle(items, isAppend);
		this._afterRecycle(NO_CACHE, items, isAppend);
	}

	// add items, and remove items for recycling
	_recycle(items, isAppend) {
		// const basicSize = this._renderer.getViewSize() + (2 * this.options.threshold);

		const baseCount = items.length - this.options.count;
		/* eslint-disable no-unused-vars */
		let diff;
		/* eslint-enable no-unused-vars */

		while ((diff = this.getVisibleItems().length + baseCount) > 0) {
			const toRemoveItems = this._items.pluck("items", isAppend ? this._status.startCursor :
				this._status.endCursor);

			if (isAppend) {
				this._status.startCursor++;
			} else {
				this._status.endCursor--;
			}
			// recycle
			DOMRenderer.removeItems(toRemoveItems);
		}
		console.warn("recycle [", this._status.startCursor, this._status.endCursor, "]");
	}
	_updateCursor(isAppend) {
		if (isAppend) {
			this._status.endCursor++;
		} else if (this._status.startCursor > 0) {
			this._status.startCursor--;
		} else {
			this._status.endCursor++; // outside prepend
		}
		if (this._status.startCursor < 0) {
			this._status.startCursor = 0;
		}
		console.warn("_updateCursor [", this._status.startCursor, this._status.endCursor,
			"]");
	}
	_insertItems(layouted, isAppend) {
		layouted.groupKey = layouted.items[0].groupKey;
		this._items[isAppend ? "append" : "prepend"](layouted);
	}
	// called by visible
	_requestAppend() {
		const items = this._getItems(APPEND);

		if (items.length) {
			this._recycle(items, APPEND);
			this._afterRecycle(CACHE, items, APPEND);
		} else {
			this.callback.append && this.callback.append();
		}
	}
	// called by visible
	_requestPrepend() {
		const items = this._getItems(PREPEND);

		if (items.length) {
			this._recycle(items, PREPEND);
			this._afterRecycle(CACHE, items, PREPEND);
		} else {
			this.callback.prepend && this.callback.prepend();
		}
	}
	_afterRecycle(fromCache, items, isAppend) {
		if (fromCache) {
			this._renderer.createAndInsert(items, isAppend);
			this._onLayoutComplete(items, isAppend);
		} else {
			const method = isAppend ? "append" : "prepend";

			this._renderer[method](items);
			// check image sizes after elements are attated on DOM
			ImageLoaded.check(items.map(item => item.el), {
				widthAttr: this.options.widthAttr,
				heightAttr: this.options.heightAttr,
				callback: () => {
					const layouted = this._layout[method](
						ItemManager.updateSize(items),
						this._items.getOutline(
							isAppend ? this._status.endCursor : this._status.startCursor,
							isAppend ? "end" : "start")
					);

					this._insertItems(layouted, isAppend);
					DOMRenderer.renderItems(layouted.items);
					this._onLayoutComplete(items, isAppend);
				},
			});
		}
	}
	_onCheck({cursor, scrollPos, isVertical}) {
		if (this.isProcessing()) {
			return;
		}
		const rect = this._getEdgeOffset(cursor);
		const isAppend = cursor === "end";

		if (!rect) {
			return;
		}
		const targetPos = isAppend ?
			rect[isVertical ? "top" : "left"] - this._renderer.getViewSize() :
			rect[isVertical ? "bottom" : "right"];

		if (isAppend) {
			if (scrollPos >= targetPos) {
				console.trace("append");
				this._requestAppend();
			}
		} else if (scrollPos <= targetPos) {
			this._fit("before");
			this._requestPrepend();
		}
	}
	_onLayoutComplete(items, isAppend, dontcareCursor) {
		!dontcareCursor && this._updateCursor(isAppend);
		this._updateEdge();
		this._renderer.setContainerSize(this._getEdgePos("end"));
		!isAppend && this._fit("after");
		this._status.isProcessing = false;
		/**
		 * This event is fired when layout is successfully arranged through a call to the append(), prepend(), or layout() method.
		 * @ko 레이아웃 배치가 완료됐을 때 발생하는 이벤트. append() 메서드나 prepend() 메서드, layout() 메서드 호출 후 카드의 배치가 완료됐을 때 발생한다
		 * @event eg.InfiniteGrid#layoutComplete
		 *
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {Array} param.target Rearranged card elements<ko>재배치된 카드 엘리먼트들</ko>
		 * @param {Boolean} param.isAppend Checks whether the append() method is used to add a card element. It returns true even though the layoutComplete event is fired after the layout() method is called. <ko>카드 엘리먼트가 append() 메서드로 추가됐는지 확인한다. layout() 메서드가 호출된 후 layoutComplete 이벤트가 발생해도 'true'를 반환한다.</ko>
		 * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
		 */
		this.callback.layoutComplete && this.callback.layoutComplete({
			target: items.concat(),
			isAppend,
			// isTrusted: options.isTrusted,
		});
	}
	/**
	 * Destroys elements, properties, and events used on a grid layout.
	 * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
	 */
	destroy() {
		this._status.startCursor = -1;
		this._status.endCursor = -1;
		this._items.clear();
		this._renderer.destroy();
	}
}
