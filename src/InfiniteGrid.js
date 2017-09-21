/**
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
*/
import Component from "@egjs/component";
import EventHandler from "./eventHandler";
import {document, window} from "./browser";
import {RETRY, IS_ANDROID2, CONTAINER_CLASSNAME} from "./consts";
import {Mixin, utils} from "./utils";
import ImageLoaded from "./ImageLoaded";
import LayoutManager from "./LayoutManager";

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
const InfiniteGrid = class InfiniteGrid
	extends Mixin(Component).with(EventHandler) {
	/**
	 * @param {HTMLElement|String|jQuery} element A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
	 * @param {Object} [options] The option object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
	 * @param {String} [options.itemSelector] A selector to select card elements that make up the layout<ko>레이아웃을 구성하는 카드 엘리먼트를 선택할 선택자(selector)</ko>
	 * @param {Number} [options.count=30] The number of DOMs handled by module. If the count value is greater than zero, the number of DOMs is maintained. If the count value is zero or less than zero, the number of DOMs will increase as card elements are added. <ko>모듈이 유지할 실제 DOM의 개수. count 값이 0보다 크면 DOM 개수를 일정하게 유지한다. count 값이 0 이하면 카드 엘리먼트가 추가될수록 DOM 개수가 계속 증가한다.</ko>
	 * @param {String} [options.defaultGroupKey=null] The default group key configured in a card element contained in the markup upon initialization of a module object <ko>모듈 객체를 초기화할 때 마크업에 있는 카드 엘리먼트에 설정할 그룹 키 </ko>
	 * @param {Boolean} [options.isEqualSize=false] Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved. <ko>카드 엘리먼트의 크기가 동일한지 여부. 배치될 카드 엘리먼트의 크기가 모두 동일할 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
	 * @param {Boolean} [options.isOverflowScroll=false] Indicates whether overflow:scroll is applied<ko>overflow:scroll 적용여부를 결정한다.</ko>
	 * @param {Number} [options.threshold=300] The threshold size of an event area where card elements are added to a layout.<br>- append event: If the current vertical position of the scroll bar is greater than "the bottom property value of the card element at the top of the layout" plus "the value of the threshold option", the append event will occur.<br>- prepend event: If the current vertical position of the scroll bar is less than "the bottom property value of the card element at the top of the layout" minus "the value of the threshold option", the prepend event will occur. <ko>−	레이아웃에 카드 엘리먼트를 추가하는 이벤트가 발생하는 기준 영역의 크기.<br>- append 이벤트: 현재 스크롤의 y 좌표 값이 '레이아웃의 맨 아래에 있는 카드 엘리먼트의 top 속성의 값 + threshold 옵션의 값'보다 크면 append 이벤트가 발생한다.<br>- prepend 이벤트: 현재 스크롤의 y 좌표 값이 '레이아웃의 맨 위에 있는 카드 엘리먼트의 bottom 속성의 값 - threshold 옵션의 값'보다 작으면 prepend 이벤트가 발생한다</ko>
	 *
	 */
	constructor(el, options) {
		super(el, options);
		Object.assign(this.options = {
			isEqualSize: false,
			defaultGroupKey: null,
			count: 100,
			isOverflowScroll: false,
			itemSelector: "*",
			threshold: 300,
		}, options);
		IS_ANDROID2 && (this.options.isOverflowScroll = false);

		this._initElements(el);
		this.layoutManager = new LayoutManager(this.el, this.options);
		this._reset();
		this._resizeViewport();

		// for IE8
		let elements = [];

		for (let i = 0, children = this.el.children, len = children.length;
			i < len; i++) {
			elements.push(children[i]);
		}
		elements = this._selectItems(elements);
		if (elements.length > 0) {
			this.layout(
				true,
				LayoutManager.itemize(elements, this.options.defaultGroupKey)
			);
		}
		this._attachEvent();
	}

	_initElements(el) {
		const base = utils.$(el);

		if (this.options.isOverflowScroll) {
			let container = base.querySelector(`.${CONTAINER_CLASSNAME}`);

			if (!container) {
				container = document.createElement("div");
				container.className = CONTAINER_CLASSNAME;

				const children = base.children;
				const length = children.length;	// for IE8

				for (let i = 0; i < length; i++) {
					container.appendChild(children[0]);
				}
				base.style.overflowY = "scroll";
				base.appendChild(container);
			}
			this.view = base;
			this.el = container;
		} else {
			this.view = window;
			this.el = base;
		}
	}

	_resizeViewport() {
		this._status.clientHeight = utils.innerHeight(this.view);
	}

	/**
	 * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
	 * @ko 카드의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
	 * @return {Object} State object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
	 */
	getStatus() {
		const data = {};
		const target = this.view === window ? this.el : this.view;

		for (const p in this._status) {
			if (this._status.hasOwnProperty.call(p) &&
				!(this._status[p] instanceof Element)) {
				data[p] = this._status[p];
			}
		}
		return {
			html: target.innerHTML,
			cssText: target.style.cssText,
			layoutManager: this.layoutManager.getStatus(),
			options: Object.assign({}, this.options),
			prop: data,
			scrollPos: utils.scrollTop(this.view),
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
		if (!status || !status.options || !status.prop ||
			!status.layoutManager || !status.html || !status.cssText || !("scrollPos" in status)) {
			return this;
		}
		const target = status.options.isOverflowScroll ? this.view : this.el;

		this._detachEvent();
		this._initElements(this.view === window ? this.el : this.view);
		target.style.cssText = status.cssText;
		target.innerHTML = status.html;
		Object.assign(this.options, status.options);
		Object.assign(this._status, status.prop);
		this.layoutManager.setStatus(status.layoutManager);
		this._status.topElement = this.getTopElement();
		this._status.bottomElement = this.getBottomElement();
		this._attachEvent();
		applyScrollPos && utils.scrollTo(this.view, 0, status.scrollPos);
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

	/**
	 * Checks whether the total number of added card elements is greater than the value of the count option. Note that the value of the count option is always greater than zero. If it returns true, the number of DOMs won't increase even though card elements are added; instead of adding a new DOM, existing DOMs are recycled to maintain the number of DOMs.
	 * @ko 추가된 카드 엘리먼트의 전체 개수가 count 옵션의 값보다 큰지 확인한다. 단, count 옵션의 값은 0보다 크다. 'true'가 반환되면 카드 엘리먼트가 더 추가돼도 DOM의 개수를 증가하지 않고 기존 DOM을 재활용(recycle)해 DOM의 개수를 일정하게 유지한다
	 * @return {Boolean} Indicates whether the total number of added card elements is greater than the value of the count option. <ko>추가된 카드 엘리먼트의 전체 개수가 count 옵션의 값보다 큰지 여부</ko>
	 */
	isRecycling() {
		return (this.options.count > 0) && this._status.isRecycling;
	}

	/**
	 * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, it returns undefined as a group key.
	 * @ko 현재 유지하고 있는 카드 엘리먼트의 그룹 키 목록을 반환한다. 여러 개의 카드 엘리먼트를 묶어서 관리할 수 있도록 append() 메서드나 prepend() 메서드에서 그룹 키를 지정할 수 있다. append() 메서드나 prepend() 메서드에서 그룹 키를 지정하지 않았다면 'undefined'가 그룹 키로 반환된다
	 * @return {Array} List of group keys <ko>그룹 키의 목록</ko>
	 */
	getGroupKeys() {
		return this.layoutManager.getGroupKeys();
	}

	/**
	 * Rearranges a layout.
	 * @ko 레이아웃을 다시 배치한다.
	 * @param {Boolean} [isRelayout=true] Indicates whether a card element is being relayouted <ko>카드 엘리먼트 재배치 여부</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 *
	 */
	layout(isRelayout = true, _addItems, _options) {
		/**
		 * [private parameter]
		 * _addItems: added items
		 * _options: {
		 *	 isAppend: Checks whether the append() method is used to add a card element.
		 *	 removedCount: The number of deleted card elements to maintain the number of DOMs.
		 *   isTrusted: Returns true if an event was generated by the user action, or false if it was caused by a script or API call
		 * }
		 */
		this._status.isProcessing = true;
		const options = Object.assign({
			isAppend: true,
			removedCount: 0,
			isTrusted: false,
		}, _options);

		// for exception
		if (!_addItems && !options.isAppend) {
			options.isAppend = true;
		}
		this._waitResource(
			isRelayout,
			options.isAppend ? _addItems : _addItems.reverse(),
			options
		);
		return this;
	}
	_onLayoutComplete(isRelayout, addItems, options) {
		this.layoutManager.layoutItems(isRelayout, addItems, options);
		this._postLayout(isRelayout, addItems, options);
	}

	/**
	 * Adds a card element at the bottom of a grid layout. This method is available only if the isProcessing() method returns false.
	 * @ko 카드 엘리먼트를 그리드 레이아웃의 아래에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
	 * 이 메소드는 isProcessing()의 반환값이 false일 경우에만 사용 가능하다.
	 * @param {Array|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트의 배열</ko>
	 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 'undefined'로 설정된다</ko>
	 * @return {Number} The number of added card elements <ko>추가된 카드 엘리먼트의 개수</ko>
	 */
	append(paramElements, groupKey) {
		return this._insert(paramElements, groupKey, true);
	}

	/**
	 * Adds a card element at the top of a grid layout. This method is available only if the isProcessing() method returns false and the isRecycling() method returns true.
	 * @ko 카드 엘리먼트를 그리드 레이아웃의 위에 추가한다. isProcessing() 메서드의 반환값이 'false'이고, isRecycling() 메서드의 반환값이 'true'일 때만 이 메서드를 사용할 수 있다
	 * @param {Array|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트 배열</ko>
	 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 'undefined'로 설정된다</ko>
	 * @return {Number} The number of added card elements <ko>추가된 카드 엘리먼트의 개수</ko>
	 */
	prepend(paramElements, groupKey) {
		return this._insert(paramElements, groupKey, false);
	}

	/**
	 * Clears added card elements and data.
	 * @ko 추가된 카드 엘리먼트와 데이터를 모두 지운다.
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	clear() {
		this.el.innerHTML = "";
		this.el.style.height = "";
		this._reset();
		return this;
	}


	/**
	 * Returns a card element at the top of a layout.
	 * @ko 레이아웃의 맨 위에 있는 카드 엘리먼트를 반환한다.
	 *
	 * @return {HTMLElement} Card element at the top of a layout. (if the position of card elements are same, it returns the first left element) <ko>레이아웃의 맨 위에 있는 카드 엘리먼트 (카드의 위치가 같은 경우, 왼쪽 엘리먼트가 반환된다)</ko>
	 */
	getTopElement() {
		const item = this.layoutManager.getTopItem();

		return item && item.el;
	}

	/**
	 * Returns a card element at the bottom of a layout.
	 * @ko 레이아웃의 맨 아래에 있는 카드 엘리먼트를 반환한다.
	 *
	 * @return {HTMLElement} Card element at the bottom of a layout (if the position of card elements are same, it returns the first right element)<ko>레이아웃의 맨 아래에 있는 카드 엘리먼트 (카드의 위치가 같은 경우, 오른쪽 엘리먼트가 반환된다)</ko>
	 */
	getBottomElement() {
		const item = this.layoutManager.getBottomItem();

		return item && item.el;
	}

	_resizeContainerHeight() {
		this.el.style.height = `${this.layoutManager.getLogicalHeight()}px`;
	}

	_postLayout(isRelayout, addItems = [], options) {
		if (!this.isProcessing()) {
			return;
		}
		this._resizeContainerHeight();
		this._timer.doubleCheckCount = RETRY;

		// refresh element
		this._status.topElement = this.getTopElement();
		this._status.bottomElement = this.getBottomElement();

		let distance = 0;

		if (!options.isAppend) {
			distance = addItems.length >= this.layoutManager.items.length ?
				0 : this.layoutManager.items[addItems.length].position.y;
			if (distance > 0) {
				this._status.prevScrollTop = utils.scrollTop(this.view) + distance;
				utils.scrollTo(this.view, 0, this._status.prevScrollTop);
			}
		}

		// reset flags
		this._status.isProcessing = false;

		/**
		 * This event is fired when layout is successfully arranged through a call to the append(), prepend(), or layout() method.
		 * @ko 레이아웃 배치가 완료됐을 때 발생하는 이벤트. append() 메서드나 prepend() 메서드, layout() 메서드 호출 후 카드의 배치가 완료됐을 때 발생한다
		 * @event eg.InfiniteGrid#layoutComplete
		 *
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {Array} param.target Rearranged card elements<ko>재배치된 카드 엘리먼트들</ko>
		 * @param {Boolean} param.isAppend Checks whether the append() method is used to add a card element. It returns true even though the layoutComplete event is fired after the layout() method is called. <ko>카드 엘리먼트가 append() 메서드로 추가됐는지 확인한다. layout() 메서드가 호출된 후 layoutComplete 이벤트가 발생해도 'true'를 반환한다.</ko>
		 * @param {Number} param.distance Distance the card element at the top of a grid layout has moved after the layoutComplete event is fired. In other words, it is the same as an increased height with a new card element added using the prepend() method <ko>그리드 레이아웃의 맨 위에 있던 카드 엘리먼트가 layoutComplete 이벤트 발생 후 이동한 거리. 즉, prepend() 메서드로 카드 엘리먼트가 추가돼 늘어난 높이다.</ko>
		 * @param {Number} param.croppedCount The number of deleted card elements to maintain the number of DOMs<ko>일정한 DOM 개수를 유지하기 위해, 삭제한 카드 엘리먼트들의 개수</ko>
		 * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
		 */
		this.trigger("layoutComplete", {
			target: addItems.concat(),
			isAppend: options.isAppend,
			distance,
			croppedCount: options.removedCount,
			isTrusted: options.isTrusted,
		});

		!options.isAppend && this._doubleCheckForPrepend();
	}

	_doubleCheckForPrepend() {
		// doublecheck!!! (workaround)
		if (utils.scrollTop(this.view) === 0) {
			clearInterval(this._timer.doubleCheck);
			this._timer.doubleCheck = setInterval(() => {
				if (utils.scrollTop(this.view) === 0) {
					this.trigger("prepend", {
						scrollTop: 0,
					});
					(--this._timer.doubleCheckCount <= 0) && clearInterval(this._timer.doubleCheck);
				}
			}, 500);
		}
	}

	_selectItems(elements) {
		return elements.filter(v => {
			if (this.options.itemSelector === "*") {
				return /DIV|SPAN|LI/.test(v.tagName);
			} else {
				return v.className.split(" ")
					.some(c => c === this.options.itemSelector);
			}
		});
	}

	_prepareElement(paramElements) {
		let elements = utils.$(paramElements, true);

		elements = this._selectItems(elements);
		this._status.isProcessing = true;
		if (!this.isRecycling()) {
			this._status.isRecycling =
				(this.layoutManager.items.length + elements.length) >= this.options.count;
		}
		return elements;
	}

	// elements => [HTMLElement, HTMLElement, ...]
	_insert(paramElements, groupKey, isAppend) {
		if (this.isProcessing() || paramElements.length === 0) {
			return 0;
		}
		const elements = this._prepareElement(paramElements);
		const cloneElements = elements.concat();
		const dummy = `${-this._status.clientHeight}px`;

		elements.forEach(v => {
			v.style.position = "absolute";
			v.style.top = dummy;
		});
		const removedCount = this._adjustRange(isAppend, cloneElements);

		// prepare HTML
		const docFragment = document.createDocumentFragment();

		cloneElements.forEach(v => docFragment.appendChild(v));
		isAppend ? this.el.appendChild(docFragment) :
			this.el.insertBefore(docFragment, this.el.firstChild);
		this.layout(
			false,
			LayoutManager.itemize(cloneElements, groupKey),
			{
				isAppend,
				removedCount,
			}
		);
		// console.info("remove count", removedCount, this.el.children.length, "+", elements.length, "||", cloneElements.length);

		return cloneElements.length;
	}

	_waitResource(isRelayout, addItems, options) {
		const needCheck = ImageLoaded.checkImageLoaded(this.el);
		const callback = function() {
			this._onLayoutComplete(isRelayout, addItems, options);
		}.bind(this);

		if (needCheck.length > 0) {
			ImageLoaded.waitImageLoaded(needCheck, callback);
		} else {
			// convert to async
			setTimeout(() => {
				callback && callback();
			}, 0);
		}
	}

	_adjustRange(isTop, elements) {
		let removedCount = 0;

		if (!this.isRecycling()) {
			return removedCount;
		}

		// trim $elements
		if (this.options.count <= elements.length) {
			removedCount += isTop ?
				elements.splice(0, elements.length - this.options.count).length :
				elements.splice(this.options.count).length;
		}

		const diff = this.layoutManager.items.length + elements.length - this.options.count;
		let idx;

		if (diff <= 0 || (idx = this.layoutManager.getDelimiterIndex(isTop, diff)) < 0) {
			return removedCount;
		}

		const targets = this.layoutManager.adjustItems(isTop, idx);

		// @todo improve performance
		targets.forEach(v => {
			idx = elements.indexOf(v.el);
			if (idx !== -1) {
				elements.splice(idx, 1);
			} else {
				v.el.parentNode.removeChild(v.el);
			}
		});
		removedCount += targets.length;
		return removedCount;
	}

	/**
	* Removes extra space caused by adding card elements.
	* @private
	*/
	_fitItems() {
		const y = this.layoutManager.fit();

		(y !== 0) && this._resizeContainerHeight();
		return y;
	}

	_reset() {
		this._status = {
			isProcessing: false,
			isRecycling: false,
			prevScrollTop: 0,
			topElement: null,
			bottomElement: null,
			clientHeight: this._status && this._status.clientHeight,
		};
		this._timer = {
			resize: null,
			doubleCheck: null,
			doubleCheckCount: RETRY,
		};
		this.layoutManager.resetCols();
		this.layoutManager.clear();
	}

	/**
	 * Removes a item element on a grid layout.
	 * @ko 그리드 레이아웃의 카드 엘리먼트를 삭제한다.
	 * @param {HTMLElement} item element to be removed <ko>삭제될 아이템 엘리먼트</ko>
	 * @return {Object}  Removed item element <ko>삭제된 아이템 엘리먼트 정보</ko>
	 */
	remove(element) {
		return this.layoutManager.removeItem(element);
	}

	/**
	 * Destroys elements, properties, and events used on a grid layout.
	 * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
	 */
	destroy() {
		this.off();
		this._detachEvent();
		this._reset();
	}
};

InfiniteGrid.VERSION = "#__VERSION__#";
export default InfiniteGrid;
