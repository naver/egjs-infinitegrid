import Component from "@egjs/component";
import ItemManager from "./ItemManager";
import ItemRenderer from "./ItemRenderer";
import ImageLoaded from "./ImageLoaded";

import GridLayout from "./layouts/GridLayout";
import FrameLayout from "./layouts/FrameLayout";
import FacebookLayout from "./layouts/FacebookLayout";
import PackingLayout from "./layouts/PackingLayout";
import JustifiedLayout from "./layouts/JustifiedLayout";

import {
	APPEND,
	PREPEND,
	CACHE,
	NO_CACHE,
} from "./consts";
// import {
// 	$,
// 	addEvent,
// 	removeEvent,
// } from "./utils";

export {JustifiedLayout, GridLayout, FrameLayout, FacebookLayout, PackingLayout};

export class Infinite extends Component {
	constructor(element, options) {
		super();
		Object.assign(this.options = {
			itemSelector: "*",
			count: 60,
			widthAttr: "data-width",
			heightAttr: "data-height",
		}, options);
		this._startCursor = -1;
		this._endCursor = -1;
		this._items = new ItemManager();
		this._renderer = new ItemRenderer(element);
	}
	// called by user
	append(elements, groupKey) {
		this._layout && this._insert(elements, groupKey, APPEND);
	}
	// called by user
	prepend(elements, groupKey) {
		this._layout && this._insert(elements, groupKey, PREPEND);
	}
	setLayout(layout) {
		this._layout = layout;
	}
	setViewport(width, height) {
		this._layout && this._layout.setViewport(width, height);
	}
	getVisibleItems() {
		return this._items.getItems(this._startCursor, this._endCursor);
	}
	getItems(isAppend) {
		let items = [];
		const size = this._items.size();

		// from cache
		if (size > 0 && this._startCursor !== -1 && this._endCursor !== -1) {
			if (isAppend && size > this._endCursor + 1) {
				items = this._items.getItems(this._endCursor + 1);
			} else if (!isAppend && this._startCursor > 0) {
				items = this._items.getItems(this._startCursor - 1);
			}
		}
		return items;
	}
	clear() {
		this._renderer.clear();
		this._items.clear();
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
		let diff;

		while ((diff = this.getVisibleItems().length + baseCount) > 0) {
			const toRemoveItems = this._items.getItems(isAppend ? this._startCursor : this._endCursor);

			if (isAppend) {
				this._startCursor++;
			} else {
				this._endCursor--;
			}
			// recycle
			ItemRenderer.removeItems(toRemoveItems);
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
							isAppend)
					);

					this._insertItems(layouted, isAppend);
					this._updateCursor(isAppend);
					ItemRenderer.render(layouted.items);
				},
			});
		}
	}
}
