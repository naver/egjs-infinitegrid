(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Parallax"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Parallax"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.DEFENSE_BROWSER = exports.WEBKIT_VERSION = exports.PROCESSING = exports.LOADING_PREPEND = exports.LOADING_APPEND = exports.IDLE = exports.ALIGN = exports.isMobile = exports.agent = exports.DEFAULT_OPTIONS = exports.GROUPKEY_ATT = exports.DUMMY_POSITION = exports.SINGLE = exports.MULTI = exports.NO_TRUSTED = exports.TRUSTED = exports.NO_CACHE = exports.CACHE = exports.HORIZONTAL = exports.VERTICAL = exports.PREPEND = exports.APPEND = exports.CONTAINER_CLASSNAME = exports.RETRY = exports.IS_ANDROID2 = exports.IS_IOS = exports.IS_IE = exports.SUPPORT_PASSIVE = exports.SUPPORT_ADDEVENTLISTENER = exports.SUPPORT_COMPUTEDSTYLE = undefined;

var _browser = __webpack_require__(1);

var ua = _browser.window.navigator.userAgent;

var SUPPORT_COMPUTEDSTYLE = exports.SUPPORT_COMPUTEDSTYLE = !!("getComputedStyle" in _browser.window);
var SUPPORT_ADDEVENTLISTENER = exports.SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document);
var SUPPORT_PASSIVE = exports.SUPPORT_PASSIVE = function () {
	var supportsPassiveOption = false;

	try {
		if (SUPPORT_ADDEVENTLISTENER && Object.defineProperty) {
			document.addEventListener("test", null, Object.defineProperty({}, "passive", {
				get: function get() {
					supportsPassiveOption = true;
				}
			}));
		}
	} catch (e) {}
	return supportsPassiveOption;
}();

var IS_IE = exports.IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
var IS_IOS = exports.IS_IOS = /iPhone|iPad/.test(ua);
var IS_ANDROID2 = exports.IS_ANDROID2 = /Android 2\./.test(ua);
var RETRY = exports.RETRY = 3;
var CONTAINER_CLASSNAME = exports.CONTAINER_CLASSNAME = "_eg-infinitegrid-container_";

var APPEND = exports.APPEND = true;
var PREPEND = exports.PREPEND = false;
var VERTICAL = exports.VERTICAL = "vertical";
var HORIZONTAL = exports.HORIZONTAL = "horizontal";
var CACHE = exports.CACHE = true;
var NO_CACHE = exports.NO_CACHE = false;
var TRUSTED = exports.TRUSTED = true;
var NO_TRUSTED = exports.NO_TRUSTED = false;
var MULTI = exports.MULTI = true;
var SINGLE = exports.SINGLE = false;
var DUMMY_POSITION = exports.DUMMY_POSITION = -100000;
var GROUPKEY_ATT = exports.GROUPKEY_ATT = "data-groupkey";

var DEFAULT_OPTIONS = exports.DEFAULT_OPTIONS = {
	horizontal: false,
	margin: 0
};

var agent = exports.agent = ua.toLowerCase();
var isMobile = exports.isMobile = /mobi|ios|android/.test(agent);

var ALIGN = exports.ALIGN = {
	START: "start",
	CENTER: "center",
	END: "end",
	JUSTIFY: "justify"
};

var IDLE = exports.IDLE = 0;
var LOADING_APPEND = exports.LOADING_APPEND = 1;
var LOADING_PREPEND = exports.LOADING_PREPEND = 2;
var PROCESSING = exports.PROCESSING = 4;

var webkit = /applewebkit\/([\d|.]*)/g.exec(agent);

var WEBKIT_VERSION = exports.WEBKIT_VERSION = webkit && parseInt(webkit[1], 10) || 0;
var DEFENSE_BROWSER = exports.DEFENSE_BROWSER = !webkit || !WEBKIT_VERSION || WEBKIT_VERSION && WEBKIT_VERSION < 537;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* eslint-disable no-new-func, no-nested-ternary */
var win = window;
/* eslint-enable no-new-func, no-nested-ternary */

exports.window = window;
var document = exports.document = win.document;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _consts = __webpack_require__(0);

var _utils = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = {
	"vertical": { position: "top", size: "height", cammelSize: "Height", coordinate: "Y" },
	"horizontal": { position: "left", size: "width", cammelSize: "Width", coordinate: "X" }
};
var START = _consts.ALIGN.START,
    CENTER = _consts.ALIGN.CENTER;

var TRANSFORM = function () {
	var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
	var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

	for (var i = 0, len = target.length; i < len; i++) {
		if (target[i] in bodyStyle) {
			return target[i];
		}
	}
	return "";
}();

/**
 * Parallax is a displacement or difference in the apparent position of an object viewed along two different lines of sight. You can apply parallax by scrolling the image and speed of the item.
 * @ko Parallax는 서로 다른 두 개의 시선에서 바라본 물체의 외관상 위치의 변위 또는 차이입니다. 스크롤에 따라 이미지와 아이템의 속도를 차이를 줌으로써 parallax을 적용할 수 있습니다.
 * @class eg.Parallax
 * @param {Element|String} [root=window] Scrolling target. If you scroll in the body, set window. 스크롤하는 대상. 만약 body에서 스크롤하면 window로 설정한다.
 * @param {Object} [options] The option object of eg.Parallax module <ko>eg.Parallax 모듈의 옵션 객체</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Element|String} [options.container=null] Container wrapping items. If root and container have no gaps, do not set option. <ko> 아이템들을 감싸고 있는 컨테이너. 만약 root와 container간의 차이가 없으면, 옵션을 설정하지 않아도 된다.</ko>
 * @param {String} [options.selector="img"] The selector of the image to apply the parallax in the item <ko> 아이템안에 있는 parallax를 적용할 이미지의 selector </ko>
 * @param {Boolean} [options.strength=1] Dimensions that indicate the sensitivity of parallax. The higher the strength, the faster.
 * @param {Boolean} [options.center=0] The middle point of parallax. The top is 1 and the bottom is -1. <ko> parallax가 가운데로 오는 점. 상단이 1이고 하단이 -1이다. </ko>
 * @param {Boolean} [options.range=[-1, 1]] Range to apply the parallax. The top is 1 and the bottom is -1. <ko> parallax가 적용되는 범위, 상단이 1이고 하단이 -1이다. </ko>
 * @param {Boolean} [options.align="start"] The alignment of the image in the item. ("start" : top or left, "center": middle) <ko> 아이템안의 이미지의 정렬 </ko>
 * @example
```
<script>
// isOverflowScroll: false
var parallax = new eg.Parallax(window, {
	container: ".container",
	selector: "img.parallax",
	strength: 0.8,
	center: 0,
	range: [-1, 1],
	align: "center",
	horizontal: true,
});

// isOverflowScroll: ture
var parallax = new eg.Parallax(".container", {
	selector: "img.parallax",
	strength: 0.8,
	center: 0,
	range: [-1, 1],
	align: "center",
	horizontal: true,
});

// item interface
var item = {
	// original size
	size: {
		width: 100,
		height: 100,
	},
	// view size
	rect: {
		top: 100,
		left: 100,
		width: 100,
		height: 100,
	}
};
</script>
```
 **/

var Parallax = function () {
	function Parallax() {
		var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Parallax);

		this.options = _extends({
			container: null,
			selector: "img",
			strength: 1,
			center: 0,
			range: [-1, 1],
			align: START,
			horizontal: false
		}, options);
		this._root = (0, _utils.$)(root);
		this._container = this.options.container && (0, _utils.$)(this.options.container);
		this._rootSize = 0;
		this._containerPosition = 0;
		this._style = style[this.options.horizontal ? "horizontal" : "vertical"];
		this.resize();
	}

	Parallax.prototype._checkParallaxItem = function _checkParallaxItem(element) {
		if (!element) {
			return;
		}
		var selector = this.options.selector;

		if (!element.__IMAGE__) {
			var img = element.querySelector(selector);

			element.__IMAGE__ = img || -1;
			if (element.__IMAGE__ === -1) {
				return;
			}
			element.__BOX__ = img.parentNode;
		}
		if (element.__IMAGE__ === -1) {
			return;
		}
		var sizeName = this._style.cammelSize;

		element.__IMAGE__.__SIZE__ = element.__IMAGE__["offset" + sizeName];
		element.__BOX__.__SIZE__ = element.__BOX__["offset" + sizeName];
	};
	/**
  * As the browser is resized, the gaps between the root and the container and the size of the items are updated.
  * @ko 브라우저의 크기가 변경됨으로 써 root와 container의 간격과 아이템들의 크기를 갱신한다.
  * @method eg.Parallax#resize
  * @param {Array} [items = []] Items to apply parallax. It does not apply if it is not in visible range. <ko>parallax를 적용할 아이템들. 가시거리에 존재하지 않으면 적용이 안된다.</ko>
  * @return {eg.Parallax} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
 ```js
 window.addEventListener("resize", function (e) {
 parallax.resize(items);
 });
 ```
  */


	Parallax.prototype.resize = function resize() {
		var _this = this;

		var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		var root = this._root;
		var container = this._container;
		var positionName = this._style.position;
		var sizeName = this._style.cammelSize;

		if (!container || root === container) {
			this._containerPosition = 0;
		} else {
			var rootRect = ((0, _utils.isWindow)(root) ? document.body : root).getBoundingClientRect();
			var containertRect = container.getBoundingClientRect();

			this._containerPosition = containertRect[positionName] - rootRect[positionName];
		}
		this._rootSize = (0, _utils.isWindow)(root) ? window["inner" + sizeName] || document.documentElement["client" + sizeName] : root["client" + sizeName];
		if (_consts.isMobile & (0, _utils.isWindow)(root)) {
			var bodyWidth = document.body.offsetWidth || document.documentElement.offsetWidth;
			var windowWidth = window.innerWidth;

			this._rootSize = this._rootSize / (bodyWidth / windowWidth);
		}
		items.forEach(function (item) {
			_this._checkParallaxItem(item.el);
		});

		return this;
	};
	/**
  * Scrolls the image in the item by a parallax.
  * @ko 스크롤하면 아이템안의 이미지를 시차적용시킨다.
  * @method eg.Parallax#resize
  * @param {Array} [items = []] Items to apply parallax. It does not apply if it is not in visible range. <ko>parallax를 적용할 아이템들. 가시거리에 존재하지 않으면 적용이 안된다.</ko>
  * @param {Number} [scrollPositionStart = 0] The scroll position.
  * @return {eg.Parallax} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
 ```js
 document.body.addEventListener("scroll", function (e) {
 parallax.refresh(items, e.scrollTop);
 });
 ```
  */


	Parallax.prototype.refresh = function refresh() {
		var _this2 = this;

		var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var scrollPositionStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		var styleNames = this._style;
		var positionName = styleNames.position;
		var coordinateName = styleNames.coordinate;
		var sizeName = styleNames.size;
		var options = this.options;
		var strength = options.strength,
		    center = options.center,
		    range = options.range,
		    align = options.align;

		var rootSize = this._rootSize;
		var scrollPositionEnd = scrollPositionStart + rootSize;
		var containerPosition = this._containerPosition;

		items.forEach(function (item) {
			if (!item.rect || !item.size || !item.el) {
				return;
			}
			var position = containerPosition + item.rect[positionName];
			var itemSize = item.rect[sizeName] || item.size[sizeName];

			// check item is in container.
			if (scrollPositionStart > position + itemSize || scrollPositionEnd < position) {
				return;
			}
			var el = item.el;

			if (!el.__IMAGE__) {
				_this2._checkParallaxItem(el);
			}
			if (el.__IMAGE__ === -1) {
				return;
			}
			var imageElement = el.__IMAGE__;
			var boxElement = el.__BOX__;
			var boxSize = boxElement.__SIZE__;
			var imageSize = imageElement.__SIZE__;

			// no parallax
			if (boxSize >= imageSize) {
				// remove transform style
				imageElement.style[TRANSFORM] = "";
				return;
			}

			// if area's position is center, ratio is 0.
			// if area is hidden at the top, ratio is 1.
			// if area is hidden at the bottom, ratio is -1.
			var imagePosition = position + boxSize / 2;
			var ratio = (scrollPositionStart + rootSize / 2 - (rootSize + boxSize) / 2 * center - imagePosition) / (rootSize + boxSize) * 2 * strength;

			// if ratio is out of the range of -1 and 1, show empty space.
			ratio = Math.max(Math.min(ratio, range[1]), range[0]);

			// dist is the position when thumnail's image is centered.
			var dist = (boxSize - imageSize) / 2;
			var translate = dist * (1 - ratio);

			if (align === CENTER) {
				translate -= dist;
			}

			imageElement.__TRANSLATE__ = translate;
			imageElement.__RATIO__ = ratio;
			imageElement.style[TRANSFORM] = "translate" + coordinateName + "(" + translate + "px)";
		});
		return this;
	};

	return Parallax;
}();

module.exports = Parallax;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.STYLE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.toArray = toArray;
exports.fill = fill;
exports.$ = $;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.scroll = scroll;
exports.scrollTo = scrollTo;
exports.scrollBy = scrollBy;
exports.getStyles = getStyles;
exports.innerWidth = innerWidth;
exports.innerHeight = innerHeight;
exports.getStyleNames = getStyleNames;
exports.assignOptions = assignOptions;
exports.toZeroArray = toZeroArray;
exports.isWindow = isWindow;
exports.indexOf = indexOf;

var _browser = __webpack_require__(1);

var _consts = __webpack_require__(0);

function toArray(nodes) {
	// SCRIPT5014 in IE8
	var array = [];

	if (nodes) {
		for (var i = 0, len = nodes.length; i < len; i++) {
			array.push(nodes[i]);
		}
	}
	return array;
}
function fill(length, value) {
	var array = (typeof length === "undefined" ? "undefined" : _typeof(length)) === "object" ? length : new Array(length);
	var len = array.length;

	for (var i = len - 1; i >= 0; --i) {
		array[i] = value;
	}
	return array;
}
/**
 * Select or create element
 * @param {String|HTMLElement|jQuery} param
 *  when string given is as HTML tag, then create element
 *  otherwise it returns selected elements
 * @param {Boolean} multi
 * @returns {HTMLElement}
 */
function $(param) {
	var multi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var el = void 0;

	if (typeof param === "string") {
		// String (HTML, Selector)
		// check if string is HTML tag format
		var match = param.match(/^<([A-z]+)\s*([^>]*)>/);

		// creating element
		if (match) {
			// HTML
			var dummy = _browser.document.createElement("div");

			dummy.innerHTML = param;
			el = dummy.childNodes;
		} else {
			// Selector
			el = _browser.document.querySelectorAll(param);
		}
		if (multi) {
			el = toArray(el);
		} else {
			el = el && el.length > 0 && el[0] || undefined;
		}
	} else if (param === _browser.window) {
		// window
		el = param;
	} else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
		// HTMLElement, Document
		el = param;
	} else if ("jQuery" in _browser.window && param instanceof _browser.window.jQuery || param.constructor.prototype.jquery) {
		// jQuery
		el = multi ? param.toArray() : param.get(0);
	} else if (Array.isArray(param)) {
		el = param.map(function (v) {
			return $(v);
		});
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	}
	return el;
}
function addEvent(element, type, handler, eventListenerOptions) {
	if (_consts.SUPPORT_ADDEVENTLISTENER) {
		var options = eventListenerOptions || false;

		if ((typeof eventListenerOptions === "undefined" ? "undefined" : _typeof(eventListenerOptions)) === "object") {
			options = _consts.SUPPORT_PASSIVE ? eventListenerOptions : false;
		}
		element.addEventListener(type, handler, options);
	} else if (element.attachEvent) {
		element.attachEvent("on" + type, handler);
	} else {
		element["on" + type] = handler;
	}
}
function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else if (element.detachEvent) {
		element.detachEvent("on" + type, handler);
	} else {
		element["on" + type] = null;
	}
}
function scroll(el, isVertical) {
	var prop = "scroll" + (isVertical ? "Top" : "Left");

	if (el === _browser.window) {
		return _browser.window[isVertical ? "pageYOffset" : "pageXOffset"] || _browser.document.body[prop] || _browser.document.documentElement[prop];
	} else {
		return el[prop];
	}
}
function scrollTo(el, x, y) {
	if (el === _browser.window) {
		el.scroll(x, y);
	} else {
		el.scrollLeft = x;
		el.scrollTop = y;
	}
}
function scrollBy(el, x, y) {
	if (el === _browser.window) {
		el.scrollBy(x, y);
	} else {
		el.scrollLeft += x;
		el.scrollTop += y;
	}
}
function getStyles(el) {
	return _consts.SUPPORT_COMPUTEDSTYLE ? _browser.window.getComputedStyle(el) : el.currentStyle;
}
function _getSize(el, name) {
	if (el === _browser.window) {
		// WINDOW
		return el.document.documentElement["client" + name];
	} else if (el.nodeType === 9) {
		// DOCUMENT_NODE
		var doc = el.documentElement;

		return Math.max(el.body["scroll" + name], doc["scroll" + name], el.body["offset" + name], doc["offset" + name], doc["client" + name]);
	} else {
		// NODE
		var style = getStyles(el);
		var value = style[name.toLowerCase()];

		return parseFloat(/auto|%/.test(value) ? el["offset" + name] : style[name.toLowerCase()]);
	}
}
function innerWidth(el) {
	return _getSize(el, "Width");
}
function innerHeight(el) {
	return _getSize(el, "Height");
}

var STYLE = exports.STYLE = {
	vertical: {
		pos1: "top",
		endPos1: "bottom",
		size1: "height",
		pos2: "left",
		endPos2: "right",
		size2: "width"
	},
	horizontal: {
		pos1: "left",
		endPos1: "right",
		size1: "width",
		pos2: "top",
		endPos2: "bottom",
		size2: "height"
	}
};

function getStyleNames(isHorizontal) {
	return STYLE[isHorizontal ? _consts.HORIZONTAL : _consts.VERTICAL];
}

function assignOptions(defaultOptions, options) {
	return _extends({}, _consts.DEFAULT_OPTIONS, defaultOptions, options);
}

function toZeroArray(outline) {
	if (!outline || !outline.length) {
		return [0];
	}
	return outline;
}

function isWindow(el) {
	return el === _browser.window;
}

function indexOf(arr, target) {
	var isRight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	if (!isRight) {
		return arr.indexOf(target);
	}
	var length = arr.length;

	for (var i = length - 1; i >= 0; --i) {
		if (arr[i] !== target) {
			continue;
		}
		return i;
	}
	return -1;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlZmE0MmVhYzMzMmEzYWUzMDc5ZCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9QYXJhbGxheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJTVVBQT1JUX0NPTVBVVEVEU1RZTEUiLCJTVVBQT1JUX0FEREVWRU5UTElTVEVORVIiLCJkb2N1bWVudCIsIlNVUFBPUlRfUEFTU0lWRSIsInN1cHBvcnRzUGFzc2l2ZU9wdGlvbiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldCIsImUiLCJJU19JRSIsInRlc3QiLCJJU19JT1MiLCJJU19BTkRST0lEMiIsIlJFVFJZIiwiQ09OVEFJTkVSX0NMQVNTTkFNRSIsIkFQUEVORCIsIlBSRVBFTkQiLCJWRVJUSUNBTCIsIkhPUklaT05UQUwiLCJDQUNIRSIsIk5PX0NBQ0hFIiwiVFJVU1RFRCIsIk5PX1RSVVNURUQiLCJNVUxUSSIsIlNJTkdMRSIsIkRVTU1ZX1BPU0lUSU9OIiwiR1JPVVBLRVlfQVRUIiwiREVGQVVMVF9PUFRJT05TIiwiaG9yaXpvbnRhbCIsIm1hcmdpbiIsImFnZW50IiwidG9Mb3dlckNhc2UiLCJpc01vYmlsZSIsIkFMSUdOIiwiU1RBUlQiLCJDRU5URVIiLCJFTkQiLCJKVVNUSUZZIiwiSURMRSIsIkxPQURJTkdfQVBQRU5EIiwiTE9BRElOR19QUkVQRU5EIiwiUFJPQ0VTU0lORyIsIndlYmtpdCIsImV4ZWMiLCJXRUJLSVRfVkVSU0lPTiIsInBhcnNlSW50IiwiREVGRU5TRV9CUk9XU0VSIiwid2luIiwid2luZG93Iiwic3R5bGUiLCJwb3NpdGlvbiIsInNpemUiLCJjYW1tZWxTaXplIiwiY29vcmRpbmF0ZSIsIlRSQU5TRk9STSIsImJvZHlTdHlsZSIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInRhcmdldCIsImkiLCJsZW4iLCJsZW5ndGgiLCJQYXJhbGxheCIsInJvb3QiLCJvcHRpb25zIiwiY29udGFpbmVyIiwic2VsZWN0b3IiLCJzdHJlbmd0aCIsImNlbnRlciIsInJhbmdlIiwiYWxpZ24iLCJfcm9vdCIsIl9jb250YWluZXIiLCJfcm9vdFNpemUiLCJfY29udGFpbmVyUG9zaXRpb24iLCJfc3R5bGUiLCJyZXNpemUiLCJfY2hlY2tQYXJhbGxheEl0ZW0iLCJlbGVtZW50IiwiX19JTUFHRV9fIiwiaW1nIiwicXVlcnlTZWxlY3RvciIsIl9fQk9YX18iLCJwYXJlbnROb2RlIiwic2l6ZU5hbWUiLCJfX1NJWkVfXyIsIml0ZW1zIiwicG9zaXRpb25OYW1lIiwicm9vdFJlY3QiLCJib2R5IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29udGFpbmVydFJlY3QiLCJkb2N1bWVudEVsZW1lbnQiLCJib2R5V2lkdGgiLCJvZmZzZXRXaWR0aCIsIndpbmRvd1dpZHRoIiwiaW5uZXJXaWR0aCIsImZvckVhY2giLCJpdGVtIiwiZWwiLCJyZWZyZXNoIiwic2Nyb2xsUG9zaXRpb25TdGFydCIsInN0eWxlTmFtZXMiLCJjb29yZGluYXRlTmFtZSIsInJvb3RTaXplIiwic2Nyb2xsUG9zaXRpb25FbmQiLCJjb250YWluZXJQb3NpdGlvbiIsInJlY3QiLCJpdGVtU2l6ZSIsImltYWdlRWxlbWVudCIsImJveEVsZW1lbnQiLCJib3hTaXplIiwiaW1hZ2VTaXplIiwiaW1hZ2VQb3NpdGlvbiIsInJhdGlvIiwiTWF0aCIsIm1heCIsIm1pbiIsImRpc3QiLCJ0cmFuc2xhdGUiLCJfX1RSQU5TTEFURV9fIiwiX19SQVRJT19fIiwibW9kdWxlIiwiZXhwb3J0cyIsInRvQXJyYXkiLCJmaWxsIiwiJCIsImFkZEV2ZW50IiwicmVtb3ZlRXZlbnQiLCJzY3JvbGwiLCJzY3JvbGxUbyIsInNjcm9sbEJ5IiwiZ2V0U3R5bGVzIiwiaW5uZXJIZWlnaHQiLCJnZXRTdHlsZU5hbWVzIiwiYXNzaWduT3B0aW9ucyIsInRvWmVyb0FycmF5IiwiaXNXaW5kb3ciLCJpbmRleE9mIiwibm9kZXMiLCJhcnJheSIsInB1c2giLCJ2YWx1ZSIsIkFycmF5IiwicGFyYW0iLCJtdWx0aSIsIm1hdGNoIiwiZHVtbXkiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiY2hpbGROb2RlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ1bmRlZmluZWQiLCJub2RlTmFtZSIsIm5vZGVUeXBlIiwialF1ZXJ5IiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJqcXVlcnkiLCJpc0FycmF5IiwibWFwIiwidiIsInR5cGUiLCJoYW5kbGVyIiwiZXZlbnRMaXN0ZW5lck9wdGlvbnMiLCJhdHRhY2hFdmVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXRhY2hFdmVudCIsImlzVmVydGljYWwiLCJwcm9wIiwieCIsInkiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsVG9wIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImN1cnJlbnRTdHlsZSIsIl9nZXRTaXplIiwibmFtZSIsImRvYyIsInBhcnNlRmxvYXQiLCJTVFlMRSIsInZlcnRpY2FsIiwicG9zMSIsImVuZFBvczEiLCJzaXplMSIsInBvczIiLCJlbmRQb3MyIiwic2l6ZTIiLCJpc0hvcml6b250YWwiLCJkZWZhdWx0T3B0aW9ucyIsIm91dGxpbmUiLCJhcnIiLCJpc1JpZ2h0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7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QUlwSSxDQUFKLE1BQVdELE1BQWYsRUFBdUI7QUFDdEI7QUFDQTtBQUNELFNBQU9DLENBQVA7QUFDQTtBQUNELFFBQU8sQ0FBQyxDQUFSO0FBQ0EsQyIsImZpbGUiOiJwYXJhbGxheC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlBhcmFsbGF4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImVnXCJdID0gcm9vdFtcImVnXCJdIHx8IHt9LCByb290W1wiZWdcIl1bXCJQYXJhbGxheFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZmE0MmVhYzMzMmEzYWUzMDc5ZCIsImltcG9ydCB7d2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbmNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbmV4cG9ydCBjb25zdCBTVVBQT1JUX0NPTVBVVEVEU1RZTEUgPSAhIShcImdldENvbXB1dGVkU3R5bGVcIiBpbiB3aW5kb3cpO1xuZXhwb3J0IGNvbnN0IFNVUFBPUlRfQURERVZFTlRMSVNURU5FUiA9ICEhKFwiYWRkRXZlbnRMaXN0ZW5lclwiIGluIGRvY3VtZW50KTtcbmV4cG9ydCBjb25zdCBTVVBQT1JUX1BBU1NJVkUgPSAoKCkgPT4ge1xuXHRsZXQgc3VwcG9ydHNQYXNzaXZlT3B0aW9uID0gZmFsc2U7XG5cblx0dHJ5IHtcblx0XHRpZiAoU1VQUE9SVF9BRERFVkVOVExJU1RFTkVSICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFxuXHRcdFx0XHRcInBhc3NpdmVcIiwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHN1cHBvcnRzUGFzc2l2ZU9wdGlvbiA9IHRydWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSkpO1xuXHRcdH1cblx0fSBjYXRjaCAoZSkge31cblx0cmV0dXJuIHN1cHBvcnRzUGFzc2l2ZU9wdGlvbjtcbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBJU19JRSA9IC9NU0lFfFRyaWRlbnR8V2luZG93cyBQaG9uZXxFZGdlLy50ZXN0KHVhKTtcbmV4cG9ydCBjb25zdCBJU19JT1MgPSAvaVBob25lfGlQYWQvLnRlc3QodWEpO1xuZXhwb3J0IGNvbnN0IElTX0FORFJPSUQyID0gL0FuZHJvaWQgMlxcLi8udGVzdCh1YSk7XG5leHBvcnQgY29uc3QgUkVUUlkgPSAzO1xuZXhwb3J0IGNvbnN0IENPTlRBSU5FUl9DTEFTU05BTUUgPSBcIl9lZy1pbmZpbml0ZWdyaWQtY29udGFpbmVyX1wiO1xuXG5leHBvcnQgY29uc3QgQVBQRU5EID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBQUkVQRU5EID0gZmFsc2U7XG5leHBvcnQgY29uc3QgVkVSVElDQUwgPSBcInZlcnRpY2FsXCI7XG5leHBvcnQgY29uc3QgSE9SSVpPTlRBTCA9IFwiaG9yaXpvbnRhbFwiO1xuZXhwb3J0IGNvbnN0IENBQ0hFID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBOT19DQUNIRSA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IFRSVVNURUQgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IE5PX1RSVVNURUQgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBNVUxUSSA9IHRydWU7XG5leHBvcnQgY29uc3QgU0lOR0xFID0gZmFsc2U7XG5leHBvcnQgY29uc3QgRFVNTVlfUE9TSVRJT04gPSAtMTAwMDAwO1xuZXhwb3J0IGNvbnN0IEdST1VQS0VZX0FUVCA9IFwiZGF0YS1ncm91cGtleVwiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xuXHRob3Jpem9udGFsOiBmYWxzZSxcblx0bWFyZ2luOiAwLFxufTtcblxuZXhwb3J0IGNvbnN0IGFnZW50ID0gdWEudG9Mb3dlckNhc2UoKTtcbmV4cG9ydCBjb25zdCBpc01vYmlsZSA9IC9tb2JpfGlvc3xhbmRyb2lkLy50ZXN0KGFnZW50KTtcblxuZXhwb3J0IGNvbnN0IEFMSUdOID0ge1xuXHRTVEFSVDogXCJzdGFydFwiLFxuXHRDRU5URVI6IFwiY2VudGVyXCIsXG5cdEVORDogXCJlbmRcIixcblx0SlVTVElGWTogXCJqdXN0aWZ5XCIsXG59O1xuXG5leHBvcnQgY29uc3QgSURMRSA9IDA7XG5leHBvcnQgY29uc3QgTE9BRElOR19BUFBFTkQgPSAxO1xuZXhwb3J0IGNvbnN0IExPQURJTkdfUFJFUEVORCA9IDI7XG5leHBvcnQgY29uc3QgUFJPQ0VTU0lORyA9IDQ7XG5cblxuY29uc3Qgd2Via2l0ID0gL2FwcGxld2Via2l0XFwvKFtcXGR8Ll0qKS9nLmV4ZWMoYWdlbnQpO1xuXG5leHBvcnQgY29uc3QgV0VCS0lUX1ZFUlNJT04gPSAod2Via2l0ICYmIHBhcnNlSW50KHdlYmtpdFsxXSwgMTApKSB8fCAwO1xuZXhwb3J0IGNvbnN0IERFRkVOU0VfQlJPV1NFUiA9ICF3ZWJraXQgfHwgIVdFQktJVF9WRVJTSU9OIHx8IChXRUJLSVRfVkVSU0lPTiAmJiBXRUJLSVRfVkVSU0lPTiA8IDUzNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RzLmpzIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5jb25zdCB3aW4gPSB3aW5kb3c7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby1uZXN0ZWQtdGVybmFyeSAqL1xuXG5leHBvcnQge3dpbmRvd307XG5leHBvcnQgY29uc3QgZG9jdW1lbnQgPSB3aW4uZG9jdW1lbnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYnJvd3Nlci5qcyIsImltcG9ydCB7QUxJR04sIGlzTW9iaWxlfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7JCwgaXNXaW5kb3d9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IHN0eWxlID0ge1xuXHRcInZlcnRpY2FsXCI6IHtwb3NpdGlvbjogXCJ0b3BcIiwgc2l6ZTogXCJoZWlnaHRcIiwgY2FtbWVsU2l6ZTogXCJIZWlnaHRcIiwgY29vcmRpbmF0ZTogXCJZXCJ9LFxuXHRcImhvcml6b250YWxcIjoge3Bvc2l0aW9uOiBcImxlZnRcIiwgc2l6ZTogXCJ3aWR0aFwiLCBjYW1tZWxTaXplOiBcIldpZHRoXCIsIGNvb3JkaW5hdGU6IFwiWFwifSxcbn07XG5jb25zdCB7U1RBUlQsIENFTlRFUn0gPSBBTElHTjtcbmNvbnN0IFRSQU5TRk9STSA9IChmdW5jdGlvbigpIHtcblx0Y29uc3QgYm9keVN0eWxlID0gKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdKS5zdHlsZTtcblx0Y29uc3QgdGFyZ2V0ID0gW1widHJhbnNmb3JtXCIsIFwid2Via2l0VHJhbnNmb3JtXCIsIFwibXNUcmFuc2Zvcm1cIiwgXCJtb3pUcmFuc2Zvcm1cIl07XG5cblx0Zm9yIChsZXQgaSA9IDAsIGxlbiA9IHRhcmdldC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdGlmICh0YXJnZXRbaV0gaW4gYm9keVN0eWxlKSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0W2ldO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gXCJcIjtcbn0pKCk7XG5cbi8qKlxuICogUGFyYWxsYXggaXMgYSBkaXNwbGFjZW1lbnQgb3IgZGlmZmVyZW5jZSBpbiB0aGUgYXBwYXJlbnQgcG9zaXRpb24gb2YgYW4gb2JqZWN0IHZpZXdlZCBhbG9uZyB0d28gZGlmZmVyZW50IGxpbmVzIG9mIHNpZ2h0LiBZb3UgY2FuIGFwcGx5IHBhcmFsbGF4IGJ5IHNjcm9sbGluZyB0aGUgaW1hZ2UgYW5kIHNwZWVkIG9mIHRoZSBpdGVtLlxuICogQGtvIFBhcmFsbGF464qUIOyEnOuhnCDri6Trpbgg65GQIOqwnOydmCDsi5zshKDsl5DshJwg67CU652867O4IOusvOyytOydmCDsmbjqtIDsg4Eg7JyE7LmY7J2YIOuzgOychCDrmJDripQg7LCo7J207J6F64uI64ukLiDsiqTtgazroaTsl5Ag65Sw6528IOydtOuvuOyngOyZgCDslYTsnbTthZzsnZgg7IaN64+E66W8IOywqOydtOulvCDspIzsnLzroZzsjaggcGFyYWxsYXjsnYQg7KCB7Jqp7ZWgIOyImCDsnojsirXri4jri6QuXG4gKiBAY2xhc3MgZWcuUGFyYWxsYXhcbiAqIEBwYXJhbSB7RWxlbWVudHxTdHJpbmd9IFtyb290PXdpbmRvd10gU2Nyb2xsaW5nIHRhcmdldC4gSWYgeW91IHNjcm9sbCBpbiB0aGUgYm9keSwgc2V0IHdpbmRvdy4g7Iqk7YGs66Gk7ZWY64qUIOuMgOyDgS4g66eM7JW9IGJvZHnsl5DshJwg7Iqk7YGs66Gk7ZWY66m0IHdpbmRvd+uhnCDshKTsoJXtlZzri6QuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb24gb2JqZWN0IG9mIGVnLlBhcmFsbGF4IG1vZHVsZSA8a28+ZWcuUGFyYWxsYXgg66qo65OI7J2YIOyYteyFmCDqsJ3ssrQ8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ob3Jpem9udGFsPWZhbHNlXSBEaXJlY3Rpb24gb2YgdGhlIHNjcm9sbCBtb3ZlbWVudCAoZmFsc2U6IHZlcnRpY2FsLCB0cnVlOiBob3Jpem9udGFsKSA8a28+7Iqk7YGs66GkIOydtOuPmSDrsKntlqUgKGZhbHNlOiDshLjroZzrsKntlqUsIHRydWU6IOqwgOuhnOuwqe2WpSk8L2tvPlxuICogQHBhcmFtIHtFbGVtZW50fFN0cmluZ30gW29wdGlvbnMuY29udGFpbmVyPW51bGxdIENvbnRhaW5lciB3cmFwcGluZyBpdGVtcy4gSWYgcm9vdCBhbmQgY29udGFpbmVyIGhhdmUgbm8gZ2FwcywgZG8gbm90IHNldCBvcHRpb24uIDxrbz4g7JWE7J207YWc65Ok7J2EIOqwkOyLuOqzoCDsnojripQg7Luo7YWM7J2064SILiDrp4zslb0gcm9vdOyZgCBjb250YWluZXLqsITsnZgg7LCo7J206rCAIOyXhuycvOuptCwg7Ji17IWY7J2EIOyEpOygle2VmOyngCDslYrslYTrj4Qg65Cc64ukLjwva28+XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc2VsZWN0b3I9XCJpbWdcIl0gVGhlIHNlbGVjdG9yIG9mIHRoZSBpbWFnZSB0byBhcHBseSB0aGUgcGFyYWxsYXggaW4gdGhlIGl0ZW0gPGtvPiDslYTsnbTthZzslYjsl5Ag7J6I64qUIHBhcmFsbGF466W8IOyggeyaqe2VoCDsnbTrr7jsp4DsnZggc2VsZWN0b3IgPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc3RyZW5ndGg9MV0gRGltZW5zaW9ucyB0aGF0IGluZGljYXRlIHRoZSBzZW5zaXRpdml0eSBvZiBwYXJhbGxheC4gVGhlIGhpZ2hlciB0aGUgc3RyZW5ndGgsIHRoZSBmYXN0ZXIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNlbnRlcj0wXSBUaGUgbWlkZGxlIHBvaW50IG9mIHBhcmFsbGF4LiBUaGUgdG9wIGlzIDEgYW5kIHRoZSBib3R0b20gaXMgLTEuIDxrbz4gcGFyYWxsYXjqsIAg6rCA7Jq0642w66GcIOyYpOuKlCDsoJAuIOyDgeuLqOydtCAx7J206rOgIO2VmOuLqOydtCAtMeydtOuLpC4gPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucmFuZ2U9Wy0xLCAxXV0gUmFuZ2UgdG8gYXBwbHkgdGhlIHBhcmFsbGF4LiBUaGUgdG9wIGlzIDEgYW5kIHRoZSBib3R0b20gaXMgLTEuIDxrbz4gcGFyYWxsYXjqsIAg7KCB7Jqp65CY64qUIOuylOychCwg7IOB64uo7J20IDHsnbTqs6Ag7ZWY64uo7J20IC0x7J2064ukLiA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hbGlnbj1cInN0YXJ0XCJdIFRoZSBhbGlnbm1lbnQgb2YgdGhlIGltYWdlIGluIHRoZSBpdGVtLiAoXCJzdGFydFwiIDogdG9wIG9yIGxlZnQsIFwiY2VudGVyXCI6IG1pZGRsZSkgPGtvPiDslYTsnbTthZzslYjsnZgg7J2066+47KeA7J2YIOygleugrCA8L2tvPlxuICogQGV4YW1wbGVcbmBgYFxuPHNjcmlwdD5cbi8vIGlzT3ZlcmZsb3dTY3JvbGw6IGZhbHNlXG52YXIgcGFyYWxsYXggPSBuZXcgZWcuUGFyYWxsYXgod2luZG93LCB7XG5cdGNvbnRhaW5lcjogXCIuY29udGFpbmVyXCIsXG5cdHNlbGVjdG9yOiBcImltZy5wYXJhbGxheFwiLFxuXHRzdHJlbmd0aDogMC44LFxuXHRjZW50ZXI6IDAsXG5cdHJhbmdlOiBbLTEsIDFdLFxuXHRhbGlnbjogXCJjZW50ZXJcIixcblx0aG9yaXpvbnRhbDogdHJ1ZSxcbn0pO1xuXG4vLyBpc092ZXJmbG93U2Nyb2xsOiB0dXJlXG52YXIgcGFyYWxsYXggPSBuZXcgZWcuUGFyYWxsYXgoXCIuY29udGFpbmVyXCIsIHtcblx0c2VsZWN0b3I6IFwiaW1nLnBhcmFsbGF4XCIsXG5cdHN0cmVuZ3RoOiAwLjgsXG5cdGNlbnRlcjogMCxcblx0cmFuZ2U6IFstMSwgMV0sXG5cdGFsaWduOiBcImNlbnRlclwiLFxuXHRob3Jpem9udGFsOiB0cnVlLFxufSk7XG5cbi8vIGl0ZW0gaW50ZXJmYWNlXG52YXIgaXRlbSA9IHtcblx0Ly8gb3JpZ2luYWwgc2l6ZVxuXHRzaXplOiB7XG5cdFx0d2lkdGg6IDEwMCxcblx0XHRoZWlnaHQ6IDEwMCxcblx0fSxcblx0Ly8gdmlldyBzaXplXG5cdHJlY3Q6IHtcblx0XHR0b3A6IDEwMCxcblx0XHRsZWZ0OiAxMDAsXG5cdFx0d2lkdGg6IDEwMCxcblx0XHRoZWlnaHQ6IDEwMCxcblx0fVxufTtcbjwvc2NyaXB0PlxuYGBgXG4gKiovXG5jbGFzcyBQYXJhbGxheCB7XG5cdGNvbnN0cnVjdG9yKHJvb3QgPSB3aW5kb3csIG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0Y29udGFpbmVyOiBudWxsLFxuXHRcdFx0c2VsZWN0b3I6IFwiaW1nXCIsXG5cdFx0XHRzdHJlbmd0aDogMSxcblx0XHRcdGNlbnRlcjogMCxcblx0XHRcdHJhbmdlOiBbLTEsIDFdLFxuXHRcdFx0YWxpZ246IFNUQVJULFxuXHRcdFx0aG9yaXpvbnRhbDogZmFsc2UsXG5cdFx0fSwgb3B0aW9ucyk7XG5cdFx0dGhpcy5fcm9vdCA9ICQocm9vdCk7XG5cdFx0dGhpcy5fY29udGFpbmVyID0gdGhpcy5vcHRpb25zLmNvbnRhaW5lciAmJiAkKHRoaXMub3B0aW9ucy5jb250YWluZXIpO1xuXHRcdHRoaXMuX3Jvb3RTaXplID0gMDtcblx0XHR0aGlzLl9jb250YWluZXJQb3NpdGlvbiA9IDA7XG5cdFx0dGhpcy5fc3R5bGUgPSBzdHlsZVt0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbCA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiXTtcblx0XHR0aGlzLnJlc2l6ZSgpO1xuXHR9XG5cdF9jaGVja1BhcmFsbGF4SXRlbShlbGVtZW50KSB7XG5cdFx0aWYgKCFlbGVtZW50KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IHNlbGVjdG9yID0gdGhpcy5vcHRpb25zLnNlbGVjdG9yO1xuXG5cdFx0aWYgKCFlbGVtZW50Ll9fSU1BR0VfXykge1xuXHRcdFx0Y29uc3QgaW1nID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuXHRcdFx0ZWxlbWVudC5fX0lNQUdFX18gPSBpbWcgfHwgLTE7XG5cdFx0XHRpZiAoZWxlbWVudC5fX0lNQUdFX18gPT09IC0xKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGVsZW1lbnQuX19CT1hfXyA9IGltZy5wYXJlbnROb2RlO1xuXHRcdH1cblx0XHRpZiAoZWxlbWVudC5fX0lNQUdFX18gPT09IC0xKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IHNpemVOYW1lID0gdGhpcy5fc3R5bGUuY2FtbWVsU2l6ZTtcblxuXHRcdGVsZW1lbnQuX19JTUFHRV9fLl9fU0laRV9fID0gZWxlbWVudC5fX0lNQUdFX19bYG9mZnNldCR7c2l6ZU5hbWV9YF07XG5cdFx0ZWxlbWVudC5fX0JPWF9fLl9fU0laRV9fID0gZWxlbWVudC5fX0JPWF9fW2BvZmZzZXQke3NpemVOYW1lfWBdO1xuXHR9XG5cdC8qKlxuXHQgKiBBcyB0aGUgYnJvd3NlciBpcyByZXNpemVkLCB0aGUgZ2FwcyBiZXR3ZWVuIHRoZSByb290IGFuZCB0aGUgY29udGFpbmVyIGFuZCB0aGUgc2l6ZSBvZiB0aGUgaXRlbXMgYXJlIHVwZGF0ZWQuXG5cdCAqIEBrbyDruIzrnbzsmrDsoIDsnZgg7YGs6riw6rCAIOuzgOqyveuQqOycvOuhnCDsjaggcm9vdOyZgCBjb250YWluZXLsnZgg6rCE6rKp6rO8IOyVhOydtO2FnOuTpOydmCDtgazquLDrpbwg6rCx7Iug7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLlBhcmFsbGF4I3Jlc2l6ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBbaXRlbXMgPSBbXV0gSXRlbXMgdG8gYXBwbHkgcGFyYWxsYXguIEl0IGRvZXMgbm90IGFwcGx5IGlmIGl0IGlzIG5vdCBpbiB2aXNpYmxlIHJhbmdlLiA8a28+cGFyYWxsYXjrpbwg7KCB7Jqp7ZWgIOyVhOydtO2FnOuTpC4g6rCA7Iuc6rGw66as7JeQIOyhtOyerO2VmOyngCDslYrsnLzrqbQg7KCB7Jqp7J20IOyViOuQnOuLpC48L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5QYXJhbGxheH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQGV4YW1wbGVcbmBgYGpzXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoZSkge1xuXHRwYXJhbGxheC5yZXNpemUoaXRlbXMpO1xufSk7XG5gYGBcblx0ICovXG5cdHJlc2l6ZShpdGVtcyA9IFtdKSB7XG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMuX3Jvb3Q7XG5cdFx0Y29uc3QgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyO1xuXHRcdGNvbnN0IHBvc2l0aW9uTmFtZSA9IHRoaXMuX3N0eWxlLnBvc2l0aW9uO1xuXHRcdGNvbnN0IHNpemVOYW1lID0gdGhpcy5fc3R5bGUuY2FtbWVsU2l6ZTtcblxuXHRcdGlmICghY29udGFpbmVyIHx8IHJvb3QgPT09IGNvbnRhaW5lcikge1xuXHRcdFx0dGhpcy5fY29udGFpbmVyUG9zaXRpb24gPSAwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCByb290UmVjdCA9IChpc1dpbmRvdyhyb290KSA/IGRvY3VtZW50LmJvZHkgOiByb290KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGNvbnN0IGNvbnRhaW5lcnRSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHR0aGlzLl9jb250YWluZXJQb3NpdGlvbiA9IGNvbnRhaW5lcnRSZWN0W3Bvc2l0aW9uTmFtZV0gLSByb290UmVjdFtwb3NpdGlvbk5hbWVdO1xuXHRcdH1cblx0XHR0aGlzLl9yb290U2l6ZSA9IGlzV2luZG93KHJvb3QpID8gd2luZG93W2Bpbm5lciR7c2l6ZU5hbWV9YF0gfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W2BjbGllbnQke3NpemVOYW1lfWBdIDogcm9vdFtgY2xpZW50JHtzaXplTmFtZX1gXTtcblx0XHRpZiAoaXNNb2JpbGUgJiBpc1dpbmRvdyhyb290KSkge1xuXHRcdFx0Y29uc3QgYm9keVdpZHRoID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cdFx0XHRjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG5cdFx0XHR0aGlzLl9yb290U2l6ZSA9IHRoaXMuX3Jvb3RTaXplIC8gKGJvZHlXaWR0aCAvIHdpbmRvd1dpZHRoKTtcblx0XHR9XG5cdFx0aXRlbXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdHRoaXMuX2NoZWNrUGFyYWxsYXhJdGVtKGl0ZW0uZWwpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0LyoqXG5cdCAqIFNjcm9sbHMgdGhlIGltYWdlIGluIHRoZSBpdGVtIGJ5IGEgcGFyYWxsYXguXG5cdCAqIEBrbyDsiqTtgazroaTtlZjrqbQg7JWE7J207YWc7JWI7J2YIOydtOuvuOyngOulvCDsi5zssKjsoIHsmqnsi5ztgqjri6QuXG5cdCAqIEBtZXRob2QgZWcuUGFyYWxsYXgjcmVzaXplXG5cdCAqIEBwYXJhbSB7QXJyYXl9IFtpdGVtcyA9IFtdXSBJdGVtcyB0byBhcHBseSBwYXJhbGxheC4gSXQgZG9lcyBub3QgYXBwbHkgaWYgaXQgaXMgbm90IGluIHZpc2libGUgcmFuZ2UuIDxrbz5wYXJhbGxheOulvCDsoIHsmqntlaAg7JWE7J207YWc65OkLiDqsIDsi5zqsbDrpqzsl5Ag7KG07J6s7ZWY7KeAIOyViuycvOuptCDsoIHsmqnsnbQg7JWI65Cc64ukLjwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbc2Nyb2xsUG9zaXRpb25TdGFydCA9IDBdIFRoZSBzY3JvbGwgcG9zaXRpb24uXG5cdCAqIEByZXR1cm4ge2VnLlBhcmFsbGF4fSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAZXhhbXBsZVxuYGBganNcbmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmdW5jdGlvbiAoZSkge1xuXHRwYXJhbGxheC5yZWZyZXNoKGl0ZW1zLCBlLnNjcm9sbFRvcCk7XG59KTtcbmBgYFxuXHQgKi9cblx0cmVmcmVzaChpdGVtcyA9IFtdLCBzY3JvbGxQb3NpdGlvblN0YXJ0ID0gMCkge1xuXHRcdGNvbnN0IHN0eWxlTmFtZXMgPSB0aGlzLl9zdHlsZTtcblx0XHRjb25zdCBwb3NpdGlvbk5hbWUgPSBzdHlsZU5hbWVzLnBvc2l0aW9uO1xuXHRcdGNvbnN0IGNvb3JkaW5hdGVOYW1lID0gc3R5bGVOYW1lcy5jb29yZGluYXRlO1xuXHRcdGNvbnN0IHNpemVOYW1lID0gc3R5bGVOYW1lcy5zaXplO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3Qge3N0cmVuZ3RoLCBjZW50ZXIsIHJhbmdlLCBhbGlnbn0gPSBvcHRpb25zO1xuXHRcdGNvbnN0IHJvb3RTaXplID0gdGhpcy5fcm9vdFNpemU7XG5cdFx0Y29uc3Qgc2Nyb2xsUG9zaXRpb25FbmQgPSBzY3JvbGxQb3NpdGlvblN0YXJ0ICsgcm9vdFNpemU7XG5cdFx0Y29uc3QgY29udGFpbmVyUG9zaXRpb24gPSB0aGlzLl9jb250YWluZXJQb3NpdGlvbjtcblxuXHRcdGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRpZiAoIWl0ZW0ucmVjdCB8fCAhaXRlbS5zaXplIHx8ICFpdGVtLmVsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHBvc2l0aW9uID0gY29udGFpbmVyUG9zaXRpb24gKyBpdGVtLnJlY3RbcG9zaXRpb25OYW1lXTtcblx0XHRcdGNvbnN0IGl0ZW1TaXplID0gaXRlbS5yZWN0W3NpemVOYW1lXSB8fCBpdGVtLnNpemVbc2l6ZU5hbWVdO1xuXG5cdFx0XHQvLyBjaGVjayBpdGVtIGlzIGluIGNvbnRhaW5lci5cblx0XHRcdGlmIChzY3JvbGxQb3NpdGlvblN0YXJ0ID4gcG9zaXRpb24gKyBpdGVtU2l6ZSB8fFxuXHRcdFx0XHRzY3JvbGxQb3NpdGlvbkVuZCA8IHBvc2l0aW9uKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGVsID0gaXRlbS5lbDtcblxuXHRcdFx0aWYgKCFlbC5fX0lNQUdFX18pIHtcblx0XHRcdFx0dGhpcy5fY2hlY2tQYXJhbGxheEl0ZW0oZWwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGVsLl9fSU1BR0VfXyA9PT0gLTEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgaW1hZ2VFbGVtZW50ID0gZWwuX19JTUFHRV9fO1xuXHRcdFx0Y29uc3QgYm94RWxlbWVudCA9IGVsLl9fQk9YX187XG5cdFx0XHRjb25zdCBib3hTaXplID0gYm94RWxlbWVudC5fX1NJWkVfXztcblx0XHRcdGNvbnN0IGltYWdlU2l6ZSA9IGltYWdlRWxlbWVudC5fX1NJWkVfXztcblxuXHRcdFx0Ly8gbm8gcGFyYWxsYXhcblx0XHRcdGlmIChib3hTaXplID49IGltYWdlU2l6ZSkge1xuXHRcdFx0XHQvLyByZW1vdmUgdHJhbnNmb3JtIHN0eWxlXG5cdFx0XHRcdGltYWdlRWxlbWVudC5zdHlsZVtUUkFOU0ZPUk1dID0gXCJcIjtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBpZiBhcmVhJ3MgcG9zaXRpb24gaXMgY2VudGVyLCByYXRpbyBpcyAwLlxuXHRcdFx0Ly8gaWYgYXJlYSBpcyBoaWRkZW4gYXQgdGhlIHRvcCwgcmF0aW8gaXMgMS5cblx0XHRcdC8vIGlmIGFyZWEgaXMgaGlkZGVuIGF0IHRoZSBib3R0b20sIHJhdGlvIGlzIC0xLlxuXHRcdFx0Y29uc3QgaW1hZ2VQb3NpdGlvbiA9IHBvc2l0aW9uICsgYm94U2l6ZSAvIDI7XG5cdFx0XHRsZXQgcmF0aW8gPSAoc2Nyb2xsUG9zaXRpb25TdGFydCArIHJvb3RTaXplIC8gMiAtXG5cdFx0XHRcdChyb290U2l6ZSArIGJveFNpemUpIC8gMiAqIGNlbnRlciAtIGltYWdlUG9zaXRpb24pIC9cblx0XHRcdFx0KHJvb3RTaXplICsgYm94U2l6ZSkgKiAyICogc3RyZW5ndGg7XG5cblx0XHRcdC8vIGlmIHJhdGlvIGlzIG91dCBvZiB0aGUgcmFuZ2Ugb2YgLTEgYW5kIDEsIHNob3cgZW1wdHkgc3BhY2UuXG5cdFx0XHRyYXRpbyA9IE1hdGgubWF4KE1hdGgubWluKHJhdGlvLCByYW5nZVsxXSksIHJhbmdlWzBdKTtcblxuXHRcdFx0Ly8gZGlzdCBpcyB0aGUgcG9zaXRpb24gd2hlbiB0aHVtbmFpbCdzIGltYWdlIGlzIGNlbnRlcmVkLlxuXHRcdFx0Y29uc3QgZGlzdCA9IChib3hTaXplIC0gaW1hZ2VTaXplKSAvIDI7XG5cdFx0XHRsZXQgdHJhbnNsYXRlID0gZGlzdCAqICgxIC0gcmF0aW8pO1xuXG5cdFx0XHRpZiAoYWxpZ24gPT09IENFTlRFUikge1xuXHRcdFx0XHR0cmFuc2xhdGUgLT0gZGlzdDtcblx0XHRcdH1cblxuXHRcdFx0aW1hZ2VFbGVtZW50Ll9fVFJBTlNMQVRFX18gPSB0cmFuc2xhdGU7XG5cdFx0XHRpbWFnZUVsZW1lbnQuX19SQVRJT19fID0gcmF0aW87XG5cdFx0XHRpbWFnZUVsZW1lbnQuc3R5bGVbVFJBTlNGT1JNXSA9IGB0cmFuc2xhdGUke2Nvb3JkaW5hdGVOYW1lfSgke3RyYW5zbGF0ZX1weClgO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFyYWxsYXg7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUGFyYWxsYXguanMiLCJpbXBvcnQge3dpbmRvdywgZG9jdW1lbnR9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCB7XG5cdFNVUFBPUlRfQ09NUFVURURTVFlMRSxcblx0U1VQUE9SVF9BRERFVkVOVExJU1RFTkVSLFxuXHRTVVBQT1JUX1BBU1NJVkUsXG5cdFZFUlRJQ0FMLFxuXHRIT1JJWk9OVEFMLFxuXHRERUZBVUxUX09QVElPTlMsXG59IGZyb20gXCIuL2NvbnN0c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShub2Rlcykge1xuXHQvLyBTQ1JJUFQ1MDE0IGluIElFOFxuXHRjb25zdCBhcnJheSA9IFtdO1xuXG5cdGlmIChub2Rlcykge1xuXHRcdGZvciAobGV0IGkgPSAwLCBsZW4gPSBub2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0YXJyYXkucHVzaChub2Rlc1tpXSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhcnJheTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaWxsKGxlbmd0aCwgdmFsdWUpIHtcblx0Y29uc3QgYXJyYXkgPSB0eXBlb2YgbGVuZ3RoID09PSBcIm9iamVjdFwiID8gbGVuZ3RoIDogbmV3IEFycmF5KGxlbmd0aCk7XG5cdGNvbnN0IGxlbiA9IGFycmF5Lmxlbmd0aDtcblxuXHRmb3IgKGxldCBpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcblx0XHRhcnJheVtpXSA9IHZhbHVlO1xuXHR9XG5cdHJldHVybiBhcnJheTtcbn1cbi8qKlxuICogU2VsZWN0IG9yIGNyZWF0ZSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxqUXVlcnl9IHBhcmFtXG4gKiAgd2hlbiBzdHJpbmcgZ2l2ZW4gaXMgYXMgSFRNTCB0YWcsIHRoZW4gY3JlYXRlIGVsZW1lbnRcbiAqICBvdGhlcndpc2UgaXQgcmV0dXJucyBzZWxlY3RlZCBlbGVtZW50c1xuICogQHBhcmFtIHtCb29sZWFufSBtdWx0aVxuICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gJChwYXJhbSwgbXVsdGkgPSBmYWxzZSkge1xuXHRsZXQgZWw7XG5cblx0aWYgKHR5cGVvZiBwYXJhbSA9PT0gXCJzdHJpbmdcIikgeyAvLyBTdHJpbmcgKEhUTUwsIFNlbGVjdG9yKVxuXHRcdC8vIGNoZWNrIGlmIHN0cmluZyBpcyBIVE1MIHRhZyBmb3JtYXRcblx0XHRjb25zdCBtYXRjaCA9IHBhcmFtLm1hdGNoKC9ePChbQS16XSspXFxzKihbXj5dKik+Lyk7XG5cblx0XHQvLyBjcmVhdGluZyBlbGVtZW50XG5cdFx0aWYgKG1hdGNoKSB7IC8vIEhUTUxcblx0XHRcdGNvbnN0IGR1bW15ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHRcdFx0ZHVtbXkuaW5uZXJIVE1MID0gcGFyYW07XG5cdFx0XHRlbCA9IGR1bW15LmNoaWxkTm9kZXM7XG5cdFx0fSBlbHNlIHsgLy8gU2VsZWN0b3Jcblx0XHRcdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXJhbSk7XG5cdFx0fVxuXHRcdGlmIChtdWx0aSkge1xuXHRcdFx0ZWwgPSB0b0FycmF5KGVsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwgPSAoZWwgJiYgZWwubGVuZ3RoID4gMCAmJiBlbFswXSkgfHwgdW5kZWZpbmVkO1xuXHRcdH1cblx0fSBlbHNlIGlmIChwYXJhbSA9PT0gd2luZG93KSB7IC8vIHdpbmRvd1xuXHRcdGVsID0gcGFyYW07XG5cdH0gZWxzZSBpZiAocGFyYW0ubm9kZU5hbWUgJiZcblx0XHQocGFyYW0ubm9kZVR5cGUgPT09IDEgfHwgcGFyYW0ubm9kZVR5cGUgPT09IDkpKSB7IC8vIEhUTUxFbGVtZW50LCBEb2N1bWVudFxuXHRcdGVsID0gcGFyYW07XG5cdH0gZWxzZSBpZiAoKFwialF1ZXJ5XCIgaW4gd2luZG93ICYmIHBhcmFtIGluc3RhbmNlb2Ygd2luZG93LmpRdWVyeSkgfHxcblx0XHRwYXJhbS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUuanF1ZXJ5KSB7IC8vIGpRdWVyeVxuXHRcdGVsID0gbXVsdGkgPyBwYXJhbS50b0FycmF5KCkgOiBwYXJhbS5nZXQoMCk7XG5cdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwYXJhbSkpIHtcblx0XHRlbCA9IHBhcmFtLm1hcCh2ID0+ICQodikpO1xuXHRcdGlmICghbXVsdGkpIHtcblx0XHRcdGVsID0gZWwubGVuZ3RoID49IDEgPyBlbFswXSA6IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGVsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50KGVsZW1lbnQsIHR5cGUsIGhhbmRsZXIsIGV2ZW50TGlzdGVuZXJPcHRpb25zKSB7XG5cdGlmIChTVVBQT1JUX0FEREVWRU5UTElTVEVORVIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IGV2ZW50TGlzdGVuZXJPcHRpb25zIHx8IGZhbHNlO1xuXG5cdFx0aWYgKHR5cGVvZiBldmVudExpc3RlbmVyT3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0b3B0aW9ucyA9IFNVUFBPUlRfUEFTU0lWRSA/IGV2ZW50TGlzdGVuZXJPcHRpb25zIDogZmFsc2U7XG5cdFx0fVxuXHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKTtcblx0fSBlbHNlIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG5cdFx0ZWxlbWVudC5hdHRhY2hFdmVudChgb24ke3R5cGV9YCwgaGFuZGxlcik7XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbWVudFtgb24ke3R5cGV9YF0gPSBoYW5kbGVyO1xuXHR9XG59XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWxlbWVudCwgdHlwZSwgaGFuZGxlcikge1xuXHRpZiAoZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG5cdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcblx0fSBlbHNlIGlmIChlbGVtZW50LmRldGFjaEV2ZW50KSB7XG5cdFx0ZWxlbWVudC5kZXRhY2hFdmVudChgb24ke3R5cGV9YCwgaGFuZGxlcik7XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbWVudFtgb24ke3R5cGV9YF0gPSBudWxsO1xuXHR9XG59XG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsKGVsLCBpc1ZlcnRpY2FsKSB7XG5cdGNvbnN0IHByb3AgPSBgc2Nyb2xsJHtpc1ZlcnRpY2FsID8gXCJUb3BcIiA6IFwiTGVmdFwifWA7XG5cblx0aWYgKGVsID09PSB3aW5kb3cpIHtcblx0XHRyZXR1cm4gd2luZG93W2lzVmVydGljYWwgPyBcInBhZ2VZT2Zmc2V0XCIgOiBcInBhZ2VYT2Zmc2V0XCJdIHx8IGRvY3VtZW50LmJvZHlbcHJvcF0gfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W3Byb3BdO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBlbFtwcm9wXTtcblx0fVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbFRvKGVsLCB4LCB5KSB7XG5cdGlmIChlbCA9PT0gd2luZG93KSB7XG5cdFx0ZWwuc2Nyb2xsKHgsIHkpO1xuXHR9IGVsc2Uge1xuXHRcdGVsLnNjcm9sbExlZnQgPSB4O1xuXHRcdGVsLnNjcm9sbFRvcCA9IHk7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxCeShlbCwgeCwgeSkge1xuXHRpZiAoZWwgPT09IHdpbmRvdykge1xuXHRcdGVsLnNjcm9sbEJ5KHgsIHkpO1xuXHR9IGVsc2Uge1xuXHRcdGVsLnNjcm9sbExlZnQgKz0geDtcblx0XHRlbC5zY3JvbGxUb3AgKz0geTtcblx0fVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlcyhlbCkge1xuXHRyZXR1cm4gU1VQUE9SVF9DT01QVVRFRFNUWUxFID9cblx0XHR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkgOiBlbC5jdXJyZW50U3R5bGU7XG59XG5mdW5jdGlvbiBfZ2V0U2l6ZShlbCwgbmFtZSkge1xuXHRpZiAoZWwgPT09IHdpbmRvdykgeyAvLyBXSU5ET1dcblx0XHRyZXR1cm4gZWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W2BjbGllbnQke25hbWV9YF07XG5cdH0gZWxzZSBpZiAoZWwubm9kZVR5cGUgPT09IDkpIHsgLy8gRE9DVU1FTlRfTk9ERVxuXHRcdGNvbnN0IGRvYyA9IGVsLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdHJldHVybiBNYXRoLm1heChcblx0XHRcdGVsLmJvZHlbYHNjcm9sbCR7bmFtZX1gXSwgZG9jW2BzY3JvbGwke25hbWV9YF0sXG5cdFx0XHRlbC5ib2R5W2BvZmZzZXQke25hbWV9YF0sIGRvY1tgb2Zmc2V0JHtuYW1lfWBdLFxuXHRcdFx0ZG9jW2BjbGllbnQke25hbWV9YF1cblx0XHQpO1xuXHR9IGVsc2UgeyAvLyBOT0RFXG5cdFx0Y29uc3Qgc3R5bGUgPSBnZXRTdHlsZXMoZWwpO1xuXHRcdGNvbnN0IHZhbHVlID0gc3R5bGVbbmFtZS50b0xvd2VyQ2FzZSgpXTtcblxuXHRcdHJldHVybiBwYXJzZUZsb2F0KC9hdXRvfCUvLnRlc3QodmFsdWUpID8gZWxbYG9mZnNldCR7bmFtZX1gXSA6IHN0eWxlW25hbWUudG9Mb3dlckNhc2UoKV0pO1xuXHR9XG59XG5leHBvcnQgZnVuY3Rpb24gaW5uZXJXaWR0aChlbCkge1xuXHRyZXR1cm4gX2dldFNpemUoZWwsIFwiV2lkdGhcIik7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5uZXJIZWlnaHQoZWwpIHtcblx0cmV0dXJuIF9nZXRTaXplKGVsLCBcIkhlaWdodFwiKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNUWUxFID0ge1xuXHR2ZXJ0aWNhbDoge1xuXHRcdHBvczE6IFwidG9wXCIsXG5cdFx0ZW5kUG9zMTogXCJib3R0b21cIixcblx0XHRzaXplMTogXCJoZWlnaHRcIixcblx0XHRwb3MyOiBcImxlZnRcIixcblx0XHRlbmRQb3MyOiBcInJpZ2h0XCIsXG5cdFx0c2l6ZTI6IFwid2lkdGhcIixcblx0fSxcblx0aG9yaXpvbnRhbDoge1xuXHRcdHBvczE6IFwibGVmdFwiLFxuXHRcdGVuZFBvczE6IFwicmlnaHRcIixcblx0XHRzaXplMTogXCJ3aWR0aFwiLFxuXHRcdHBvczI6IFwidG9wXCIsXG5cdFx0ZW5kUG9zMjogXCJib3R0b21cIixcblx0XHRzaXplMjogXCJoZWlnaHRcIixcblx0fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZU5hbWVzKGlzSG9yaXpvbnRhbCkge1xuXHRyZXR1cm4gU1RZTEVbaXNIb3Jpem9udGFsID8gSE9SSVpPTlRBTCA6IFZFUlRJQ0FMXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpIHtcblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sXG5cdFx0REVGQVVMVF9PUFRJT05TLFxuXHRcdGRlZmF1bHRPcHRpb25zLFxuXHRcdG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9aZXJvQXJyYXkob3V0bGluZSkge1xuXHRpZiAoIW91dGxpbmUgfHwgIW91dGxpbmUubGVuZ3RoKSB7XG5cdFx0cmV0dXJuIFswXTtcblx0fVxuXHRyZXR1cm4gb3V0bGluZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzV2luZG93KGVsKSB7XG5cdHJldHVybiBlbCA9PT0gd2luZG93O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnIsIHRhcmdldCwgaXNSaWdodCA9IGZhbHNlKSB7XG5cdGlmICghaXNSaWdodCkge1xuXHRcdHJldHVybiBhcnIuaW5kZXhPZih0YXJnZXQpO1xuXHR9XG5cdGNvbnN0IGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cblx0Zm9yIChsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG5cdFx0aWYgKGFycltpXSAhPT0gdGFyZ2V0KSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGk7XG5cdH1cblx0cmV0dXJuIC0xO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==