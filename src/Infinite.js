import Component from "@egjs/component";
import ItemManager from "./ItemManager";
import ImageLoaded from "./ImageLoaded";
// import GridLayout from "./layouts/GridLayout";
import JustifiedLayout from "./layouts/JustifiedLayout";
import {
	APPEND,
	PREPEND,
	DUMMY_POSITION,
	MULTI,
} from "./consts";
import {
	$,

} from "./utils";

export class Painter {
	constructor(element) {
		this._el = $(element);
		this._el.style.position = "relative";
	}
	remove(items) {
		items.forEach(item => {
			item.el.parentNode.removeChild(item.el);
			item.el = null;
		});
	}
	append(items) {
		this._insert(
			items,
			APPEND,
			function(elStyle) {
				elStyle.top = `${DUMMY_POSITION}px`;
			});
	}
	prepend(items) {
		this._insert(
			items,
			PREPAND,
			function(elStyle) {
				elStyle.top = `${DUMMY_POSITION}px`;
			});
	}
	_insert(items, isAppend, renderCallback, styles) {
		const df = document.createDocumentFragment();

		items.forEach(item => {
			// to get sizes of images
			item.el.style.position = "absolute";
			renderCallback && renderCallback(item.el.style, styles);

			isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
		});
		isAppend ? this._el.appendChild(df) : this._el.insertBefore(df, this._el.firstChild);
	}
	render(items) {
		console.log("render", items);
		items.forEach(item => {
			item.el &&
				["left", "top", "width", "height"].forEach(p => {
					(p in item.rect) && (item.el.style[p] = `${item.rect[p]}px`);
				});
		});
	}
	create(items, isAppend) {
		const df = document.createDocumentFragment();
		const elements = $(items.reduce((acc, v) => acc.concat(v.content), []).join(""), MULTI);
		const itemsWithElement = items.map((item, index) => {
			item.el = elements[index];
			return item;
		});

		this.render(itemsWithElement);
		itemsWithElement.forEach(item => {
			isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
		});
		isAppend ? this._el.appendChild(df) : this._el.insertBefore(df, this._el.firstChild);
	}
}


export class Infinite extends Component {
	constructor(element, options) {
		super();
		Object.assign(this.options = {
			itemSelector: "*",
			count: 60,
		}, options);
		this._startCursor = 0;
		this._endCursor = 0;
		// @todo
		this._layout = new JustifiedLayout({
			direction: "vertical",
			minSize: 100,
		});
		this._layout.setViewport(471, 1320);
		this._checkImageloaded = new ImageLoaded();
		this._itemManager = new ItemManager();
		this._painter = new Painter(element);
	}
	append(elements, groupKey) { // 사용자가 append를 호출
		this._insert(elements, groupKey, APPEND);
	}
	prepend(elements, groupKey) { // 사용자가 prepend를 호출
		this._insert(elements, groupKey, PREPEND);
	}
	// add items, and remove items for recycling
	_recycle(items, isAppend) {
		const baseCount = items.length - this.options.count;
		let diff;

		while ((diff = this.getVisibleItems().length + baseCount) > 0) {
			console.log(diff, "recyle이 필요함, DOM 삭제");
			// @todo range가 넘어가는 경우에대한 별도의 처리 및 테스트가 필요함.
			let toRemoveItems;

			if (isAppend) {
				toRemoveItems = this._itemManager.getItems(this._startCursor, this._startCursor + 1);
				this._startCursor++;
			} else {
				toRemoveItems = this._itemManager.getItems(this._endCursor - 1, this._endCursor);
				this._endCursor--;
			}
			// recycle
			this._painter.remove(toRemoveItems);
			console.warn("[", this._startCursor, this._endCursor, "]");
		}
		this._painter[isAppend ? "append" : "prepend"](items);
	}

	_insert(elements, groupKey, isAppend) {
		const key = groupKey || (new Date().getTime() + Math.floor(Math.random() *
			1000));
		const items = ItemManager.from(elements, this.options.itemSelector, {
			isAppend,
			groupKey: key,
			maxCount: this.options.count,
		});

		if (!items.length) {
			return;
		}
		this._recycle(items, isAppend);

		// 이미지의 사이즈를 측정해야한다. (단 엘리먼트가 추가된 이후에 가능하다.)
		this._checkImageloaded.check(items.map(item => item.el), () => {
			const layouted = this._layout[isAppend ? "append" : "prepend"](
				ItemManager.updateSize(items),
				this._itemManager.getOutline(
					isAppend ? this._endCursor : this._startCursor,
					isAppend)
			);

			this._painter.render(this._insertItemManager(layouted, isAppend, key));
		});
	}

	_insertItemManager(layouted, isAppend, key) {
		layouted.groupKey = key;
		this._itemManager[isAppend ? "append" : "prepend"](layouted);
		if (isAppend) {
			this._endCursor++;
		} else if (this._startCursor > 0) {
			this._startCursor--;
		}
		return layouted.items;
	}
	getVisibleItems() {
		return this._itemManager.getItems(this._startCursor, this._endCursor);
	}
	getItems(isAppend) {
		let items = [];

		if (isAppend) {
			if (this._itemManager.size() - 1 > this._endCursor) {
				console.log("데이터가 있다", this._itemManager.getItems(this._endCursor, this._endCursor +
					1));
				items = this._itemManager.getItems(this._endCursor, this._endCursor + 1);
			} else {
				console.log("더이상 데이터가 없다");
			}
		} else {
			if (this._startCursor > 0) {
				console.log("데이터가 있다");
				items = this._itemManager.getItems(this._startCursor - 1, this._startCursor);
			} else {
				console.log("더이상 데이터가 없다");
			}
		}
		return items;
	}


	requestAppend() { // visible이 호출
		const items = this.getItems(APPEND);

		if (items.length) {
			this._painter.create(items, APPEND);
		} else {
			this.trigger("append");
		}
	}
	requestPrepend() { // visible이 호출
		const items = this.getItems(PREPEND);

		if (items.length) {
			this._painter.create(items, PREPEND);
		} else {
			this.trigger("prepend");
		}
	}

	setLayout(layout) {
		this._layout = layout;
	}
};
