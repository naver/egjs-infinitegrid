import Component from "@egjs/component";
import ItemManager from "./ItemManager";
import DOMRenderer from "./DOMRenderer";
import ImageLoaded from "./ImageLoaded";

import GridLayout from "./layouts/GridLayout";
import FrameLayout from "./layouts/FrameLayout";
import SquareLayout from "./layouts/SquareLayout";
import PackingLayout from "./layouts/PackingLayout";
import JustifiedLayout from "./layouts/JustifiedLayout";

import {
	APPEND,
	PREPEND,
	CACHE,
	NO_CACHE,
} from "./consts";
import {
	$,
	addEvent,
	removeEvent,
	innerHeight,
	innerWidth,
} from "./utils";

export {JustifiedLayout, GridLayout, FrameLayout, SquareLayout, PackingLayout};

export class Infinite extends Component {
	constructor(element, options) {
		super();
		Object.assign(this.options = {
			itemSelector: "*",
			count: 60,
			widthAttr: "data-width",
			heightAttr: "data-height",
			isOverflowScroll: false,
			direction: "vertical",	// @todo change const
		}, options);
		this._startCursor = -1;
		this._endCursor = -1;
		// this._status = {
		// 	// isProcessing: false,
		// 	// prevScrollTop: 0,
		// 	// topElement: null,
		// 	// bottomElement: null,
		// };
		// this._timer = {
		// 	resize: null,
		// 	// doubleCheck: null,
		// 	// doubleCheckCount: RETRY,
		// };

		this._items = new ItemManager();
		this._renderer = new DOMRenderer(
			element,
			this.options.direction === "vertical",
			this.options.isOverflowScroll);
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
		this._layout = new LayoutKlass(Object.assign(options, {
			direction: this.options.direction,
		}));
		this._layout.setSize(this._renderer.getSize());
	}
	getVisibleItems() {
		return this._items.pluck("items", this._startCursor, this._endCursor);
	}
	getVisibleOutline(cursor) {
		return this._items.pluck("outlines", this[`_${cursor}Cursor`]);
	}
	_getSize(cursor) {
		return Math[cursor === "start" ? "min" : "max"](...this.getVisibleOutline(cursor)
			.reduce((acc, v) => acc.concat(v[cursor]), []));
	}
	// called by visible
	_fit() {
		let base = 0;

		if (this._layout) {
			base = this._getSize("start");

			if (base !== 0) {
				this._items.fit(base, this._layout.options.direction === "vertical");
				DOMRenderer.renderItems(this.getVisibleItems());
				this._renderer.setSize(this._getSize("end"));
			}
		}

		// base 값만큼 fit 전의 scroll 포지션 값을 바꿈.
		// scrollTop -= croppedDistance;
		return base;
	}
	/**
	 * Rearranges a layout.
	 * @ko 레이아웃을 다시 배치한다.
	 * @param {Boolean} [isRelayout=true] Indicates whether a card element is being relayouted <ko>카드 엘리먼트 재배치 여부</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 *
	 */	
	layout(isRelayout = true) {
		if (!this._layout) {
			return this;
		}
		let data;
		let outline;

		if (isRelayout) { // remove cache
			data = this._items.get(this._startCursor, this._endCursor);
			this._renderer.resize() &&
				data.forEach(v => {
					data.items = ItemManager.updateSize(v.items);
				});
		} else {
			data = this._items.get(this._startCursor, this._items.size());
			outline = this._items.getOutline(this._startCursor, "start");
		}
		if (!data.length) {
			return this;
		}
		this._layout.layout(data, outline);

		if (isRelayout) {
			this._items.set(data);
			this._startCursor = 0;
			this._endCursor = data.length - 1;
		} else {
			data.forEach(v => this._items.set(v, v.groupKey));
		}
		DOMRenderer.renderItems(this.getVisibleItems());
		this._renderer.setSize(this._getSize("end"));
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
			const items = this._items.remove(element, this._startCursor, this._endCursor);

			items && DOMRenderer.removeElement(element);
		}
	}
	getItems(isAppend) {
		let items = [];
		const size = this._items.size();

		// from cache
		if (size > 0 && this._startCursor !== -1 && this._endCursor !== -1) {
			if (isAppend && size > this._endCursor + 1) {
				items = this._items.pluck("items", this._endCursor + 1);
			} else if (!isAppend && this._startCursor > 0) {
				items = this._items.pluck("items", this._startCursor - 1);
			}
		}
		return items;
	}
	clear() {
		this._items.clear();
		this._renderer.clear();
		this._startCursor = -1;
		this._endCursor = -1;
	}
	_insert(elements, groupKey, isAppend) {
		const key = typeof groupKey === "undefined" ? (new Date().getTime() + Math.floor(
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
		const baseCount = items.length - this.options.count;
		/* eslint-disable no-unused-vars */
		let diff;
		/* eslint-enable no-unused-vars */

		while ((diff = this.getVisibleItems().length + baseCount) > 0) {
			const toRemoveItems = this._items.pluck("items", isAppend ? this._startCursor : this._endCursor);

			if (isAppend) {
				this._startCursor++;
			} else {
				this._endCursor--;
			}
			// recycle
			DOMRenderer.removeItems(toRemoveItems);
		}
		console.warn("recycle [", this._startCursor, this._endCursor, "]");
	}
	_updateCursor(isAppend) {
		if (isAppend) {
			this._endCursor++;
		} else if (this._startCursor > 0) {
			this._startCursor--;
		} else {
			this._endCursor++; // outside prepend
		}
		if (this._startCursor < 0) {
			this._startCursor = 0;
		}
		console.warn("_updateCursor [", this._startCursor, this._endCursor, "]");
	}
	_insertItems(layouted, isAppend) {
		layouted.groupKey = layouted.items[0].groupKey;
		this._items[isAppend ? "append" : "prepend"](layouted);
	}
	// called by visible
	_requestAppend() {
		const items = this.getItems(APPEND);

		if (items.length) {
			this._recycle(items, APPEND);
			this._afterRecycle(CACHE, items, APPEND);
		} else {
			this.trigger("append");
		}
	}
	// called by visible
	_requestPrepend() {
		const items = this.getItems(PREPEND);

		if (items.length) {
			this._recycle(items, PREPEND);
			this._afterRecycle(CACHE, items, PREPEND);
		} else {
			this.trigger("prepend");
		}
	}
	_afterRecycle(fromCache, items, isAppend) {
		if (fromCache) {
			console.log("이건 캐싱");
			this._renderer.createAndInsert(items, isAppend);
			this._updateCursor(isAppend);
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
							isAppend ? this._endCursor : this._startCursor,
							isAppend ? "end" : "start")
					);

					this._insertItems(layouted, isAppend);
					this._updateCursor(isAppend);
					DOMRenderer.renderItems(layouted.items);
					this._renderer.setSize(this._getSize("end"));
				},
			});
		}
	}
	/**
	 * Destroys elements, properties, and events used on a grid layout.
	 * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
	 */
	destroy() {
		// this._reset();
	}
}
