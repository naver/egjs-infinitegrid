/**
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
*/
import Component from "@egjs/component";
import ItemManager from "./ItemManager";
import DOMRenderer from "./DOMRenderer";
import ImageLoaded from "./ImageLoaded";
import Watcher from "./Watcher";

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
	TRUSTED,
	NO_TRUSTED,
	IS_ANDROID2,
} from "./consts";

// IE8
// https://stackoverflow.com/questions/43216659/babel-ie8-inherit-issue-with-object-create
/* eslint-disable */
if (typeof Object.create !== "function") {
	Object.create = function (o, properties) {
		if (typeof o !== "object" && typeof o !== "function") {
			throw new TypeError("Object prototype may only be an Object: " + o);
		} else if (o === null) {
			throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
/* eslint-enable */


/**
 * A module used to arrange card elements including content infinitely on a grid layout. With this module, you can implement a grid-pattern user interface composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko 콘텐츠가 있는 카드 엘리먼트를 그리드 레이아웃에 무한으로 배치하는 모듈. 다양한 크기의 카드 엘리먼트를 격자 모양으로 배치하는 UI를 만들 수 있다. 카드 엘리먼트의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
 * @alias eg.InfiniteGrid
 * @extends eg.Component
 *
 * @example
```
<ul id="grid">
	<li class="card">
		<div>test1</div>
	</li>
	<li class="card">
		<div>test2</div>
	</li>
	<li class="card">
		<div>test3</div>
	</li>
	<li class="card">
		<div>test4</div>
	</li>
	<li class="card">
		<div>test5</div>
	</li>
	<li class="card">
		<div>test6</div>
	</li>
</ul>
<script>
var some = new eg.InfiniteGrid("#grid").on("layoutComplete", function(e) {
	// ...
});
</script>
```
 *
 * @support {"ie": "8+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 **/
class InfiniteGrid extends Component {
	/**
	 * @param {HTMLElement|String|jQuery} element A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
	 * @param {Object} [options] The option object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
	 * @param {String} [options.itemSelector] A selector to select card elements that make up the layout<ko>레이아웃을 구성하는 카드 엘리먼트를 선택할 선택자(selector)</ko>
	 * @param {Boolean} [options.useRecycle=true]
	 * @param {Boolean} [options.isOverflowScroll=false] Indicates whether overflow:scroll is applied<ko>overflow:scroll 적용여부를 결정한다.</ko>
	 * @param {String} [options.direction="vertical"]
	 * @param {String} [options.widthAttr="data-width"]
	 * @param {String} [options.heightAttr="data-height"]
	 * @param {Boolean} [options.isEqualSize=false] Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved. <ko>카드 엘리먼트의 크기가 동일한지 여부. 배치될 카드 엘리먼트의 크기가 모두 동일할 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
	 * @param {Number} [options.threshold=300] The threshold size of an event area where card elements are added to a layout.<br>- append event: If the current vertical position of the scroll bar is greater than "the bottom property value of the card element at the top of the layout" plus "the value of the threshold option", the append event will occur.<br>- prepend event: If the current vertical position of the scroll bar is less than "the bottom property value of the card element at the top of the layout" minus "the value of the threshold option", the prepend event will occur. <ko>−	레이아웃에 카드 엘리먼트를 추가하는 이벤트가 발생하는 기준 영역의 크기.<br>- append 이벤트: 현재 스크롤의 y 좌표 값이 '레이아웃의 맨 아래에 있는 카드 엘리먼트의 top 속성의 값 + threshold 옵션의 값'보다 크면 append 이벤트가 발생한다.<br>- prepend 이벤트: 현재 스크롤의 y 좌표 값이 '레이아웃의 맨 위에 있는 카드 엘리먼트의 bottom 속성의 값 - threshold 옵션의 값'보다 작으면 prepend 이벤트가 발생한다</ko>
	 *
	 */
	constructor(element, options) {
		super();
		Object.assign(this.options = {
			itemSelector: "*",
			isOverflowScroll: false,
			threshold: 300,
			isEqualSize: false,
			useRecycle: true,
			direction: "vertical", // @todo change const
		}, options);
		IS_ANDROID2 && (this.options.isOverflowScroll = false);
		this._isVertical = this.options.direction === "vertical";
		this._reset();
		this._items = new ItemManager();
		this._renderer = new DOMRenderer(element, {
			isOverflowScroll: this.options.isOverflowScroll,
			isEqualSize: this.options.isEqualSize,
			isVertical: this.options.direction === "vertical",
		});
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
	/**
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	setLayout(LayoutKlass, options) {
		this._layout = new LayoutKlass(Object.assign(options || {}, {
			direction: this.options.direction,
		}));
		this._layout.setSize(this._renderer.getContainerSize());
		return this;
	}
	getItems(includeCached = false) {
		return this[includeCached ? "_getItems" : "__getVisibleItems"]();
	}
	_getItems() {
		return this._items.pluck("items", 0, this._items.size());
	}
	_getVisibleItems() {
		return this._items.pluck("items", this._status.startCursor, this._status.endCursor);
	}
	_updateEdge() {
		this._status.start = this._items.getEdge("start", this._status.startCursor, this._status.endCursor);
		this._status.end = this._items.getEdge("end", this._status.startCursor, this._status.endCursor);
	}
	_getEdgeOffset(cursor) {
		let rect = null;

		if (!this._status[cursor]) {
			const item = this._items.getEdge(cursor);

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
			const base = this._getEdgeValue("start");

			if (base !== 0) {
				if (scrollCycle === "before") {
					this._renderer.scrollBy(-Math.abs(base));
					this._watcher.setScrollPos();
				}
				this._items.fit(base, this._isVertical);
				DOMRenderer.renderItems(this._getVisibleItems());
				this._renderer.setContainerSize(this._getEdgeValue("end"));
				if (scrollCycle === "after") {
					this._renderer.scrollBy(Math.abs(base));
					this._watcher.setScrollPos();
				}
			}
		}
	}
	_getEdgeValue(cursor) {
		return this._items.getEdgeValue(cursor, this._status.startCursor, this._status.endCursor);
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
			if (this._renderer.resize()) {
				this._layout.setSize(this._renderer.getContainerSize());
				data.forEach(v => {
					data.items = this._renderer.updateSize(v.items);
				});
			}
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
		this._onLayoutComplete(data, APPEND, NO_TRUSTED);
		DOMRenderer.renderItems(this._getVisibleItems());
		isRelayout && this._watcher.setScrollPos();

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
	_getNextItems(isAppend) {
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
	/**
	 * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, it returns undefined as a group key.
	 * @ko 현재 유지하고 있는 카드 엘리먼트의 그룹 키 목록을 반환한다. 여러 개의 카드 엘리먼트를 묶어서 관리할 수 있도록 append() 메서드나 prepend() 메서드에서 그룹 키를 지정할 수 있다. append() 메서드나 prepend() 메서드에서 그룹 키를 지정하지 않았다면 'undefined'가 그룹 키로 반환된다
	 * @return {Array} List of group keys <ko>그룹 키의 목록</ko>
	 */
	getGroupKeys(includeCached) {
		const data = includeCached ?
			this._items.get() : this._items.get(this._status.startCursor, this._status.endCursor);

		return data.map(v => v.groupKey);
	}
	/**
	 * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
	 * @ko 카드의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
	 * @return {Object} State object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
	 */
	getStatus() {
		return {
			options: Object.assign({}, this.options),
			_status: Object.assign({}, this._status),
			_items: this._items.getStatus(),
			_renderer: this._renderer.getStatus(),
			_watcher: this._watcher.getStatus(),
		};
	}
	/**
	 * Sets the state of the eg.InfiniteGrid module with the information returned through a call to the getStatue() method.
	 * @ko getStatue() 메서드가 저장한 정보로 eg.InfiniteGrid 모듈의 상태를 설정한다.
	 * @param {Object} status State object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
	 * @param {boolean} applyScrollPos Checks whether to scroll<ko>스크롤의 위치를 복원할지 결정한다.</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	setStatus(status, applyScrollPos) {
		if (!status || !status.options || !status._status ||
			!status._renderer || !status._items || !status._watcher) {
			return this;
		}
		this._watcher.detachEvent();
		Object.assign(this.options, status.options);
		Object.assign(this._status, status._status);
		this._items.setStatus(status._items, this._status.startCursor, this._status.endCursor);
		this._renderer.setStatus(status._renderer, this._getVisibleItems());
		this._watcher.setStatus(status._watcher, applyScrollPos);
		this._updateEdge();
		this._watcher.attachEvent();
		return this;
	}
	/**
	 * Clears added card elements and data.
	 * @ko 추가된 카드 엘리먼트와 데이터를 모두 지운다.
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	clear() {
		this._items.clear();
		this._renderer.clear();
		this._reset();
		return this;
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
		});

		if (!items.length) {
			return;
		}
		this._postLayout(NO_CACHE, items, isAppend, NO_TRUSTED);
	}
	// add items, and remove items for recycling
	_recycle(isAppend) {
		const remove = [];

		for (let i = this._status.startCursor; i <= this._status.endCursor; i++) {
			remove.push(this._isVisible(i));
		}
		let start = remove.indexOf(isAppend ? 1 : -1);
		let end = remove.lastIndexOf(isAppend ? 1 : -1);

		if (start !== -1 && end !== -1) {
			start = this._status.startCursor + start;
			end = start + end;
			DOMRenderer.removeItems(this._items.pluck("items", start, end));
			if (isAppend) {
				this._status.startCursor = end + 1;
			} else {
				this._status.endCursor = start - 1;
			}
		}
	}

	_postLayout(fromCache, items, isAppend, isTrusted) {
		if (fromCache) {
			this._renderer.createAndInsert(items, isAppend);
			this._updateCursor(isAppend);
			this.options.useRecycle && this._recycle(isAppend);
			this._onLayoutComplete(items, isAppend, isTrusted);
		} else {
			const method = isAppend ? "append" : "prepend";

			this._renderer[method](items);
			// check image sizes after elements are attated on DOM
			ImageLoaded.check(items.map(item => item.el),
				() => {
					const layouted = this._layout[method](
						this._renderer.updateSize(items),
						this._items.getOutline(
							isAppend ? this._status.endCursor : this._status.startCursor,
							isAppend ? "end" : "start")
					);

					this._insertItems(layouted, isAppend);
					this._updateCursor(isAppend);
					this.options.useRecycle && this._recycle(isAppend);
					DOMRenderer.renderItems(layouted.items);
					this._onLayoutComplete(layouted.items, isAppend, isTrusted);
				}
			);
		}
	}
	_isVisible(index) {
		const min = Math.min(...this._items.getOutline(index, "start"));
		const max = Math.max(...this._items.getOutline(index, "end"));
		const pos = this._watcher.getScrollPos();
		const viewSize = this._renderer.getViewSize();

		if (pos + viewSize + this.options.threshold < min) {
			return -1;
		} else if (pos - this.options.threshold > max) {
			return 1;
		}
		return 0;
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
	}
	_insertItems(layouted, isAppend) {
		layouted.groupKey = layouted.items[0].groupKey;
		this._items[isAppend ? "append" : "prepend"](layouted);
	}
	// called by visible
	_requestAppend() {
		const items = this._getNextItems(APPEND);

		if (items.length) {
			this._postLayout(CACHE, items, APPEND, TRUSTED);
		} else {
			this.trigger("append");
		}
	}
	// called by visible
	_requestPrepend() {
		const items = this._getNextItems(PREPEND);

		if (items.length) {
			this._postLayout(CACHE, items, PREPEND, TRUSTED);
		} else {
			this.trigger("prepend");
		}
	}
	_onCheck({direction, scrollPos, isVertical, orgScrollPos}) {
		this.trigger("chagne", {
			direction,
			scrollPos,
			orgScrollPos,
			isVertical,
		});
		if (this.isProcessing()) {
			return;
		}
		const rect = this._getEdgeOffset(direction);
		const isGoToEnd = direction === "end";

		if (!rect) {
			return;
		}
		const targetPos = isGoToEnd ?
			rect[isVertical ? "top" : "left"] - this._renderer.getViewSize() :
			rect[isVertical ? "bottom" : "right"];

		if (isGoToEnd) {
			if (scrollPos >= targetPos) {
				this._requestAppend();
			}
		} else if (scrollPos <= targetPos) {
			this._fit("before");
			this._requestPrepend();
		}
	}
	_onLayoutComplete(items, isAppend, isTrusted = false) {
		this._updateEdge();
		this._renderer.setContainerSize(this._getEdgeValue("end"));
		!isAppend && this._fit("after");
		this._status.isProcessing = false;
		this.trigger("layoutComplete", {
			target: items.concat(),
			isAppend,
			isTrusted,
		});
		// console.warn("_onLayoutComplete [", this._status.startCursor, this._status.endCursor, "]");
	}
	_reset() {
		this._status = {
			isProcessing: false,
			startCursor: -1,
			endCursor: -1,
			start: null,
			end: null,
		};
	}
	/**
	 * Destroys elements, properties, and events used on a grid layout.
	 * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
	 */
	destroy() {
		this.off();
		this._watcher.destroy();
		this._reset();
		this._items.clear();
		this._renderer.destroy();
	}
}

InfiniteGrid.VERSION = "#__VERSION__#";
InfiniteGrid.GridLayout = GridLayout;
InfiniteGrid.FrameLayout = FrameLayout;
InfiniteGrid.SquareLayout = SquareLayout;
InfiniteGrid.PackingLayout = PackingLayout;
InfiniteGrid.JustifiedLayout = JustifiedLayout;

export default InfiniteGrid;
