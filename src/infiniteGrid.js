import Component from "eg.component";
import EventHandler from "./eventHandler";
import {Mixin, utils} from "./utils";
import {window, document} from "./browser";
import ImageLoaded from "./imageloaded";

/**
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/

// jscs:disable validateLineBreaks, maximumLineLength
const InfiniteGrid = class InfiniteGrid
extends Mixin(Component).with(EventHandler) {
	/**
	 * A module used to arrange card elements including content infinitely on a grid layout. With this module, you can implement a grid-pattern user interface composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
	 * @group egjs
	 * @ko 콘텐츠가 있는 카드 엘리먼트를 그리드 레이아웃에 무한으로 배치하는 모듈. 다양한 크기의 카드 엘리먼트를 격자 모양으로 배치하는 UI를 만들 수 있다. 카드 엘리먼트의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
	 * @class
	 * @name eg.InfiniteGrid
	 * @extends eg.Component
	 *
	 * @param {HTMLElement|String|jQuery} element A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
	 * @param {Object} [options] The option object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
	 * @param {String} [options.itemSelector] A selector to select card elements that make up the layout (@deprecated since 1.3.0)<ko>레이아웃을 구성하는 카드 엘리먼트를 선택할 선택자(selector) (@deprecated since 1.3.0)</ko>
	 * @param {Number} [options.count=30] The number of DOMs handled by module. If the count value is greater than zero, the number of DOMs is maintained. If the count value is zero or less than zero, the number of DOMs will increase as card elements are added. <ko>모듈이 유지할 실제 DOM의 개수. count 값이 0보다 크면 DOM 개수를 일정하게 유지한다. count 값이 0 이하면 카드 엘리먼트가 추가될수록 DOM 개수가 계속 증가한다.</ko>
	 * @param {String} [options.defaultGroupKey=null] The default group key configured in a card element contained in the markup upon initialization of a module object <ko>모듈 객체를 초기화할 때 마크업에 있는 카드 엘리먼트에 설정할 그룹 키 </ko>
	 * @param {Boolean} [options.isEqualSize=false] Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved. <ko>카드 엘리먼트의 크기가 동일한지 여부. 배치될 카드 엘리먼트의 크기가 모두 동일할 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
	 * @param {Number} [options.threshold=300] The threshold size of an event area where card elements are added to a layout.<br>- append event: If the current vertical position of the scroll bar is greater than "the bottom property value of the card element at the top of the layout" plus "the value of the threshold option", the append event will occur.<br>- prepend event: If the current vertical position of the scroll bar is less than "the bottom property value of the card element at the top of the layout" minus "the value of the threshold option", the prepend event will occur. <ko>−	레이아웃에 카드 엘리먼트를 추가하는 이벤트가 발생하는 기준 영역의 크기.<br>- append 이벤트: 현재 스크롤의 y 좌표 값이 '레이아웃의 맨 아래에 있는 카드 엘리먼트의 top 속성의 값 + threshold 옵션의 값'보다 크면 append 이벤트가 발생한다.<br>- prepend 이벤트: 현재 스크롤의 y 좌표 값이 '레이아웃의 맨 위에 있는 카드 엘리먼트의 bottom 속성의 값 - threshold 옵션의 값'보다 작으면 prepend 이벤트가 발생한다</ko>
	 *
	 * @codepen {"id":"zvrbap", "ko":"InfiniteGrid 데모", "en":"InfiniteGrid example", "collectionId":"DPYEww", "height": 403}
	 *  @support {"ie": "8+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
	 *
	 * @example
		<!-- HTML -->
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
	 */
	constructor(el, options) {
		super();
		Object.assign(this.options = {
			isEqualSize: false,
			defaultGroupKey: null,
			count: 30,
			threshold: 300
		}, options);

		// if el is jQuery instance, el should change to HTMLElement.
		this.el = utils.getElement(el);
		this.el.style.position = "relative";
		this._appendCols = this._prependCols = [];

		this.view = window;
		this._reset();
		this._refreshViewport();
		if (this.el.children.length > 0) {
			this.items = this._itemize(
				Array.from(this.el.children), this.options.defaultGroupKey, true);
			this.layout(this.items, true);
		}

		this._onScroll = this._onScroll.bind(this);
		this._onResize = this._onResize.bind(this);
		utils.addEvent(this.view, this._onScroll);
		utils.addEvent(this.view, this._onResize);
	}

	_refreshViewport() {
		if (this.view) {
			// this._clientHeight = this.view[this.view === window ? "innerHeight" : "clientHeight"]();
			// @todo
			this._clientHeight = utils.innerHeight(this.view);
		}
	}

	/**
	 * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
	 * @ko 카드의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
	 * @method eg.InfiniteGrid#getStatue
	 * @return {Object} State object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
	 */
	getStatus() {
		const data = {};
		for (const p in this) {
			if (this.hasOwnProperty(p) && /^_/.test(p) &&
				typeof this[p] !== "function" && !(this[p] instanceof Element)) {
				data[p] = this[p];
			}
		}
		return {
			prop: data,
			options: Object.assign({}, this.options),
			items: this.items.map(v => {
				const clone = Object.assign({}, v);
				delete clone.el;
				return clone;
			}),
			html: this.el.innerHTML,
			cssText: this.el.style.cssText
		};
	}

	/**
	 * Sets the state of the eg.InfiniteGrid module with the information returned through a call to the getStatue() method.
	 * @ko getStatue() 메서드가 저장한 정보로 eg.InfiniteGrid 모듈의 상태를 설정한다.
	 * @method eg.InfiniteGrid#setStatus
	 * @param {Object} status State object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	setStatus(status) {
		if (!status || !status.cssText || !status.html ||
			!status.prop || !status.items) {
			return this;
		}
		this.el.style.cssText = status.cssText;
		this.el.innerHTML = status.html;
		Object.assign(this, status.prop);
		this._topElement = this._bottomElement = null;
		this.items = Array.from(this.el.children).map((v, i) => {
			status.items[i].el = v;
			return status.items[i];
		});
		return this;
	}

	/**
	 * Checks whether a card element is being added.
	 * @ko 카드 엘리먼트 추가가 진행 중인지 확인한다
	 * @method eg.InfiniteGrid#isProcessing
	 * @return {Boolean} Indicates whether a card element is being added <ko>카드 엘리먼트 추가 진행 중 여부</ko>
	 */
	isProcessing() {
		return this._isProcessing;
	}

	/**
	 * Checks whether the total number of added card elements is greater than the value of the count option. Note that the value of the count option is always greater than zero. If it returns true, the number of DOMs won't increase even though card elements are added; instead of adding a new DOM, existing DOMs are recycled to maintain the number of DOMs.
	 * @ko 추가된 카드 엘리먼트의 전체 개수가 count 옵션의 값보다 큰지 확인한다. 단, count 옵션의 값은 0보다 크다. 'true'가 반환되면 카드 엘리먼트가 더 추가돼도 DOM의 개수를 증가하지 않고 기존 DOM을 재활용(recycle)해 DOM의 개수를 일정하게 유지한다
	 * @method eg.InfiniteGrid#isRecycling
	 * @return {Boolean} Indicates whether the total number of added card elements is greater than the value of the count option. <ko>추가된 카드 엘리먼트의 전체 개수가 count 옵션의 값보다 큰지 여부</ko>
	 */
	isRecycling() {
		return (this.options.count > 0) && this._isRecycling;
	}

	/**
	 * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, it returns undefined as a group key.
	 * @ko 현재 유지하고 있는 카드 엘리먼트의 그룹 키 목록을 반환한다. 여러 개의 카드 엘리먼트를 묶어서 관리할 수 있도록 append() 메서드나 prepend() 메서드에서 그룹 키를 지정할 수 있다. append() 메서드나 prepend() 메서드에서 그룹 키를 지정하지 않았다면 'undefined'가 그룹 키로 반환된다
	 * @method eg.InfiniteGrid#getGroupKeys
	 * @return {Array} List of group keys <ko>그룹 키의 목록</ko>
	 */
	getGroupKeys() {
		return this.items.map(v => v.groupKey);
	}

	/**
	 * Rearranges a layout.
	 * @ko 레이아웃을 다시 배치한다.
	 * @method eg.InfiniteGrid#layout
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	layout(items, isRefresh) {
		items = items || this.items;
		isRefresh = typeof isRefresh === "undefined" ? true : isRefresh;
		this._isProcessing = true;
		isRefresh && (items = items.map(v => {
			v.isAppend = true;
			return v;
		}));
		this._waitResource(items, isRefresh);
		return this;
	}

	_layoutItems(items) {
		// for performance
		items.map(v => {
			v.position = this._getItemLayoutPosition(v);
			return v;
		}).forEach(v => {
			if (v.el) {
				const style = v.el.style;
				style.left = `${v.position.x}px`;
				style.top = `${v.position.y}px`;
			}
		});
	}

	/**
	 * Adds a card element at the bottom of a grid layout. This method is available only if the isProcessing() method returns false.
	 * @ko 카드 엘리먼트를 그리드 레이아웃의 아래에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
	 * 이 메소드는 isProcessing()의 반환값이 false일 경우에만 사용 가능하다.
	 * @method eg.InfiniteGrid#append
	 * @param {Array|String|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트의 배열</ko>
	 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 'undefined'로 설정된다</ko>
	 * @return {Number} The number of added card elements <ko>추가된 카드 엘리먼트의 개수</ko>
	 */
	append(elements, groupKey) {
		if (this._isProcessing || elements.length === 0) {
			return;
		}

		elements = utils.getElements(elements);
		elements = elements.filter(v => /DIV|SPAN|LI/.test(v.tagName));
		this._isProcessing = true;
		if (!this.isRecycling()) {
			this._isRecycling =
			(this.items.length + elements.length) >= this.options.count;
		}
		this._insert(elements, groupKey, true);
		return elements.length;
	}

	/**
	 * Adds a card element at the top of a grid layout. This method is available only if the isProcessing() method returns false and the isRecycling() method returns true.
	 * @ko 카드 엘리먼트를 그리드 레이아웃의 위에 추가한다. isProcessing() 메서드의 반환값이 'false'이고, isRecycling() 메서드의 반환값이 'true'일 때만 이 메서드를 사용할 수 있다
	 * @method eg.InfiniteGrid#prepend
	 * @param {Array|String|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트 배열</ko>
	 * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 'undefined'로 설정된다</ko>
	 * @return {Number} The number of added card elements <ko>추가된 카드 엘리먼트의 개수</ko>
	 */
	prepend(elements, groupKey) {
		if (!this.isRecycling() || this._removedContent === 0 ||
			this._isProcessing || elements.length === 0) {
			return;
		}

		elements = utils.getElements(elements);
		elements = elements.filter(v => /DIV|SPAN|LI/.test(v.tagName));
		this._isProcessing = true;
		this._fit();
		if (elements.length > this._removedContent) {
			elements = elements.slice(0, this._removedContent);
		}
		this._insert(elements, groupKey, false);
		return elements.length;
	}

	/**
	 * Clears added card elements and data.
	 * @ko 추가된 카드 엘리먼트와 데이터를 모두 지운다.
	 * @method eg.InfiniteGrid#clear
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	clear() {
		this.el.innerHTML = "";
		this.el.style.height = "";
		this._reset();
		return this;
	}

	_getTopItem() {
		let item = null;
		let min = Infinity;
		this._getColItems(false).forEach(v => {
			if (v && v.position.y < min) {
				min = v.position.y;
				item = v;
			}
		});
		return item;
	}

	/**
	 * Returns a card element at the top of a layout.
	 * @ko 레이아웃의 맨 위에 있는 카드 엘리먼트를 반환한다.
	 * @method eg.InfiniteGrid#getTopElement
	 *
	 * @return {HTMLElement} Card element at the top of a layout <ko>레이아웃의 맨 위에 있는 카드 엘리먼트</ko>
	 */
	getTopElement() {
		const item = this._getTopItem();
		return item && item.el;
	}

	_getBottomItem() {
		let item = null;
		let max = -Infinity;
		this._getColItems(true).forEach(v => {
			if (v && v.position.y + v.size.height > max) {
				max = v.position.y + v.size.height;
				item = v;
			}
		});
		return item;
	}

	/**
	 * Returns a card element at the bottom of a layout.
	 * @ko 레이아웃의 맨 아래에 있는 카드 엘리먼트를 반환한다.
	 * @method eg.InfiniteGrid#getBottomElement
	 *
	 * @return {HTMLElement} Card element at the bottom of a layout <ko>레이아웃의 맨 아래에 있는 카드 엘리먼트</ko>
	 */
	getBottomElement() {
		const item = this._getBottomItem();
		return item && item.el;
	}

	_postLayout(items) {
		if (!this._isProcessing || items.length <= 0) {
			return;
		}

		const size = this._getContainerSize();
		this.el.style.height = `${size.height}px`;

		// refresh element
		this._topElement = this.getTopElement();
		this._bottomElement = this.getBottomElement();

		let distance = 0;
		const isAppend = items[0].isAppend;
		if (!isAppend) {
			this._isFitted = false;
			this._fit(true);
			distance = items.length >= this.items.length ?
				0 : this.items[items.length].position.y;
			if (distance > 0) {
				this._prevScrollTop = utils.scrollTop() + distance;
				this.view.scrollTo(0, this._prevScrollTop);
			}
		}

		// reset flags
		this._isProcessing = false;

		/**
		 * This event is fired when layout is successfully arranged through a call to the append(), prepend(), or layout() method.
		 * @ko 레이아웃 배치가 완료됐을 때 발생하는 이벤트. append() 메서드나 prepend() 메서드, layout() 메서드 호출 후 카드의 배치가 완료됐을 때 발생한다
		 * @name eg.InfiniteGrid#layoutComplete
		 * @event
		 *
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {Array} param.target Rearranged card elements<ko>재배치된 카드 엘리먼트들</ko>
		 * @param {Boolean} param.isAppend Checks whether the append() method is used to add a card element. It returns true even though the layoutComplete event is fired after the layout() method is called. <ko>카드 엘리먼트가 append() 메서드로 추가됐는지 확인한다. layout() 메서드가 호출된 후 layoutComplete 이벤트가 발생해도 'true'를 반환한다.</ko>
		 * @param {Number} param.distance Distance the card element at the top of a grid layout has moved after the layoutComplete event is fired. In other words, it is the same as an increased height with a new card element added using the prepend() method <ko>그리드 레이아웃의 맨 위에 있던 카드 엘리먼트가 layoutComplete 이벤트 발생 후 이동한 거리. 즉, prepend() 메서드로 카드 엘리먼트가 추가돼 늘어난 높이다.</ko>
		 * @param {Number} param.croppedCount The number of deleted card elements to maintain the number of DOMs<ko>일정한 DOM 개수를 유지하기 위해, 삭제한 카드 엘리먼트들의 개수</ko>
		 */
		this.trigger("layoutComplete", {
			target: items.concat(),
			isAppend,
			distance,
			croppedCount: this._removedContent
		});
	}

	// elements => [HTMLElement, HTMLElement, ...]
	_insert(elements, groupKey, isAppend) {
		if (elements.length === 0) {
			return;
		}
		const cloneElements = elements.concat();
		const dummy = `${-this._clientHeight}px`;
		elements.forEach(v => {
			v.style.position = "absolute";
			v.style.top = dummy;
		});
		let items = this._itemize(elements, groupKey, isAppend);
		if (isAppend) {
			this.items = this.items.concat(items);
		} else {
			this.items = items.concat(this.items);
			items = items.reverse();
		}
		this.isRecycling() && this._adjustRange(isAppend, cloneElements);

		const docFragment = document.createDocumentFragment();
		cloneElements.forEach(v => {
			docFragment.appendChild(v);
		});
		if (isAppend) {
			this.el.appendChild(docFragment);
		} else {
			this.el.insertBefore(docFragment, this.el.firstChild);
		}
		this.layout(items, false);
	}

	_waitResource(items, isRefresh) {
		const needCheck = ImageLoaded.checkImageLoaded(this.el);
		const self = this;
		const callback = function() {
			if (self._isProcessing) {
				if (isRefresh || !self._appendCols.length) {
					items.forEach(v => {
						v.el.style.position = "absolute";
					});
					self._measureColumns();
				}
				self._layoutItems(items);
				self._postLayout(items);
			}
		};
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
		const diff = this.items.length - this.options.count;
		let targets;
		let idx;
		if (diff <= 0 || (idx = this._getDelimiterIndex(isTop, diff)) < 0) {
			return;
		}
		if (isTop) {
			targets = this.items.splice(0, idx);
			this._isFitted = false;
		} else {
			targets = this.items.splice(idx, this.items.length - idx);
		}

		// @todo improve performance
		targets.forEach(v => {
			idx = elements.index(v.el);
			if (idx !== -1) {
				elements.splice(idx, 1);
			} else {
				v.el.parentNode.removeChild(v.el);
			}
		});
		this._removedContent += isTop ? targets.length : -targets.length;
	}

	_getDelimiterIndex(isTop, removeCount) {
		const len = this.items.length;
		let i;
		let idx = 0;
		const baseIdx = isTop ? removeCount - 1 : len - removeCount;
		const targetIdx = baseIdx + (isTop ? 1 : -1);
		const groupKey = this.items[baseIdx].groupKey;
		if (groupKey != null && groupKey === this.items[targetIdx].groupKey) {
			if (isTop) {
				for (i = baseIdx; i > 0; i--) {
					if (groupKey !== this.items[i].groupKey) {
						break;
					}
				}
				idx = i === 0 ? -1 : i + 1;
			} else {
				for (i = baseIdx; i < len; i++) {
					if (groupKey !== this.items[i].groupKey) {
						break;
					}
				}
				idx = i === len ? -1 : i;
			}
		} else {
			idx = isTop ? targetIdx : baseIdx;
		}
		return idx;
	}

	// fit size
	_fit(applyDom) {
		// for caching
		if (this.options.count <= 0) {
			this._fit = function() {
				return false;
			};
			this._isFitted = true;
			return false;
		}

		if (this._isFitted) {
			return false;
		}
		const y = this._updateCols();	// for prepend
		this.items.forEach(v => {
			v.position.y -= y;
			applyDom && (v.el.style.top = `${v.position.y}px`);
		});
		this._updateCols(true);	// for append
		const height = this._getContainerSize().height;
		applyDom && (this.el.style.height = `${height}px`);
		this._isFitted = true;
		return true;
	}

	/**
	* Removes extra space caused by adding card elements.
	* @ko 카드 엘리먼트를 추가한 다음 생긴 빈 공간을 제거한다
	* @method eg.InfiniteGrid#fit
	* @deprecated since version 1.3.0
	* @return {Number} Actual length of space removed (unit: px) <ko>빈 공간이 제거된 실제 길이(단위: px)</ko>
	*/
	fit() {
		const item = this._getTopItem();
		const distance = item ? item.position.y : 0;
		this._fit(true);
		return distance;
	}

	_reset() {
		this._isProcessing = false;
		this._topElement = null;
		this._bottomElement = null;
		this._isFitted = true;
		this._isRecycling = false;
		this._removedContent = 0;
		this._prevScrollTop = 0;
		this._equalItemSize = 0;
		this._resizeTimeout = null;
		this._resetCols(this._appendCols.length || 0);
		this.items = [];
	}

	_measureColumns() {
		this.el.style.width = null;
		this._containerWidth = utils.innerWidth(this.el);
		this._columnWidth = this._getColumnWidth() || this._containerWidth;
		let cols = this._containerWidth / this._columnWidth;
		const excess = this._columnWidth - this._containerWidth % this._columnWidth;

		// if overshoot is less than a pixel, round up, otherwise floor it
		cols = Math.max(Math[excess && excess <= 1 ? "round" : "floor"](cols), 1);

		// reset column Y
		this._resetCols(cols || 0);
	}

	_resetCols(count) {
		count = typeof count === "undefined" ? 0 : count;
		const arr = [];
		while (count--) {
			arr.push(0);
		}
		this._appendCols = arr.concat();
		this._prependCols = arr.concat();
	}

	_getContainerSize() {
		return {
			height: Math.max.apply(...this._appendCols),
			width: this._containerWidth
		};
	}

	_getColumnWidth() {
		const el = this.items[0] && this.items[0].el;
		let width = 0;
		if (el) {
			width = utils.innerWidth(el);
			if (this.options.isEqualSize) {
				this._equalItemSize = {
					width,
					height: utils.innerHeight(el)
				};
			}
		}
		return width;
	}

	_updateCols(isAppend) {
		const col = isAppend ? this._appendCols : this._prependCols;
		const items = this._getColItems(isAppend);
		const base = this._isFitted || isAppend ? 0 : this._getMinY(items);
		let i = 0;
		let item;
		const len = col.length;
		for (; i < len; i++) {
			if (item = items[i]) {
				col[i] = item.position.y + (isAppend ? item.size.height : -base);
			} else {
				col[i] = 0;
			}
		}
		return base;
	}

	_getMinY(items) {
		return Math.min.apply(...items.map(v => v ? v.position.y : 0));
	}

	_getColIdx(item) {
		return parseInt(item.position.x / parseInt(this._columnWidth, 10), 10);
	}

	_getColItems(isTail) {
		const len = this._appendCols.length;
		const colItems = new Array(len);
		let item;
		let idx;
		let count = 0;
		let i = isTail ? this.items.length - 1 : 0;
		while (item = this.items[i]) {
			idx = this._getColIdx(item);
			if (!colItems[idx]) {
				colItems[idx] = item;
				if (++count === len) {
					return colItems;
				}
			}
			i += isTail ? -1 : 1;
		}
		return colItems;
	}

	_itemize(elements, groupKey, isAppend) {
		return elements.map(v => {
			return {
				el: v,
				position: {
					x: 0,
					y: 0
				},
				isAppend: typeof isAppend === "undefined" ? true : isAppend,
				groupKey: typeof groupKey === "undefined" ? null : groupKey
			};
		});
	}

	_getItemLayoutPosition(item) {
		if (!item.el) {
			return;
		}
		item.size = this._equalItemSize || {
			width: utils.innerWidth(item.el),
			height: utils.innerHeight(item.el)
		};
		const isAppend = item.isAppend;
		const cols = isAppend ? this._appendCols : this._prependCols;
		const y = Math[isAppend ? "min" : "max"](...cols);
		let shortColIndex;

		if (isAppend) {
			shortColIndex = cols.indexOf(y);
		} else {
			let i = cols.length;
			while (i-- >= 0) {
				if (cols[i] === y) {
					shortColIndex = i;
					break;
				}
			}
		}
		cols[shortColIndex] = y + (isAppend ? item.size.height : -item.size.height);

		return {
			x: this._columnWidth * shortColIndex,
			y: isAppend ? y : y - item.size.height
		};
	}

	/**
	 * Destroys elements, properties, and events used on a grid layout.
	 * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
	 * @method eg.InfiniteGrid#destroy
	 */
	destroy() {
		this.off();
		utils.removeEvent(this.view, "scroll", this._onScroll);
		utils.removeEvent(this.view, "resize", this._onResize);
		this._reset();
	}
};

InfiniteGrid.VERSION = "#__VERSION__#";
export default InfiniteGrid;
