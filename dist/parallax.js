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
exports.DEFENSE_BROWSER = exports.PROCESSING = exports.LOADING_PREPEND = exports.LOADING_APPEND = exports.IDLE = exports.ALIGN = exports.isMobile = exports.agent = exports.DEFAULT_OPTIONS = exports.GROUPKEY_ATT = exports.DUMMY_POSITION = exports.SINGLE = exports.MULTI = exports.NO_TRUSTED = exports.TRUSTED = exports.NO_CACHE = exports.CACHE = exports.HORIZONTAL = exports.VERTICAL = exports.PREPEND = exports.APPEND = exports.CONTAINER_CLASSNAME = exports.RETRY = exports.IS_ANDROID2 = exports.IS_IOS = exports.IS_IE = exports.SUPPORT_PASSIVE = exports.SUPPORT_ADDEVENTLISTENER = exports.SUPPORT_COMPUTEDSTYLE = undefined;

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
var webkitVersion = webkit && parseInt(webkit[1], 10) || 0;

var DEFENSE_BROWSER = exports.DEFENSE_BROWSER = webkitVersion < 537;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxNjI5OTdiMTkyYmQ1ZDY1YjgzZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9QYXJhbGxheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJTVVBQT1JUX0NPTVBVVEVEU1RZTEUiLCJTVVBQT1JUX0FEREVWRU5UTElTVEVORVIiLCJkb2N1bWVudCIsIlNVUFBPUlRfUEFTU0lWRSIsInN1cHBvcnRzUGFzc2l2ZU9wdGlvbiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldCIsImUiLCJJU19JRSIsInRlc3QiLCJJU19JT1MiLCJJU19BTkRST0lEMiIsIlJFVFJZIiwiQ09OVEFJTkVSX0NMQVNTTkFNRSIsIkFQUEVORCIsIlBSRVBFTkQiLCJWRVJUSUNBTCIsIkhPUklaT05UQUwiLCJDQUNIRSIsIk5PX0NBQ0hFIiwiVFJVU1RFRCIsIk5PX1RSVVNURUQiLCJNVUxUSSIsIlNJTkdMRSIsIkRVTU1ZX1BPU0lUSU9OIiwiR1JPVVBLRVlfQVRUIiwiREVGQVVMVF9PUFRJT05TIiwiaG9yaXpvbnRhbCIsIm1hcmdpbiIsImFnZW50IiwidG9Mb3dlckNhc2UiLCJpc01vYmlsZSIsIkFMSUdOIiwiU1RBUlQiLCJDRU5URVIiLCJFTkQiLCJKVVNUSUZZIiwiSURMRSIsIkxPQURJTkdfQVBQRU5EIiwiTE9BRElOR19QUkVQRU5EIiwiUFJPQ0VTU0lORyIsIndlYmtpdCIsImV4ZWMiLCJ3ZWJraXRWZXJzaW9uIiwicGFyc2VJbnQiLCJERUZFTlNFX0JST1dTRVIiLCJ3aW4iLCJ3aW5kb3ciLCJzdHlsZSIsInBvc2l0aW9uIiwic2l6ZSIsImNhbW1lbFNpemUiLCJjb29yZGluYXRlIiwiVFJBTlNGT1JNIiwiYm9keVN0eWxlIiwiaGVhZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidGFyZ2V0IiwiaSIsImxlbiIsImxlbmd0aCIsIlBhcmFsbGF4Iiwicm9vdCIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJzZWxlY3RvciIsInN0cmVuZ3RoIiwiY2VudGVyIiwicmFuZ2UiLCJhbGlnbiIsIl9yb290IiwiX2NvbnRhaW5lciIsIl9yb290U2l6ZSIsIl9jb250YWluZXJQb3NpdGlvbiIsIl9zdHlsZSIsInJlc2l6ZSIsIl9jaGVja1BhcmFsbGF4SXRlbSIsImVsZW1lbnQiLCJfX0lNQUdFX18iLCJpbWciLCJxdWVyeVNlbGVjdG9yIiwiX19CT1hfXyIsInBhcmVudE5vZGUiLCJzaXplTmFtZSIsIl9fU0laRV9fIiwiaXRlbXMiLCJwb3NpdGlvbk5hbWUiLCJyb290UmVjdCIsImJvZHkiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjb250YWluZXJ0UmVjdCIsImRvY3VtZW50RWxlbWVudCIsImJvZHlXaWR0aCIsIm9mZnNldFdpZHRoIiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiZm9yRWFjaCIsIml0ZW0iLCJlbCIsInJlZnJlc2giLCJzY3JvbGxQb3NpdGlvblN0YXJ0Iiwic3R5bGVOYW1lcyIsImNvb3JkaW5hdGVOYW1lIiwicm9vdFNpemUiLCJzY3JvbGxQb3NpdGlvbkVuZCIsImNvbnRhaW5lclBvc2l0aW9uIiwicmVjdCIsIml0ZW1TaXplIiwiaW1hZ2VFbGVtZW50IiwiYm94RWxlbWVudCIsImJveFNpemUiLCJpbWFnZVNpemUiLCJpbWFnZVBvc2l0aW9uIiwicmF0aW8iLCJNYXRoIiwibWF4IiwibWluIiwiZGlzdCIsInRyYW5zbGF0ZSIsIl9fVFJBTlNMQVRFX18iLCJfX1JBVElPX18iLCJtb2R1bGUiLCJleHBvcnRzIiwidG9BcnJheSIsImZpbGwiLCIkIiwiYWRkRXZlbnQiLCJyZW1vdmVFdmVudCIsInNjcm9sbCIsInNjcm9sbFRvIiwic2Nyb2xsQnkiLCJnZXRTdHlsZXMiLCJpbm5lckhlaWdodCIsImdldFN0eWxlTmFtZXMiLCJhc3NpZ25PcHRpb25zIiwidG9aZXJvQXJyYXkiLCJpc1dpbmRvdyIsImluZGV4T2YiLCJub2RlcyIsImFycmF5IiwicHVzaCIsInZhbHVlIiwiQXJyYXkiLCJwYXJhbSIsIm11bHRpIiwibWF0Y2giLCJkdW1teSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJjaGlsZE5vZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsInVuZGVmaW5lZCIsIm5vZGVOYW1lIiwibm9kZVR5cGUiLCJqUXVlcnkiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsImpxdWVyeSIsImlzQXJyYXkiLCJtYXAiLCJ2IiwidHlwZSIsImhhbmRsZXIiLCJldmVudExpc3RlbmVyT3B0aW9ucyIsImF0dGFjaEV2ZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRldGFjaEV2ZW50IiwiaXNWZXJ0aWNhbCIsInByb3AiLCJ4IiwieSIsInNjcm9sbExlZnQiLCJzY3JvbGxUb3AiLCJnZXRDb21wdXRlZFN0eWxlIiwiY3VycmVudFN0eWxlIiwiX2dldFNpemUiLCJuYW1lIiwiZG9jIiwicGFyc2VGbG9hdCIsIlNUWUxFIiwidmVydGljYWwiLCJwb3MxIiwiZW5kUG9zMSIsInNpemUxIiwicG9zMiIsImVuZFBvczIiLCJzaXplMiIsImlzSG9yaXpvbnRhbCIsImRlZmF1bHRPcHRpb25zIiwib3V0bGluZSIsImFyciIsImlzUmlnaHQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7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LFNBQU9DLENBQVA7QUFDQTtBQUNELFFBQU8sQ0FBQyxDQUFSO0FBQ0EsQyIsImZpbGUiOiJwYXJhbGxheC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlBhcmFsbGF4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImVnXCJdID0gcm9vdFtcImVnXCJdIHx8IHt9LCByb290W1wiZWdcIl1bXCJQYXJhbGxheFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNjI5OTdiMTkyYmQ1ZDY1YjgzZSIsImltcG9ydCB7d2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbmNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbmV4cG9ydCBjb25zdCBTVVBQT1JUX0NPTVBVVEVEU1RZTEUgPSAhIShcImdldENvbXB1dGVkU3R5bGVcIiBpbiB3aW5kb3cpO1xuZXhwb3J0IGNvbnN0IFNVUFBPUlRfQURERVZFTlRMSVNURU5FUiA9ICEhKFwiYWRkRXZlbnRMaXN0ZW5lclwiIGluIGRvY3VtZW50KTtcbmV4cG9ydCBjb25zdCBTVVBQT1JUX1BBU1NJVkUgPSAoKCkgPT4ge1xuXHRsZXQgc3VwcG9ydHNQYXNzaXZlT3B0aW9uID0gZmFsc2U7XG5cblx0dHJ5IHtcblx0XHRpZiAoU1VQUE9SVF9BRERFVkVOVExJU1RFTkVSICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFxuXHRcdFx0XHRcInBhc3NpdmVcIiwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHN1cHBvcnRzUGFzc2l2ZU9wdGlvbiA9IHRydWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSkpO1xuXHRcdH1cblx0fSBjYXRjaCAoZSkge31cblx0cmV0dXJuIHN1cHBvcnRzUGFzc2l2ZU9wdGlvbjtcbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBJU19JRSA9IC9NU0lFfFRyaWRlbnR8V2luZG93cyBQaG9uZXxFZGdlLy50ZXN0KHVhKTtcbmV4cG9ydCBjb25zdCBJU19JT1MgPSAvaVBob25lfGlQYWQvLnRlc3QodWEpO1xuZXhwb3J0IGNvbnN0IElTX0FORFJPSUQyID0gL0FuZHJvaWQgMlxcLi8udGVzdCh1YSk7XG5leHBvcnQgY29uc3QgUkVUUlkgPSAzO1xuZXhwb3J0IGNvbnN0IENPTlRBSU5FUl9DTEFTU05BTUUgPSBcIl9lZy1pbmZpbml0ZWdyaWQtY29udGFpbmVyX1wiO1xuXG5leHBvcnQgY29uc3QgQVBQRU5EID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBQUkVQRU5EID0gZmFsc2U7XG5leHBvcnQgY29uc3QgVkVSVElDQUwgPSBcInZlcnRpY2FsXCI7XG5leHBvcnQgY29uc3QgSE9SSVpPTlRBTCA9IFwiaG9yaXpvbnRhbFwiO1xuZXhwb3J0IGNvbnN0IENBQ0hFID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBOT19DQUNIRSA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IFRSVVNURUQgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IE5PX1RSVVNURUQgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBNVUxUSSA9IHRydWU7XG5leHBvcnQgY29uc3QgU0lOR0xFID0gZmFsc2U7XG5leHBvcnQgY29uc3QgRFVNTVlfUE9TSVRJT04gPSAtMTAwMDAwO1xuZXhwb3J0IGNvbnN0IEdST1VQS0VZX0FUVCA9IFwiZGF0YS1ncm91cGtleVwiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xuXHRob3Jpem9udGFsOiBmYWxzZSxcblx0bWFyZ2luOiAwLFxufTtcblxuZXhwb3J0IGNvbnN0IGFnZW50ID0gdWEudG9Mb3dlckNhc2UoKTtcbmV4cG9ydCBjb25zdCBpc01vYmlsZSA9IC9tb2JpfGlvc3xhbmRyb2lkLy50ZXN0KGFnZW50KTtcblxuZXhwb3J0IGNvbnN0IEFMSUdOID0ge1xuXHRTVEFSVDogXCJzdGFydFwiLFxuXHRDRU5URVI6IFwiY2VudGVyXCIsXG5cdEVORDogXCJlbmRcIixcblx0SlVTVElGWTogXCJqdXN0aWZ5XCIsXG59O1xuXG5leHBvcnQgY29uc3QgSURMRSA9IDA7XG5leHBvcnQgY29uc3QgTE9BRElOR19BUFBFTkQgPSAxO1xuZXhwb3J0IGNvbnN0IExPQURJTkdfUFJFUEVORCA9IDI7XG5leHBvcnQgY29uc3QgUFJPQ0VTU0lORyA9IDQ7XG5cblxuY29uc3Qgd2Via2l0ID0gL2FwcGxld2Via2l0XFwvKFtcXGR8Ll0qKS9nLmV4ZWMoYWdlbnQpO1xuY29uc3Qgd2Via2l0VmVyc2lvbiA9ICh3ZWJraXQgJiYgcGFyc2VJbnQod2Via2l0WzFdLCAxMCkpIHx8IDA7XG5cbmV4cG9ydCBjb25zdCBERUZFTlNFX0JST1dTRVIgPSB3ZWJraXRWZXJzaW9uIDwgNTM3O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0cy5qcyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby1uZXN0ZWQtdGVybmFyeSAqL1xuY29uc3Qgd2luID0gd2luZG93O1xuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblxuZXhwb3J0IHt3aW5kb3d9O1xuZXhwb3J0IGNvbnN0IGRvY3VtZW50ID0gd2luLmRvY3VtZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jyb3dzZXIuanMiLCJpbXBvcnQge0FMSUdOLCBpc01vYmlsZX0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQgeyQsIGlzV2luZG93fSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBzdHlsZSA9IHtcblx0XCJ2ZXJ0aWNhbFwiOiB7cG9zaXRpb246IFwidG9wXCIsIHNpemU6IFwiaGVpZ2h0XCIsIGNhbW1lbFNpemU6IFwiSGVpZ2h0XCIsIGNvb3JkaW5hdGU6IFwiWVwifSxcblx0XCJob3Jpem9udGFsXCI6IHtwb3NpdGlvbjogXCJsZWZ0XCIsIHNpemU6IFwid2lkdGhcIiwgY2FtbWVsU2l6ZTogXCJXaWR0aFwiLCBjb29yZGluYXRlOiBcIlhcIn0sXG59O1xuY29uc3Qge1NUQVJULCBDRU5URVJ9ID0gQUxJR047XG5jb25zdCBUUkFOU0ZPUk0gPSAoZnVuY3Rpb24oKSB7XG5cdGNvbnN0IGJvZHlTdHlsZSA9IChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSkuc3R5bGU7XG5cdGNvbnN0IHRhcmdldCA9IFtcInRyYW5zZm9ybVwiLCBcIndlYmtpdFRyYW5zZm9ybVwiLCBcIm1zVHJhbnNmb3JtXCIsIFwibW96VHJhbnNmb3JtXCJdO1xuXG5cdGZvciAobGV0IGkgPSAwLCBsZW4gPSB0YXJnZXQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRpZiAodGFyZ2V0W2ldIGluIGJvZHlTdHlsZSkge1xuXHRcdFx0cmV0dXJuIHRhcmdldFtpXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59KSgpO1xuXG4vKipcbiAqIFBhcmFsbGF4IGlzIGEgZGlzcGxhY2VtZW50IG9yIGRpZmZlcmVuY2UgaW4gdGhlIGFwcGFyZW50IHBvc2l0aW9uIG9mIGFuIG9iamVjdCB2aWV3ZWQgYWxvbmcgdHdvIGRpZmZlcmVudCBsaW5lcyBvZiBzaWdodC4gWW91IGNhbiBhcHBseSBwYXJhbGxheCBieSBzY3JvbGxpbmcgdGhlIGltYWdlIGFuZCBzcGVlZCBvZiB0aGUgaXRlbS5cbiAqIEBrbyBQYXJhbGxheOuKlCDshJzroZwg64uk66W4IOuRkCDqsJzsnZgg7Iuc7ISg7JeQ7IScIOuwlOudvOuzuCDrrLzssrTsnZgg7Jm46rSA7IOBIOychOy5mOydmCDrs4DsnIQg65iQ64qUIOywqOydtOyeheuLiOuLpC4g7Iqk7YGs66Gk7JeQIOuUsOudvCDsnbTrr7jsp4DsmYAg7JWE7J207YWc7J2YIOyGjeuPhOulvCDssKjsnbTrpbwg7KSM7Jy866Gc7I2oIHBhcmFsbGF47J2EIOyggeyaqe2VoCDsiJgg7J6I7Iq164uI64ukLlxuICogQGNsYXNzIGVnLlBhcmFsbGF4XG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfSBbcm9vdD13aW5kb3ddIFNjcm9sbGluZyB0YXJnZXQuIElmIHlvdSBzY3JvbGwgaW4gdGhlIGJvZHksIHNldCB3aW5kb3cuIOyKpO2BrOuhpO2VmOuKlCDrjIDsg4EuIOunjOyVvSBib2R57JeQ7IScIOyKpO2BrOuhpO2VmOuptCB3aW5kb3froZwg7ISk7KCV7ZWc64ukLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9uIG9iamVjdCBvZiBlZy5QYXJhbGxheCBtb2R1bGUgPGtvPmVnLlBhcmFsbGF4IOuqqOuTiOydmCDsmLXshZgg6rCd7LK0PC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaG9yaXpvbnRhbD1mYWxzZV0gRGlyZWN0aW9uIG9mIHRoZSBzY3JvbGwgbW92ZW1lbnQgKGZhbHNlOiB2ZXJ0aWNhbCwgdHJ1ZTogaG9yaXpvbnRhbCkgPGtvPuyKpO2BrOuhpCDsnbTrj5kg67Cp7ZalIChmYWxzZTog7IS466Gc67Cp7ZalLCB0cnVlOiDqsIDroZzrsKntlqUpPC9rbz5cbiAqIEBwYXJhbSB7RWxlbWVudHxTdHJpbmd9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSBDb250YWluZXIgd3JhcHBpbmcgaXRlbXMuIElmIHJvb3QgYW5kIGNvbnRhaW5lciBoYXZlIG5vIGdhcHMsIGRvIG5vdCBzZXQgb3B0aW9uLiA8a28+IOyVhOydtO2FnOuTpOydhCDqsJDsi7jqs6Ag7J6I64qUIOy7qO2FjOydtOuEiC4g66eM7JW9IHJvb3TsmYAgY29udGFpbmVy6rCE7J2YIOywqOydtOqwgCDsl4bsnLzrqbQsIOyYteyFmOydhCDshKTsoJXtlZjsp4Ag7JWK7JWE64+EIOuQnOuLpC48L2tvPlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnNlbGVjdG9yPVwiaW1nXCJdIFRoZSBzZWxlY3RvciBvZiB0aGUgaW1hZ2UgdG8gYXBwbHkgdGhlIHBhcmFsbGF4IGluIHRoZSBpdGVtIDxrbz4g7JWE7J207YWc7JWI7JeQIOyeiOuKlCBwYXJhbGxheOulvCDsoIHsmqntlaAg7J2066+47KeA7J2YIHNlbGVjdG9yIDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnN0cmVuZ3RoPTFdIERpbWVuc2lvbnMgdGhhdCBpbmRpY2F0ZSB0aGUgc2Vuc2l0aXZpdHkgb2YgcGFyYWxsYXguIFRoZSBoaWdoZXIgdGhlIHN0cmVuZ3RoLCB0aGUgZmFzdGVyLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jZW50ZXI9MF0gVGhlIG1pZGRsZSBwb2ludCBvZiBwYXJhbGxheC4gVGhlIHRvcCBpcyAxIGFuZCB0aGUgYm90dG9tIGlzIC0xLiA8a28+IHBhcmFsbGF46rCAIOqwgOyatOuNsOuhnCDsmKTripQg7KCQLiDsg4Hri6jsnbQgMeydtOqzoCDtlZjri6jsnbQgLTHsnbTri6QuIDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJhbmdlPVstMSwgMV1dIFJhbmdlIHRvIGFwcGx5IHRoZSBwYXJhbGxheC4gVGhlIHRvcCBpcyAxIGFuZCB0aGUgYm90dG9tIGlzIC0xLiA8a28+IHBhcmFsbGF46rCAIOyggeyaqeuQmOuKlCDrspTsnIQsIOyDgeuLqOydtCAx7J206rOgIO2VmOuLqOydtCAtMeydtOuLpC4gPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWxpZ249XCJzdGFydFwiXSBUaGUgYWxpZ25tZW50IG9mIHRoZSBpbWFnZSBpbiB0aGUgaXRlbS4gKFwic3RhcnRcIiA6IHRvcCBvciBsZWZ0LCBcImNlbnRlclwiOiBtaWRkbGUpIDxrbz4g7JWE7J207YWc7JWI7J2YIOydtOuvuOyngOydmCDsoJXroKwgPC9rbz5cbiAqIEBleGFtcGxlXG5gYGBcbjxzY3JpcHQ+XG4vLyBpc092ZXJmbG93U2Nyb2xsOiBmYWxzZVxudmFyIHBhcmFsbGF4ID0gbmV3IGVnLlBhcmFsbGF4KHdpbmRvdywge1xuXHRjb250YWluZXI6IFwiLmNvbnRhaW5lclwiLFxuXHRzZWxlY3RvcjogXCJpbWcucGFyYWxsYXhcIixcblx0c3RyZW5ndGg6IDAuOCxcblx0Y2VudGVyOiAwLFxuXHRyYW5nZTogWy0xLCAxXSxcblx0YWxpZ246IFwiY2VudGVyXCIsXG5cdGhvcml6b250YWw6IHRydWUsXG59KTtcblxuLy8gaXNPdmVyZmxvd1Njcm9sbDogdHVyZVxudmFyIHBhcmFsbGF4ID0gbmV3IGVnLlBhcmFsbGF4KFwiLmNvbnRhaW5lclwiLCB7XG5cdHNlbGVjdG9yOiBcImltZy5wYXJhbGxheFwiLFxuXHRzdHJlbmd0aDogMC44LFxuXHRjZW50ZXI6IDAsXG5cdHJhbmdlOiBbLTEsIDFdLFxuXHRhbGlnbjogXCJjZW50ZXJcIixcblx0aG9yaXpvbnRhbDogdHJ1ZSxcbn0pO1xuXG4vLyBpdGVtIGludGVyZmFjZVxudmFyIGl0ZW0gPSB7XG5cdC8vIG9yaWdpbmFsIHNpemVcblx0c2l6ZToge1xuXHRcdHdpZHRoOiAxMDAsXG5cdFx0aGVpZ2h0OiAxMDAsXG5cdH0sXG5cdC8vIHZpZXcgc2l6ZVxuXHRyZWN0OiB7XG5cdFx0dG9wOiAxMDAsXG5cdFx0bGVmdDogMTAwLFxuXHRcdHdpZHRoOiAxMDAsXG5cdFx0aGVpZ2h0OiAxMDAsXG5cdH1cbn07XG48L3NjcmlwdD5cbmBgYFxuICoqL1xuY2xhc3MgUGFyYWxsYXgge1xuXHRjb25zdHJ1Y3Rvcihyb290ID0gd2luZG93LCBvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdGNvbnRhaW5lcjogbnVsbCxcblx0XHRcdHNlbGVjdG9yOiBcImltZ1wiLFxuXHRcdFx0c3RyZW5ndGg6IDEsXG5cdFx0XHRjZW50ZXI6IDAsXG5cdFx0XHRyYW5nZTogWy0xLCAxXSxcblx0XHRcdGFsaWduOiBTVEFSVCxcblx0XHRcdGhvcml6b250YWw6IGZhbHNlLFxuXHRcdH0sIG9wdGlvbnMpO1xuXHRcdHRoaXMuX3Jvb3QgPSAkKHJvb3QpO1xuXHRcdHRoaXMuX2NvbnRhaW5lciA9IHRoaXMub3B0aW9ucy5jb250YWluZXIgJiYgJCh0aGlzLm9wdGlvbnMuY29udGFpbmVyKTtcblx0XHR0aGlzLl9yb290U2l6ZSA9IDA7XG5cdFx0dGhpcy5fY29udGFpbmVyUG9zaXRpb24gPSAwO1xuXHRcdHRoaXMuX3N0eWxlID0gc3R5bGVbdGhpcy5vcHRpb25zLmhvcml6b250YWwgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIl07XG5cdFx0dGhpcy5yZXNpemUoKTtcblx0fVxuXHRfY2hlY2tQYXJhbGxheEl0ZW0oZWxlbWVudCkge1xuXHRcdGlmICghZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBzZWxlY3RvciA9IHRoaXMub3B0aW9ucy5zZWxlY3RvcjtcblxuXHRcdGlmICghZWxlbWVudC5fX0lNQUdFX18pIHtcblx0XHRcdGNvbnN0IGltZyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cblx0XHRcdGVsZW1lbnQuX19JTUFHRV9fID0gaW1nIHx8IC0xO1xuXHRcdFx0aWYgKGVsZW1lbnQuX19JTUFHRV9fID09PSAtMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRlbGVtZW50Ll9fQk9YX18gPSBpbWcucGFyZW50Tm9kZTtcblx0XHR9XG5cdFx0aWYgKGVsZW1lbnQuX19JTUFHRV9fID09PSAtMSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBzaXplTmFtZSA9IHRoaXMuX3N0eWxlLmNhbW1lbFNpemU7XG5cblx0XHRlbGVtZW50Ll9fSU1BR0VfXy5fX1NJWkVfXyA9IGVsZW1lbnQuX19JTUFHRV9fW2BvZmZzZXQke3NpemVOYW1lfWBdO1xuXHRcdGVsZW1lbnQuX19CT1hfXy5fX1NJWkVfXyA9IGVsZW1lbnQuX19CT1hfX1tgb2Zmc2V0JHtzaXplTmFtZX1gXTtcblx0fVxuXHQvKipcblx0ICogQXMgdGhlIGJyb3dzZXIgaXMgcmVzaXplZCwgdGhlIGdhcHMgYmV0d2VlbiB0aGUgcm9vdCBhbmQgdGhlIGNvbnRhaW5lciBhbmQgdGhlIHNpemUgb2YgdGhlIGl0ZW1zIGFyZSB1cGRhdGVkLlxuXHQgKiBAa28g67iM65287Jqw7KCA7J2YIO2BrOq4sOqwgCDrs4Dqsr3rkKjsnLzroZwg7I2oIHJvb3TsmYAgY29udGFpbmVy7J2YIOqwhOqyqeqzvCDslYTsnbTthZzrk6TsnZgg7YGs6riw66W8IOqwseyLoO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5QYXJhbGxheCNyZXNpemVcblx0ICogQHBhcmFtIHtBcnJheX0gW2l0ZW1zID0gW11dIEl0ZW1zIHRvIGFwcGx5IHBhcmFsbGF4LiBJdCBkb2VzIG5vdCBhcHBseSBpZiBpdCBpcyBub3QgaW4gdmlzaWJsZSByYW5nZS4gPGtvPnBhcmFsbGF466W8IOyggeyaqe2VoCDslYTsnbTthZzrk6QuIOqwgOyLnOqxsOumrOyXkCDsobTsnqztlZjsp4Ag7JWK7Jy866m0IOyggeyaqeydtCDslYjrkJzri6QuPC9rbz5cblx0ICogQHJldHVybiB7ZWcuUGFyYWxsYXh9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBleGFtcGxlXG5gYGBqc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKGUpIHtcblx0cGFyYWxsYXgucmVzaXplKGl0ZW1zKTtcbn0pO1xuYGBgXG5cdCAqL1xuXHRyZXNpemUoaXRlbXMgPSBbXSkge1xuXHRcdGNvbnN0IHJvb3QgPSB0aGlzLl9yb290O1xuXHRcdGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lcjtcblx0XHRjb25zdCBwb3NpdGlvbk5hbWUgPSB0aGlzLl9zdHlsZS5wb3NpdGlvbjtcblx0XHRjb25zdCBzaXplTmFtZSA9IHRoaXMuX3N0eWxlLmNhbW1lbFNpemU7XG5cblx0XHRpZiAoIWNvbnRhaW5lciB8fCByb290ID09PSBjb250YWluZXIpIHtcblx0XHRcdHRoaXMuX2NvbnRhaW5lclBvc2l0aW9uID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgcm9vdFJlY3QgPSAoaXNXaW5kb3cocm9vdCkgPyBkb2N1bWVudC5ib2R5IDogcm9vdCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjb25zdCBjb250YWluZXJ0UmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0dGhpcy5fY29udGFpbmVyUG9zaXRpb24gPSBjb250YWluZXJ0UmVjdFtwb3NpdGlvbk5hbWVdIC0gcm9vdFJlY3RbcG9zaXRpb25OYW1lXTtcblx0XHR9XG5cdFx0dGhpcy5fcm9vdFNpemUgPSBpc1dpbmRvdyhyb290KSA/IHdpbmRvd1tgaW5uZXIke3NpemVOYW1lfWBdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtgY2xpZW50JHtzaXplTmFtZX1gXSA6IHJvb3RbYGNsaWVudCR7c2l6ZU5hbWV9YF07XG5cdFx0aWYgKGlzTW9iaWxlICYgaXNXaW5kb3cocm9vdCkpIHtcblx0XHRcdGNvbnN0IGJvZHlXaWR0aCA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuXHRcdFx0Y29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuXHRcdFx0dGhpcy5fcm9vdFNpemUgPSB0aGlzLl9yb290U2l6ZSAvIChib2R5V2lkdGggLyB3aW5kb3dXaWR0aCk7XG5cdFx0fVxuXHRcdGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHR0aGlzLl9jaGVja1BhcmFsbGF4SXRlbShpdGVtLmVsKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qKlxuXHQgKiBTY3JvbGxzIHRoZSBpbWFnZSBpbiB0aGUgaXRlbSBieSBhIHBhcmFsbGF4LlxuXHQgKiBAa28g7Iqk7YGs66Gk7ZWY66m0IOyVhOydtO2FnOyViOydmCDsnbTrr7jsp4Drpbwg7Iuc7LCo7KCB7Jqp7Iuc7YKo64ukLlxuXHQgKiBAbWV0aG9kIGVnLlBhcmFsbGF4I3Jlc2l6ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBbaXRlbXMgPSBbXV0gSXRlbXMgdG8gYXBwbHkgcGFyYWxsYXguIEl0IGRvZXMgbm90IGFwcGx5IGlmIGl0IGlzIG5vdCBpbiB2aXNpYmxlIHJhbmdlLiA8a28+cGFyYWxsYXjrpbwg7KCB7Jqp7ZWgIOyVhOydtO2FnOuTpC4g6rCA7Iuc6rGw66as7JeQIOyhtOyerO2VmOyngCDslYrsnLzrqbQg7KCB7Jqp7J20IOyViOuQnOuLpC48L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3Njcm9sbFBvc2l0aW9uU3RhcnQgPSAwXSBUaGUgc2Nyb2xsIHBvc2l0aW9uLlxuXHQgKiBAcmV0dXJuIHtlZy5QYXJhbGxheH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQGV4YW1wbGVcbmBgYGpzXG5kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKGUpIHtcblx0cGFyYWxsYXgucmVmcmVzaChpdGVtcywgZS5zY3JvbGxUb3ApO1xufSk7XG5gYGBcblx0ICovXG5cdHJlZnJlc2goaXRlbXMgPSBbXSwgc2Nyb2xsUG9zaXRpb25TdGFydCA9IDApIHtcblx0XHRjb25zdCBzdHlsZU5hbWVzID0gdGhpcy5fc3R5bGU7XG5cdFx0Y29uc3QgcG9zaXRpb25OYW1lID0gc3R5bGVOYW1lcy5wb3NpdGlvbjtcblx0XHRjb25zdCBjb29yZGluYXRlTmFtZSA9IHN0eWxlTmFtZXMuY29vcmRpbmF0ZTtcblx0XHRjb25zdCBzaXplTmFtZSA9IHN0eWxlTmFtZXMuc2l6ZTtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0IHtzdHJlbmd0aCwgY2VudGVyLCByYW5nZSwgYWxpZ259ID0gb3B0aW9ucztcblx0XHRjb25zdCByb290U2l6ZSA9IHRoaXMuX3Jvb3RTaXplO1xuXHRcdGNvbnN0IHNjcm9sbFBvc2l0aW9uRW5kID0gc2Nyb2xsUG9zaXRpb25TdGFydCArIHJvb3RTaXplO1xuXHRcdGNvbnN0IGNvbnRhaW5lclBvc2l0aW9uID0gdGhpcy5fY29udGFpbmVyUG9zaXRpb247XG5cblx0XHRpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0aWYgKCFpdGVtLnJlY3QgfHwgIWl0ZW0uc2l6ZSB8fCAhaXRlbS5lbCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBwb3NpdGlvbiA9IGNvbnRhaW5lclBvc2l0aW9uICsgaXRlbS5yZWN0W3Bvc2l0aW9uTmFtZV07XG5cdFx0XHRjb25zdCBpdGVtU2l6ZSA9IGl0ZW0ucmVjdFtzaXplTmFtZV0gfHwgaXRlbS5zaXplW3NpemVOYW1lXTtcblxuXHRcdFx0Ly8gY2hlY2sgaXRlbSBpcyBpbiBjb250YWluZXIuXG5cdFx0XHRpZiAoc2Nyb2xsUG9zaXRpb25TdGFydCA+IHBvc2l0aW9uICsgaXRlbVNpemUgfHxcblx0XHRcdFx0c2Nyb2xsUG9zaXRpb25FbmQgPCBwb3NpdGlvbikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBlbCA9IGl0ZW0uZWw7XG5cblx0XHRcdGlmICghZWwuX19JTUFHRV9fKSB7XG5cdFx0XHRcdHRoaXMuX2NoZWNrUGFyYWxsYXhJdGVtKGVsKTtcblx0XHRcdH1cblx0XHRcdGlmIChlbC5fX0lNQUdFX18gPT09IC0xKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGltYWdlRWxlbWVudCA9IGVsLl9fSU1BR0VfXztcblx0XHRcdGNvbnN0IGJveEVsZW1lbnQgPSBlbC5fX0JPWF9fO1xuXHRcdFx0Y29uc3QgYm94U2l6ZSA9IGJveEVsZW1lbnQuX19TSVpFX187XG5cdFx0XHRjb25zdCBpbWFnZVNpemUgPSBpbWFnZUVsZW1lbnQuX19TSVpFX187XG5cblx0XHRcdC8vIG5vIHBhcmFsbGF4XG5cdFx0XHRpZiAoYm94U2l6ZSA+PSBpbWFnZVNpemUpIHtcblx0XHRcdFx0Ly8gcmVtb3ZlIHRyYW5zZm9ybSBzdHlsZVxuXHRcdFx0XHRpbWFnZUVsZW1lbnQuc3R5bGVbVFJBTlNGT1JNXSA9IFwiXCI7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaWYgYXJlYSdzIHBvc2l0aW9uIGlzIGNlbnRlciwgcmF0aW8gaXMgMC5cblx0XHRcdC8vIGlmIGFyZWEgaXMgaGlkZGVuIGF0IHRoZSB0b3AsIHJhdGlvIGlzIDEuXG5cdFx0XHQvLyBpZiBhcmVhIGlzIGhpZGRlbiBhdCB0aGUgYm90dG9tLCByYXRpbyBpcyAtMS5cblx0XHRcdGNvbnN0IGltYWdlUG9zaXRpb24gPSBwb3NpdGlvbiArIGJveFNpemUgLyAyO1xuXHRcdFx0bGV0IHJhdGlvID0gKHNjcm9sbFBvc2l0aW9uU3RhcnQgKyByb290U2l6ZSAvIDIgLVxuXHRcdFx0XHQocm9vdFNpemUgKyBib3hTaXplKSAvIDIgKiBjZW50ZXIgLSBpbWFnZVBvc2l0aW9uKSAvXG5cdFx0XHRcdChyb290U2l6ZSArIGJveFNpemUpICogMiAqIHN0cmVuZ3RoO1xuXG5cdFx0XHQvLyBpZiByYXRpbyBpcyBvdXQgb2YgdGhlIHJhbmdlIG9mIC0xIGFuZCAxLCBzaG93IGVtcHR5IHNwYWNlLlxuXHRcdFx0cmF0aW8gPSBNYXRoLm1heChNYXRoLm1pbihyYXRpbywgcmFuZ2VbMV0pLCByYW5nZVswXSk7XG5cblx0XHRcdC8vIGRpc3QgaXMgdGhlIHBvc2l0aW9uIHdoZW4gdGh1bW5haWwncyBpbWFnZSBpcyBjZW50ZXJlZC5cblx0XHRcdGNvbnN0IGRpc3QgPSAoYm94U2l6ZSAtIGltYWdlU2l6ZSkgLyAyO1xuXHRcdFx0bGV0IHRyYW5zbGF0ZSA9IGRpc3QgKiAoMSAtIHJhdGlvKTtcblxuXHRcdFx0aWYgKGFsaWduID09PSBDRU5URVIpIHtcblx0XHRcdFx0dHJhbnNsYXRlIC09IGRpc3Q7XG5cdFx0XHR9XG5cblx0XHRcdGltYWdlRWxlbWVudC5fX1RSQU5TTEFURV9fID0gdHJhbnNsYXRlO1xuXHRcdFx0aW1hZ2VFbGVtZW50Ll9fUkFUSU9fXyA9IHJhdGlvO1xuXHRcdFx0aW1hZ2VFbGVtZW50LnN0eWxlW1RSQU5TRk9STV0gPSBgdHJhbnNsYXRlJHtjb29yZGluYXRlTmFtZX0oJHt0cmFuc2xhdGV9cHgpYDtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcmFsbGF4O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BhcmFsbGF4LmpzIiwiaW1wb3J0IHt3aW5kb3csIGRvY3VtZW50fSBmcm9tIFwiLi9icm93c2VyXCI7XG5pbXBvcnQge1xuXHRTVVBQT1JUX0NPTVBVVEVEU1RZTEUsXG5cdFNVUFBPUlRfQURERVZFTlRMSVNURU5FUixcblx0U1VQUE9SVF9QQVNTSVZFLFxuXHRWRVJUSUNBTCxcblx0SE9SSVpPTlRBTCxcblx0REVGQVVMVF9PUFRJT05TLFxufSBmcm9tIFwiLi9jb25zdHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkobm9kZXMpIHtcblx0Ly8gU0NSSVBUNTAxNCBpbiBJRThcblx0Y29uc3QgYXJyYXkgPSBbXTtcblxuXHRpZiAobm9kZXMpIHtcblx0XHRmb3IgKGxldCBpID0gMCwgbGVuID0gbm9kZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGFycmF5LnB1c2gobm9kZXNbaV0pO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gYXJyYXk7XG59XG5leHBvcnQgZnVuY3Rpb24gZmlsbChsZW5ndGgsIHZhbHVlKSB7XG5cdGNvbnN0IGFycmF5ID0gdHlwZW9mIGxlbmd0aCA9PT0gXCJvYmplY3RcIiA/IGxlbmd0aCA6IG5ldyBBcnJheShsZW5ndGgpO1xuXHRjb25zdCBsZW4gPSBhcnJheS5sZW5ndGg7XG5cblx0Zm9yIChsZXQgaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG5cdFx0YXJyYXlbaV0gPSB2YWx1ZTtcblx0fVxuXHRyZXR1cm4gYXJyYXk7XG59XG4vKipcbiAqIFNlbGVjdCBvciBjcmVhdGUgZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8alF1ZXJ5fSBwYXJhbVxuICogIHdoZW4gc3RyaW5nIGdpdmVuIGlzIGFzIEhUTUwgdGFnLCB0aGVuIGNyZWF0ZSBlbGVtZW50XG4gKiAgb3RoZXJ3aXNlIGl0IHJldHVybnMgc2VsZWN0ZWQgZWxlbWVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbXVsdGlcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICQocGFyYW0sIG11bHRpID0gZmFsc2UpIHtcblx0bGV0IGVsO1xuXG5cdGlmICh0eXBlb2YgcGFyYW0gPT09IFwic3RyaW5nXCIpIHsgLy8gU3RyaW5nIChIVE1MLCBTZWxlY3Rvcilcblx0XHQvLyBjaGVjayBpZiBzdHJpbmcgaXMgSFRNTCB0YWcgZm9ybWF0XG5cdFx0Y29uc3QgbWF0Y2ggPSBwYXJhbS5tYXRjaCgvXjwoW0Etel0rKVxccyooW14+XSopPi8pO1xuXG5cdFx0Ly8gY3JlYXRpbmcgZWxlbWVudFxuXHRcdGlmIChtYXRjaCkgeyAvLyBIVE1MXG5cdFx0XHRjb25zdCBkdW1teSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0XHRcdGR1bW15LmlubmVySFRNTCA9IHBhcmFtO1xuXHRcdFx0ZWwgPSBkdW1teS5jaGlsZE5vZGVzO1xuXHRcdH0gZWxzZSB7IC8vIFNlbGVjdG9yXG5cdFx0XHRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW0pO1xuXHRcdH1cblx0XHRpZiAobXVsdGkpIHtcblx0XHRcdGVsID0gdG9BcnJheShlbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsID0gKGVsICYmIGVsLmxlbmd0aCA+IDAgJiYgZWxbMF0pIHx8IHVuZGVmaW5lZDtcblx0XHR9XG5cdH0gZWxzZSBpZiAocGFyYW0gPT09IHdpbmRvdykgeyAvLyB3aW5kb3dcblx0XHRlbCA9IHBhcmFtO1xuXHR9IGVsc2UgaWYgKHBhcmFtLm5vZGVOYW1lICYmXG5cdFx0KHBhcmFtLm5vZGVUeXBlID09PSAxIHx8IHBhcmFtLm5vZGVUeXBlID09PSA5KSkgeyAvLyBIVE1MRWxlbWVudCwgRG9jdW1lbnRcblx0XHRlbCA9IHBhcmFtO1xuXHR9IGVsc2UgaWYgKChcImpRdWVyeVwiIGluIHdpbmRvdyAmJiBwYXJhbSBpbnN0YW5jZW9mIHdpbmRvdy5qUXVlcnkpIHx8XG5cdFx0cGFyYW0uY29uc3RydWN0b3IucHJvdG90eXBlLmpxdWVyeSkgeyAvLyBqUXVlcnlcblx0XHRlbCA9IG11bHRpID8gcGFyYW0udG9BcnJheSgpIDogcGFyYW0uZ2V0KDApO1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pKSB7XG5cdFx0ZWwgPSBwYXJhbS5tYXAodiA9PiAkKHYpKTtcblx0XHRpZiAoIW11bHRpKSB7XG5cdFx0XHRlbCA9IGVsLmxlbmd0aCA+PSAxID8gZWxbMF0gOiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBlbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudChlbGVtZW50LCB0eXBlLCBoYW5kbGVyLCBldmVudExpc3RlbmVyT3B0aW9ucykge1xuXHRpZiAoU1VQUE9SVF9BRERFVkVOVExJU1RFTkVSKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSBldmVudExpc3RlbmVyT3B0aW9ucyB8fCBmYWxzZTtcblxuXHRcdGlmICh0eXBlb2YgZXZlbnRMaXN0ZW5lck9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdG9wdGlvbnMgPSBTVVBQT1JUX1BBU1NJVkUgPyBldmVudExpc3RlbmVyT3B0aW9ucyA6IGZhbHNlO1xuXHRcdH1cblx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucyk7XG5cdH0gZWxzZSBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuXHRcdGVsZW1lbnQuYXR0YWNoRXZlbnQoYG9uJHt0eXBlfWAsIGhhbmRsZXIpO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW1lbnRbYG9uJHt0eXBlfWBdID0gaGFuZGxlcjtcblx0fVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGVsZW1lbnQsIHR5cGUsIGhhbmRsZXIpIHtcblx0aWYgKGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuXHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG5cdH0gZWxzZSBpZiAoZWxlbWVudC5kZXRhY2hFdmVudCkge1xuXHRcdGVsZW1lbnQuZGV0YWNoRXZlbnQoYG9uJHt0eXBlfWAsIGhhbmRsZXIpO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW1lbnRbYG9uJHt0eXBlfWBdID0gbnVsbDtcblx0fVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbChlbCwgaXNWZXJ0aWNhbCkge1xuXHRjb25zdCBwcm9wID0gYHNjcm9sbCR7aXNWZXJ0aWNhbCA/IFwiVG9wXCIgOiBcIkxlZnRcIn1gO1xuXG5cdGlmIChlbCA9PT0gd2luZG93KSB7XG5cdFx0cmV0dXJuIHdpbmRvd1tpc1ZlcnRpY2FsID8gXCJwYWdlWU9mZnNldFwiIDogXCJwYWdlWE9mZnNldFwiXSB8fCBkb2N1bWVudC5ib2R5W3Byb3BdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtwcm9wXTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZWxbcHJvcF07XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxUbyhlbCwgeCwgeSkge1xuXHRpZiAoZWwgPT09IHdpbmRvdykge1xuXHRcdGVsLnNjcm9sbCh4LCB5KTtcblx0fSBlbHNlIHtcblx0XHRlbC5zY3JvbGxMZWZ0ID0geDtcblx0XHRlbC5zY3JvbGxUb3AgPSB5O1xuXHR9XG59XG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsQnkoZWwsIHgsIHkpIHtcblx0aWYgKGVsID09PSB3aW5kb3cpIHtcblx0XHRlbC5zY3JvbGxCeSh4LCB5KTtcblx0fSBlbHNlIHtcblx0XHRlbC5zY3JvbGxMZWZ0ICs9IHg7XG5cdFx0ZWwuc2Nyb2xsVG9wICs9IHk7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZXMoZWwpIHtcblx0cmV0dXJuIFNVUFBPUlRfQ09NUFVURURTVFlMRSA/XG5cdFx0d2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpIDogZWwuY3VycmVudFN0eWxlO1xufVxuZnVuY3Rpb24gX2dldFNpemUoZWwsIG5hbWUpIHtcblx0aWYgKGVsID09PSB3aW5kb3cpIHsgLy8gV0lORE9XXG5cdFx0cmV0dXJuIGVsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtgY2xpZW50JHtuYW1lfWBdO1xuXHR9IGVsc2UgaWYgKGVsLm5vZGVUeXBlID09PSA5KSB7IC8vIERPQ1VNRU5UX05PREVcblx0XHRjb25zdCBkb2MgPSBlbC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHRyZXR1cm4gTWF0aC5tYXgoXG5cdFx0XHRlbC5ib2R5W2BzY3JvbGwke25hbWV9YF0sIGRvY1tgc2Nyb2xsJHtuYW1lfWBdLFxuXHRcdFx0ZWwuYm9keVtgb2Zmc2V0JHtuYW1lfWBdLCBkb2NbYG9mZnNldCR7bmFtZX1gXSxcblx0XHRcdGRvY1tgY2xpZW50JHtuYW1lfWBdXG5cdFx0KTtcblx0fSBlbHNlIHsgLy8gTk9ERVxuXHRcdGNvbnN0IHN0eWxlID0gZ2V0U3R5bGVzKGVsKTtcblx0XHRjb25zdCB2YWx1ZSA9IHN0eWxlW25hbWUudG9Mb3dlckNhc2UoKV07XG5cblx0XHRyZXR1cm4gcGFyc2VGbG9hdCgvYXV0b3wlLy50ZXN0KHZhbHVlKSA/IGVsW2BvZmZzZXQke25hbWV9YF0gOiBzdHlsZVtuYW1lLnRvTG93ZXJDYXNlKCldKTtcblx0fVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlubmVyV2lkdGgoZWwpIHtcblx0cmV0dXJuIF9nZXRTaXplKGVsLCBcIldpZHRoXCIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlubmVySGVpZ2h0KGVsKSB7XG5cdHJldHVybiBfZ2V0U2l6ZShlbCwgXCJIZWlnaHRcIik7XG59XG5cbmV4cG9ydCBjb25zdCBTVFlMRSA9IHtcblx0dmVydGljYWw6IHtcblx0XHRwb3MxOiBcInRvcFwiLFxuXHRcdGVuZFBvczE6IFwiYm90dG9tXCIsXG5cdFx0c2l6ZTE6IFwiaGVpZ2h0XCIsXG5cdFx0cG9zMjogXCJsZWZ0XCIsXG5cdFx0ZW5kUG9zMjogXCJyaWdodFwiLFxuXHRcdHNpemUyOiBcIndpZHRoXCIsXG5cdH0sXG5cdGhvcml6b250YWw6IHtcblx0XHRwb3MxOiBcImxlZnRcIixcblx0XHRlbmRQb3MxOiBcInJpZ2h0XCIsXG5cdFx0c2l6ZTE6IFwid2lkdGhcIixcblx0XHRwb3MyOiBcInRvcFwiLFxuXHRcdGVuZFBvczI6IFwiYm90dG9tXCIsXG5cdFx0c2l6ZTI6IFwiaGVpZ2h0XCIsXG5cdH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVOYW1lcyhpc0hvcml6b250YWwpIHtcblx0cmV0dXJuIFNUWUxFW2lzSG9yaXpvbnRhbCA/IEhPUklaT05UQUwgOiBWRVJUSUNBTF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25PcHRpb25zKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKSB7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LFxuXHRcdERFRkFVTFRfT1BUSU9OUyxcblx0XHRkZWZhdWx0T3B0aW9ucyxcblx0XHRvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvWmVyb0FycmF5KG91dGxpbmUpIHtcblx0aWYgKCFvdXRsaW5lIHx8ICFvdXRsaW5lLmxlbmd0aCkge1xuXHRcdHJldHVybiBbMF07XG5cdH1cblx0cmV0dXJuIG91dGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1dpbmRvdyhlbCkge1xuXHRyZXR1cm4gZWwgPT09IHdpbmRvdztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGV4T2YoYXJyLCB0YXJnZXQsIGlzUmlnaHQgPSBmYWxzZSkge1xuXHRpZiAoIWlzUmlnaHQpIHtcblx0XHRyZXR1cm4gYXJyLmluZGV4T2YodGFyZ2V0KTtcblx0fVxuXHRjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG5cdGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuXHRcdGlmIChhcnJbaV0gIT09IHRhcmdldCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdHJldHVybiBpO1xuXHR9XG5cdHJldHVybiAtMTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy5qcyJdLCJzb3VyY2VSb290IjoiIn0=