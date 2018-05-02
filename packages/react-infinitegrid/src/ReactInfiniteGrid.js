import InfiniteGrid, {ImageLoaded, DOMRenderer} from "@egjs/infinitegrid";
import {APPEND} from "./consts";

const DOMRendererPrototype = DOMRenderer.prototype;

DOMRendererPrototype._insert = function(items, isAppend, styles) {
	items.forEach(item => {
		styles && DOMRenderer.renderItem(item, styles);
	});
};

export default class ReactInfiniteGrid extends InfiniteGrid {
	constructor(element, options, overrides) {
		super(element, options);

		for (const name in overrides) {
			this[name] = overrides[name];
		}
	}
	updateGroups(groups) {
		this._items._data = groups;
	}
	updateCursor(startIndex, endIndex) {
		this._infinite.setCursor("start", startIndex);
		this._infinite.setCursor("end", endIndex);
	}
	updateLayout(props) {
		const options = this._layout.options;

		for (const name in options) {
			if (name in props) {
				options[name] = props[name];
			}
		}
	}
	_postCache({cache, isAppend, isTrusted = true,
		outline = this._infinite.getEdgeOutline(isAppend ? "end" : "start"), moveItem = -2}) {
	}
	_postLayout({fromCache, items, isAppend,
		outline = this._infinite.getEdgeOutline(isAppend ? "end" : "start"),
		isTrusted, moveItem = -2}) {
		return this;
	}
	_requestAppend({cache}) {
		return this;
	}
	_requestPrepend({cahce, fit}) {
		return this;
	}
	_postImageLoaded(fromCache, layouted, items, isAppend, isTrusted, moveItem = -2) {
		return this;
	}
}
