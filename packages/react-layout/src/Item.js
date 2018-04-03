import {innerWidth, innerHeight} from "./utils";
import {NOT_LOADED, LAYOUT_ID, DUMMY_POSITION} from "./consts";

class Item {
	constructor(element) {
		this.id = element[LAYOUT_ID];
		this.el = element;
		this.orgSize = {};
		this.size = {};
		this.rect = {
			top: DUMMY_POSITION,
			left: DUMMY_POSITION,
		};
		this.cssText = "";
		this.contents = element.innerHTML;
		this.loaded = NOT_LOADED;
	}
	resetSize() {
		this.size = {};
		this.loaded = NOT_LOADED;
	}
	reset() {
		const el = this.el;

		if (el) {
			el.style.width = "";
			el.style.height = "";
		}
		this.orgSize = {};
		this.resetSize();
	}
	update() {
		const el = this.el;

		if (!el || this.loaded === NOT_LOADED) {
			return;
		}
		const contents = this.contents;

		this.contents = el.innerHTML;
		if (contents !== this.contents) {
			this.reset();
		}
	}
	updateSize(size) {
		const element = this.el;

		this.size = size || {
			width: innerWidth(element),
			height: innerHeight(element),
		};
		if (!this.orgSize || !this.orgSize.width) {
			this.orgSize = {
				width: this.size.width,
				height: this.size.height,
			};
		}
	}
}

export default Item;
