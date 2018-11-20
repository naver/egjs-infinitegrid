/**
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
*/
import Component from "@egjs/component";
import ItemManager from "./ItemManager";
import DOMRenderer from "./DOMRenderer";
import Watcher from "./Watcher";
import {
	APPEND,
	PREPEND,
	CACHE,
	NO_CACHE,
	TRUSTED,
	NO_TRUSTED,
	IS_ANDROID2,
	IDLE,
	LOADING_APPEND,
	LOADING_PREPEND,
	PROCESSING,
	DEFENSE_BROWSER,
	IGNORE_CLASSNAME,
	DUMMY_POSITION,
	IS_IOS,
} from "./consts";
import Infinite from "./Infinite";
import {toArray, $, outerHeight, outerWidth} from "./utils";
import LayoutMananger from "./LayoutManager";

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

// If you already have items in the container, call "layout" method.
some.layout();
</script>
```
 *
 * @support {"ie": "8+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 **/
class InfiniteGrid extends Component {
	/**
 * Version info string
 * @ko 버전정보 문자열
 * @name VERSION
 * @static
 * @type {String}
 * @example
 * eg.InfiniteGrid.VERSION;  // ex) 3.3.3
 * @memberof eg.InfiniteGrid
 */
	static VERSION = "#__VERSION__#";
	/**
	 * @param {HTMLElement|String|jQuery} element A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
	 * @param {Object} [options] The option object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
	 * @param {String} [options.itemSelector] A selector to select card elements that make up the layout<ko>레이아웃을 구성하는 카드 엘리먼트를 선택할 선택자(selector)</ko>
	 * @param {Boolean} [options.useRecycle=true] Indicates whether keep the number of DOMs is maintained. If the useRecycle value is 'true', keep the number of DOMs is maintained. If the useRecycle value is 'false', the number of DOMs will increase as card elements are added. <ko>DOM의 수를 유지할지 여부를 나타낸다. useRecycle 값이 'true'이면 DOM 개수를 일정하게 유지한다. useRecycle 값이 'false' 이면 카드 엘리먼트가 추가될수록 DOM 개수가 계속 증가한다.</ko>
	 * @param {Boolean} [options.isOverflowScroll=false] Indicates whether overflow:scroll is applied<ko>overflow:scroll 적용여부를 결정한다.</ko>
	 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (true: horizontal, false: vertical) <ko>스크롤 이동 방향 (true 가로방향, false 세로방향)</ko>
	 * @param {Boolean} [options.useFit=true] The useFit option scrolls upwards so that no space is visible until an item is added <ko>위로 스크롤할 시 아이템을 추가하는 동안 보이는 빈 공간을 안보이게 한다.</ko>
	 * @param {Boolean} [options.isEqualSize=false] Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved. <ko>카드 엘리먼트의 크기가 동일한지 여부. 배치될 카드 엘리먼트의 크기가 모두 동일할 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
	 * @param {Boolean} [options.isConstantSize=false] Indicates whether sizes of all card elements does not change, the performance of layout arrangement can be improved. <ko>모든 카드 엘리먼트의 크기가 불변일 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
	 * @param {Number} [options.transitionDruation=0] Indicates how many seconds a transition effect takes to complete. <ko>트랜지션 효과를 완료하는데 걸리는 시간을 나타낸다.</ko>
	 * @param {Number} [options.threshold=100] The threshold size of an event area where card elements are added to a layout.<ko>레이아웃에 카드 엘리먼트를 추가하는 이벤트가 발생하는 기준 영역의 크기.</ko>
	 * @param {String} [options.attributePrefix="data-"] The prefix to use element's data attribute.<ko>엘리먼트의 데이타 속성에 사용할 접두사.</ko>
	 */
	constructor(element, options) {
		super();
		Object.assign(this.options = {
			itemSelector: "*",
			isOverflowScroll: false,
			threshold: 100,
			isEqualSize: false,
			isConstantSize: false,
			useRecycle: true,
			horizontal: false,
			transitionDuration: 0,
			useFit: true,
			attributePrefix: "data-",
		}, options);
		DEFENSE_BROWSER && (this.options.useFit = false);
		IS_ANDROID2 && (this.options.isOverflowScroll = false);
		this._reset();
		this._loadingBar = {};

		const {
			isOverflowScroll,
			isEqualSize,
			isConstantSize,
			horizontal,
			threshold,
			useRecycle,
		} = this.options;

		this._items = new ItemManager();
		this._renderer = new DOMRenderer(element, {
			isEqualSize,
			isConstantSize,
			horizontal,
			container: isOverflowScroll,
		});
		this._watcher = new Watcher(
			this._renderer.view,
			{
				isOverflowScroll,
				horizontal,
				container: this._renderer.container,
				resize: () => this._onResize(),
				check: param => this._onCheck(param),
			});

		this._infinite = new Infinite(this._items, {
			horizontal,
			useRecycle,
			threshold,
			append: param => this._requestAppend(param),
			prepend: param => this._requestPrepend(param),
			recycle: param => this._recycle(param),
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
		this._manager && this._insert({
			elements,
			isAppend: APPEND,
			groupKey,
		});
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
		this._manager && this._insert({
			elements,
			isAppend: PREPEND,
			groupKey,
		});
		return this;
	}
	/**
	 * Specifies the Layout class to use.
	 * @ko 사용할 Layout 클래스를 지정한다.
	 * @param {Class|Object} LayoutKlass The Layout class to use or an instance of a layout moudle<ko>사용할 Layout 클래스 또는 레이아웃 모듈의 인스턴스</ko>
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
	 * var layout = new eg.InfiniteGrid.GridLayout({
	 * 	margin: 10,
	 *	align: "start"
	 * });
	 * infinitegrid.setLayout(layout);
	 */
	setLayout(LayoutKlass, options = {}) {
		const {isEqualSize, isConstantSize, attributePrefix, horizontal} = this.options;

		if (!this._manager) {
			this._manager = new LayoutMananger(this._items, this._renderer, {
				attributePrefix,
				isEqualSize,
				isConstantSize,
			});
		}
		if (typeof LayoutKlass === "function") {
			this._manager.setLayout(new LayoutKlass(Object.assign(options, {
				horizontal,
			})));
		} else {
			LayoutKlass.options.horizontal = horizontal;
			this._manager.setLayout(LayoutKlass);
		}
		this._renderer.resize();
		this._setSize(this._renderer.getViewportSize());
		return this;
	}
	_setSize(size) {
		this._infinite.setSize(this._renderer.getViewSize());
		this._manager.setSize(size);
	}
	/**
	 * Returns the layouted items.
	 * @ko 레이아웃된 아이템들을 반환한다.
	 * @param {Boolean} includeCached Indicates whether to include the cached items. <ko>캐싱된 아이템을 포함할지 여부를 나타낸다.</ko>
	 * @returns {Array} List of items <ko>아이템의 목록</ko>
	 */
	getItems(includeCached = false) {
		return includeCached ? this._items.pluck("items") : this._infinite.getVisibleItems();
	}
	_fitItems(base, margin = 0) {
		base > 0 && this._watcher.scrollBy(-base);
		this._items.fit(base, this.options.horizontal);
		DOMRenderer.renderItems(this.getItems());
		this._setContainerSize(this._getEdgeValue("end") || margin);
		base < 0 && this._watcher.scrollBy(-base);
	}
	// called by visible
	_fit(useFit = this.options.useFit) {
		let base = this._getEdgeValue("start");
		const margin = (this._getLoadingStatus() === LOADING_PREPEND && this._status.loadingSize) || 0;
		const {isConstantSize, isEqualSize, useRecycle} = this.options;

		if (!useRecycle || !useFit || isConstantSize || isEqualSize) {
			if (base < margin) {
				this._fitItems(base - margin, margin);
			}
			base = 0;
		} else if (base !== 0 || margin) {
			this._fitItems(base - margin, margin);
		} else {
			return 0;
		}
		this._isLoading() && this._renderLoading();
		return base;
	}
	_getEdgeValue(cursor) {
		return this._infinite.getEdgeValue(cursor);
	}
	/**
	 * Rearranges a layout.
	 * @ko 레이아웃을 다시 배치한다.
	 * @param {Boolean} [isRelayout=true] Indicates whether a card element is being relayouted <ko>카드 엘리먼트 재배치 여부</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	layout(isRelayout = true) {
		if (!this._manager) {
			return this;
		}
		const renderer = this._renderer;
		const itemManager = this._items;
		const infinite = this._infinite;
		const isResize = renderer.resize();
		const items = this.getItems();
		const {isEqualSize, isConstantSize, transitionDuration} = this.options;
		const isLayoutAll = isRelayout && (isEqualSize || isConstantSize);
		const size = itemManager.size();

		if (isRelayout) {
			this._watcher.resize();
			if (isResize) {
				this._setSize(renderer.getViewportSize());
			}
		}
		// check childElement
		if (!size || !items.length) {
			const children = toArray(renderer.container.children);

			if (children.length) {
				this._insert({
					elements: children,
					isAppend: true,
					isChildren: true,
				});
			} else {
				this._requestAppend({});
			}
			return this;
		}
		// layout datas
		const startCursor = infinite.getCursor("start");
		const endCursor = infinite.getCursor("end");
		const data = isLayoutAll || !(isRelayout && isResize) ? itemManager.get() :
			itemManager.get(startCursor, endCursor);

		// LayoutManger interface
		this._manager.layout(isRelayout, data, isResize ? items : []);
		if (isLayoutAll) {
			this._fit();
		} else if (isRelayout && isResize) {
			itemManager.clearOutlines(startCursor, endCursor);
		}
		DOMRenderer.renderItems(items, transitionDuration);
		isRelayout && this._watcher.setScrollPos();
		this._onLayoutComplete({
			items,
			isAppend: APPEND,
			fromCache: CACHE,
			isTrusted: NO_TRUSTED,
			useRecycle: false,
			isLayout: true,
		});
		return this;
	}
	/**
	 * Removes a item element on a grid layout.
	 * @ko 그리드 레이아웃의 카드 엘리먼트를 삭제한다.
	 * @param {HTMLElement} item element to be removed <ko>삭제될 아이템 엘리먼트</ko>
	 * @return {Object}  Removed item element <ko>삭제된 아이템 엘리먼트 정보</ko>
	 */
	remove(element, isLayout = true) {
		if (element) {
			const items = this._infinite.remove(element);

			items && DOMRenderer.removeElement(element);
			isLayout && this.layout(false);
			return items;
		}
		return null;
	}
	/**
	 * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, groupkey is automatically generated.
	 * @ko 현재 유지하고 있는 카드 엘리먼트의 그룹 키 목록을 반환한다. 여러 개의 카드 엘리먼트를 묶어서 관리할 수 있도록 append() 메서드나 prepend() 메서드에서 그룹 키를 지정할 수 있다. append() 메서드나 prepend() 메서드에서 그룹 키를 지정하지 않았다면 자동으로 그룹키가 생성된다.
	 * @param {Boolean} includeCached Indicates whether to include the cached groups. <ko>캐싱된 그룹을 포함할지 여부를 나타낸다.</ko>
	 * @return {Array} List of group keys <ko>그룹 키의 목록</ko>
	 */
	getGroupKeys(includeCached) {
		const data = includeCached ?
			this._items.get() : this._infinite.getVisibleData();

		return data.map(v => v.groupKey);
	}
	/**
	 * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
	 * @ko 카드의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
	 * @return {Object} State object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
	 */
	getStatus(startKey, endKey) {
		return {
			_status: Object.assign({}, this._status),
			_items: this._items.getStatus(startKey, endKey),
			_renderer: this._renderer.getStatus(),
			_watcher: this._watcher.getStatus(),
			_infinite: this._infinite.getStatus(startKey, endKey),
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
		if (!status) {
			return this;
		}
		const {_status, _renderer, _items, _watcher, _infinite} = status;

		if (!_status ||
			!_renderer || !_items || !_watcher || !_infinite) {
			return this;
		}
		const items = this._items;
		const renderer = this._renderer;
		const watcher = this._watcher;
		const infinite = this._infinite;

		watcher.detachEvent();
		Object.assign(this._status, _status);
		this._status.processingStatus = IDLE;
		items.setStatus(_items);
		renderer.setStatus(_renderer);
		infinite.setStatus(_infinite);

		const visibleItems = this.getItems();
		const length = visibleItems.length;

		renderer.createAndInsert(visibleItems, true);

		const isReLayout = renderer.isNeededResize();

		watcher.setStatus(_watcher, applyScrollPos);
		watcher.attachEvent();

		const {isConstantSize, isEqualSize} = this.options;

		if (!length) {
			this._requestAppend({cache: visibleItems.slice(0, 1)});
		} else if (isReLayout) {
			renderer.resize();
			this._setSize(renderer.getViewportSize());

			if (isConstantSize) {
				this.layout(true);
			} else {
				this._items.clearOutlines();
				this._postLayout({
					fromCache: true,
					groups: isEqualSize ? items.get() : infinite.getVisibleData(),
					items: visibleItems,
					newItems: visibleItems,
					isAppend: true,
					isTrusted: false,
				});
			}
		} else {
			this.layout(false);
		}
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
		this._infinite.clear();
		this._reset();
		this._appendLoadingBar();
		return this;
	}
	/**
	 * Specifies the Loading Bar to use for append or prepend items.
	 * @ko 아이템을 append 또는 prepend 하기 위해 사용할 로딩 바를 지정한다.
	 * @param {String|Object} [userLoadingBar={}] The loading bar HTML markup or element or element selector <ko> 로딩 바 HTML 또는 element 또는 selector </ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	setLoadingBar(userLoadingBar = {}) {
		const loadingBarObj = typeof userLoadingBar === "object" ? userLoadingBar : {
			"append": userLoadingBar,
			"prepend": userLoadingBar,
		};

		this._status.loadingSize = 0;
		this._status.loadingStyle = {};
		const loadingBar = this._loadingBar;

		for (const type in loadingBarObj) {
			loadingBar[type] = $(loadingBarObj[type]);
			loadingBar[type].className += ` ${IGNORE_CLASSNAME}`;
		}
		this._appendLoadingBar();
		return this;
	}
	_appendLoadingBar() {
		const loadingBar = this._loadingBar;
		const container = this._renderer.container;

		for (const type in loadingBar) {
			container.appendChild(loadingBar[type]);
		}
	}
	/**
	 * Checks whether a card element or data is being added.
	 * @ko 카드 엘리먼트 추가 또는 데이터 로딩이 진행 중인지 확인한다
	 * @return {Boolean} Indicates whether a card element or data is being added <ko>카드 엘리먼트 추가 또는 데이터 로딩 진행 중 여부</ko>
	 */
	isProcessing() {
		return this._isProcessing() || this._isLoading();
	}
	_isProcessing() {
		return (this._status.processingStatus & PROCESSING) > 0;
	}
	_isLoading() {
		return this._getLoadingStatus() > 0;
	}
	_getLoadingStatus() {
		return this._status.processingStatus & (LOADING_APPEND | LOADING_PREPEND);
	}
	_process(status, isAdd = true) {
		if (isAdd) {
			this._status.processingStatus |= status;
		} else {
			this._status.processingStatus -= this._status.processingStatus & status;
		}
	}
	_insert({
		elements,
		isAppend,
		isChildren,
		groupKey = new Date().getTime() + Math.floor(Math.random() * 1000),
	}) {
		if (this._isProcessing() || elements.length === 0) {
			return;
		}
		const items = ItemManager.from(elements, this.options.itemSelector, {
			isAppend,
			groupKey,
			outlines: {start: [], end: []},
		});

		if (!items.length) {
			return;
		}

		const group = {
			groupKey,
			items,
			outlines: {start: [], end: []},
		};
		const method = isAppend ? "append" : "prepend";

		this._items[method](group);

		if (!isAppend) {
			const infinite = this._infinite;
			const startCursor = infinite.getCursor("start");
			const endCursor = infinite.getCursor("end");

			infinite.setCursor("start", startCursor + 1);
			infinite.setCursor("end", endCursor + 1);
		}
		this._postLayout({
			fromCache: NO_CACHE,
			groups: [group],
			items,
			newItems: items,
			isAppend,
			isChildren,
			isTrusted: NO_TRUSTED,
		});
	}
	// add items, and remove items for recycling
	_recycle({start, end}) {
		if (!this.options.useRecycle) {
			return;
		}
		DOMRenderer.removeItems(this._items.pluck("items", start, end));
	}
	/**
	 * Returns the element of loading bar.
	 * @ko 로딩 바의 element를 반환한다.
	 * @param {Boolean} [isAppend=currentLoadingBar|true] Checks whether the card element is added to the append () method. <ko>카드 엘리먼트가 append() 메서드로 추가 할 것인지 확인한다.</ko>
	 * @return {Element} The element of loading bar. <ko>로딩 바의 element</ko>
	 */
	getLoadingBar(isAppend = this._getLoadingStatus() !== LOADING_PREPEND) {
		return this._loadingBar[isAppend ? "append" : "prepend"];
	}
	/**
	 * Start loading for append/prepend during loading data.
	 * @ko 데이터가 로딩되는 동안 append/prepend하길 위해 로딩을 시작한다.
	 * @param {Boolean} [isAppend=true] Checks whether the card element is added to the append () method. <ko>카드 엘리먼트가 append() 메서드로 추가 할 것인지 확인한다.</ko>
	 * @param {Object} [userStyle = {display: "block"}] custom style to apply to this loading bar for start. <ko> 로딩 시작을 위한 로딩 바에 적용할 커스텀 스타일 </ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	startLoading(isAppend, userStyle = {display: "block"}) {
		if (this._isLoading()) {
			return this;
		}
		const type = isAppend ? "append" : "prepend";

		this._process(isAppend ? LOADING_APPEND : LOADING_PREPEND);
		if (!this._loadingBar[type]) {
			return this;
		}
		this._renderLoading(userStyle);
		this._status.loadingStyle = userStyle;
		if (!isAppend) {
			this._fit();
		} else {
			this._setContainerSize(this._getEdgeValue("end") + this._status.loadingSize);
		}
		return this;
	}
	_renderLoading(userStyle = this._status.loadingStyle) {
		if (!this._isLoading()) {
			return;
		}
		const isAppend = this._getLoadingStatus() === LOADING_APPEND;
		const el = this._loadingBar[isAppend ? "append" : "prepend"];

		if (!el) {
			return;
		}
		const style = Object.assign({
			position: "absolute",
		}, userStyle);

		for (const property in style) {
			el.style[property] = style[property];
		}
		this._status.loadingSize = this.options.horizontal ? outerWidth(el) : outerHeight(el);
		const posName = this.options.horizontal ? "left" : "top";

		if (!(posName in style)) {
			const pos = isAppend ? this._getEdgeValue("end") : this._getEdgeValue("start") - this._status.loadingSize;

			el.style[posName] = `${pos}px`;
		}
	}
	/**
	 * End loading after startLoading() for append/prepend
	 * @ko  append/prepend하길 위해 startLoading() 호출해선 걸었던 로딩을 끝낸다.
	 * @param {Object} [userStyle = {display: "none"}] custom style to apply to this loading bar for end <ko> 로딩 시작을 위한 로딩 바에 적용할 커스텀 스타일 </ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	endLoading(userStyle = {display: "none"}) {
		if (!this._isLoading()) {
			return this;
		}
		const isAppend = this._getLoadingStatus() === LOADING_APPEND;
		const type = isAppend ? "append" : "prepend";
		const el = this._loadingBar[type];
		const status = this._status;
		const size = status.loadingSize;

		this._process(LOADING_APPEND | LOADING_PREPEND, false);
		status.loadingSize = 0;
		status.loadingStyle = {};
		if (el) {
			const style = Object.assign({
				[this.options.horizontal ? "left" : "top"]: `${-size}px`,
			}, userStyle);

			for (const property in style) {
				el.style[property] = style[property];
			}
			if (!isAppend) {
				this._fitItems(size);
			} else {
				this._setContainerSize(this._getEdgeValue("end"));
			}
		}
		if (this.options.useRecycle && !this.isProcessing()) {
			this._infinite.recycle(this._watcher.getScrollPos(), isAppend);
		}
		return this;
	}
	_setContainerSize(size) {
		this._renderer.setContainerSize(Math.max(this._items.getMaxEdgeValue(), size));
	}
	/**
	 * Move to some group or item position.
	 * @ko 해당하는 그룹 또는 아이템의 위치로 이동한다.
	 * @param {Number} [index] group's index <ko> 그룹의 index</ko>
	 * @param {Number} [itemIndex=-1] item's index <ko> 그룹의 index</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	moveTo(index, itemIndex = 0) {
		if (this.isProcessing()) {
			return this;
		}
		const data = this._items.getData(index);

		if (!data) {
			return this;
		}
		const infinite = this._infinite;
		const outlines = data.outlines;
		const items = data.items;
		const item = items[itemIndex];
		const isResize = outlines.start && (outlines.start.length === 0);
		const startCursor = infinite.getCursor("start");
		const endCursor = infinite.getCursor("end");
		const isInCursor = startCursor <= index && index <= endCursor;
		const {useRecycle, horizontal} = this.options;

		if (isInCursor || !useRecycle || !isResize) {
			let pos = item ? item.rect[horizontal ? "left" : "top"] : Math.max(...outlines.start);
			const fit = Math.min(...outlines.start);

			if (fit < 0) {
				// base < 0
				this._fitItems(fit, 0);
				pos -= fit;
			}
			const isAppend = index > startCursor;

			if (isInCursor || isAppend) {
				this._scrollTo(pos);
				return this;
			}
			this._postLayout({
				fromCache: true,
				groups: [data],
				items,
				newItems: [],
				isAppend,
				isTrusted: false,
				moveCache: true,
				moveItem: itemIndex,
			});
			return this;
		} else {
			const isAppend = index > endCursor || index < startCursor - 1;

			this._postCache({
				isAppend,
				cache: [data],
				isTrusted: false,
				moveItem: itemIndex,
			});
		}
		return this;
	}
	_setScrollPos(pos) {
		this._watcher.setScrollPos(this._watcher.getContainerOffset() + pos);
	}
	_scrollTo(pos) {
		this._watcher.scrollTo(this._watcher.getContainerOffset() + pos);
	}
	_onImageError(e) {
		/**
		 * This event is fired when an error occurs in the image.
		 * @ko 이미지 로드에 에러가 날 때 발생하는 이벤트.
		 * @event eg.InfiniteGrid#imageError
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {Element} param.target Appending card's image element.<ko>추가 되는 카드의 이미지 엘리먼트</ko>
		 * @param {Element} param.elememt The item's element with error images.<ko>에러난 이미지를 가지고 있는 아이템의 엘리먼트</ko>
		 * @param {Object} param.items The items being added.<ko>화면에 추가중인 아이템들</ko>
		 * @param {Object} param.item The item with error images.<ko>에러난 이미지를 가지고 있는 아이템</ko>
		 * @param {Number} param.itemIndex The item's index with error images.<ko>에러난 이미지를 가지고 있는 아이템의 인덱스</ko>
		 * @param {Function} param.remove In the imageError event, this method expects to remove the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 삭제한다.</ko>
		 * @param {Function} param.removeItem In the imageError event, this method expects to remove the item with the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 가지고 있는 아이템을 삭제한다.</ko>
		 * @param {Function} param.replace In the imageError event, this method expects to replace the error image's source or element.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지의 주소 또는 엘리먼트를 교체한다.</ko>
		 * @param {Function} param.replaceItem In the imageError event, this method expects to replace the item's contents with the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 가지고 있는 아이템의 내용을 교체한다.</ko>
		 * @example
ig.on("imageError", e => {
	e.remove();
	e.removeItem();
	e.replace("http://...jpg");
	e.replace(imageElement);
	e.replaceItem("item html");
});
		 */
		this.trigger("imageError", Object.assign(e, {element: e.item.el}));
	}
	_postCache({cache, isAppend, isTrusted = true, moveItem = -1}) {
		const {isConstantSize} = this.options;
		const items = ItemManager.pluck(cache, "items");
		let fromCache = true;
		const newItems = items.filter(item => {
			if (!item.orgSize) {
				fromCache = false;
				return true;
			}
			return !isConstantSize && item.rect.top < DUMMY_POSITION / 10;
		});

		this._postLayout({
			fromCache,
			groups: cache,
			items,
			newItems,
			isAppend,
			isTrusted,
			moveItem,
		});
	}
	_postLayout({
		fromCache,
		groups,
		items = ItemManager.pluck(groups, "items"),
		newItems,
		isAppend,
		isChildren,
		isTrusted,
		moveCache,
		moveItem = -2}) {
		this._process(PROCESSING);
		const method = isAppend ? "append" : "prepend";
		const itemManager = this._items;
		const horizontal = this.options.horizontal;

		// If container has children, it does not render first.
		if (!isChildren) {
			DOMRenderer.createElements(items);
			this._renderer[method](items);
		}
		this._manager[method]({
			groups,
			items: newItems,
			isAppend,
		}, {
			complete: () => {
				const infinite = this._infinite;
				const startCursor = Math.max(infinite.getCursor("start"), 0);
				const endCursor = Math.max(infinite.getCursor("end"), 0);
				let requestStartCursor = itemManager.indexOf(groups[0].groupKey);
				let requestEndCursor = itemManager.indexOf(groups[groups.length - 1].groupKey);
				let isInCursor = true;

				if (requestStartCursor > endCursor + 1 || requestEndCursor < startCursor - 1) {
					isInCursor = false;
				}
				if (isInCursor) {
					if (isAppend) {
						requestStartCursor = startCursor;
						requestEndCursor = Math.max(endCursor, requestEndCursor);
					} else {
						requestStartCursor = Math.max(Math.min(startCursor, requestStartCursor), 0);
						requestEndCursor = endCursor;
					}
				}

				!isInCursor && this._recycle({start: startCursor, end: endCursor});
				infinite.setCursor("start", requestStartCursor);
				infinite.setCursor("end", requestEndCursor);

				if (moveItem > -1) {
					const pos = items[moveItem].rect[horizontal ? "left" : "top"];

					if (!isInCursor && !moveCache) {
						itemManager.clearOutlines(requestStartCursor, requestEndCursor);
					}
					this._scrollTo(pos);
					this._setScrollPos(pos);
				}
				this._onLayoutComplete({groups, items, isAppend, fromCache, isTrusted, useRecycle: false});
			},
			error: e => this._onImageError(e),
			end: ({remove, layout}) => {
				remove.forEach(el => this.remove(el, false));
				if (layout) {
					this.layout(false);
				} else if (!this.isProcessing() && this.options.useRecycle) {
					const watcher = this._watcher;
					const scrollPos = watcher.getScrollPos();

					this._infinite.recycle(scrollPos, isAppend);
				}
			},
		});
		return this;
	}
	// called by visible
	_requestAppend({cache}) {
		if (this._isProcessing()) {
			return;
		}
		if (cache && cache.length) {
			this._postCache({cache, isAppend: APPEND});
		} else {
			/**
			 * This event is fired when a card element must be added at the bottom or right of a layout because there is no card to be displayed on screen when a user scrolls near bottom or right.
			 * @ko 카드 엘리먼트가 레이아웃의 아래나 오른쪽에 추가돼야 할 때 발생하는 이벤트. 사용자가 아래나 오른쪽으로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다
			 * @event eg.InfiniteGrid#append
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {String|Number} groupKey The group key of the first group visible on the screen <ko>화면에 보여지는 마지막 그룹의 그룹키</ko>
			 * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
			 * @param {Function} param.startLoading Start loading for append loading data. <ko> 뒷쪽에 추가되는 데이터 로딩을 시작한다. </ko>
			 * @param {Object} param.startLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩을 시작할 때 로딩 바에 적용될 사용자 스타일 </ko>
			 * @param {Function} param.endLoading End loading after startLoading() for append/prepend loading data. <ko>데이터 로딩을 위해 append/prepend startLoading() 호출 이후 로딩을 끝낸다.</ko>
			 * @param {Object} param.endLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩이 끝날 때 로딩 바에 적용될 사용자 스타일 </ko>
			 */
			this.trigger("append", {
				isTrusted: TRUSTED,
				groupKey: this.getGroupKeys().pop() || "",
				startLoading: userStyle => {
					this.startLoading(true, userStyle);
				},
				endLoading: userStyle => {
					this.endLoading(userStyle);
				},
			});
		}
	}
	// called by visible
	_requestPrepend({cache}) {
		this._fit(this.options.useFit || !cache.length);
		if (this._isProcessing()) {
			return;
		}
		if (cache && cache.length) {
			this._postCache({cache, isAppend: PREPEND});
		} else {
			/**
			 * This event is fired when a card element must be added at the top or left of a layout because there is no card to be displayed on screen when a user scrolls near top or left.
			 * @ko 카드가 레이아웃의 위나 왼쪽에 추가돼야 할 때 발생하는 이벤트. 사용자가 위나 왼쪽으로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다.
			 * @event eg.InfiniteGrid#prepend
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {String|Number} groupKey The group key of the first group visible on the screen <ko>화면에 보여지는 첫번째 그룹의 그룹키</ko>
			 * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
			 * @param {Function} param.startLoading Start loading for prepend loading data. <ko> 앞쪽에 추가되는 데이터 로딩을 시작한다. </ko>
			 * @param {Object} param.startLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩을 시작할 때 로딩 바에 적용될 사용자 스타일 </ko>
			 * @param {Function} param.endLoading End loading after startLoading() for append/prepend loading data. <ko>데이터 로딩을 위해 append/prepend startLoading() 호출 이후 로딩을 끝낸다.</ko>
			 * @param {Object} param.endLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩이 끝날 때 로딩 바에 적용될 사용자 스타일 </ko>
			 */
			this.trigger("prepend", {
				isTrusted: TRUSTED,
				groupKey: this.getGroupKeys().shift(),
				startLoading: userStyle => {
					this.startLoading(false, userStyle);
				},
				endLoading: userStyle => {
					this.endLoading(userStyle);
				},
			});
		}
	}
	_onResize() {
		this.layout(true);
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
		this._infinite.scroll(scrollPos);
	}
	_onLayoutComplete({items, isAppend, isTrusted = false,
		useRecycle = this.options.useRecycle,
		fromCache = false,
		isLayout = false,
	}) {
		const viewSize = this._renderer.getViewSize();

		if (!isAppend) {
			this._fit();
		} else {
			this._isLoading() && this._renderLoading();
		}

		const watcher = this._watcher;
		const scrollPos = watcher.getScrollPos();

		// recycle after _fit beacause prepend and append are occured simultaneously by scroll.
		if (!isLayout && useRecycle && !this._isLoading()) {
			this._infinite.recycle(scrollPos, isAppend);
		}

		const size = this._getEdgeValue("end");

		if (isAppend) {
			this._setContainerSize(size + this._status.loadingSize || 0);
			if (scrollPos > 0) {
				!IS_IOS && this._scrollTo(scrollPos);
			}
		}
		!isLayout && this._process(PROCESSING, false);

		/**
		 * This event is fired when layout is successfully arranged through a call to the append(), prepend(), or layout() method.
		 * @ko 레이아웃 배치가 완료됐을 때 발생하는 이벤트. append() 메서드나 prepend() 메서드, layout() 메서드 호출 후 카드의 배치가 완료됐을 때 발생한다
		 * @event eg.InfiniteGrid#layoutComplete
		 *
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {Array} param.target Rearranged card elements<ko>재배치된 카드 엘리먼트들</ko>
		 * @param {Boolean} param.fromCache Check whether these items are cache or not <ko>해당 아이템들이 캐시인지 아닌지 확인한다.</ko>
		 * @param {Boolean} param.isLayout Returns true if this is an event called by resize event or layout method. Returns false if this is an event called by adding an item. <ko>해당 이벤트가 리사이즈 이벤트 또는 layout() 메서드를 통해 호출됐으면 true, 아이템 추가로 호출됐으면 false를 반환한다.</ko>
		 * @param {Boolean} param.isAppend Checks whether the append() method is used to add a card element. It returns true even though the layoutComplete event is fired after the layout() method is called. <ko>카드 엘리먼트가 append() 메서드로 추가됐는지 확인한다. layout() 메서드가 호출된 후 layoutComplete 이벤트가 발생해도 'true'를 반환한다.</ko>
		 * @param {Boolean} param.isScroll Checks whether scrolling has occurred after the append(), prepend(), ..., etc method is called <ko>append, prend 등 호출 후 스크롤이 생겼는지 확인한다.</ko>
		 * @param {Number} param.scrollPos Current scroll position value relative to the infiniteGrid container element. <ko>infiniteGrid 컨테이너 엘리먼트 기준의 현재 스크롤 위치값</ko>
		 * @param {Number} param.orgScrollPos Current position of the scroll <ko>현재 스크롤 위치값</ko>
		 * @param {Number} param.size The size of container element <ko>컨테이너 엘리먼트의 크기</ko>
		 * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
		 * @param {Function} param.endLoading End loading after startLoading() for append/prepend loading data. <ko>데이터 로딩을 위해 append/prepend startLoading() 호출 이후 로딩을 끝낸다.</ko>
		 * @param {Object} param.endLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩이 끝날 때 로딩 바에 적용될 사용자 스타일 </ko>
		 */
		this.trigger("layoutComplete", {
			target: items.concat(),
			isAppend,
			isTrusted,
			fromCache,
			isLayout,
			isScroll: viewSize < watcher.getContainerOffset() + size,
			scrollPos,
			orgScrollPos: watcher.getOrgScrollPos(),
			size,
			endLoading: userStyle => {
				this.endLoading(userStyle);
			},
		});
		this._infinite.scroll(scrollPos, isAppend);
	}
	_reset() {
		this._status = {
			processingStatus: IDLE,
			loadingSize: 0,
		};
	}
	/**
	 * Destroys elements, properties, and events used on a grid layout.
	 * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
	 */
	destroy() {
		this._infinite.clear();
		this._watcher.destroy();
		this._manager.destroy();
		this._reset();
		this._items.clear();
		this._renderer.destroy();
	}
}

export default InfiniteGrid;
