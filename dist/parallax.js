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
exports.DEFENSE_BROWSER = exports.WEBKIT_VERSION = exports.PROCESSING = exports.LOADING_PREPEND = exports.LOADING_APPEND = exports.IDLE = exports.ALIGN = exports.isMobile = exports.agent = exports.DEFAULT_OPTIONS = exports.GROUPKEY_ATT = exports.DUMMY_POSITION = exports.SINGLE = exports.MULTI = exports.NO_TRUSTED = exports.TRUSTED = exports.NO_CACHE = exports.CACHE = exports.HORIZONTAL = exports.VERTICAL = exports.PREPEND = exports.APPEND = exports.IGNORE_CLASSNAME = exports.CONTAINER_CLASSNAME = exports.RETRY = exports.IS_ANDROID2 = exports.IS_IOS = exports.IS_IE = exports.SUPPORT_PASSIVE = exports.SUPPORT_ADDEVENTLISTENER = exports.SUPPORT_COMPUTEDSTYLE = undefined;

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
var IGNORE_CLASSNAME = exports.IGNORE_CLASSNAME = "_eg-infinitegrid-ignore_";

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
var DEFENSE_BROWSER = exports.DEFENSE_BROWSER = WEBKIT_VERSION && WEBKIT_VERSION < 537;

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
 * @classdesc Parallax is a displacement or difference in the apparent position of an object viewed along two different lines of sight. You can apply parallax by scrolling the image and speed of the item.
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
  * @method eg.Parallax#refresh
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZTExNzMzNTFiMzU0YzRkYjgxNyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9QYXJhbGxheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJTVVBQT1JUX0NPTVBVVEVEU1RZTEUiLCJTVVBQT1JUX0FEREVWRU5UTElTVEVORVIiLCJkb2N1bWVudCIsIlNVUFBPUlRfUEFTU0lWRSIsInN1cHBvcnRzUGFzc2l2ZU9wdGlvbiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldCIsImUiLCJJU19JRSIsInRlc3QiLCJJU19JT1MiLCJJU19BTkRST0lEMiIsIlJFVFJZIiwiQ09OVEFJTkVSX0NMQVNTTkFNRSIsIklHTk9SRV9DTEFTU05BTUUiLCJBUFBFTkQiLCJQUkVQRU5EIiwiVkVSVElDQUwiLCJIT1JJWk9OVEFMIiwiQ0FDSEUiLCJOT19DQUNIRSIsIlRSVVNURUQiLCJOT19UUlVTVEVEIiwiTVVMVEkiLCJTSU5HTEUiLCJEVU1NWV9QT1NJVElPTiIsIkdST1VQS0VZX0FUVCIsIkRFRkFVTFRfT1BUSU9OUyIsImhvcml6b250YWwiLCJtYXJnaW4iLCJhZ2VudCIsInRvTG93ZXJDYXNlIiwiaXNNb2JpbGUiLCJBTElHTiIsIlNUQVJUIiwiQ0VOVEVSIiwiRU5EIiwiSlVTVElGWSIsIklETEUiLCJMT0FESU5HX0FQUEVORCIsIkxPQURJTkdfUFJFUEVORCIsIlBST0NFU1NJTkciLCJ3ZWJraXQiLCJleGVjIiwiV0VCS0lUX1ZFUlNJT04iLCJwYXJzZUludCIsIkRFRkVOU0VfQlJPV1NFUiIsIndpbiIsIndpbmRvdyIsInN0eWxlIiwicG9zaXRpb24iLCJzaXplIiwiY2FtbWVsU2l6ZSIsImNvb3JkaW5hdGUiLCJUUkFOU0ZPUk0iLCJib2R5U3R5bGUiLCJoZWFkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ0YXJnZXQiLCJpIiwibGVuIiwibGVuZ3RoIiwiUGFyYWxsYXgiLCJyb290Iiwib3B0aW9ucyIsImNvbnRhaW5lciIsInNlbGVjdG9yIiwic3RyZW5ndGgiLCJjZW50ZXIiLCJyYW5nZSIsImFsaWduIiwiX3Jvb3QiLCJfY29udGFpbmVyIiwiX3Jvb3RTaXplIiwiX2NvbnRhaW5lclBvc2l0aW9uIiwiX3N0eWxlIiwicmVzaXplIiwiX2NoZWNrUGFyYWxsYXhJdGVtIiwiZWxlbWVudCIsIl9fSU1BR0VfXyIsImltZyIsInF1ZXJ5U2VsZWN0b3IiLCJfX0JPWF9fIiwicGFyZW50Tm9kZSIsInNpemVOYW1lIiwiX19TSVpFX18iLCJpdGVtcyIsInBvc2l0aW9uTmFtZSIsInJvb3RSZWN0IiwiYm9keSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNvbnRhaW5lcnRSZWN0IiwiZG9jdW1lbnRFbGVtZW50IiwiYm9keVdpZHRoIiwib2Zmc2V0V2lkdGgiLCJ3aW5kb3dXaWR0aCIsImlubmVyV2lkdGgiLCJmb3JFYWNoIiwiaXRlbSIsImVsIiwicmVmcmVzaCIsInNjcm9sbFBvc2l0aW9uU3RhcnQiLCJzdHlsZU5hbWVzIiwiY29vcmRpbmF0ZU5hbWUiLCJyb290U2l6ZSIsInNjcm9sbFBvc2l0aW9uRW5kIiwiY29udGFpbmVyUG9zaXRpb24iLCJyZWN0IiwiaXRlbVNpemUiLCJpbWFnZUVsZW1lbnQiLCJib3hFbGVtZW50IiwiYm94U2l6ZSIsImltYWdlU2l6ZSIsImltYWdlUG9zaXRpb24iLCJyYXRpbyIsIk1hdGgiLCJtYXgiLCJtaW4iLCJkaXN0IiwidHJhbnNsYXRlIiwiX19UUkFOU0xBVEVfXyIsIl9fUkFUSU9fXyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0b0FycmF5IiwiZmlsbCIsIiQiLCJhZGRFdmVudCIsInJlbW92ZUV2ZW50Iiwic2Nyb2xsIiwic2Nyb2xsVG8iLCJzY3JvbGxCeSIsImdldFN0eWxlcyIsImlubmVySGVpZ2h0IiwiZ2V0U3R5bGVOYW1lcyIsImFzc2lnbk9wdGlvbnMiLCJ0b1plcm9BcnJheSIsImlzV2luZG93IiwiaW5kZXhPZiIsIm5vZGVzIiwiYXJyYXkiLCJwdXNoIiwidmFsdWUiLCJBcnJheSIsInBhcmFtIiwibXVsdGkiLCJtYXRjaCIsImR1bW15IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImNoaWxkTm9kZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidW5kZWZpbmVkIiwibm9kZU5hbWUiLCJub2RlVHlwZSIsImpRdWVyeSIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwianF1ZXJ5IiwiaXNBcnJheSIsIm1hcCIsInYiLCJ0eXBlIiwiaGFuZGxlciIsImV2ZW50TGlzdGVuZXJPcHRpb25zIiwiYXR0YWNoRXZlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGV0YWNoRXZlbnQiLCJpc1ZlcnRpY2FsIiwicHJvcCIsIngiLCJ5Iiwic2Nyb2xsTGVmdCIsInNjcm9sbFRvcCIsImdldENvbXB1dGVkU3R5bGUiLCJjdXJyZW50U3R5bGUiLCJfZ2V0U2l6ZSIsIm5hbWUiLCJkb2MiLCJwYXJzZUZsb2F0IiwiU1RZTEUiLCJ2ZXJ0aWNhbCIsInBvczEiLCJlbmRQb3MxIiwic2l6ZTEiLCJwb3MyIiwiZW5kUG9zMiIsInNpemUyIiwiaXNIb3Jpem9udGFsIiwiZGVmYXVsdE9wdGlvbnMiLCJvdXRsaW5lIiwiYXJyIiwiaXNSaWdodCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBOztBQUVBLElBQU1BLEtBQUssZ0JBQU9DLFNBQVAsQ0FBaUJDLFNBQTVCOztBQUVPLElBQU1DLHdEQUF3QixDQUFDLEVBQUUscUNBQUYsQ0FBL0I7QUFDQSxJQUFNQyw4REFBMkIsQ0FBQyxFQUFFLHNCQUFzQkMsUUFBeEIsQ0FBbEM7QUFDQSxJQUFNQyw0Q0FBbUIsWUFBTTtBQUNyQyxLQUFJQyx3QkFBd0IsS0FBNUI7O0FBRUEsS0FBSTtBQUNILE1BQUlILDRCQUE0QkksT0FBT0MsY0FBdkMsRUFBdUQ7QUFDdERKLFlBQVNLLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLElBQWxDLEVBQXdDRixPQUFPQyxjQUFQLENBQXNCLEVBQXRCLEVBQ3ZDLFNBRHVDLEVBQzVCO0FBQ1ZFLE9BRFUsaUJBQ0o7QUFDTEosNkJBQXdCLElBQXhCO0FBQ0E7QUFIUyxJQUQ0QixDQUF4QztBQU1BO0FBQ0QsRUFURCxDQVNFLE9BQU9LLENBQVAsRUFBVSxDQUFFO0FBQ2QsUUFBT0wscUJBQVA7QUFDQSxDQWQ4QixFQUF4Qjs7QUFnQkEsSUFBTU0sd0JBQVEsa0NBQWtDQyxJQUFsQyxDQUF1Q2QsRUFBdkMsQ0FBZDtBQUNBLElBQU1lLDBCQUFTLGNBQWNELElBQWQsQ0FBbUJkLEVBQW5CLENBQWY7QUFDQSxJQUFNZ0Isb0NBQWMsY0FBY0YsSUFBZCxDQUFtQmQsRUFBbkIsQ0FBcEI7QUFDQSxJQUFNaUIsd0JBQVEsQ0FBZDtBQUNBLElBQU1DLG9EQUFzQiw2QkFBNUI7QUFDQSxJQUFNQyw4Q0FBbUIsMEJBQXpCOztBQUVBLElBQU1DLDBCQUFTLElBQWY7QUFDQSxJQUFNQyw0QkFBVSxLQUFoQjtBQUNBLElBQU1DLDhCQUFXLFVBQWpCO0FBQ0EsSUFBTUMsa0NBQWEsWUFBbkI7QUFDQSxJQUFNQyx3QkFBUSxJQUFkO0FBQ0EsSUFBTUMsOEJBQVcsS0FBakI7QUFDQSxJQUFNQyw0QkFBVSxJQUFoQjtBQUNBLElBQU1DLGtDQUFhLEtBQW5CO0FBQ0EsSUFBTUMsd0JBQVEsSUFBZDtBQUNBLElBQU1DLDBCQUFTLEtBQWY7QUFDQSxJQUFNQywwQ0FBaUIsQ0FBQyxNQUF4QjtBQUNBLElBQU1DLHNDQUFlLGVBQXJCOztBQUVBLElBQU1DLDRDQUFrQjtBQUM5QkMsYUFBWSxLQURrQjtBQUU5QkMsU0FBUTtBQUZzQixDQUF4Qjs7QUFLQSxJQUFNQyx3QkFBUW5DLEdBQUdvQyxXQUFILEVBQWQ7QUFDQSxJQUFNQyw4QkFBVyxtQkFBbUJ2QixJQUFuQixDQUF3QnFCLEtBQXhCLENBQWpCOztBQUVBLElBQU1HLHdCQUFRO0FBQ3BCQyxRQUFPLE9BRGE7QUFFcEJDLFNBQVEsUUFGWTtBQUdwQkMsTUFBSyxLQUhlO0FBSXBCQyxVQUFTO0FBSlcsQ0FBZDs7QUFPQSxJQUFNQyxzQkFBTyxDQUFiO0FBQ0EsSUFBTUMsMENBQWlCLENBQXZCO0FBQ0EsSUFBTUMsNENBQWtCLENBQXhCO0FBQ0EsSUFBTUMsa0NBQWEsQ0FBbkI7O0FBR1AsSUFBTUMsU0FBUywwQkFBMEJDLElBQTFCLENBQStCYixLQUEvQixDQUFmOztBQUVPLElBQU1jLDBDQUFrQkYsVUFBVUcsU0FBU0gsT0FBTyxDQUFQLENBQVQsRUFBb0IsRUFBcEIsQ0FBWCxJQUF1QyxDQUE5RDtBQUNBLElBQU1JLDRDQUFtQkYsa0JBQWtCQSxpQkFBaUIsR0FBNUQsQzs7Ozs7Ozs7OztBQ2xFUDtBQUNBLElBQU1HLE1BQU1DLE1BQVo7QUFDQTs7UUFFUUEsTSxHQUFBQSxNO0FBQ0QsSUFBTWhELDhCQUFXK0MsSUFBSS9DLFFBQXJCLEM7Ozs7Ozs7Ozs7O0FDTFA7O0FBQ0E7Ozs7QUFFQSxJQUFNaUQsUUFBUTtBQUNiLGFBQVksRUFBQ0MsVUFBVSxLQUFYLEVBQWtCQyxNQUFNLFFBQXhCLEVBQWtDQyxZQUFZLFFBQTlDLEVBQXdEQyxZQUFZLEdBQXBFLEVBREM7QUFFYixlQUFjLEVBQUNILFVBQVUsTUFBWCxFQUFtQkMsTUFBTSxPQUF6QixFQUFrQ0MsWUFBWSxPQUE5QyxFQUF1REMsWUFBWSxHQUFuRTtBQUZELENBQWQ7SUFJT25CLEssaUJBQUFBLEs7SUFBT0MsTSxpQkFBQUEsTTs7QUFDZCxJQUFNbUIsWUFBYSxZQUFXO0FBQzdCLEtBQU1DLFlBQVksQ0FBQ3ZELFNBQVN3RCxJQUFULElBQWlCeEQsU0FBU3lELG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQWxCLEVBQTREUixLQUE5RTtBQUNBLEtBQU1TLFNBQVMsQ0FBQyxXQUFELEVBQWMsaUJBQWQsRUFBaUMsYUFBakMsRUFBZ0QsY0FBaEQsQ0FBZjs7QUFFQSxNQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxNQUFNRixPQUFPRyxNQUE3QixFQUFxQ0YsSUFBSUMsR0FBekMsRUFBOENELEdBQTlDLEVBQW1EO0FBQ2xELE1BQUlELE9BQU9DLENBQVAsS0FBYUosU0FBakIsRUFBNEI7QUFDM0IsVUFBT0csT0FBT0MsQ0FBUCxDQUFQO0FBQ0E7QUFDRDtBQUNELFFBQU8sRUFBUDtBQUNBLENBVmlCLEVBQWxCOztBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXVETUcsUTtBQUNMLHFCQUF5QztBQUFBLE1BQTdCQyxJQUE2Qix1RUFBdEJmLE1BQXNCO0FBQUEsTUFBZGdCLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDeEMsT0FBS0EsT0FBTCxHQUFlLFNBQWM7QUFDNUJDLGNBQVcsSUFEaUI7QUFFNUJDLGFBQVUsS0FGa0I7QUFHNUJDLGFBQVUsQ0FIa0I7QUFJNUJDLFdBQVEsQ0FKb0I7QUFLNUJDLFVBQU8sQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLENBTHFCO0FBTTVCQyxVQUFPcEMsS0FOcUI7QUFPNUJOLGVBQVk7QUFQZ0IsR0FBZCxFQVFab0MsT0FSWSxDQUFmO0FBU0EsT0FBS08sS0FBTCxHQUFhLGNBQUVSLElBQUYsQ0FBYjtBQUNBLE9BQUtTLFVBQUwsR0FBa0IsS0FBS1IsT0FBTCxDQUFhQyxTQUFiLElBQTBCLGNBQUUsS0FBS0QsT0FBTCxDQUFhQyxTQUFmLENBQTVDO0FBQ0EsT0FBS1EsU0FBTCxHQUFpQixDQUFqQjtBQUNBLE9BQUtDLGtCQUFMLEdBQTBCLENBQTFCO0FBQ0EsT0FBS0MsTUFBTCxHQUFjMUIsTUFBTSxLQUFLZSxPQUFMLENBQWFwQyxVQUFiLEdBQTBCLFlBQTFCLEdBQXlDLFVBQS9DLENBQWQ7QUFDQSxPQUFLZ0QsTUFBTDtBQUNBOztvQkFDREMsa0IsK0JBQW1CQyxPLEVBQVM7QUFDM0IsTUFBSSxDQUFDQSxPQUFMLEVBQWM7QUFDYjtBQUNBO0FBQ0QsTUFBTVosV0FBVyxLQUFLRixPQUFMLENBQWFFLFFBQTlCOztBQUVBLE1BQUksQ0FBQ1ksUUFBUUMsU0FBYixFQUF3QjtBQUN2QixPQUFNQyxNQUFNRixRQUFRRyxhQUFSLENBQXNCZixRQUF0QixDQUFaOztBQUVBWSxXQUFRQyxTQUFSLEdBQW9CQyxPQUFPLENBQUMsQ0FBNUI7QUFDQSxPQUFJRixRQUFRQyxTQUFSLEtBQXNCLENBQUMsQ0FBM0IsRUFBOEI7QUFDN0I7QUFDQTtBQUNERCxXQUFRSSxPQUFSLEdBQWtCRixJQUFJRyxVQUF0QjtBQUNBO0FBQ0QsTUFBSUwsUUFBUUMsU0FBUixLQUFzQixDQUFDLENBQTNCLEVBQThCO0FBQzdCO0FBQ0E7QUFDRCxNQUFNSyxXQUFXLEtBQUtULE1BQUwsQ0FBWXZCLFVBQTdCOztBQUVBMEIsVUFBUUMsU0FBUixDQUFrQk0sUUFBbEIsR0FBNkJQLFFBQVFDLFNBQVIsWUFBMkJLLFFBQTNCLENBQTdCO0FBQ0FOLFVBQVFJLE9BQVIsQ0FBZ0JHLFFBQWhCLEdBQTJCUCxRQUFRSSxPQUFSLFlBQXlCRSxRQUF6QixDQUEzQjtBQUNBLEU7QUFDRDs7Ozs7Ozs7Ozs7Ozs7O29CQWFBUixNLHFCQUFtQjtBQUFBOztBQUFBLE1BQVpVLEtBQVksdUVBQUosRUFBSTs7QUFDbEIsTUFBTXZCLE9BQU8sS0FBS1EsS0FBbEI7QUFDQSxNQUFNTixZQUFZLEtBQUtPLFVBQXZCO0FBQ0EsTUFBTWUsZUFBZSxLQUFLWixNQUFMLENBQVl6QixRQUFqQztBQUNBLE1BQU1rQyxXQUFXLEtBQUtULE1BQUwsQ0FBWXZCLFVBQTdCOztBQUVBLE1BQUksQ0FBQ2EsU0FBRCxJQUFjRixTQUFTRSxTQUEzQixFQUFzQztBQUNyQyxRQUFLUyxrQkFBTCxHQUEwQixDQUExQjtBQUNBLEdBRkQsTUFFTztBQUNOLE9BQU1jLFdBQVcsQ0FBQyxxQkFBU3pCLElBQVQsSUFBaUIvRCxTQUFTeUYsSUFBMUIsR0FBaUMxQixJQUFsQyxFQUF3QzJCLHFCQUF4QyxFQUFqQjtBQUNBLE9BQU1DLGlCQUFpQjFCLFVBQVV5QixxQkFBVixFQUF2Qjs7QUFFQSxRQUFLaEIsa0JBQUwsR0FBMEJpQixlQUFlSixZQUFmLElBQStCQyxTQUFTRCxZQUFULENBQXpEO0FBQ0E7QUFDRCxPQUFLZCxTQUFMLEdBQWlCLHFCQUFTVixJQUFULElBQWlCZixpQkFBZW9DLFFBQWYsS0FBOEJwRixTQUFTNEYsZUFBVCxZQUFrQ1IsUUFBbEMsQ0FBL0MsR0FBK0ZyQixnQkFBY3FCLFFBQWQsQ0FBaEg7QUFDQSxNQUFJLG1CQUFXLHFCQUFTckIsSUFBVCxDQUFmLEVBQStCO0FBQzlCLE9BQU04QixZQUFZN0YsU0FBU3lGLElBQVQsQ0FBY0ssV0FBZCxJQUE2QjlGLFNBQVM0RixlQUFULENBQXlCRSxXQUF4RTtBQUNBLE9BQU1DLGNBQWMvQyxPQUFPZ0QsVUFBM0I7O0FBRUEsUUFBS3ZCLFNBQUwsR0FBaUIsS0FBS0EsU0FBTCxJQUFrQm9CLFlBQVlFLFdBQTlCLENBQWpCO0FBQ0E7QUFDRFQsUUFBTVcsT0FBTixDQUFjLGdCQUFRO0FBQ3JCLFNBQUtwQixrQkFBTCxDQUF3QnFCLEtBQUtDLEVBQTdCO0FBQ0EsR0FGRDs7QUFJQSxTQUFPLElBQVA7QUFDQSxFO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBY0FDLE8sc0JBQTZDO0FBQUE7O0FBQUEsTUFBckNkLEtBQXFDLHVFQUE3QixFQUE2QjtBQUFBLE1BQXpCZSxtQkFBeUIsdUVBQUgsQ0FBRzs7QUFDNUMsTUFBTUMsYUFBYSxLQUFLM0IsTUFBeEI7QUFDQSxNQUFNWSxlQUFlZSxXQUFXcEQsUUFBaEM7QUFDQSxNQUFNcUQsaUJBQWlCRCxXQUFXakQsVUFBbEM7QUFDQSxNQUFNK0IsV0FBV2tCLFdBQVduRCxJQUE1QjtBQUNBLE1BQU1hLFVBQVUsS0FBS0EsT0FBckI7QUFMNEMsTUFNckNHLFFBTnFDLEdBTUhILE9BTkcsQ0FNckNHLFFBTnFDO0FBQUEsTUFNM0JDLE1BTjJCLEdBTUhKLE9BTkcsQ0FNM0JJLE1BTjJCO0FBQUEsTUFNbkJDLEtBTm1CLEdBTUhMLE9BTkcsQ0FNbkJLLEtBTm1CO0FBQUEsTUFNWkMsS0FOWSxHQU1ITixPQU5HLENBTVpNLEtBTlk7O0FBTzVDLE1BQU1rQyxXQUFXLEtBQUsvQixTQUF0QjtBQUNBLE1BQU1nQyxvQkFBb0JKLHNCQUFzQkcsUUFBaEQ7QUFDQSxNQUFNRSxvQkFBb0IsS0FBS2hDLGtCQUEvQjs7QUFFQVksUUFBTVcsT0FBTixDQUFjLGdCQUFRO0FBQ3JCLE9BQUksQ0FBQ0MsS0FBS1MsSUFBTixJQUFjLENBQUNULEtBQUsvQyxJQUFwQixJQUE0QixDQUFDK0MsS0FBS0MsRUFBdEMsRUFBMEM7QUFDekM7QUFDQTtBQUNELE9BQU1qRCxXQUFXd0Qsb0JBQW9CUixLQUFLUyxJQUFMLENBQVVwQixZQUFWLENBQXJDO0FBQ0EsT0FBTXFCLFdBQVdWLEtBQUtTLElBQUwsQ0FBVXZCLFFBQVYsS0FBdUJjLEtBQUsvQyxJQUFMLENBQVVpQyxRQUFWLENBQXhDOztBQUVBO0FBQ0EsT0FBSWlCLHNCQUFzQm5ELFdBQVcwRCxRQUFqQyxJQUNISCxvQkFBb0J2RCxRQURyQixFQUMrQjtBQUM5QjtBQUNBO0FBQ0QsT0FBTWlELEtBQUtELEtBQUtDLEVBQWhCOztBQUVBLE9BQUksQ0FBQ0EsR0FBR3BCLFNBQVIsRUFBbUI7QUFDbEIsV0FBS0Ysa0JBQUwsQ0FBd0JzQixFQUF4QjtBQUNBO0FBQ0QsT0FBSUEsR0FBR3BCLFNBQUgsS0FBaUIsQ0FBQyxDQUF0QixFQUF5QjtBQUN4QjtBQUNBO0FBQ0QsT0FBTThCLGVBQWVWLEdBQUdwQixTQUF4QjtBQUNBLE9BQU0rQixhQUFhWCxHQUFHakIsT0FBdEI7QUFDQSxPQUFNNkIsVUFBVUQsV0FBV3pCLFFBQTNCO0FBQ0EsT0FBTTJCLFlBQVlILGFBQWF4QixRQUEvQjs7QUFFQTtBQUNBLE9BQUkwQixXQUFXQyxTQUFmLEVBQTBCO0FBQ3pCO0FBQ0FILGlCQUFhNUQsS0FBYixDQUFtQkssU0FBbkIsSUFBZ0MsRUFBaEM7QUFDQTtBQUNBOztBQUVEO0FBQ0E7QUFDQTtBQUNBLE9BQU0yRCxnQkFBZ0IvRCxXQUFXNkQsVUFBVSxDQUEzQztBQUNBLE9BQUlHLFFBQVEsQ0FBQ2Isc0JBQXNCRyxXQUFXLENBQWpDLEdBQ1osQ0FBQ0EsV0FBV08sT0FBWixJQUF1QixDQUF2QixHQUEyQjNDLE1BRGYsR0FDd0I2QyxhQUR6QixLQUVWVCxXQUFXTyxPQUZELElBRVksQ0FGWixHQUVnQjVDLFFBRjVCOztBQUlBO0FBQ0ErQyxXQUFRQyxLQUFLQyxHQUFMLENBQVNELEtBQUtFLEdBQUwsQ0FBU0gsS0FBVCxFQUFnQjdDLE1BQU0sQ0FBTixDQUFoQixDQUFULEVBQW9DQSxNQUFNLENBQU4sQ0FBcEMsQ0FBUjs7QUFFQTtBQUNBLE9BQU1pRCxPQUFPLENBQUNQLFVBQVVDLFNBQVgsSUFBd0IsQ0FBckM7QUFDQSxPQUFJTyxZQUFZRCxRQUFRLElBQUlKLEtBQVosQ0FBaEI7O0FBRUEsT0FBSTVDLFVBQVVuQyxNQUFkLEVBQXNCO0FBQ3JCb0YsaUJBQWFELElBQWI7QUFDQTs7QUFFRFQsZ0JBQWFXLGFBQWIsR0FBNkJELFNBQTdCO0FBQ0FWLGdCQUFhWSxTQUFiLEdBQXlCUCxLQUF6QjtBQUNBTCxnQkFBYTVELEtBQWIsQ0FBbUJLLFNBQW5CLGtCQUE0Q2lELGNBQTVDLFNBQThEZ0IsU0FBOUQ7QUFDQSxHQXRERDtBQXVEQSxTQUFPLElBQVA7QUFDQSxFOzs7OztBQUdGRyxPQUFPQyxPQUFQLEdBQWlCN0QsUUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7OztRQ3RPZ0I4RCxPLEdBQUFBLE87UUFXQUMsSSxHQUFBQSxJO1FBaUJBQyxDLEdBQUFBLEM7UUFxQ0FDLFEsR0FBQUEsUTtRQWNBQyxXLEdBQUFBLFc7UUFTQUMsTSxHQUFBQSxNO1FBU0FDLFEsR0FBQUEsUTtRQVFBQyxRLEdBQUFBLFE7UUFRQUMsUyxHQUFBQSxTO1FBc0JBcEMsVSxHQUFBQSxVO1FBR0FxQyxXLEdBQUFBLFc7UUF1QkFDLGEsR0FBQUEsYTtRQUlBQyxhLEdBQUFBLGE7UUFPQUMsVyxHQUFBQSxXO1FBT0FDLFEsR0FBQUEsUTtRQUlBQyxPLEdBQUFBLE87O0FBak1oQjs7QUFDQTs7QUFTTyxTQUFTZCxPQUFULENBQWlCZSxLQUFqQixFQUF3QjtBQUM5QjtBQUNBLEtBQU1DLFFBQVEsRUFBZDs7QUFFQSxLQUFJRCxLQUFKLEVBQVc7QUFDVixPQUFLLElBQUloRixJQUFJLENBQVIsRUFBV0MsTUFBTStFLE1BQU05RSxNQUE1QixFQUFvQ0YsSUFBSUMsR0FBeEMsRUFBNkNELEdBQTdDLEVBQWtEO0FBQ2pEaUYsU0FBTUMsSUFBTixDQUFXRixNQUFNaEYsQ0FBTixDQUFYO0FBQ0E7QUFDRDtBQUNELFFBQU9pRixLQUFQO0FBQ0E7QUFDTSxTQUFTZixJQUFULENBQWNoRSxNQUFkLEVBQXNCaUYsS0FBdEIsRUFBNkI7QUFDbkMsS0FBTUYsUUFBUSxRQUFPL0UsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixHQUE2QkEsTUFBN0IsR0FBc0MsSUFBSWtGLEtBQUosQ0FBVWxGLE1BQVYsQ0FBcEQ7QUFDQSxLQUFNRCxNQUFNZ0YsTUFBTS9FLE1BQWxCOztBQUVBLE1BQUssSUFBSUYsSUFBSUMsTUFBTSxDQUFuQixFQUFzQkQsS0FBSyxDQUEzQixFQUE4QixFQUFFQSxDQUFoQyxFQUFtQztBQUNsQ2lGLFFBQU1qRixDQUFOLElBQVdtRixLQUFYO0FBQ0E7QUFDRCxRQUFPRixLQUFQO0FBQ0E7QUFDRDs7Ozs7Ozs7QUFRTyxTQUFTZCxDQUFULENBQVdrQixLQUFYLEVBQWlDO0FBQUEsS0FBZkMsS0FBZSx1RUFBUCxLQUFPOztBQUN2QyxLQUFJOUMsV0FBSjs7QUFFQSxLQUFJLE9BQU82QyxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQUU7QUFDaEM7QUFDQSxNQUFNRSxRQUFRRixNQUFNRSxLQUFOLENBQVksdUJBQVosQ0FBZDs7QUFFQTtBQUNBLE1BQUlBLEtBQUosRUFBVztBQUFFO0FBQ1osT0FBTUMsUUFBUSxrQkFBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFkOztBQUVBRCxTQUFNRSxTQUFOLEdBQWtCTCxLQUFsQjtBQUNBN0MsUUFBS2dELE1BQU1HLFVBQVg7QUFDQSxHQUxELE1BS087QUFBRTtBQUNSbkQsUUFBSyxrQkFBU29ELGdCQUFULENBQTBCUCxLQUExQixDQUFMO0FBQ0E7QUFDRCxNQUFJQyxLQUFKLEVBQVc7QUFDVjlDLFFBQUt5QixRQUFRekIsRUFBUixDQUFMO0FBQ0EsR0FGRCxNQUVPO0FBQ05BLFFBQU1BLE1BQU1BLEdBQUd0QyxNQUFILEdBQVksQ0FBbEIsSUFBdUJzQyxHQUFHLENBQUgsQ0FBeEIsSUFBa0NxRCxTQUF2QztBQUNBO0FBQ0QsRUFsQkQsTUFrQk8sSUFBSVIseUJBQUosRUFBc0I7QUFBRTtBQUM5QjdDLE9BQUs2QyxLQUFMO0FBQ0EsRUFGTSxNQUVBLElBQUlBLE1BQU1TLFFBQU4sS0FDVFQsTUFBTVUsUUFBTixLQUFtQixDQUFuQixJQUF3QlYsTUFBTVUsUUFBTixLQUFtQixDQURsQyxDQUFKLEVBQzBDO0FBQUU7QUFDbER2RCxPQUFLNkMsS0FBTDtBQUNBLEVBSE0sTUFHQSxJQUFLLCtCQUFzQkEsaUJBQWlCLGdCQUFPVyxNQUEvQyxJQUNWWCxNQUFNWSxXQUFOLENBQWtCQyxTQUFsQixDQUE0QkMsTUFEdEIsRUFDOEI7QUFBRTtBQUN0QzNELE9BQUs4QyxRQUFRRCxNQUFNcEIsT0FBTixFQUFSLEdBQTBCb0IsTUFBTTFJLEdBQU4sQ0FBVSxDQUFWLENBQS9CO0FBQ0EsRUFITSxNQUdBLElBQUl5SSxNQUFNZ0IsT0FBTixDQUFjZixLQUFkLENBQUosRUFBMEI7QUFDaEM3QyxPQUFLNkMsTUFBTWdCLEdBQU4sQ0FBVTtBQUFBLFVBQUtsQyxFQUFFbUMsQ0FBRixDQUFMO0FBQUEsR0FBVixDQUFMO0FBQ0EsTUFBSSxDQUFDaEIsS0FBTCxFQUFZO0FBQ1g5QyxRQUFLQSxHQUFHdEMsTUFBSCxJQUFhLENBQWIsR0FBaUJzQyxHQUFHLENBQUgsQ0FBakIsR0FBeUJxRCxTQUE5QjtBQUNBO0FBQ0Q7QUFDRCxRQUFPckQsRUFBUDtBQUNBO0FBQ00sU0FBUzRCLFFBQVQsQ0FBa0JqRCxPQUFsQixFQUEyQm9GLElBQTNCLEVBQWlDQyxPQUFqQyxFQUEwQ0Msb0JBQTFDLEVBQWdFO0FBQ3RFLHVDQUE4QjtBQUM3QixNQUFJcEcsVUFBVW9HLHdCQUF3QixLQUF0Qzs7QUFFQSxNQUFJLFFBQU9BLG9CQUFQLHlDQUFPQSxvQkFBUCxPQUFnQyxRQUFwQyxFQUE4QztBQUM3Q3BHLGFBQVUsMEJBQWtCb0csb0JBQWxCLEdBQXlDLEtBQW5EO0FBQ0E7QUFDRHRGLFVBQVF6RSxnQkFBUixDQUF5QjZKLElBQXpCLEVBQStCQyxPQUEvQixFQUF3Q25HLE9BQXhDO0FBQ0EsRUFQRCxNQU9PLElBQUljLFFBQVF1RixXQUFaLEVBQXlCO0FBQy9CdkYsVUFBUXVGLFdBQVIsUUFBeUJILElBQXpCLEVBQWlDQyxPQUFqQztBQUNBLEVBRk0sTUFFQTtBQUNOckYsaUJBQWFvRixJQUFiLElBQXVCQyxPQUF2QjtBQUNBO0FBQ0Q7QUFDTSxTQUFTbkMsV0FBVCxDQUFxQmxELE9BQXJCLEVBQThCb0YsSUFBOUIsRUFBb0NDLE9BQXBDLEVBQTZDO0FBQ25ELEtBQUlyRixRQUFRd0YsbUJBQVosRUFBaUM7QUFDaEN4RixVQUFRd0YsbUJBQVIsQ0FBNEJKLElBQTVCLEVBQWtDQyxPQUFsQyxFQUEyQyxLQUEzQztBQUNBLEVBRkQsTUFFTyxJQUFJckYsUUFBUXlGLFdBQVosRUFBeUI7QUFDL0J6RixVQUFReUYsV0FBUixRQUF5QkwsSUFBekIsRUFBaUNDLE9BQWpDO0FBQ0EsRUFGTSxNQUVBO0FBQ05yRixpQkFBYW9GLElBQWIsSUFBdUIsSUFBdkI7QUFDQTtBQUNEO0FBQ00sU0FBU2pDLE1BQVQsQ0FBZ0I5QixFQUFoQixFQUFvQnFFLFVBQXBCLEVBQWdDO0FBQ3RDLEtBQU1DLG1CQUFnQkQsYUFBYSxLQUFiLEdBQXFCLE1BQXJDLENBQU47O0FBRUEsS0FBSXJFLHNCQUFKLEVBQW1CO0FBQ2xCLFNBQU8sZ0JBQU9xRSxhQUFhLGFBQWIsR0FBNkIsYUFBcEMsS0FBc0Qsa0JBQVMvRSxJQUFULENBQWNnRixJQUFkLENBQXRELElBQTZFLGtCQUFTN0UsZUFBVCxDQUF5QjZFLElBQXpCLENBQXBGO0FBQ0EsRUFGRCxNQUVPO0FBQ04sU0FBT3RFLEdBQUdzRSxJQUFILENBQVA7QUFDQTtBQUNEO0FBQ00sU0FBU3ZDLFFBQVQsQ0FBa0IvQixFQUFsQixFQUFzQnVFLENBQXRCLEVBQXlCQyxDQUF6QixFQUE0QjtBQUNsQyxLQUFJeEUsc0JBQUosRUFBbUI7QUFDbEJBLEtBQUc4QixNQUFILENBQVV5QyxDQUFWLEVBQWFDLENBQWI7QUFDQSxFQUZELE1BRU87QUFDTnhFLEtBQUd5RSxVQUFILEdBQWdCRixDQUFoQjtBQUNBdkUsS0FBRzBFLFNBQUgsR0FBZUYsQ0FBZjtBQUNBO0FBQ0Q7QUFDTSxTQUFTeEMsUUFBVCxDQUFrQmhDLEVBQWxCLEVBQXNCdUUsQ0FBdEIsRUFBeUJDLENBQXpCLEVBQTRCO0FBQ2xDLEtBQUl4RSxzQkFBSixFQUFtQjtBQUNsQkEsS0FBR2dDLFFBQUgsQ0FBWXVDLENBQVosRUFBZUMsQ0FBZjtBQUNBLEVBRkQsTUFFTztBQUNOeEUsS0FBR3lFLFVBQUgsSUFBaUJGLENBQWpCO0FBQ0F2RSxLQUFHMEUsU0FBSCxJQUFnQkYsQ0FBaEI7QUFDQTtBQUNEO0FBQ00sU0FBU3ZDLFNBQVQsQ0FBbUJqQyxFQUFuQixFQUF1QjtBQUM3QixRQUFPLGdDQUNOLGdCQUFPMkUsZ0JBQVAsQ0FBd0IzRSxFQUF4QixDQURNLEdBQ3dCQSxHQUFHNEUsWUFEbEM7QUFFQTtBQUNELFNBQVNDLFFBQVQsQ0FBa0I3RSxFQUFsQixFQUFzQjhFLElBQXRCLEVBQTRCO0FBQzNCLEtBQUk5RSxzQkFBSixFQUFtQjtBQUFFO0FBQ3BCLFNBQU9BLEdBQUduRyxRQUFILENBQVk0RixlQUFaLFlBQXFDcUYsSUFBckMsQ0FBUDtBQUNBLEVBRkQsTUFFTyxJQUFJOUUsR0FBR3VELFFBQUgsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFBRTtBQUMvQixNQUFNd0IsTUFBTS9FLEdBQUdQLGVBQWY7O0FBRUEsU0FBT3VCLEtBQUtDLEdBQUwsQ0FDTmpCLEdBQUdWLElBQUgsWUFBaUJ3RixJQUFqQixDQURNLEVBQ29CQyxlQUFhRCxJQUFiLENBRHBCLEVBRU45RSxHQUFHVixJQUFILFlBQWlCd0YsSUFBakIsQ0FGTSxFQUVvQkMsZUFBYUQsSUFBYixDQUZwQixFQUdOQyxlQUFhRCxJQUFiLENBSE0sQ0FBUDtBQUtBLEVBUk0sTUFRQTtBQUFFO0FBQ1IsTUFBTWhJLFFBQVFtRixVQUFVakMsRUFBVixDQUFkO0FBQ0EsTUFBTTJDLFFBQVE3RixNQUFNZ0ksS0FBS2xKLFdBQUwsRUFBTixDQUFkOztBQUVBLFNBQU9vSixXQUFXLFNBQVMxSyxJQUFULENBQWNxSSxLQUFkLElBQXVCM0MsY0FBWThFLElBQVosQ0FBdkIsR0FBNkNoSSxNQUFNZ0ksS0FBS2xKLFdBQUwsRUFBTixDQUF4RCxDQUFQO0FBQ0E7QUFDRDtBQUNNLFNBQVNpRSxVQUFULENBQW9CRyxFQUFwQixFQUF3QjtBQUM5QixRQUFPNkUsU0FBUzdFLEVBQVQsRUFBYSxPQUFiLENBQVA7QUFDQTtBQUNNLFNBQVNrQyxXQUFULENBQXFCbEMsRUFBckIsRUFBeUI7QUFDL0IsUUFBTzZFLFNBQVM3RSxFQUFULEVBQWEsUUFBYixDQUFQO0FBQ0E7O0FBRU0sSUFBTWlGLHdCQUFRO0FBQ3BCQyxXQUFVO0FBQ1RDLFFBQU0sS0FERztBQUVUQyxXQUFTLFFBRkE7QUFHVEMsU0FBTyxRQUhFO0FBSVRDLFFBQU0sTUFKRztBQUtUQyxXQUFTLE9BTEE7QUFNVEMsU0FBTztBQU5FLEVBRFU7QUFTcEIvSixhQUFZO0FBQ1gwSixRQUFNLE1BREs7QUFFWEMsV0FBUyxPQUZFO0FBR1hDLFNBQU8sT0FISTtBQUlYQyxRQUFNLEtBSks7QUFLWEMsV0FBUyxRQUxFO0FBTVhDLFNBQU87QUFOSTtBQVRRLENBQWQ7O0FBbUJBLFNBQVNyRCxhQUFULENBQXVCc0QsWUFBdkIsRUFBcUM7QUFDM0MsUUFBT1IsTUFBTVEsb0RBQU4sQ0FBUDtBQUNBOztBQUVNLFNBQVNyRCxhQUFULENBQXVCc0QsY0FBdkIsRUFBdUM3SCxPQUF2QyxFQUFnRDtBQUN0RCxRQUFPLFNBQWMsRUFBZCwyQkFFTjZILGNBRk0sRUFHTjdILE9BSE0sQ0FBUDtBQUlBOztBQUVNLFNBQVN3RSxXQUFULENBQXFCc0QsT0FBckIsRUFBOEI7QUFDcEMsS0FBSSxDQUFDQSxPQUFELElBQVksQ0FBQ0EsUUFBUWpJLE1BQXpCLEVBQWlDO0FBQ2hDLFNBQU8sQ0FBQyxDQUFELENBQVA7QUFDQTtBQUNELFFBQU9pSSxPQUFQO0FBQ0E7O0FBRU0sU0FBU3JELFFBQVQsQ0FBa0J0QyxFQUFsQixFQUFzQjtBQUM1QixRQUFPQSxzQkFBUDtBQUNBOztBQUVNLFNBQVN1QyxPQUFULENBQWlCcUQsR0FBakIsRUFBc0JySSxNQUF0QixFQUErQztBQUFBLEtBQWpCc0ksT0FBaUIsdUVBQVAsS0FBTzs7QUFDckQsS0FBSSxDQUFDQSxPQUFMLEVBQWM7QUFDYixTQUFPRCxJQUFJckQsT0FBSixDQUFZaEYsTUFBWixDQUFQO0FBQ0E7QUFDRCxLQUFNRyxTQUFTa0ksSUFBSWxJLE1BQW5COztBQUVBLE1BQUssSUFBSUYsSUFBSUUsU0FBUyxDQUF0QixFQUF5QkYsS0FBSyxDQUE5QixFQUFpQyxFQUFFQSxDQUFuQyxFQUFzQztBQUNyQyxNQUFJb0ksSUFBSXBJLENBQUosTUFBV0QsTUFBZixFQUF1QjtBQUN0QjtBQUNBO0FBQ0QsU0FBT0MsQ0FBUDtBQUNBO0FBQ0QsUUFBTyxDQUFDLENBQVI7QUFDQSxDIiwiZmlsZSI6InBhcmFsbGF4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUGFyYWxsYXhcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZWdcIl0gPSByb290W1wiZWdcIl0gfHwge30sIHJvb3RbXCJlZ1wiXVtcIlBhcmFsbGF4XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJlMTE3MzM1MWIzNTRjNGRiODE3IiwiaW1wb3J0IHt3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuY29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuZXhwb3J0IGNvbnN0IFNVUFBPUlRfQ09NUFVURURTVFlMRSA9ICEhKFwiZ2V0Q29tcHV0ZWRTdHlsZVwiIGluIHdpbmRvdyk7XG5leHBvcnQgY29uc3QgU1VQUE9SVF9BRERFVkVOVExJU1RFTkVSID0gISEoXCJhZGRFdmVudExpc3RlbmVyXCIgaW4gZG9jdW1lbnQpO1xuZXhwb3J0IGNvbnN0IFNVUFBPUlRfUEFTU0lWRSA9ICgoKSA9PiB7XG5cdGxldCBzdXBwb3J0c1Bhc3NpdmVPcHRpb24gPSBmYWxzZTtcblxuXHR0cnkge1xuXHRcdGlmIChTVVBQT1JUX0FEREVWRU5UTElTVEVORVIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLCBudWxsLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sXG5cdFx0XHRcdFwicGFzc2l2ZVwiLCB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0c3VwcG9ydHNQYXNzaXZlT3B0aW9uID0gdHJ1ZTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KSk7XG5cdFx0fVxuXHR9IGNhdGNoIChlKSB7fVxuXHRyZXR1cm4gc3VwcG9ydHNQYXNzaXZlT3B0aW9uO1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IElTX0lFID0gL01TSUV8VHJpZGVudHxXaW5kb3dzIFBob25lfEVkZ2UvLnRlc3QodWEpO1xuZXhwb3J0IGNvbnN0IElTX0lPUyA9IC9pUGhvbmV8aVBhZC8udGVzdCh1YSk7XG5leHBvcnQgY29uc3QgSVNfQU5EUk9JRDIgPSAvQW5kcm9pZCAyXFwuLy50ZXN0KHVhKTtcbmV4cG9ydCBjb25zdCBSRVRSWSA9IDM7XG5leHBvcnQgY29uc3QgQ09OVEFJTkVSX0NMQVNTTkFNRSA9IFwiX2VnLWluZmluaXRlZ3JpZC1jb250YWluZXJfXCI7XG5leHBvcnQgY29uc3QgSUdOT1JFX0NMQVNTTkFNRSA9IFwiX2VnLWluZmluaXRlZ3JpZC1pZ25vcmVfXCI7XG5cbmV4cG9ydCBjb25zdCBBUFBFTkQgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IFBSRVBFTkQgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBWRVJUSUNBTCA9IFwidmVydGljYWxcIjtcbmV4cG9ydCBjb25zdCBIT1JJWk9OVEFMID0gXCJob3Jpem9udGFsXCI7XG5leHBvcnQgY29uc3QgQ0FDSEUgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IE5PX0NBQ0hFID0gZmFsc2U7XG5leHBvcnQgY29uc3QgVFJVU1RFRCA9IHRydWU7XG5leHBvcnQgY29uc3QgTk9fVFJVU1RFRCA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IE1VTFRJID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBTSU5HTEUgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBEVU1NWV9QT1NJVElPTiA9IC0xMDAwMDA7XG5leHBvcnQgY29uc3QgR1JPVVBLRVlfQVRUID0gXCJkYXRhLWdyb3Vwa2V5XCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG5cdGhvcml6b250YWw6IGZhbHNlLFxuXHRtYXJnaW46IDAsXG59O1xuXG5leHBvcnQgY29uc3QgYWdlbnQgPSB1YS50b0xvd2VyQ2FzZSgpO1xuZXhwb3J0IGNvbnN0IGlzTW9iaWxlID0gL21vYml8aW9zfGFuZHJvaWQvLnRlc3QoYWdlbnQpO1xuXG5leHBvcnQgY29uc3QgQUxJR04gPSB7XG5cdFNUQVJUOiBcInN0YXJ0XCIsXG5cdENFTlRFUjogXCJjZW50ZXJcIixcblx0RU5EOiBcImVuZFwiLFxuXHRKVVNUSUZZOiBcImp1c3RpZnlcIixcbn07XG5cbmV4cG9ydCBjb25zdCBJRExFID0gMDtcbmV4cG9ydCBjb25zdCBMT0FESU5HX0FQUEVORCA9IDE7XG5leHBvcnQgY29uc3QgTE9BRElOR19QUkVQRU5EID0gMjtcbmV4cG9ydCBjb25zdCBQUk9DRVNTSU5HID0gNDtcblxuXG5jb25zdCB3ZWJraXQgPSAvYXBwbGV3ZWJraXRcXC8oW1xcZHwuXSopL2cuZXhlYyhhZ2VudCk7XG5cbmV4cG9ydCBjb25zdCBXRUJLSVRfVkVSU0lPTiA9ICh3ZWJraXQgJiYgcGFyc2VJbnQod2Via2l0WzFdLCAxMCkpIHx8IDA7XG5leHBvcnQgY29uc3QgREVGRU5TRV9CUk9XU0VSID0gKFdFQktJVF9WRVJTSU9OICYmIFdFQktJVF9WRVJTSU9OIDwgNTM3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdHMuanMiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbmNvbnN0IHdpbiA9IHdpbmRvdztcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5cbmV4cG9ydCB7d2luZG93fTtcbmV4cG9ydCBjb25zdCBkb2N1bWVudCA9IHdpbi5kb2N1bWVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9icm93c2VyLmpzIiwiaW1wb3J0IHtBTElHTiwgaXNNb2JpbGV9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHskLCBpc1dpbmRvd30gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3Qgc3R5bGUgPSB7XG5cdFwidmVydGljYWxcIjoge3Bvc2l0aW9uOiBcInRvcFwiLCBzaXplOiBcImhlaWdodFwiLCBjYW1tZWxTaXplOiBcIkhlaWdodFwiLCBjb29yZGluYXRlOiBcIllcIn0sXG5cdFwiaG9yaXpvbnRhbFwiOiB7cG9zaXRpb246IFwibGVmdFwiLCBzaXplOiBcIndpZHRoXCIsIGNhbW1lbFNpemU6IFwiV2lkdGhcIiwgY29vcmRpbmF0ZTogXCJYXCJ9LFxufTtcbmNvbnN0IHtTVEFSVCwgQ0VOVEVSfSA9IEFMSUdOO1xuY29uc3QgVFJBTlNGT1JNID0gKGZ1bmN0aW9uKCkge1xuXHRjb25zdCBib2R5U3R5bGUgPSAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0pLnN0eWxlO1xuXHRjb25zdCB0YXJnZXQgPSBbXCJ0cmFuc2Zvcm1cIiwgXCJ3ZWJraXRUcmFuc2Zvcm1cIiwgXCJtc1RyYW5zZm9ybVwiLCBcIm1velRyYW5zZm9ybVwiXTtcblxuXHRmb3IgKGxldCBpID0gMCwgbGVuID0gdGFyZ2V0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0aWYgKHRhcmdldFtpXSBpbiBib2R5U3R5bGUpIHtcblx0XHRcdHJldHVybiB0YXJnZXRbaV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiBcIlwiO1xufSkoKTtcblxuLyoqXG4gKiBAY2xhc3NkZXNjIFBhcmFsbGF4IGlzIGEgZGlzcGxhY2VtZW50IG9yIGRpZmZlcmVuY2UgaW4gdGhlIGFwcGFyZW50IHBvc2l0aW9uIG9mIGFuIG9iamVjdCB2aWV3ZWQgYWxvbmcgdHdvIGRpZmZlcmVudCBsaW5lcyBvZiBzaWdodC4gWW91IGNhbiBhcHBseSBwYXJhbGxheCBieSBzY3JvbGxpbmcgdGhlIGltYWdlIGFuZCBzcGVlZCBvZiB0aGUgaXRlbS5cbiAqIEBrbyBQYXJhbGxheOuKlCDshJzroZwg64uk66W4IOuRkCDqsJzsnZgg7Iuc7ISg7JeQ7IScIOuwlOudvOuzuCDrrLzssrTsnZgg7Jm46rSA7IOBIOychOy5mOydmCDrs4DsnIQg65iQ64qUIOywqOydtOyeheuLiOuLpC4g7Iqk7YGs66Gk7JeQIOuUsOudvCDsnbTrr7jsp4DsmYAg7JWE7J207YWc7J2YIOyGjeuPhOulvCDssKjsnbTrpbwg7KSM7Jy866Gc7I2oIHBhcmFsbGF47J2EIOyggeyaqe2VoCDsiJgg7J6I7Iq164uI64ukLlxuICogQGNsYXNzIGVnLlBhcmFsbGF4XG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfSBbcm9vdD13aW5kb3ddIFNjcm9sbGluZyB0YXJnZXQuIElmIHlvdSBzY3JvbGwgaW4gdGhlIGJvZHksIHNldCB3aW5kb3cuIOyKpO2BrOuhpO2VmOuKlCDrjIDsg4EuIOunjOyVvSBib2R57JeQ7IScIOyKpO2BrOuhpO2VmOuptCB3aW5kb3froZwg7ISk7KCV7ZWc64ukLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9uIG9iamVjdCBvZiBlZy5QYXJhbGxheCBtb2R1bGUgPGtvPmVnLlBhcmFsbGF4IOuqqOuTiOydmCDsmLXshZgg6rCd7LK0PC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaG9yaXpvbnRhbD1mYWxzZV0gRGlyZWN0aW9uIG9mIHRoZSBzY3JvbGwgbW92ZW1lbnQgKGZhbHNlOiB2ZXJ0aWNhbCwgdHJ1ZTogaG9yaXpvbnRhbCkgPGtvPuyKpO2BrOuhpCDsnbTrj5kg67Cp7ZalIChmYWxzZTog7IS466Gc67Cp7ZalLCB0cnVlOiDqsIDroZzrsKntlqUpPC9rbz5cbiAqIEBwYXJhbSB7RWxlbWVudHxTdHJpbmd9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSBDb250YWluZXIgd3JhcHBpbmcgaXRlbXMuIElmIHJvb3QgYW5kIGNvbnRhaW5lciBoYXZlIG5vIGdhcHMsIGRvIG5vdCBzZXQgb3B0aW9uLiA8a28+IOyVhOydtO2FnOuTpOydhCDqsJDsi7jqs6Ag7J6I64qUIOy7qO2FjOydtOuEiC4g66eM7JW9IHJvb3TsmYAgY29udGFpbmVy6rCE7J2YIOywqOydtOqwgCDsl4bsnLzrqbQsIOyYteyFmOydhCDshKTsoJXtlZjsp4Ag7JWK7JWE64+EIOuQnOuLpC48L2tvPlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnNlbGVjdG9yPVwiaW1nXCJdIFRoZSBzZWxlY3RvciBvZiB0aGUgaW1hZ2UgdG8gYXBwbHkgdGhlIHBhcmFsbGF4IGluIHRoZSBpdGVtIDxrbz4g7JWE7J207YWc7JWI7JeQIOyeiOuKlCBwYXJhbGxheOulvCDsoIHsmqntlaAg7J2066+47KeA7J2YIHNlbGVjdG9yIDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnN0cmVuZ3RoPTFdIERpbWVuc2lvbnMgdGhhdCBpbmRpY2F0ZSB0aGUgc2Vuc2l0aXZpdHkgb2YgcGFyYWxsYXguIFRoZSBoaWdoZXIgdGhlIHN0cmVuZ3RoLCB0aGUgZmFzdGVyLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jZW50ZXI9MF0gVGhlIG1pZGRsZSBwb2ludCBvZiBwYXJhbGxheC4gVGhlIHRvcCBpcyAxIGFuZCB0aGUgYm90dG9tIGlzIC0xLiA8a28+IHBhcmFsbGF46rCAIOqwgOyatOuNsOuhnCDsmKTripQg7KCQLiDsg4Hri6jsnbQgMeydtOqzoCDtlZjri6jsnbQgLTHsnbTri6QuIDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJhbmdlPVstMSwgMV1dIFJhbmdlIHRvIGFwcGx5IHRoZSBwYXJhbGxheC4gVGhlIHRvcCBpcyAxIGFuZCB0aGUgYm90dG9tIGlzIC0xLiA8a28+IHBhcmFsbGF46rCAIOyggeyaqeuQmOuKlCDrspTsnIQsIOyDgeuLqOydtCAx7J206rOgIO2VmOuLqOydtCAtMeydtOuLpC4gPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWxpZ249XCJzdGFydFwiXSBUaGUgYWxpZ25tZW50IG9mIHRoZSBpbWFnZSBpbiB0aGUgaXRlbS4gKFwic3RhcnRcIiA6IHRvcCBvciBsZWZ0LCBcImNlbnRlclwiOiBtaWRkbGUpIDxrbz4g7JWE7J207YWc7JWI7J2YIOydtOuvuOyngOydmCDsoJXroKwgPC9rbz5cbiAqIEBleGFtcGxlXG5gYGBcbjxzY3JpcHQ+XG4vLyBpc092ZXJmbG93U2Nyb2xsOiBmYWxzZVxudmFyIHBhcmFsbGF4ID0gbmV3IGVnLlBhcmFsbGF4KHdpbmRvdywge1xuXHRjb250YWluZXI6IFwiLmNvbnRhaW5lclwiLFxuXHRzZWxlY3RvcjogXCJpbWcucGFyYWxsYXhcIixcblx0c3RyZW5ndGg6IDAuOCxcblx0Y2VudGVyOiAwLFxuXHRyYW5nZTogWy0xLCAxXSxcblx0YWxpZ246IFwiY2VudGVyXCIsXG5cdGhvcml6b250YWw6IHRydWUsXG59KTtcblxuLy8gaXNPdmVyZmxvd1Njcm9sbDogdHVyZVxudmFyIHBhcmFsbGF4ID0gbmV3IGVnLlBhcmFsbGF4KFwiLmNvbnRhaW5lclwiLCB7XG5cdHNlbGVjdG9yOiBcImltZy5wYXJhbGxheFwiLFxuXHRzdHJlbmd0aDogMC44LFxuXHRjZW50ZXI6IDAsXG5cdHJhbmdlOiBbLTEsIDFdLFxuXHRhbGlnbjogXCJjZW50ZXJcIixcblx0aG9yaXpvbnRhbDogdHJ1ZSxcbn0pO1xuXG4vLyBpdGVtIGludGVyZmFjZVxudmFyIGl0ZW0gPSB7XG5cdC8vIG9yaWdpbmFsIHNpemVcblx0c2l6ZToge1xuXHRcdHdpZHRoOiAxMDAsXG5cdFx0aGVpZ2h0OiAxMDAsXG5cdH0sXG5cdC8vIHZpZXcgc2l6ZVxuXHRyZWN0OiB7XG5cdFx0dG9wOiAxMDAsXG5cdFx0bGVmdDogMTAwLFxuXHRcdHdpZHRoOiAxMDAsXG5cdFx0aGVpZ2h0OiAxMDAsXG5cdH1cbn07XG48L3NjcmlwdD5cbmBgYFxuICoqL1xuY2xhc3MgUGFyYWxsYXgge1xuXHRjb25zdHJ1Y3Rvcihyb290ID0gd2luZG93LCBvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdGNvbnRhaW5lcjogbnVsbCxcblx0XHRcdHNlbGVjdG9yOiBcImltZ1wiLFxuXHRcdFx0c3RyZW5ndGg6IDEsXG5cdFx0XHRjZW50ZXI6IDAsXG5cdFx0XHRyYW5nZTogWy0xLCAxXSxcblx0XHRcdGFsaWduOiBTVEFSVCxcblx0XHRcdGhvcml6b250YWw6IGZhbHNlLFxuXHRcdH0sIG9wdGlvbnMpO1xuXHRcdHRoaXMuX3Jvb3QgPSAkKHJvb3QpO1xuXHRcdHRoaXMuX2NvbnRhaW5lciA9IHRoaXMub3B0aW9ucy5jb250YWluZXIgJiYgJCh0aGlzLm9wdGlvbnMuY29udGFpbmVyKTtcblx0XHR0aGlzLl9yb290U2l6ZSA9IDA7XG5cdFx0dGhpcy5fY29udGFpbmVyUG9zaXRpb24gPSAwO1xuXHRcdHRoaXMuX3N0eWxlID0gc3R5bGVbdGhpcy5vcHRpb25zLmhvcml6b250YWwgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIl07XG5cdFx0dGhpcy5yZXNpemUoKTtcblx0fVxuXHRfY2hlY2tQYXJhbGxheEl0ZW0oZWxlbWVudCkge1xuXHRcdGlmICghZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBzZWxlY3RvciA9IHRoaXMub3B0aW9ucy5zZWxlY3RvcjtcblxuXHRcdGlmICghZWxlbWVudC5fX0lNQUdFX18pIHtcblx0XHRcdGNvbnN0IGltZyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cblx0XHRcdGVsZW1lbnQuX19JTUFHRV9fID0gaW1nIHx8IC0xO1xuXHRcdFx0aWYgKGVsZW1lbnQuX19JTUFHRV9fID09PSAtMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRlbGVtZW50Ll9fQk9YX18gPSBpbWcucGFyZW50Tm9kZTtcblx0XHR9XG5cdFx0aWYgKGVsZW1lbnQuX19JTUFHRV9fID09PSAtMSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBzaXplTmFtZSA9IHRoaXMuX3N0eWxlLmNhbW1lbFNpemU7XG5cblx0XHRlbGVtZW50Ll9fSU1BR0VfXy5fX1NJWkVfXyA9IGVsZW1lbnQuX19JTUFHRV9fW2BvZmZzZXQke3NpemVOYW1lfWBdO1xuXHRcdGVsZW1lbnQuX19CT1hfXy5fX1NJWkVfXyA9IGVsZW1lbnQuX19CT1hfX1tgb2Zmc2V0JHtzaXplTmFtZX1gXTtcblx0fVxuXHQvKipcblx0ICogQXMgdGhlIGJyb3dzZXIgaXMgcmVzaXplZCwgdGhlIGdhcHMgYmV0d2VlbiB0aGUgcm9vdCBhbmQgdGhlIGNvbnRhaW5lciBhbmQgdGhlIHNpemUgb2YgdGhlIGl0ZW1zIGFyZSB1cGRhdGVkLlxuXHQgKiBAa28g67iM65287Jqw7KCA7J2YIO2BrOq4sOqwgCDrs4Dqsr3rkKjsnLzroZwg7I2oIHJvb3TsmYAgY29udGFpbmVy7J2YIOqwhOqyqeqzvCDslYTsnbTthZzrk6TsnZgg7YGs6riw66W8IOqwseyLoO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5QYXJhbGxheCNyZXNpemVcblx0ICogQHBhcmFtIHtBcnJheX0gW2l0ZW1zID0gW11dIEl0ZW1zIHRvIGFwcGx5IHBhcmFsbGF4LiBJdCBkb2VzIG5vdCBhcHBseSBpZiBpdCBpcyBub3QgaW4gdmlzaWJsZSByYW5nZS4gPGtvPnBhcmFsbGF466W8IOyggeyaqe2VoCDslYTsnbTthZzrk6QuIOqwgOyLnOqxsOumrOyXkCDsobTsnqztlZjsp4Ag7JWK7Jy866m0IOyggeyaqeydtCDslYjrkJzri6QuPC9rbz5cblx0ICogQHJldHVybiB7ZWcuUGFyYWxsYXh9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBleGFtcGxlXG5gYGBqc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKGUpIHtcblx0cGFyYWxsYXgucmVzaXplKGl0ZW1zKTtcbn0pO1xuYGBgXG5cdCAqL1xuXHRyZXNpemUoaXRlbXMgPSBbXSkge1xuXHRcdGNvbnN0IHJvb3QgPSB0aGlzLl9yb290O1xuXHRcdGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lcjtcblx0XHRjb25zdCBwb3NpdGlvbk5hbWUgPSB0aGlzLl9zdHlsZS5wb3NpdGlvbjtcblx0XHRjb25zdCBzaXplTmFtZSA9IHRoaXMuX3N0eWxlLmNhbW1lbFNpemU7XG5cblx0XHRpZiAoIWNvbnRhaW5lciB8fCByb290ID09PSBjb250YWluZXIpIHtcblx0XHRcdHRoaXMuX2NvbnRhaW5lclBvc2l0aW9uID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgcm9vdFJlY3QgPSAoaXNXaW5kb3cocm9vdCkgPyBkb2N1bWVudC5ib2R5IDogcm9vdCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjb25zdCBjb250YWluZXJ0UmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0dGhpcy5fY29udGFpbmVyUG9zaXRpb24gPSBjb250YWluZXJ0UmVjdFtwb3NpdGlvbk5hbWVdIC0gcm9vdFJlY3RbcG9zaXRpb25OYW1lXTtcblx0XHR9XG5cdFx0dGhpcy5fcm9vdFNpemUgPSBpc1dpbmRvdyhyb290KSA/IHdpbmRvd1tgaW5uZXIke3NpemVOYW1lfWBdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtgY2xpZW50JHtzaXplTmFtZX1gXSA6IHJvb3RbYGNsaWVudCR7c2l6ZU5hbWV9YF07XG5cdFx0aWYgKGlzTW9iaWxlICYgaXNXaW5kb3cocm9vdCkpIHtcblx0XHRcdGNvbnN0IGJvZHlXaWR0aCA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuXHRcdFx0Y29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuXHRcdFx0dGhpcy5fcm9vdFNpemUgPSB0aGlzLl9yb290U2l6ZSAvIChib2R5V2lkdGggLyB3aW5kb3dXaWR0aCk7XG5cdFx0fVxuXHRcdGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHR0aGlzLl9jaGVja1BhcmFsbGF4SXRlbShpdGVtLmVsKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qKlxuXHQgKiBTY3JvbGxzIHRoZSBpbWFnZSBpbiB0aGUgaXRlbSBieSBhIHBhcmFsbGF4LlxuXHQgKiBAa28g7Iqk7YGs66Gk7ZWY66m0IOyVhOydtO2FnOyViOydmCDsnbTrr7jsp4Drpbwg7Iuc7LCo7KCB7Jqp7Iuc7YKo64ukLlxuXHQgKiBAbWV0aG9kIGVnLlBhcmFsbGF4I3JlZnJlc2hcblx0ICogQHBhcmFtIHtBcnJheX0gW2l0ZW1zID0gW11dIEl0ZW1zIHRvIGFwcGx5IHBhcmFsbGF4LiBJdCBkb2VzIG5vdCBhcHBseSBpZiBpdCBpcyBub3QgaW4gdmlzaWJsZSByYW5nZS4gPGtvPnBhcmFsbGF466W8IOyggeyaqe2VoCDslYTsnbTthZzrk6QuIOqwgOyLnOqxsOumrOyXkCDsobTsnqztlZjsp4Ag7JWK7Jy866m0IOyggeyaqeydtCDslYjrkJzri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtzY3JvbGxQb3NpdGlvblN0YXJ0ID0gMF0gVGhlIHNjcm9sbCBwb3NpdGlvbi5cblx0ICogQHJldHVybiB7ZWcuUGFyYWxsYXh9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBleGFtcGxlXG5gYGBqc1xuZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uIChlKSB7XG5cdHBhcmFsbGF4LnJlZnJlc2goaXRlbXMsIGUuc2Nyb2xsVG9wKTtcbn0pO1xuYGBgXG5cdCAqL1xuXHRyZWZyZXNoKGl0ZW1zID0gW10sIHNjcm9sbFBvc2l0aW9uU3RhcnQgPSAwKSB7XG5cdFx0Y29uc3Qgc3R5bGVOYW1lcyA9IHRoaXMuX3N0eWxlO1xuXHRcdGNvbnN0IHBvc2l0aW9uTmFtZSA9IHN0eWxlTmFtZXMucG9zaXRpb247XG5cdFx0Y29uc3QgY29vcmRpbmF0ZU5hbWUgPSBzdHlsZU5hbWVzLmNvb3JkaW5hdGU7XG5cdFx0Y29uc3Qgc2l6ZU5hbWUgPSBzdHlsZU5hbWVzLnNpemU7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCB7c3RyZW5ndGgsIGNlbnRlciwgcmFuZ2UsIGFsaWdufSA9IG9wdGlvbnM7XG5cdFx0Y29uc3Qgcm9vdFNpemUgPSB0aGlzLl9yb290U2l6ZTtcblx0XHRjb25zdCBzY3JvbGxQb3NpdGlvbkVuZCA9IHNjcm9sbFBvc2l0aW9uU3RhcnQgKyByb290U2l6ZTtcblx0XHRjb25zdCBjb250YWluZXJQb3NpdGlvbiA9IHRoaXMuX2NvbnRhaW5lclBvc2l0aW9uO1xuXG5cdFx0aXRlbXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGlmICghaXRlbS5yZWN0IHx8ICFpdGVtLnNpemUgfHwgIWl0ZW0uZWwpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcG9zaXRpb24gPSBjb250YWluZXJQb3NpdGlvbiArIGl0ZW0ucmVjdFtwb3NpdGlvbk5hbWVdO1xuXHRcdFx0Y29uc3QgaXRlbVNpemUgPSBpdGVtLnJlY3Rbc2l6ZU5hbWVdIHx8IGl0ZW0uc2l6ZVtzaXplTmFtZV07XG5cblx0XHRcdC8vIGNoZWNrIGl0ZW0gaXMgaW4gY29udGFpbmVyLlxuXHRcdFx0aWYgKHNjcm9sbFBvc2l0aW9uU3RhcnQgPiBwb3NpdGlvbiArIGl0ZW1TaXplIHx8XG5cdFx0XHRcdHNjcm9sbFBvc2l0aW9uRW5kIDwgcG9zaXRpb24pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZWwgPSBpdGVtLmVsO1xuXG5cdFx0XHRpZiAoIWVsLl9fSU1BR0VfXykge1xuXHRcdFx0XHR0aGlzLl9jaGVja1BhcmFsbGF4SXRlbShlbCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZWwuX19JTUFHRV9fID09PSAtMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBpbWFnZUVsZW1lbnQgPSBlbC5fX0lNQUdFX187XG5cdFx0XHRjb25zdCBib3hFbGVtZW50ID0gZWwuX19CT1hfXztcblx0XHRcdGNvbnN0IGJveFNpemUgPSBib3hFbGVtZW50Ll9fU0laRV9fO1xuXHRcdFx0Y29uc3QgaW1hZ2VTaXplID0gaW1hZ2VFbGVtZW50Ll9fU0laRV9fO1xuXG5cdFx0XHQvLyBubyBwYXJhbGxheFxuXHRcdFx0aWYgKGJveFNpemUgPj0gaW1hZ2VTaXplKSB7XG5cdFx0XHRcdC8vIHJlbW92ZSB0cmFuc2Zvcm0gc3R5bGVcblx0XHRcdFx0aW1hZ2VFbGVtZW50LnN0eWxlW1RSQU5TRk9STV0gPSBcIlwiO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIGFyZWEncyBwb3NpdGlvbiBpcyBjZW50ZXIsIHJhdGlvIGlzIDAuXG5cdFx0XHQvLyBpZiBhcmVhIGlzIGhpZGRlbiBhdCB0aGUgdG9wLCByYXRpbyBpcyAxLlxuXHRcdFx0Ly8gaWYgYXJlYSBpcyBoaWRkZW4gYXQgdGhlIGJvdHRvbSwgcmF0aW8gaXMgLTEuXG5cdFx0XHRjb25zdCBpbWFnZVBvc2l0aW9uID0gcG9zaXRpb24gKyBib3hTaXplIC8gMjtcblx0XHRcdGxldCByYXRpbyA9IChzY3JvbGxQb3NpdGlvblN0YXJ0ICsgcm9vdFNpemUgLyAyIC1cblx0XHRcdFx0KHJvb3RTaXplICsgYm94U2l6ZSkgLyAyICogY2VudGVyIC0gaW1hZ2VQb3NpdGlvbikgL1xuXHRcdFx0XHQocm9vdFNpemUgKyBib3hTaXplKSAqIDIgKiBzdHJlbmd0aDtcblxuXHRcdFx0Ly8gaWYgcmF0aW8gaXMgb3V0IG9mIHRoZSByYW5nZSBvZiAtMSBhbmQgMSwgc2hvdyBlbXB0eSBzcGFjZS5cblx0XHRcdHJhdGlvID0gTWF0aC5tYXgoTWF0aC5taW4ocmF0aW8sIHJhbmdlWzFdKSwgcmFuZ2VbMF0pO1xuXG5cdFx0XHQvLyBkaXN0IGlzIHRoZSBwb3NpdGlvbiB3aGVuIHRodW1uYWlsJ3MgaW1hZ2UgaXMgY2VudGVyZWQuXG5cdFx0XHRjb25zdCBkaXN0ID0gKGJveFNpemUgLSBpbWFnZVNpemUpIC8gMjtcblx0XHRcdGxldCB0cmFuc2xhdGUgPSBkaXN0ICogKDEgLSByYXRpbyk7XG5cblx0XHRcdGlmIChhbGlnbiA9PT0gQ0VOVEVSKSB7XG5cdFx0XHRcdHRyYW5zbGF0ZSAtPSBkaXN0O1xuXHRcdFx0fVxuXG5cdFx0XHRpbWFnZUVsZW1lbnQuX19UUkFOU0xBVEVfXyA9IHRyYW5zbGF0ZTtcblx0XHRcdGltYWdlRWxlbWVudC5fX1JBVElPX18gPSByYXRpbztcblx0XHRcdGltYWdlRWxlbWVudC5zdHlsZVtUUkFOU0ZPUk1dID0gYHRyYW5zbGF0ZSR7Y29vcmRpbmF0ZU5hbWV9KCR7dHJhbnNsYXRlfXB4KWA7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJhbGxheDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9QYXJhbGxheC5qcyIsImltcG9ydCB7d2luZG93LCBkb2N1bWVudH0gZnJvbSBcIi4vYnJvd3NlclwiO1xuaW1wb3J0IHtcblx0U1VQUE9SVF9DT01QVVRFRFNUWUxFLFxuXHRTVVBQT1JUX0FEREVWRU5UTElTVEVORVIsXG5cdFNVUFBPUlRfUEFTU0lWRSxcblx0VkVSVElDQUwsXG5cdEhPUklaT05UQUwsXG5cdERFRkFVTFRfT1BUSU9OUyxcbn0gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KG5vZGVzKSB7XG5cdC8vIFNDUklQVDUwMTQgaW4gSUU4XG5cdGNvbnN0IGFycmF5ID0gW107XG5cblx0aWYgKG5vZGVzKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDAsIGxlbiA9IG5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRhcnJheS5wdXNoKG5vZGVzW2ldKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGFycmF5O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbGwobGVuZ3RoLCB2YWx1ZSkge1xuXHRjb25zdCBhcnJheSA9IHR5cGVvZiBsZW5ndGggPT09IFwib2JqZWN0XCIgPyBsZW5ndGggOiBuZXcgQXJyYXkobGVuZ3RoKTtcblx0Y29uc3QgbGVuID0gYXJyYXkubGVuZ3RoO1xuXG5cdGZvciAobGV0IGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuXHRcdGFycmF5W2ldID0gdmFsdWU7XG5cdH1cblx0cmV0dXJuIGFycmF5O1xufVxuLyoqXG4gKiBTZWxlY3Qgb3IgY3JlYXRlIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fGpRdWVyeX0gcGFyYW1cbiAqICB3aGVuIHN0cmluZyBnaXZlbiBpcyBhcyBIVE1MIHRhZywgdGhlbiBjcmVhdGUgZWxlbWVudFxuICogIG90aGVyd2lzZSBpdCByZXR1cm5zIHNlbGVjdGVkIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG11bHRpXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkKHBhcmFtLCBtdWx0aSA9IGZhbHNlKSB7XG5cdGxldCBlbDtcblxuXHRpZiAodHlwZW9mIHBhcmFtID09PSBcInN0cmluZ1wiKSB7IC8vIFN0cmluZyAoSFRNTCwgU2VsZWN0b3IpXG5cdFx0Ly8gY2hlY2sgaWYgc3RyaW5nIGlzIEhUTUwgdGFnIGZvcm1hdFxuXHRcdGNvbnN0IG1hdGNoID0gcGFyYW0ubWF0Y2goL148KFtBLXpdKylcXHMqKFtePl0qKT4vKTtcblxuXHRcdC8vIGNyZWF0aW5nIGVsZW1lbnRcblx0XHRpZiAobWF0Y2gpIHsgLy8gSFRNTFxuXHRcdFx0Y29uc3QgZHVtbXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdFx0XHRkdW1teS5pbm5lckhUTUwgPSBwYXJhbTtcblx0XHRcdGVsID0gZHVtbXkuY2hpbGROb2Rlcztcblx0XHR9IGVsc2UgeyAvLyBTZWxlY3RvclxuXHRcdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtKTtcblx0XHR9XG5cdFx0aWYgKG11bHRpKSB7XG5cdFx0XHRlbCA9IHRvQXJyYXkoZWwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbCA9IChlbCAmJiBlbC5sZW5ndGggPiAwICYmIGVsWzBdKSB8fCB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHBhcmFtID09PSB3aW5kb3cpIHsgLy8gd2luZG93XG5cdFx0ZWwgPSBwYXJhbTtcblx0fSBlbHNlIGlmIChwYXJhbS5ub2RlTmFtZSAmJlxuXHRcdChwYXJhbS5ub2RlVHlwZSA9PT0gMSB8fCBwYXJhbS5ub2RlVHlwZSA9PT0gOSkpIHsgLy8gSFRNTEVsZW1lbnQsIERvY3VtZW50XG5cdFx0ZWwgPSBwYXJhbTtcblx0fSBlbHNlIGlmICgoXCJqUXVlcnlcIiBpbiB3aW5kb3cgJiYgcGFyYW0gaW5zdGFuY2VvZiB3aW5kb3cualF1ZXJ5KSB8fFxuXHRcdHBhcmFtLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5qcXVlcnkpIHsgLy8galF1ZXJ5XG5cdFx0ZWwgPSBtdWx0aSA/IHBhcmFtLnRvQXJyYXkoKSA6IHBhcmFtLmdldCgwKTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHBhcmFtKSkge1xuXHRcdGVsID0gcGFyYW0ubWFwKHYgPT4gJCh2KSk7XG5cdFx0aWYgKCFtdWx0aSkge1xuXHRcdFx0ZWwgPSBlbC5sZW5ndGggPj0gMSA/IGVsWzBdIDogdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZWw7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnQoZWxlbWVudCwgdHlwZSwgaGFuZGxlciwgZXZlbnRMaXN0ZW5lck9wdGlvbnMpIHtcblx0aWYgKFNVUFBPUlRfQURERVZFTlRMSVNURU5FUikge1xuXHRcdGxldCBvcHRpb25zID0gZXZlbnRMaXN0ZW5lck9wdGlvbnMgfHwgZmFsc2U7XG5cblx0XHRpZiAodHlwZW9mIGV2ZW50TGlzdGVuZXJPcHRpb25zID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRvcHRpb25zID0gU1VQUE9SVF9QQVNTSVZFID8gZXZlbnRMaXN0ZW5lck9wdGlvbnMgOiBmYWxzZTtcblx0XHR9XG5cdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuXHR9IGVsc2UgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcblx0XHRlbGVtZW50LmF0dGFjaEV2ZW50KGBvbiR7dHlwZX1gLCBoYW5kbGVyKTtcblx0fSBlbHNlIHtcblx0XHRlbGVtZW50W2BvbiR7dHlwZX1gXSA9IGhhbmRsZXI7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudChlbGVtZW50LCB0eXBlLCBoYW5kbGVyKSB7XG5cdGlmIChlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcblx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuXHR9IGVsc2UgaWYgKGVsZW1lbnQuZGV0YWNoRXZlbnQpIHtcblx0XHRlbGVtZW50LmRldGFjaEV2ZW50KGBvbiR7dHlwZX1gLCBoYW5kbGVyKTtcblx0fSBlbHNlIHtcblx0XHRlbGVtZW50W2BvbiR7dHlwZX1gXSA9IG51bGw7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGwoZWwsIGlzVmVydGljYWwpIHtcblx0Y29uc3QgcHJvcCA9IGBzY3JvbGwke2lzVmVydGljYWwgPyBcIlRvcFwiIDogXCJMZWZ0XCJ9YDtcblxuXHRpZiAoZWwgPT09IHdpbmRvdykge1xuXHRcdHJldHVybiB3aW5kb3dbaXNWZXJ0aWNhbCA/IFwicGFnZVlPZmZzZXRcIiA6IFwicGFnZVhPZmZzZXRcIl0gfHwgZG9jdW1lbnQuYm9keVtwcm9wXSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbcHJvcF07XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGVsW3Byb3BdO1xuXHR9XG59XG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsVG8oZWwsIHgsIHkpIHtcblx0aWYgKGVsID09PSB3aW5kb3cpIHtcblx0XHRlbC5zY3JvbGwoeCwgeSk7XG5cdH0gZWxzZSB7XG5cdFx0ZWwuc2Nyb2xsTGVmdCA9IHg7XG5cdFx0ZWwuc2Nyb2xsVG9wID0geTtcblx0fVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbEJ5KGVsLCB4LCB5KSB7XG5cdGlmIChlbCA9PT0gd2luZG93KSB7XG5cdFx0ZWwuc2Nyb2xsQnkoeCwgeSk7XG5cdH0gZWxzZSB7XG5cdFx0ZWwuc2Nyb2xsTGVmdCArPSB4O1xuXHRcdGVsLnNjcm9sbFRvcCArPSB5O1xuXHR9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVzKGVsKSB7XG5cdHJldHVybiBTVVBQT1JUX0NPTVBVVEVEU1RZTEUgP1xuXHRcdHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKSA6IGVsLmN1cnJlbnRTdHlsZTtcbn1cbmZ1bmN0aW9uIF9nZXRTaXplKGVsLCBuYW1lKSB7XG5cdGlmIChlbCA9PT0gd2luZG93KSB7IC8vIFdJTkRPV1xuXHRcdHJldHVybiBlbC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbYGNsaWVudCR7bmFtZX1gXTtcblx0fSBlbHNlIGlmIChlbC5ub2RlVHlwZSA9PT0gOSkgeyAvLyBET0NVTUVOVF9OT0RFXG5cdFx0Y29uc3QgZG9jID0gZWwuZG9jdW1lbnRFbGVtZW50O1xuXG5cdFx0cmV0dXJuIE1hdGgubWF4KFxuXHRcdFx0ZWwuYm9keVtgc2Nyb2xsJHtuYW1lfWBdLCBkb2NbYHNjcm9sbCR7bmFtZX1gXSxcblx0XHRcdGVsLmJvZHlbYG9mZnNldCR7bmFtZX1gXSwgZG9jW2BvZmZzZXQke25hbWV9YF0sXG5cdFx0XHRkb2NbYGNsaWVudCR7bmFtZX1gXVxuXHRcdCk7XG5cdH0gZWxzZSB7IC8vIE5PREVcblx0XHRjb25zdCBzdHlsZSA9IGdldFN0eWxlcyhlbCk7XG5cdFx0Y29uc3QgdmFsdWUgPSBzdHlsZVtuYW1lLnRvTG93ZXJDYXNlKCldO1xuXG5cdFx0cmV0dXJuIHBhcnNlRmxvYXQoL2F1dG98JS8udGVzdCh2YWx1ZSkgPyBlbFtgb2Zmc2V0JHtuYW1lfWBdIDogc3R5bGVbbmFtZS50b0xvd2VyQ2FzZSgpXSk7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpbm5lcldpZHRoKGVsKSB7XG5cdHJldHVybiBfZ2V0U2l6ZShlbCwgXCJXaWR0aFwiKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbm5lckhlaWdodChlbCkge1xuXHRyZXR1cm4gX2dldFNpemUoZWwsIFwiSGVpZ2h0XCIpO1xufVxuXG5leHBvcnQgY29uc3QgU1RZTEUgPSB7XG5cdHZlcnRpY2FsOiB7XG5cdFx0cG9zMTogXCJ0b3BcIixcblx0XHRlbmRQb3MxOiBcImJvdHRvbVwiLFxuXHRcdHNpemUxOiBcImhlaWdodFwiLFxuXHRcdHBvczI6IFwibGVmdFwiLFxuXHRcdGVuZFBvczI6IFwicmlnaHRcIixcblx0XHRzaXplMjogXCJ3aWR0aFwiLFxuXHR9LFxuXHRob3Jpem9udGFsOiB7XG5cdFx0cG9zMTogXCJsZWZ0XCIsXG5cdFx0ZW5kUG9zMTogXCJyaWdodFwiLFxuXHRcdHNpemUxOiBcIndpZHRoXCIsXG5cdFx0cG9zMjogXCJ0b3BcIixcblx0XHRlbmRQb3MyOiBcImJvdHRvbVwiLFxuXHRcdHNpemUyOiBcImhlaWdodFwiLFxuXHR9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlTmFtZXMoaXNIb3Jpem9udGFsKSB7XG5cdHJldHVybiBTVFlMRVtpc0hvcml6b250YWwgPyBIT1JJWk9OVEFMIDogVkVSVElDQUxdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgb3B0aW9ucykge1xuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxcblx0XHRERUZBVUxUX09QVElPTlMsXG5cdFx0ZGVmYXVsdE9wdGlvbnMsXG5cdFx0b3B0aW9ucyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1plcm9BcnJheShvdXRsaW5lKSB7XG5cdGlmICghb3V0bGluZSB8fCAhb3V0bGluZS5sZW5ndGgpIHtcblx0XHRyZXR1cm4gWzBdO1xuXHR9XG5cdHJldHVybiBvdXRsaW5lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNXaW5kb3coZWwpIHtcblx0cmV0dXJuIGVsID09PSB3aW5kb3c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmRleE9mKGFyciwgdGFyZ2V0LCBpc1JpZ2h0ID0gZmFsc2UpIHtcblx0aWYgKCFpc1JpZ2h0KSB7XG5cdFx0cmV0dXJuIGFyci5pbmRleE9mKHRhcmdldCk7XG5cdH1cblx0Y29uc3QgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuXHRmb3IgKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcblx0XHRpZiAoYXJyW2ldICE9PSB0YXJnZXQpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gaTtcblx0fVxuXHRyZXR1cm4gLTE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMuanMiXSwic291cmNlUm9vdCI6IiJ9