
const agent = navigator.userAgent;
const isMobile = agent.indexOf("Mobi") !== -1 || /ios|android/.test(agent);
const isWindow = function(el) {
	return el === window;
};
const style = {
	"vertical": {position: "top", size: "height", cammelSize: "Height", coordinate: "Y"},
	"horizontal": {position: "left", size: "width", cammelSize: "Width", coordinate: "X"},
};
const START = "start";
const CENTER = "center";
const TRANSFORM = (function() {
	const bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
	const target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

	for (let i = 0, len = target.length; i < len; i++) {
		if (target[i] in bodyStyle) {
			return target[i];
		}
	}
	return "";
})();

class Parallax {
	constructor(root = window, options = {}) {
		this.options = Object.assign({
			container: null,
			selector: "img",
			strength: 1,
			center: 0,
			range: [-1, 1],
			align: START,
			horizontal: false,
		}, options);
		this._root = root;
		this._rootSize = 0;
		this._containerPosition = 0;
		this._style = style[this.options.horizontal ? "horizontal" : "vertical"];
		this.resize();
	}
	_checkParallaxItem(element) {
		if (!element) {
			return;
		}
		const selector = this.options.selector;

		if (!element.__IMAGE__) {
			const img = element.querySelector(selector);

			element.__IMAGE__ = img || -1;
			if (element.__IMAGE__ === -1) {
				return;
			}
			element.__BOX__ = img.parentNode;
		}
		if (element.__IMAGE__ === -1) {
			return;
		}
		const sizeName = this._style.cammelSize;

		element.__IMAGE__.__SIZE__ = element.__IMAGE__[`offset${sizeName}`];
		element.__BOX__.__SIZE__ = element.__BOX__[`offset${sizeName}`];
	}
	resize(items = []) {
		const root = this._root;
		const container = this.options.container;
		const positionName = this._style.position;
		const sizeName = this._style.cammelSize;

		if (!container || root === container) {
			this._containerPosition = 0;
		} else {
			const rootRect = (isWindow(root) ? document.body : root).getBoundingClientRect();
			const containertRect = container.getBoundingClientRect();

			this._containerPosition = containertRect[positionName] - rootRect[positionName];
		}
		this._rootSize = isWindow(root) ? window[`inner${sizeName}`] || document.documentElement[`client${sizeName}`] : root[`client${sizeName}`];
		if (isMobile & isWindow(root)) {
			const bodyWidth = document.body.offsetWidth || document.documentElement.offsetWidth;
			const windowWidth = window.innerWidth;

			this._rootSize = this._rootSize / (bodyWidth / windowWidth);
		}
		items.forEach(item => {
			this._checkParallaxItem(item.el);
		});
	}
	refresh(items = [], scrollPositionStart = 0) {
		const styleNames = this._style;
		const positionName = styleNames.position;
		const coordinateName = styleNames.coordinate;
		const sizeName = styleNames.size;
		const options = this.options;
		const {strength, center, range, align} = options;
		const rootSize = this._rootSize;
		const scrollPositionEnd = scrollPositionStart + rootSize;
		const containerPosition = this._containerPosition;

		items.forEach(item => {
			if (!item.rect || !item.size || !item.el) {
				return;
			}
			const position = containerPosition + item.rect[positionName];
			const itemSize = item.rect[sizeName] || item.size[sizeName];

			// check item is in container.
			if (scrollPositionStart > position + itemSize ||
				scrollPositionEnd < position) {
				return;
			}
			const el = item.el;

			if (!el.__IMAGE__) {
				this._checkParallaxItem(el);
			}
			if (el.__IMAGE__ === -1) {
				return;
			}
			const imageElement = el.__IMAGE__;
			const boxElement = el.__BOX__;
			const boxSize = boxElement.__SIZE__;
			const imageSize = imageElement.__SIZE__;

			// no parallax
			if (boxSize >= imageSize) {
				// remove transform style
				imageElement.style[TRANSFORM] = "";
				return;
			}

			// if area's position is center, ratio is 0.
			// if area is hidden at the top, ratio is 1.
			// if area is hidden at the bottom, ratio is -1.
			const imagePosition = position + boxSize / 2;
			let ratio = (scrollPositionStart + rootSize / 2 -
				(rootSize + boxSize) / 2 * center - imagePosition) /
				(rootSize + boxSize) * 2 * strength;

			// if ratio is out of the range of -1 and 1, show empty space.
			ratio = Math.max(Math.min(ratio, range[1]), range[0]);

			// dist is the position when thumnail's image is centered.
			const dist = (boxSize - imageSize) / 2;
			let translate = dist * (1 - ratio);

			if (align === CENTER) {
				translate -= dist;
			}

			imageElement.__TRANSLATE__ = translate;
			imageElement.__RATIO__ = ratio;
			imageElement.style[TRANSFORM] = `translate${coordinateName}(${translate}px)`;
		});
	}
}

module.exports = Parallax;
