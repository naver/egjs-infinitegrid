import Component from "@egjs/component";
import ItemManager from "./ItemManager";
import {
	APPEND,
	PREPEND
} from "./consts";
import {
	utils
} from "./utils";

export class Painter {
	constructor(element) {
		this._el = utils.$(element);
	}
	remove(items) {
		items.forEach(item => {
			item.el.parentNode.removeChild(item.el);
		});
	}
	append(items) {
		this._insert(items, APPEND);
	}
	prepend(items) {
		this._insert(items, PREPEND);
	}
	_insert(items, isAppend) {
		// item의 정보를 각 엘리먼트에 반영. (position, size)
		const df = document.createDocumentFragment();
		items.forEach(item => {
			item.el.style.float = "left";
			isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
		});
		isAppend ? this._el.appendChild(df) : this._el.insertBefore(df, this._el.firstChild);
	}
	render(items) {
		console.log(items);
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
		this._itemManager = new ItemManager();
		this._painter = new Painter(element);
	}
	append(elements, groupKey) { // 사용자가 append를 호출
		this._insert(elements, groupKey, APPEND);
	}
	prepend(elements, groupKey) { // 사용자가 prepend를 호출
		this._insert(elements, groupKey, PREPEND);
	}
	_recycle(items, isAppend) {
		const baseCount = items.length - this.options.count;
		let diff;

		while ((diff = this.getVisibleItems().length + baseCount) > 0) {
			console.log(diff, "recyle이 필요함, DOM 삭제");
			// @todo range가 넘어가는 경우에대한 별도의 처리 및 테스트가 필요함.
			let toRemoveItems;

			if (isAppend) {
				toRemoveItems = this._itemManager.getItems(this._startCursor, this._startCursor +
					1);
				this._startCursor++;
			} else {
				toRemoveItems = this._itemManager.getItems(this._endCursor - 1, this._endCursor);
				this._endCursor--;
			}
			this._painter.remove(toRemoveItems);
			console.warn("[", this._startCursor, this._endCursor, "]");
		}
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

		// 레이아웃에게 일맡기기.
		const method = isAppend ? "append" : "prepend";
		const index = isAppend ? this._endCursor : this._startCursor;
		let layouted;

		if (this._layout) {
			layouted = this._layout[method](items, this._itemManager.getOutline(index,
				isAppend));
		} else {
			layouted = {
				items,
				outlines: {
					start: [],
					end: [],
				},
			};
		}
		layouted.groupKey = key;

		// 실제 데이터를 추가
		const newItems = this._itemManager[method](layouted);

		!isAppend && (this._startCursor = 0);
		this._endCursor++;

		this._painter[method](newItems);
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
			this._painter.render(items);
			this._endCursor++;
		} else {
			this.trigger("append");
		}
	}
	requestPrepend() { // visible이 호출
		const items = this.getItems(PREPEND);
		if (items.length) {
			this._painter.render(items);
			this._startCursor--;
		} else {
			this.trigger("prepend");
		}
	}

	setLayout(layout) {
		this._layout = layout;
	}
};
