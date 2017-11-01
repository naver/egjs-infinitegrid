import ItemManager from "./ItemManager";
import DOMRenderer from "./DOMRenderer";
import ImageLoaded from "./ImageLoaded";
import Watcher from "./Watcher";
import {
	APPEND,
	PREPEND,
	CACHE,
	NO_CACHE,
	TRUSTED,
	NO_TRUSTED,
	IS_ANDROID2,
} from "./consts";

export {JustifiedLayout, GridLayout, FrameLayout, SquareLayout};

export class Infinite extends Component {
	constructor(element, options) {
		super();
		Object.assign(this.options = {
			itemSelector: "*",
			count: 60,
			widthAttr: "data-width",
			heightAttr: "data-height",
			isOverflowScroll: false,
			threshold: 300,
			direction: "vertical",	// @todo change const
			// isEqualSize: false,
			// defaultGroupKey: null,
		}, options);
		this._startCursor = -1;
		this._endCursor = -1;
		// this._status = {
		// 	// isProcessing: false,
		// 	// prevScrollTop: 0,
		// 	// topElement: null,
		// 	// bottomElement: null,
		// };
		this._items = new ItemManager();
		this._renderer = new DOMRenderer(
			element,
			this.options.direction === "vertical",
			this.options.isOverflowScroll);
		this._watcher = new Watcher(this._renderer.getView(), {
			threshold: 300,
			direction: "vertical",
			callback: {
				layout: () => this._renderer.isNeededResize() && this.layout(),
				append: () => {
					this._requestAppend();
				},
				prepend: () => {
					this._requestPrepend();
				},
			},
		});
	}
	_onCheck() {
		console.log(this._getEdgePos("end") - this._renderer.getViewSize());
	}
	append(elements, groupKey) {
		this._layout && this._insert(elements, groupKey, APPEND);
	}
	prepend(elements, groupKey) {
		this._layout && this._insert(elements, groupKey, PREPEND);
	}
	setLayout(LayoutKlass, options) {
		this._layout = new LayoutKlass(Object.assign(options || {}, {
			direction: this.options.direction,
		}));
		this._layout.setSize(this._renderer.getSize());
	}
	getVisibleItems() {
		return this._items.pluck("items", this._startCursor, this._endCursor);
	}
	_getEdgeIndex(cursor) {
		let index = this._endCursor;
		let prop = "max";
		let targetValue = -Infinite;

		if (cursor === "start") {
			index = this._startCursor;
			prop = "min";
			targetValue = Infinite;
		}

		for (let i = this._startCursor; i <= this._endCursor; i++) {
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
		const pos = this._getEdgePos(cursor);
		const prop = this.options.direction === "vertical" ?
			["top", "height"] : ["left", "width"];
		const items = this._items.pluck("items", this[`_${cursor}Cursor`])
			.filter(v => {
				console.log(v.rect[prop[0]] + v.size[prop[1]], pos);
				return v.rect[prop[0]] + v.size[prop[1]] === pos;
			});

		return items.length ? items[0] : null;
	}
	// called by visible
	_fit() {
		let base = 0;

		if (this._layout) {
			base = this._getEdgePos("start");

			if (base !== 0) {
				this._items.fit(base, this._layout.options.direction === "vertical");
				DOMRenderer.renderItems(this.getVisibleItems());
				this._renderer.setSize(this._getEdgePos("end"));
			}
		}

		// base 값만큼 fit 전의 scroll 포지션 값을 바꿈.
		// scrollTop -= croppedDistance;
		return base;
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
		let data;
		let outline;

		if (isRelayout) { // remove cache
			data = this._items.get(this._startCursor, this._endCursor);
			this._renderer.resize() &&
				data.forEach(v => {
					data.items = ItemManager.updateSize(v.items);
				});
			}
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
		this._onLayoutComplete(data, APPEND, NO_TRUSTED);
		DOMRenderer.renderItems(this.getVisibleItems());
		this._renderer.setSize(this._getEdgePos("end"));
		return this;
	}
	remove(element) {
		if (element) {
			const items = this._items.remove(element, this._startCursor, this._endCursor);

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
		if (size > 0 && this._startCursor !== -1 && this._endCursor !== -1) {
			if (isAppend && size > this._endCursor + 1) {
				items = this._items.pluck("items", this._endCursor + 1);
			} else if (!isAppend && this._startCursor > 0) {
				items = this._items.pluck("items", this._startCursor - 1);
			}
		}
		return items;
	}
	getGroupKeys(includeCached) {
		const data = includeCached ?
			this._items.get() : this._items.get(this._status.startCursor, this._status.endCursor);

		return data.map(v => v.groupKey);
	}
	getStatus() {
		return {
			options: Object.assign({}, this.options),
			// callback: Object.assign({}, this.callback),
			_status: Object.assign({}, this._status),
			_items: this._items.getStatus(),
			_renderer: this._renderer.getStatus(),
			_watcher: this._watcher.getStatus(),
		};
	}
	setStatus(status, applyScrollPos) {
		if (!status || !status.options || !status._status ||
			!status._renderer || !status._items || !status._watcher) {
			return this;
		}
		this._watcher.detachEvent();
		Object.assign(this.options, status.options);
		Object.assign(this._status, status._status);
		this._items.setStatus(status._items, this._status.startCursor, this._status.endCursor);
		this._renderer.setStatus(status._renderer, this.getVisibleItems());
		this._watcher.setStatus(status._watcher, applyScrollPos);
		this._updateEdge();
		this._watcher.attachEvent();
		return this;
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
		const items = this._getItems(APPEND);

		if (items.length) {
			this._postLayout(CACHE, items, APPEND, TRUSTED);
		} else {
			this.callback.append && this.callback.append();
		}
	}
	// called by visible
	_requestPrepend() {
		const items = this._getItems(PREPEND);

		if (items.length) {
			this._postLayout(CACHE, items, PREPEND, TRUSTED);
		} else {
			this.callback.prepend && this.callback.prepend();
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
					this._renderer.setSize(this._getEdgePos("end"));
				},
			});
		}
	}
	/**
	 * Destroys elements, properties, and events used on a grid layout.
	 * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
	 */
	destroy() {
		this._startCursor = -1;
		this._endCursor = -1;
		this._items.clear();
		this._renderer.destroy();
	}
}
