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
import {toArray, $} from "./utils";

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
 * A module used to arrange card elements including content infinitely according to layout type. With this module, you can implement various layouts composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko 콘텐츠가 있는 카드 엘리먼트를 레이아웃 타입에 따라 무한으로 배치하는 모듈. 다양한 크기의 카드 엘리먼트를 다양한 레이아웃으로 배치할 수 있다. 카드 엘리먼트의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
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
	 * @param {Boolean} [options.useRecycle=true] Indicates whether keep the number of DOMs is maintained. If the useRecycle value is 'true', keep the number of DOMs is maintained. If the useRecycle value is 'false', the number of DOMs will increase as card elements are added. <ko>DOM의 수를 유지할지 여부를 나타낸다. useRecycle 값이 'true'이면 DOM 개수를 일정하게 유지한다. useRecycle 값이 'false' 이면 카드 엘리먼트가 추가될수록 DOM 개수가 계속 증가한다.</ko>
	 * @param {Boolean} [options.isOverflowScroll=false] Indicates whether overflow:scroll is applied<ko>overflow:scroll 적용여부를 결정한다.</ko>
	 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (true: horizontal, false: vertical) <ko>스크롤 이동 방향 (true 가로방향, false 세로방향</ko>
	 * @param {Boolean} [options.isEqualSize=false] Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved. <ko>카드 엘리먼트의 크기가 동일한지 여부. 배치될 카드 엘리먼트의 크기가 모두 동일할 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
	 * @param {Number} [options.threshold=300] The threshold size of an event area where card elements are added to a layout.<ko>레이아웃에 카드 엘리먼트를 추가하는 이벤트가 발생하는 기준 영역의 크기.</ko>
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
			horizontal: false,
		}, options);
		IS_ANDROID2 && (this.options.isOverflowScroll = false);
		this._isVertical = !this.options.horizontal;
		this._reset();
		this._items = new ItemManager();
		this._renderer = new DOMRenderer(element, {
			isOverflowScroll: this.options.isOverflowScroll,
			isEqualSize: this.options.isEqualSize,
			isVertical: this._isVertical,
		});
		this._watcher = new Watcher(
			this._renderer,
			{
				layout: () => this.layout(),
				check: param => this._onCheck(param),
			});
	}
	/**
	 * Adds a card element at the bottom of a layout. This method is available only if the isProcessing() method returns false.
	 * @ko 카드 엘리먼트를 레이아웃 아래에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
	 * 이 메소드는 isProcessing()의 반환값이 false일 경우에만 사용 가능하다.
	 * @param {Array|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트의 배열</ko>
	 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is automatically generated by default.
	 * <ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * infinitegrid.append("&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
	 * infinitegrid.append(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
	 * infinitegrid.append([HTMLElement1, HTMLElement2]);
	 * infinitegrid.append(jQuery(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]));
	 */
	append(elements, groupKey) {
		this._layout && this._insert(elements, APPEND, groupKey);
		return this;
	}
	/**
	 * Adds a card element at the top of a layout. This method is available only if the isProcessing() method returns false.
	 * @ko 카드 엘리먼트를 레이아웃의 위에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
	 * @param {Array|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트 배열</ko>
	 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is automatically generated by default.
	 * <ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * infinitegrid.prepend("&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
	 * infinitegrid.prepend(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
	 * infinitegrid.prepend([HTMLElement1, HTMLElement2]);
	 * infinitegrid.prepend(jQuery(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]));
	 */
	prepend(elements, groupKey) {
		this._layout && this._insert(elements, PREPEND, groupKey);
		return this;
	}
	/**
	 * Specifies the Layout class to use.
	 * @ko 사용할 Layout 클래스를 지정한다.
	 * @param {Class} LayoutKlass The Layout class to use <ko>사용할 Layout 클래스</ko>
	 * @param {Object} options Options to apply to the Layout.<ko>Layout에 적용할 옵션</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * infinitegrid.setLayout(eg.InfiniteGrid.GridLayout, {
	 *  margin: 10,
	 *  align: "start"
	 * });
   * infinitegrid.setLayout(eg.InfiniteGrid.JustifiedLayout, {
	 *  margin: 10,
	 *  minSize: 100,
	 *  maxSize: 200
	 * });
   * infinitegrid.setLayout(eg.InfiniteGrid.SquareLayout, {
	 *  margin: 10,
	 *  column: 2
	 * });
	 * infinitegrid.setLayout(eg.InfiniteGrid.FrameLayout, {
	 *  margin: 10,
	 *  frame: [
	 *   [1, 2],
   *   [4, 3],
	 *  ]
	 * });
	 * infinitegrid.setLayout(eg.InfiniteGrid.PackingLayout, {
	 *  margin: 10,
	 *  aspectRatio: 1.5
	 * });
	 */
	setLayout(LayoutKlass, options) {
		this._layout = new LayoutKlass(Object.assign(options || {}, {
			direction: this._isVertical ? "vertical" : "horizontal",
		}));
		this._layout.setSize(this._renderer.getContainerSize());
		return this;
	}
	/**
	 * Returns the layouted items.
	 * @ko 레이아웃된 아이템들을 반환한다.
	 * @param {Boolean} includeCached Indicates whether to include the cached items. <ko>캐싱된 아이템을 포함할지 여부를 나타낸다.</ko>
	 * @returns {Array} List of items <ko>아이템의 목록</ko>
	 */
	getItems(includeCached = false) {
		return this[includeCached ? "_getItems" : "_getVisibleItems"]();
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
	 */
	layout(isRelayout = true) {
		if (!this._layout || this.isProcessing()) {
			return this;
		}
		// check childElement
		if (!this._items.size()) {
			this._insert(toArray(this._renderer.container.children), true);
			return this;
		} else {
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
		}

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
	 * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, groupkey is automatically generated.
	 * @ko 현재 유지하고 있는 카드 엘리먼트의 그룹 키 목록을 반환한다. 여러 개의 카드 엘리먼트를 묶어서 관리할 수 있도록 append() 메서드나 prepend() 메서드에서 그룹 키를 지정할 수 있다. append() 메서드나 prepend() 메서드에서 그룹 키를 지정하지 않았다면 자동으로 그룹키가 생성된다.
	 * @param {Boolean} includeCached Indicates whether to include the cached groups. <ko>캐싱된 그룹을 포함할지 여부를 나타낸다.</ko>
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
	 * @param {boolean} [applyScrollPos=true] Checks whether to scroll<ko>스크롤의 위치를 복원할지 결정한다.</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	setStatus(status, applyScrollPos = true) {
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
	_insert(elements, isAppend, groupKey) {
		if (this.isProcessing() || elements.length === 0) {
			return;
		}
		this._status.isProcessing = true;
		const key = typeof groupKey === "undefined" ? (new Date().getTime() + Math
			.floor(
				Math.random() * 1000)) : groupKey;
		const items = ItemManager.from($(elements, true), this.options.itemSelector, {
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
			/**
			 * This event is fired when a card element must be added at the bottom or right of a layout because there is no card to be displayed on screen when a user scrolls near bottom or right.
			 * @ko 카드 엘리먼트가 레이아웃의 아래나 오른쪽에 추가돼야 할 때 발생하는 이벤트. 사용자가 아래나 오른쪽으로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다
			 * @event eg.InfiniteGrid#append
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
			 */
			this.trigger("append");
		}
	}
	// called by visible
	_requestPrepend() {
		const items = this._getNextItems(PREPEND);

		if (items.length) {
			this._postLayout(CACHE, items, PREPEND, TRUSTED);
		} else {
			/**
			 * This event is fired when a card element must be added at the top or left of a layout because there is no card to be displayed on screen when a user scrolls near top or left.
			 * @ko 카드가 레이아웃의 위나 왼쪽에 추가돼야 할 때 발생하는 이벤트. 사용자가 위나 왼쪽으로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다.
			 * @event eg.InfiniteGrid#prepend
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
			 */
			this.trigger("prepend");
		}
	}
	_onCheck({isForward, scrollPos, horizontal, orgScrollPos}) {
		/**
		 * This event is fired when the user scrolls.
		 * @ko 사용자가 스크롤 할 경우 발생하는 이벤트.
		 * @event eg.InfiniteGrid#change
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {Boolean} param.isForward Indicates whether the scroll progression direction is forward or backword. <ko>스크롤 진행방향이 앞쪽으로 진행하는 지, 뒤쪽으로 진행하는지를 나타낸다.</ko>
		 * @param {Number} param.scrollPos Current scroll position value relative to the infiniteGrid container element. <ko>infiniteGrid 컨테이너 엘리먼트 기준의 현재 스크롤 위치값</ko>
		 * @param {Boolean} param.orgScrollPos Current position of the scroll <ko>현재 스크롤 위치값</ko>
		 * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
		 * @param {Boolean} options.horizontal Direction of the scroll movement (true: horizontal, false: vertical) <ko>스크롤 이동 방향 (true 가로방향, false 세로방향</ko>
		 */
		this.trigger("change", {
			isForward,
			horizontal,
			scrollPos,
			orgScrollPos,
		});
		if (this.isProcessing()) {
			return;
		}
		const rect = this._getEdgeOffset(isForward ? "end" : "start");

		if (!rect) {
			return;
		}
		const targetPos = isForward ?
			rect[horizontal ? "left" : "top"] - this._renderer.getViewSize() :
			rect[horizontal ? "right" : "bottom"];

		if (isForward) {
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
		/**
		 * This event is fired when layout is successfully arranged through a call to the append(), prepend(), or layout() method.
		 * @ko 레이아웃 배치가 완료됐을 때 발생하는 이벤트. append() 메서드나 prepend() 메서드, layout() 메서드 호출 후 카드의 배치가 완료됐을 때 발생한다
		 * @event eg.InfiniteGrid#layoutComplete
		 *
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {Array} param.target Rearranged card elements<ko>재배치된 카드 엘리먼트들</ko>
		 * @param {Boolean} param.isAppend Checks whether the append() method is used to add a card element. It returns true even though the layoutComplete event is fired after the layout() method is called. <ko>카드 엘리먼트가 append() 메서드로 추가됐는지 확인한다. layout() 메서드가 호출된 후 layoutComplete 이벤트가 발생해도 'true'를 반환한다.</ko>
		 * @param {Number} param.scrollPos Current scroll position value relative to the infiniteGrid container element. <ko>infiniteGrid 컨테이너 엘리먼트 기준의 현재 스크롤 위치값</ko>
		 * @param {Boolean} param.orgScrollPos Current position of the scroll <ko>현재 스크롤 위치값</ko>
		 * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
		 */
		this.trigger("layoutComplete", {
			target: items.concat(),
			isAppend,
			isTrusted,
			scrollPos: this._watcher.getScrollPos(),
			orgScrollPos: this._watcher.getOrgScrollPos(),
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
/**
 * @name eg.InfiniteGrid.GridLayout
 * @constant
 * @type {Class}
 */
InfiniteGrid.GridLayout = GridLayout;
/**
 * @name eg.InfiniteGrid.FrameLayout
 * @constant
 * @type {Class}
 */
InfiniteGrid.FrameLayout = FrameLayout;
/**
 * @name eg.InfiniteGrid.SquareLayout
 * @constant
 * @type {Class}
 */
InfiniteGrid.SquareLayout = SquareLayout;
/**
 * @name eg.InfiniteGrid.PackingLayout
 * @constant
 * @type {Class}
 */
InfiniteGrid.PackingLayout = PackingLayout;
/**
 * @name eg.InfiniteGrid.JustifiedLayout
 * @constant
 * @type {Class}
 */
InfiniteGrid.JustifiedLayout = JustifiedLayout;

export default InfiniteGrid;
