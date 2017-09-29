import {APPEND, PREPEND, DEFAULT_OPTIONS, STYLE, VERTICAL} from "../Constants";

class Layout {
	constructor(layoutDefaultOptions = {}, options = {}) {
		this._options = Object.assign({},
			DEFAULT_OPTIONS,
			layoutDefaultOptions,
			options);
		this._style = this._getStyleNames();
		this._viewport = {};
	}
	_getStyleNames() {
		const options = this._options;
		const direction = options.direction in STYLE ? options.direction : VERTICAL;
		const style = STYLE[direction];

		return style;
	}
	setViewport(width, height) {
		this._viewport.width = width;
		this._viewport.height = height;
	}
	_insert(items, outline, type) {
		// this only needs the size of the item.
		const clone = items.map(item => Object.assign({}, item));

		return {
			items: clone,
			outlines: this._layout(clone, outline, APPEND),
		};
	}
	append(items, outline) {
		return this._insert(items, outline, APPEND);
	}
	prepend(items, outline) {
		return this._insert(items, outline, PREPEND);
	}
}

export default Layout;
