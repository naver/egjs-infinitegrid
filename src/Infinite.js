import Component from "@egjs/component";
import ItemManager from "./ItemManager";
import ImageLoaded from "./ImageLoaded";
// import GridLayout from "./layouts/GridLayout";
// import FrameLayout from "./layouts/FrameLayout";
import JustifiedLayout from "./layouts/JustifiedLayout";
import {
	APPEND,
	PREPEND,
	DUMMY_POSITION,
	MULTI,
	CACHE,
	NO_CACHE,
} from "./consts";
import {
	$,

} from "./utils";

export class ItemRenderer {
	constructor(element) {
		this._el = $(element);
		this._el.style.position = "relative";
	}
	static renderItem(item, styles) {
		if (item.el) {
			const elStyle = item.el.style;

			// for debugging
			item.el.setAttribute("data-groupkey", item.groupKey);
			elStyle.position = "absolute";
			["left", "top", "width", "height"].forEach(p => {
				(p in styles) && (elStyle[p] = `${styles[p]}px`);
			});
		}
	}
	static removeItems(items) {
		items.forEach(item => {
			if (item.el) {
				item.el.parentNode.removeChild(item.el);
				item.el = null;
			}
		});
	}
	append(items) {
		this._insert(items, APPEND, {
			top: DUMMY_POSITION,
		});
	}
	prepend(items) {
		this._insert(items, PREPEND, {
			top: DUMMY_POSITION,
		});
	}
	createAndInsert(items, isAppend) {
		const elements = $(items.reduce((acc, v) => acc.concat(v.content), []).join(
			""), MULTI);
		const itemsWithElement = items.map((item, index) => {
			item.el = elements[index];
			return item;
		});

		ItemRenderer.render(itemsWithElement);
		this._insert(itemsWithElement, isAppend);
	}
	_insert(items, isAppend, styles) {
		const df = document.createDocumentFragment();

		items.forEach(item => {
			styles && ItemRenderer.renderItem(item, styles);

			isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
		});
		isAppend ? this._el.appendChild(df) : this._el.insertBefore(df, this._el.firstChild);
	}
	static render(items) {
		items.forEach(item => {
			ItemRenderer.renderItem(item, item.rect);
		});
	}
}


export class Infinite extends Component {
	constructor(element, options) {
		super();
		Object.assign(this.options = {
			itemSelector: "*",
			count: 60,
		}, options);
		this._startCursor = -1;
		this._endCursor = -1;
		// @todo
		this._layout = new JustifiedLayout({
			direction: "vertical",
			minSize: 100,
		});
		// this._layout = new GridLayout({
		// 	direction: "vertical",
		// 	align: "start",
		// 	// minSize: 100,
		// });
		// this._layout = new FrameLayout({
		// 	direction: "vertical",
		// 	margin: 20,
		// 	minSize: 100,
		// 	frame: [
		// 		[1, 0, 1, 0, 1],
		// 		[2, 2, 2, 3, 3],
		// 		[2, 2, 2, 3, 3],
		// 		[0, 4, 0, 4, 0],
		// 	],
		// 	frameFill: true,
		// });
		this._layout.setViewport(471, 1320);
		this._checkImageloaded = new ImageLoaded();
		this._itemManager = new ItemManager();
		this._renderer = new ItemRenderer(element);
	}
	append(elements, groupKey) { // 사용자가 append를 호출
		this._insert(elements, groupKey, APPEND);
	}
	prepend(elements, groupKey) { // 사용자가 prepend를 호출
		this._insert(elements, groupKey, PREPEND);
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
			// @todo range가 넘어가는 경우에대한 별도의 처리 및 테스트가 필요함.
			let toRemoveItems;

			console.log(diff, "recyle이 필요함, DOM 삭제");
			if (isAppend) {
				toRemoveItems = this._itemManager.getItems(this._startCursor);
				this._startCursor++;
			} else {
				toRemoveItems = this._itemManager.getItems(this._endCursor);
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
	_insertItemManager(layouted, isAppend) {
		layouted.groupKey = layouted.items[0].groupKey;
		this._itemManager[isAppend ? "append" : "prepend"](layouted);
	}
	getVisibleItems() {
		return this._itemManager.getItems(this._startCursor, this._endCursor);
	}
	getItems(isAppend) {
		let items = [];
		const size = this._itemManager.size();

		// 데이터가 존재한다.
		if (size > 0 && this._startCursor !== -1 && this._endCursor !== -1) {
			if (isAppend && size > this._endCursor + 1) {
				console.log("데이터가 있다");
				items = this._itemManager.getItems(this._endCursor + 1);
			} else if (!isAppend && this._startCursor > 0) {
				console.log("데이터가 있다");
				items = this._itemManager.getItems(this._startCursor - 1);
			}
		}
		return items;
	}

	requestAppend() { // visible이 호출
		const items = this.getItems(APPEND);

		if (items.length) {
			this._recycle(items, APPEND);
			this._afterRecycle(CACHE, items, APPEND);
		} else {
			this.trigger("append");
		}
	}
	requestPrepend() { // visible이 호출
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
			this._checkImageloaded.check(items.map(item => item.el), () => {
				const layouted = this._layout[method](
					ItemManager.updateSize(items),
					this._itemManager.getOutline(
						isAppend ? this._endCursor : this._startCursor,
						isAppend)
				);

				this._insertItemManager(layouted, isAppend);
				this._updateCursor(isAppend);
				ItemRenderer.render(layouted.items);
			});
		}
	}

	setLayout(layout) {
		this._layout = layout;
	}
}
