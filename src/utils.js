import {window, document} from "./browser";

const utils = {
	getElement(el) {
		if (typeof el === "string") {
			return document.querySelector(el);
		} else if (window.jQuery && (el instanceof jQuery) && el.length > 0) {
			// if you were using jQuery
			return el[0];
		} else {
			return el;
		}
	}
};

class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass || class {};
	}
	with(...mixins) {
		return mixins.reduce((c, m) => m(c), this.superclass);
	}
}

const Mixin = superclass => new MixinBuilder(superclass);

export {Mixin, utils};
