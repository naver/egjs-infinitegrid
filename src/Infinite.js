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
			isOverflowScroll: false,
			widthAttr: "data-width",
			heightAttr: "data-height",
			threshold: 300,
			direction: "vertical", // @todo change const
			isEqualSize: false,
		}, options);
		IS_ANDROID2 && (this.options.isOverflowScroll = false);
		this._isVertical = this.options.direction === "vertical";
		this._reset();
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
		this._layout.setSize(this._renderer.getContainerSize());
	}
	getVisibleItems() {
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
				DOMRenderer.renderItems(this.getVisibleItems());
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
					data.items = ItemManager.updateSize(v.items);
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
		DOMRenderer.renderItems(this.getVisibleItems());
		isRelayout && this._watcher.setScrollPos();

		return this;
	}
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
		this._reset();
	}
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
		const toBeStart = this._status.startCursor;
		const toBeEnd = this._status.endCursor;
		let target = isAppend ? toBeStart : toBeEnd;

		while (toBeStart < toBeEnd && this._isVisible(target) < 0) {
			isAppend ? target++ : target--;
		}
		const start = isAppend ? this._status.startCursor : target + 1;
		const end = isAppend ? target : this._status.endCursor;

		if (start <= end) {
			if (this._isVisible(isAppend ? start : end) !== 0) {
				DOMRenderer.removeItems(this._items.pluck("items", start, end));
				if (isAppend) {
					this._status.startCursor = end + 1;
				} else {
					this._status.endCursor = start - 1;
				}
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
					this._updateCursor(isAppend);
					this.options.useRecycle && this._recycle(isAppend);
					DOMRenderer.renderItems(layouted.items);
					this._onLayoutComplete(items, isAppend, isTrusted);
				},
			});
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
		this.callback.layoutComplete && this.callback.layoutComplete({
			target: items.concat(),
			isAppend,
			isTrusted,
		});
		console.warn("_onLayoutComplete [", this._status.startCursor, this._status.endCursor, "]");
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
	destroy() {
		this._reset();
		this._items.clear();
		this._renderer.destroy();
	}
}
