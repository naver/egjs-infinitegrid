/**
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
*/
import Component from "@egjs/component";
import ItemManager from "./ItemManager";
import DOMRenderer from "./DOMRenderer";
import Watcher from "./Watcher";
import {
	IS_ANDROID2,
	IDLE,
	LOADING_APPEND,
	LOADING_PREPEND,
	PROCESSING,
	DEFENSE_BROWSER,
	IGNORE_CLASSNAME,
	IS_IOS,
	ITEM_STATE,
	GROUP_STATE,
} from "./consts";
import Infinite from "./Infinite";
import { toArray, $, outerHeight, outerWidth, assign, resetSize, hasTarget, matchHTML } from "./utils";
import {
	IJQuery, ILayout,
	CursorType, StyleType,
	IInfiniteGridItem,
	IInfiniteGridGroup, IInfiniteGridStatus, IErrorCallbackOptions, IInfiniteGridOptions, IItem,
} from "./types";
import { check, removeAutoSizer } from "@egjs/lazyloaded";

// IE8
// https://stackoverflow.com/questions/43216659/babel-ie8-inherit-issue-with-object-create
/* eslint-disable */
// if (typeof Object.create !== "function") {
//   // tslint:disable
//   Object.create = (o: any, properties: any) => {
//     if (typeof o !== "object" && typeof o !== "function") {
//       throw new TypeError("Object prototype may only be an Object: " + o);
//     } else if (o === null) {
//       throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
//     }
//     function F() { }
//     F.prototype = o;
//     return new F();
//   };
//   // tslint:enable
// }
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
	public static VERSION = "#__VERSION__#";

	public options: IInfiniteGridOptions;
	private _loadingBar: {
		append?: HTMLElement,
		prepend?: HTMLElement,
	};
	private _items: ItemManager;
	private _renderer: DOMRenderer;
	private _layout: ILayout;
	private _watcher: Watcher;
	private _infinite: Infinite;
	private _status: IInfiniteGridStatus["_status"];
	private _renderComplete: Component = new Component();

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
	constructor(element: HTMLElement | string | IJQuery, options?: Partial<IInfiniteGridOptions>) {
		super();
		assign(this.options = {
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
			renderExternal: false,
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
				check: param => this._onCheck(param!),
			});

		this._infinite = new Infinite(this._items, {
			useRecycle,
			threshold,
			request: this._request,
			change: this._change,
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
	public append(elements: HTMLElement[] | IJQuery | string[] | string, groupKey?: string | number) {
		const group = this._insertGroup({
			elements,
			isAppend: true,
			groupKey,
		});
		if (group) {
			this._infinite.scroll(this._watcher.getScrollPos(), false);
		}
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
	public prepend(elements: HTMLElement[] | IJQuery | string[] | string, groupKey?: string | number) {
		const group = this._insertGroup({
			elements,
			isAppend: false,
			groupKey,
		});
		const infinite = this._infinite;

		if (group) {
			if (infinite.getCursor("end") > -1) {
				infinite.scroll(this._watcher.getScrollPos(), false);
			} else {
				this._change(false, { start: 0, end: 0 }, false);
			}
		}
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
	 *   margin: 10,
	 *  align: "start"
	 * });
	 * infinitegrid.setLayout(layout);
	 */
	public setLayout(LayoutKlass: ILayout | (new (...args: any[]) => ILayout), options = {}) {
		const { horizontal } = this.options;

		if (typeof LayoutKlass === "function") {
			this._layout = new LayoutKlass(assign(options, {
				horizontal,
			}));
		} else {
			LayoutKlass.options.horizontal = horizontal;

			this._layout = LayoutKlass;
		}
		this._renderer.resize();
		this._setSize(this._renderer.getViewportSize());
		return this;
	}
	/**
	 * Returns the layouted items.
	 * @ko 레이아웃된 아이템들을 반환한다.
	 * @param {Boolean} includeCached Indicates whether to include the cached items. <ko>캐싱된 아이템을 포함할지 여부를 나타낸다.</ko>
	 * @returns List of items <ko>아이템의 목록</ko>
	 */
	public getItems(includeCached?: boolean): IInfiniteGridItem[] {
		return includeCached ? this._items.pluck("items") : this._infinite.getVisibleItems();
	}
	/**
	 * Rearranges a layout.
	 * @ko 레이아웃을 다시 배치한다.
	 * @param {Boolean} [isRelayout=true] Indicates whether a card element is being relayouted <ko>카드 엘리먼트 재배치 여부</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	public layout(isRelayout = true) {
		if (!this._layout) {
			return this;
		}
		const renderer = this._renderer;
		const itemManager = this._items;
		const infinite = this._infinite;
		const isResize = renderer.resize();
		const items = this.getItems();
		const { isEqualSize, isConstantSize, transitionDuration } = this.options;
		const isLayoutAll = isRelayout && (isEqualSize || isConstantSize) || !isRelayout || !isResize;
		const size = itemManager.size();

		if (isRelayout) {
			this._watcher.resize();
			this._setSize(renderer.getViewportSize());
		}

		// check childElement
		if (!size || !items.length) {
			const container = renderer.container;
			const itemSelector = this.options.itemSelector;
			let children!: HTMLElement[];

			if (itemSelector === "*") {
				children = toArray(container.children) as HTMLElement[];
			} else {
				const parentElement = container.parentElement!;
				const parentChildren = toArray(parentElement.children);
				const nthChild = parentChildren.indexOf(container);
				const selector = `:nth-child(${nthChild})>${itemSelector}`;

				children = toArray(parentElement.querySelectorAll<HTMLElement>(selector));
			}

			if (children.length) {
				this._insertGroup({
					elements: children,
					isAppend: true,
				});
				this._infinite.scroll(0, false);
			} else {
				if (renderer.getContainerSize()) {
					renderer.setContainerSize(0);
				}
				this._request(true, false);
			}
			return this;
		}
		if (isRelayout) {
			// clear outlines
			itemManager.clearOutlines();
			renderer.updateSize(items);
		}
		// layout datas
		const startCursor = infinite.getCursor("start");
		const endCursor = infinite.getCursor("end");
		const prevGroup = isLayoutAll ? null : itemManager.getGroup(startCursor - 1);
		const groups = isLayoutAll ? itemManager.getGroups().slice() :
			itemManager.sliceGroups(startCursor, endCursor + 1);

		this._relayout(groups, prevGroup);
		isLayoutAll && this._fit();
		DOMRenderer.renderItems(items, transitionDuration);

		isRelayout && this._watcher.setScrollPos();
		this._onLayoutComplete({
			items,
			isAppend: true,
			fromCache: true,
			isTrusted: false,
			useRecycle: false,
			isLayout: true,
		});
		return this;
	}
	/**
	 * Removes a item element on a grid layout.
	 * @ko 그리드 레이아웃의 카드 엘리먼트를 삭제한다.
	 * @param {HTMLElement} item element to be removed <ko>삭제될 아이템 엘리먼트</ko>
	 * @return {Object}  Removed items information <ko>삭제된 아이템들 정보</ko>
	 */
	public remove(element: HTMLElement, isLayout = true) {
		const { groupIndex, itemIndex } = this._items.indexesOfElement(element);
		const { items, groups } = this._infinite.remove(groupIndex, itemIndex);

		items.forEach(item => {
			DOMRenderer.removeElement(item.el);
		});

		if (items.length) {
			isLayout && this.layout(groups.length > 0);

			return items;
		}
		return [];
	}
	/**
	 * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, groupkey is automatically generated.
	 * @ko 현재 유지하고 있는 카드 엘리먼트의 그룹 키 목록을 반환한다. 여러 개의 카드 엘리먼트를 묶어서 관리할 수 있도록 append() 메서드나 prepend() 메서드에서 그룹 키를 지정할 수 있다. append() 메서드나 prepend() 메서드에서 그룹 키를 지정하지 않았다면 자동으로 그룹키가 생성된다.
	 * @param {Boolean} includeCached Indicates whether to include the cached groups. <ko>캐싱된 그룹을 포함할지 여부를 나타낸다.</ko>
	 * @return {Array} List of group keys <ko>그룹 키의 목록</ko>
	 */
	public getGroupKeys(includeCached?: boolean) {
		const data = includeCached ?
			this._items.getGroups() : this._infinite.getVisibleGroups();

		return data.map(v => v.groupKey);
	}
	/**
	 * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
	 * @ko 카드의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
	 * @return {Object} State object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
	 */
	public getStatus(startKey?: string | number, endKey?: string | number): IInfiniteGridStatus {
		return {
			_status: assign({}, this._status),
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
	public setStatus(status: IInfiniteGridStatus, applyScrollPos = true) {
		if (!status) {
			return this;
		}
		const { _status, _renderer, _items, _watcher, _infinite } = status;

		if (!_status ||
			!_renderer || !_items || !_watcher || !_infinite) {
			return this;
		}
		const items = this._items;
		const renderer = this._renderer;
		const watcher = this._watcher;
		const infinite = this._infinite;

		watcher.detachEvent();
		assign(this._status, _status);
		this._status.processingStatus = IDLE;
		items.setStatus(_items);
		renderer.setStatus(_renderer);
		infinite.setStatus(_infinite);

		const groups = items.getGroups();
		const visibleItems = this.getItems();
		const length = visibleItems.length;

		renderer.createAndInsert(visibleItems, true);

		const isReLayout = renderer.isNeededResize();

		watcher.setStatus(_watcher, applyScrollPos);
		watcher.attachEvent();

		const { isConstantSize, isEqualSize } = this.options;

		if (!length) {
			if (groups.length) {
				this._change(true, { start: 0, end: 0 }, false);
			} else {
				this._request(true, false);
			}
		} else if (isReLayout) {
			renderer.resize();
			this._setSize(renderer.getViewportSize());

			if (isConstantSize) {
				this.layout(true);
			} else {
				this._items.clearOutlines();
				this._renderCache({
					cache: isEqualSize ? items.getGroups() : infinite.getVisibleGroups(),
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
	public clear() {
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
	public setLoadingBar(userLoadingBar: {
		append?: string | HTMLElement,
		prepepnd?: string | HTMLElement,
	} | string = {}) {
		const loadingBarObj: {
			append?: string | HTMLElement,
			prepend?: string | HTMLElement,
		} = typeof userLoadingBar === "object" ? userLoadingBar : {
			append: userLoadingBar,
			prepend: userLoadingBar,
		};

		this._status.loadingSize = 0;
		this._status.loadingStyle = {};
		const loadingBar = this._loadingBar;

		for (const type in loadingBarObj) {
			loadingBar[type as "append" | "prepend"] = $(loadingBarObj[type as "append" | "prepend"]!);
			loadingBar[type as "append" | "prepend"]!.className += ` ${IGNORE_CLASSNAME}`;
		}
		this._appendLoadingBar();
		return this;
	}
	/**
	 * Checks whether a card element or data is being added.
	 * @ko 카드 엘리먼트 추가 또는 데이터 로딩이 진행 중인지 확인한다
	 * @return {Boolean} Indicates whether a card element or data is being added <ko>카드 엘리먼트 추가 또는 데이터 로딩 진행 중 여부</ko>
	 */
	public isProcessing() {
		return this._isProcessing() || this._isLoading();
	}
	public getRenderingIndexes() {
		const visibleGroups = this._infinite.getVisibleGroups();
		const length = visibleGroups.length;

		if (!length) {
			return { start: -1, end: -1 };
		}
		const lastGroupItems = visibleGroups[length - 1].items;
		const firstItem = visibleGroups[0].items[0];
		const lastItem = lastGroupItems[lastGroupItems.length - 1];
		const items = this.getItems(true);

		return {
			start: items.indexOf(firstItem),
			end: items.lastIndexOf(lastItem),
		};
	}
	public beforeSync(items: IItem[]) {
		this._infinite.sync(items);
	}
	public sync(elements: HTMLElement[], isTrusted: boolean) {
		const items = this.getItems();

		if (!items.length) {
			return;
		}
		items.forEach((item, i) => {
			item.el = elements[i];
		});

		this._renderCache({
			cache: this._infinite.getVisibleGroups(),
			isAppend: !items[0].mounted,
			isTrusted,
		});
	}
	/**
	 * Returns the element of loading bar.
	 * @ko 로딩 바의 element를 반환한다.
	 * @param {Boolean} [isAppend=currentLoadingBar|true] Checks whether the card element is added to the append () method. <ko>카드 엘리먼트가 append() 메서드로 추가 할 것인지 확인한다.</ko>
	 * @return {Element} The element of loading bar. <ko>로딩 바의 element</ko>
	 */
	public getLoadingBar(isAppend = this._getLoadingStatus() !== LOADING_PREPEND) {
		return this._loadingBar[isAppend ? "append" : "prepend"];
	}
	/**
	 * Start loading for append/prepend during loading data.
	 * @ko 데이터가 로딩되는 동안 append/prepend하길 위해 로딩을 시작한다.
	 * @param {Boolean} [isAppend=true] Checks whether the card element is added to the append () method. <ko>카드 엘리먼트가 append() 메서드로 추가 할 것인지 확인한다.</ko>
	 * @param {Object} [userStyle = {display: "block"}] custom style to apply to this loading bar for start. <ko> 로딩 시작을 위한 로딩 바에 적용할 커스텀 스타일 </ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	public startLoading(isAppend?: boolean, userStyle: StyleType = { display: "block" }) {
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
	/**
	 * End loading after startLoading() for append/prepend
	 * @ko  append/prepend하길 위해 startLoading() 호출해선 걸었던 로딩을 끝낸다.
	 * @param {Object} [userStyle = {display: "none"}] custom style to apply to this loading bar for end <ko> 로딩 시작을 위한 로딩 바에 적용할 커스텀 스타일 </ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	public endLoading(userStyle: StyleType = { display: "none" }) {
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
			const style: StyleType = assign({
				[this.options.horizontal ? "left" : "top"]: `${-size}px`,
			}, userStyle);

			for (const property in style) {
				el.style[property as keyof StyleType] = style[property as keyof StyleType]!;
			}
			if (!isAppend) {
				this._fitItems(size);
			} else {
				this._setContainerSize(this._getEdgeValue("end"));
			}
		}
		if (this.options.useRecycle && !this.isProcessing()) {
			// this._infinite.recycle(this._watcher.getScrollPos(), isAppend);
		}
		return this;
	}
	/**
	 * Retrieves the item via index or the element.
	 * @ko index 또는 element를 통해 아이템을 가져온다.
	 * @param {number | HTMLElement} [groupIndex=0] The element corresponding to item or the index of the group where the item is in position <ko> item에 해당하는 element 또는 해당 item이 있는 group의 index</ko>
	 * @param {number} [itemIndex] If groupIndex is used, the index of the item in the group <ko> groupIndex를 사용할 경우 해당 group에 있는 Item의 index </ko>
	 * @return The item containing the content, size and position,etc<ko>content, size, position 등이 담겨있는 item 정보</ko>
	 * @example

	 ig.getItem(0, 0);
	 ig.getItem(element);

	 {
	  el: HTMLElement,
	  content: "<div>...</div>",
	  size: {width: ..., height: ...},
	  rect: {top: ..., left: ..., width: ..., height: ...},
	 }
	 */
	public getItem(groupIndex = 0, itemIndex?: number): IInfiniteGridItem | null {
		if (itemIndex == null && typeof groupIndex === "object") {
			if (!groupIndex) {
				return null;
			}
			const items = this.getItems();
			const length = items.length;

			for (let i = 0; i < length; ++i) {
				if (items[i].el === groupIndex) {
					return items[i];
				}
			}
			return null;
		} else {
			const group = this._items.getGroup(groupIndex);

			return group && group.items[itemIndex || 0];
		}
	}
	/**
	 * Updates the item via index or the element.
	 * @ko index 또는 element를 통해 아이템을 업데이트한다.
	 * @param {number | HTMLElement} [groupIndex=0] The element corresponding to item or the index of the group where the item is in position <ko> item에 해당하는 element 또는 해당 item이 있는 group의 index</ko>
	 * @param {number} [itemIndex] If groupIndex is used, the index of the item in the group <ko> groupIndex를 사용할 경우 해당 group에 있는 Item의 index </ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	element.innerHTML = "2";
	element.style.height = "400px";
	ig.updateItem(element);
	ig.updateItem(0, 0);
	 */
	public updateItem(groupIndex?: number, itemIndex?: number) {
		const item = this.getItem(groupIndex, itemIndex);

		item && this._updateItem(item) && this.layout(false);
		return this;
	}
	/**
	 * Update the currently displayed items.
	 * @ko 현재보여주는 아이템들을 업데이트한다.
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	element.innerHTML = "2";
	element.style.height = "400px";

	element2.innerHTML = "2";
	element2.style.height = "400px";

	ig.updateItems();
	 */
	public updateItems() {
		this.getItems().forEach(item => {
			this._updateItem(item);
		});
		this.layout(false);
		return this;
	}
	/**
	 * Move to some group or item position.
	 * @ko 해당하는 그룹 또는 아이템의 위치로 이동한다.
	 * @param {Number} [groupIndex] group's index <ko> 그룹의 index</ko>
	 * @param {Number} [itemIndex=-1] item's index <ko> 그룹의 index</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	public moveTo(groupIndex: number, itemIndex = 0) {
		if (this.isProcessing()) {
			return this;
		}
		const group = this._items.getGroup(groupIndex);

		if (!group) {
			return this;
		}

		const itemManager = this._items;
		const infinite = this._infinite;
		const outlines = group.outlines;
		const item = group.items[itemIndex];
		const hasOutline = outlines.start && (outlines.start.length > 0);
		const startCursor = infinite.getCursor("start");
		const endCursor = infinite.getCursor("end");
		const isInCursor = startCursor <= groupIndex && groupIndex <= endCursor;
		const { horizontal } = this.options;

		if (isInCursor || hasOutline) {
			let pos = item ? item.rect[horizontal ? "left" : "top"] : Math.max(...outlines.start);
			const fit = Math.min(...outlines.start);

			if (fit < 0) {
				// base < 0
				this._fitItems(fit, 0);
				pos -= fit;
			}
			const isAppend = groupIndex >= startCursor;

			if (isInCursor || isAppend) {
				this._scrollTo(pos);
				return this;
			}
			this._setCursor(groupIndex, groupIndex);
			this._renderCache({
				isAppend,
				cache: [group],
				isTrusted: false,
			});
			this._registerComplete(() => {
				this._setScrollPos(pos);
				this._scrollTo(pos);
				this._recycle({ start: startCursor, end: endCursor });
			});
			return this;
		} else {
			// no outline
			itemManager.clearOutlines();

			const isAppend = groupIndex > endCursor || groupIndex < startCursor;
			this._setCursor(groupIndex, groupIndex);
			this._renderCache({
				isAppend,
				cache: [group],
				isTrusted: false,
			});
			this._registerComplete(() => {
				const pos = item.rect[horizontal ? "left" : "top"];

				this._setScrollPos(pos);
				this._scrollTo(pos);
				this._recycle({ start: startCursor, end: endCursor });
			});
		}
		return this;
	}
	public hasNotLoaded() {
		const items = this._infinite.getVisibleItems();

		// NOT LOADED
		const notLoadedItems = items.filter(({ state }) => state < ITEM_STATE.LOADED);

		return !!notLoadedItems.length;
	}
	/**
   * Destroys elements, properties, and events used on a grid layout.
   * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
   */
	public destroy() {
		this._infinite.clear();
		this._watcher.destroy();
		this._reset();
		this._items.clear();
		this._renderer.destroy();
	}
	private _relayout(groups: IInfiniteGridGroup[], prevGroup?: IInfiniteGridGroup | null) {
		let endOutline: number[] = prevGroup && prevGroup.outlines.end || [];

		if (!endOutline.length) {
			const startOutline = groups[0].outlines.start;

			endOutline = startOutline.length ? startOutline : [0];
		}
		this._layout.layout(groups, endOutline);
	}
	private _layoutGroups(groups: IInfiniteGridGroup[], isAppend?: boolean, prevGroup?: IInfiniteGridGroup | null) {
		if (!groups.length) {
			return;
		}
		!isAppend && groups.reverse();

		const layout = this._layout;
		const method = isAppend ? "append" : "prepend";
		const endCursorName = isAppend ? "end" : "start";
		const startCursorName = isAppend ? "start" : "end";
		let endOutline: number[] = prevGroup && prevGroup.outlines[endCursorName] || [];

		if (!endOutline.length) {
			const startOutline = groups[0].outlines
				? groups[0].outlines[startCursorName] : [];

			endOutline = startOutline.length ? startOutline : [0];
		}
		groups.forEach(group => {
			const startOutline = group.outlines[startCursorName];

			group.state = GROUP_STATE.CACHED;
			if (
				endOutline.length !== startOutline.length
				|| startOutline.some((pos, i) => pos !== endOutline[i])
			) {
				const groupInfo = layout[method](group.items, endOutline, true);

				assign(group, groupInfo);
			}

			DOMRenderer.renderItems(group.items);
			endOutline = group.outlines[endCursorName];
		});
	}
	private _layoutItems(items: IInfiniteGridItem[], isAppend?: boolean) {
		const itemManager = this._items;
		const startGroupIndex = itemManager.indexOf(items[0]);
		const endGroupIndex = itemManager.indexOf(items[items.length - 1]);
		const groups = itemManager.sliceGroups(startGroupIndex, endGroupIndex + 1);
		const prevGroup = itemManager.getGroup(isAppend ? startGroupIndex - 1 : endGroupIndex + 1);

		this._layoutGroups(groups, isAppend, prevGroup);
	}
	private _setContainerSize(size: number) {
		this._renderer.setContainerSize(Math.max(this._items.getMaxEdgeValue(), size));
	}
	private _appendLoadingBar() {
		const loadingBar = this._loadingBar;
		const container = this._renderer.container;

		for (const type in loadingBar) {
			container.appendChild(loadingBar[type as "append" | "prepend"]!);
		}
	}
	private _setSize(size: number) {
		this._infinite.setSize(this._renderer.getViewSize());
		this._layout.setSize(size);
	}
	private _fitItems(base: number, margin = 0) {
		base > 0 && this._watcher.scrollBy(-base);
		this._items.fit(base, this.options.horizontal);
		DOMRenderer.renderItems(this.getItems());
		this._setContainerSize(this._getEdgeValue("end") || margin);
		base < 0 && this._watcher.scrollBy(-base);
	}
	// called by visible
	private _fit(useFit = this.options.useFit) {
		let base = this._getEdgeValue("start");
		const margin = (this._getLoadingStatus() === LOADING_PREPEND && this._status.loadingSize) || 0;
		const { isConstantSize, isEqualSize, useRecycle } = this.options;

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
	private _getEdgeValue(cursor: CursorType) {
		return this._infinite.getEdgeValue(cursor);
	}
	private _isProcessing() {
		return (this._status.processingStatus & PROCESSING) > 0;
	}
	private _isLoading() {
		return this._getLoadingStatus() > 0;
	}
	private _getLoadingStatus() {
		return this._status.processingStatus & (LOADING_APPEND | LOADING_PREPEND);
	}
	private _process(status: number, isAdd = true) {
		if (isAdd) {
			this._status.processingStatus |= status;
		} else {
			this._status.processingStatus -= this._status.processingStatus & status;
		}
	}
	private _insertGroup({
		elements,
		isAppend,
		groupKey = new Date().getTime() + Math.floor(Math.random() * 1000),
	}: {
		elements: string | string[] | HTMLElement[] | IJQuery,
		isAppend?: boolean,
		groupKey?: string | number,
	}) {
		const items = ItemManager.toItems($(elements, true), groupKey);

		if (!items.length) {
			return;
		}
		const group = this._items[isAppend ? "appendGroup" : "prependGroup"]({
			groupKey,
			items,
		});
		const infinite = this._infinite;
		const startCursor = infinite.getCursor("start");

		if (!isAppend && startCursor !== -1) {
			infinite.prependCursor();
		}
		return group;
	}
	// add items, and remove items for recycling
	private _recycle({ start, end }: { start: number, end: number }) {
		if (!this.options.useRecycle) {
			return;
		}
		if (start < 0 || end < 0 || end < start) {
			return;
		}
		const items = this._items.pluck("items", start, end);

		items.forEach(item => {
			item.mounted = false;
		});
		DOMRenderer.removeItems(items);
	}
	private _renderLoading(userStyle = this._status.loadingStyle) {
		if (!this._isLoading()) {
			return;
		}
		const isAppend = this._getLoadingStatus() === LOADING_APPEND;
		const el = this._loadingBar[isAppend ? "append" : "prepend"];

		if (!el) {
			return;
		}
		const style = assign({
			position: "absolute",
		}, userStyle);

		for (const property in style) {
			el.style[property as keyof StyleType] = style[property as keyof StyleType]!;
		}
		this._status.loadingSize = this.options.horizontal ? outerWidth(el) : outerHeight(el);
		const posName = this.options.horizontal ? "left" : "top";

		if (!(posName in style)) {
			const pos = isAppend ? this._getEdgeValue("end") : this._getEdgeValue("start") - this._status.loadingSize;

			el.style[posName] = `${pos}px`;
		}
	}
	private _updateItem(item: IInfiniteGridItem) {
		if (item && item.el) {
			item.content = item.el.outerHTML;

			!this.options.isEqualSize && resetSize(item);
			this._renderer.updateSize([item]);
			return true;
		}
		return false;
	}
	private _setScrollPos(pos: number) {
		this._watcher.setScrollPos(this._watcher.getContainerOffset() + pos);
	}
	private _scrollTo(pos: number) {
		this._watcher.scrollTo(this._watcher.getContainerOffset() + pos);
	}
	private _onImageError(e: IErrorCallbackOptions) {
		/**
		 * This event is fired when an error occurs in the image.
		 * @ko 이미지 로드에 에러가 날 때 발생하는 이벤트.
		 * @event eg.InfiniteGrid#imageError
		 * @param {eg.InfiniteGrid.IErrorCallbackOptions} e The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @example
	ig.on("imageError", e => {
	  e.remove();
	  e.removeItem();
	  e.replace("http://...jpg");
	  e.replace(imageElement);
	  e.replaceItem("item html");
	});
		 */
		this.trigger("imageError", assign(e, { element: e.item.el }));
	}
	private _setCursor(start: number, end: number) {
		const infinite = this._infinite;

		infinite.setCursor("start", start);
		infinite.setCursor("end", end);
	}
	private _registerComplete(callback: () => void) {
		this._renderComplete.once("complete", callback);
	}
	private _renderCache({
		cache,
		isAppend,
		fromCache = cache.every(group => group.state === GROUP_STATE.CACHED),
		isTrusted = true,
	}: {
		cache: IInfiniteGridGroup[],
		isAppend?: boolean,
		fromCache?: boolean,
		isTrusted?: boolean,
	}) {
		this._process(PROCESSING, true);
		const prefix = this.options.attributePrefix;
		const infinite = this._infinite;
		const renderer = this._renderer;
		const items = infinite.getVisibleItems();

		// NOT MOUNTED
		const notMountedItems = items.filter(item => !item.mounted);

		renderer.createAndInsert(notMountedItems, isAppend);

		notMountedItems.forEach(item => {
			item.mounted = true;
		});
		// NOT LOADED
		const notLoadedItems = items.filter(
			({ size, state }) => state === ITEM_STATE.NOT_LOADED
				|| (state > ITEM_STATE.LOADING && size && !size.width),
		);
		const result = check(notLoadedItems.map(item => item.el!), this.options.attributePrefix);

		// LOADING
		notLoadedItems.forEach(item => {
			item.state = ITEM_STATE.LOADING;
		});

		const replaceTarget: number[] = [];
		const removeTarget: HTMLElement[] = [];

		const finish = ({ remove, layout }: { remove: HTMLElement[], layout?: boolean }) => {
			remove.forEach(el => {
				this.remove(el, false);
			});

			layout && this.layout(false);
		};
		result.on("ready", () => {
			// LOADED
			renderer.updateSize(notLoadedItems);
			notLoadedItems.forEach(item => {
				item.state = ITEM_STATE.LOADED;
			});

			if (this.hasNotLoaded()) {
				return;
			}
			const loadedItems = infinite.getVisibleItems().filter(item => item.state >= ITEM_STATE.LOADED);
			const renderedItems = loadedItems.filter(item => item.state === ITEM_STATE.LOADED);

			loadedItems.forEach(item => {
				item.state = ITEM_STATE.COMPLETE;
			});

			this._layoutItems(loadedItems, isAppend);

			this._renderComplete.trigger("complete");
			this._onLayoutComplete({
				items: renderedItems,
				isAppend: !!isAppend,
				fromCache,
				isTrusted,
				useRecycle: false,
			});
		}).on("error", ({
			itemTarget,
			itemIndex,
			target,
		}) => {
			const item = notLoadedItems[itemIndex];

			// remove item
			const removeItem = () => {
				if (hasTarget(removeTarget, itemTarget)) {
					return;
				}
				removeTarget.push(itemTarget);
				const index = replaceTarget.indexOf(itemIndex);

				index !== -1 && replaceTarget.splice(index, 1);
			};
			// remove image
			const remove = () => {
				if (target === itemTarget) {
					removeItem();
					return;
				}
				if (hasTarget(removeTarget, itemTarget)) {
					return;
				}
				target.parentNode.removeChild(target);
				item.content = itemTarget.outerHTML;
				if (hasTarget(replaceTarget, itemIndex)) {
					return;
				}
				replaceTarget.push(itemIndex);
			};
			// replace image
			const replace = (src: string) => {
				if (hasTarget(removeTarget, itemTarget)) {
					return;
				}
				if (src) {
					if (matchHTML(src) || typeof src === "object") {
						const parentNode = target.parentNode;

						parentNode.insertBefore($(src), target);
						parentNode.removeChild(target);
						item.content = itemTarget.outerHTML;
					} else {
						target.src = src;
						if (target.getAttribute(`${prefix}width`)) {
							removeAutoSizer(target, prefix);
							target.removeAttribute(`${prefix}width`);
							target.removeAttribute(`${prefix}height`);
						}
					}
				}
				item.content = itemTarget.outerHTML;
				if (hasTarget(replaceTarget, itemIndex)) {
					return;
				}
				replaceTarget.push(itemIndex);
			};
			// replace item
			const replaceItem = (content: string) => {
				if (hasTarget(removeTarget, itemTarget)) {
					return;
				}
				itemTarget.innerHTML = content;
				item.content = itemTarget.outerHTML;
				if (hasTarget(replaceTarget, itemIndex)) {
					return;
				}
				replaceTarget.push(itemIndex);
			};

			this._onImageError({
				target,
				element: itemTarget,
				items: notLoadedItems,
				item,
				itemIndex,
				replace,
				replaceItem,
				remove,
				removeItem,
			});
		}).on("finish", () => {
			const removeTargetLength = removeTarget.length;
			const replaceTargetLength = replaceTarget.length;

			if (!removeTargetLength && !replaceTargetLength) {
				finish({ remove: [] });
				return;
			}
			const layoutedItems = replaceTarget.map(itemIndex => notLoadedItems[itemIndex]);

			if (!replaceTargetLength) {
				finish({ remove: removeTarget, layout: true });
				return;
			}
			// wait layoutComplete beacause of error event.
			check(layoutedItems.map(v => v.el!), prefix).on("ready", () => {
				this._renderer.updateSize(layoutedItems);
				finish({ remove: removeTarget, layout: true });
			});

		});
	}
	// called by visible
	private _request = (isAppend: boolean, isTrusted: boolean) => {
		if (this._isProcessing()) {
			return;
		}
		if (isAppend) {
			const group = this._items.getLastGroup();

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
				isTrusted,
				groupKey: group ? group.groupKey : "",
				startLoading: (userStyle: StyleType) => {
					this.startLoading(true, userStyle);
				},
				endLoading: (userStyle: StyleType) => {
					this.endLoading(userStyle);
				},
			});
		} else {
			const group = this._items.getFirstGroup();
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
				isTrusted,
				groupKey: group ? group.groupKey : "",
				startLoading: (userStyle: StyleType) => {
					this.startLoading(false, userStyle);
				},
				endLoading: (userStyle: StyleType) => {
					this.endLoading(userStyle);
				},
			});
		}
	}
	private _change = (isAppend: boolean, indexes: { start: number, end: number }, isTrusted: boolean) => {
		if (this._isProcessing()) {
			return;
		}
		let { start, end } = indexes;
		const infinite = this._infinite;
		const itemManager = this._items;
		const startCursor = infinite.getCursor("start");
		const endCursor = infinite.getCursor("end");

		if (
			this.isProcessing()
			&& (
				startCursor <= start && start <= endCursor
				|| startCursor <= end && end <= endCursor
			)
		) {
			start = Math.min(start, startCursor);
			end = Math.max(end, endCursor);
		}
		const cache = itemManager.sliceGroups(start, end + 1);

		this._setCursor(start, end);
		this._renderCache({
			cache,
			isAppend,
			isTrusted,
		});
		this._registerComplete(() => {
			this._recycle({ start: startCursor, end: start - 1 });
			this._recycle({ start: end + 1, end: endCursor });
		});
	}
	private _onResize() {
		this.layout(true);
	}
	private _onCheck({
		isForward,
		scrollPos,
		horizontal,
		orgScrollPos,
	}: {
		isForward: boolean,
		scrollPos: number,
		horizontal: boolean,
		orgScrollPos: number,
	}) {
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
	private _onLayoutComplete({
		items,
		isAppend,
		isTrusted = false,
		fromCache = false,
		isLayout = false,
	}: {
		items: IInfiniteGridItem[],
		isAppend: boolean,
		isTrusted: boolean,
		useRecycle: boolean,
		fromCache: boolean,
		isLayout?: boolean,
	}) {
		const viewSize = this._renderer.getViewSize();

		if (!isAppend) {
			this._fit();
		} else {
			this._isLoading() && this._renderLoading();
		}

		const watcher = this._watcher;
		const scrollPos = watcher.getScrollPos();
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
			endLoading: (userStyle: StyleType) => {
				this.endLoading(userStyle);
			},
		});
		this._infinite.scroll(scrollPos);
	}
	private _reset() {
		this._status = {
			processingStatus: IDLE,
			loadingSize: 0,
			loadingStyle: {},
		};
	}
}

export default InfiniteGrid;
