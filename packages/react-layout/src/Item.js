import {innerWidth, innerHeight} from "@egjs/infinitegrid/src/utils";
import {DUMMY_POSITION} from "@egjs/infinitegrid/src/consts";
import {NOT_LOADED, LAYOUT_ID} from "./consts";

class Item {
	constructor(element) {
		this.state = {
			id: element[LAYOUT_ID],
			el: element,
			orgSize: {},
			size: {},
			rect: {
				top: DUMMY_POSITION,
				left: DUMMY_POSITION,
			},
			cssText: "",
			contents: element.innerHTML,
			loaded: NOT_LOADED,
		};
	}
	resetSize() {
		this.state.size = {};
		this.state.loaded = NOT_LOADED;
	}
	reset() {
		const el = this.state.el;

		if (el) {
			el.style.width = "";
			el.style.height = "";
		}
		this.state.orgSize = {};
		this.resetSize();
	}
	update() {
		const el = this.state.el;

		if (!el || this.state.loaded === NOT_LOADED) {
			return;
		}
		const contents = this.state.contents;

		this.state.contents = el.innerHTML;
		if (contents !== this.state.contents) {
			this.reset();
		}
	}
	updateSize(size) {
		const element = this.state.el;
		const state = this.state;

		state.size = size || {
			width: innerWidth(element),
			height: innerHeight(element),
		};
		if (!state.orgSize || !state.orgSize.width) {
			state.orgSize = {
				width: state.size.width,
				height: state.size.height,
			};
		}
	}
}

export default Item;
