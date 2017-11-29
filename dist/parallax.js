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
exports.PROCESSING = exports.LOADING_PREPEND = exports.LOADING_APPEND = exports.ALIGN = exports.isMobile = exports.agent = exports.DEFAULT_OPTIONS = exports.GROUPKEY_ATT = exports.DUMMY_POSITION = exports.SINGLE = exports.MULTI = exports.NO_TRUSTED = exports.TRUSTED = exports.NO_CACHE = exports.CACHE = exports.HORIZONTAL = exports.VERTICAL = exports.PREPEND = exports.APPEND = exports.CONTAINER_CLASSNAME = exports.RETRY = exports.IS_ANDROID2 = exports.IS_IOS = exports.IS_IE = exports.SUPPORT_PASSIVE = exports.SUPPORT_ADDEVENTLISTENER = exports.SUPPORT_COMPUTEDSTYLE = undefined;

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

var agent = exports.agent = navigator.userAgent;
var isMobile = exports.isMobile = agent.indexOf("Mobi") !== -1 || /ios|android/.test(agent);

var ALIGN = exports.ALIGN = {
	START: "start",
	CENTER: "center",
	END: "end",
	JUSTIFY: "justify"
};

var LOADING_APPEND = exports.LOADING_APPEND = 1;
var LOADING_PREPEND = exports.LOADING_PREPEND = 2;
var PROCESSING = exports.PROCESSING = 4;

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
		return _browser.document.body[prop] || _browser.document.documentElement[prop];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlZTlhYmIyMWRjOWU0M2JiYzRkNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9QYXJhbGxheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJTVVBQT1JUX0NPTVBVVEVEU1RZTEUiLCJTVVBQT1JUX0FEREVWRU5UTElTVEVORVIiLCJkb2N1bWVudCIsIlNVUFBPUlRfUEFTU0lWRSIsInN1cHBvcnRzUGFzc2l2ZU9wdGlvbiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldCIsImUiLCJJU19JRSIsInRlc3QiLCJJU19JT1MiLCJJU19BTkRST0lEMiIsIlJFVFJZIiwiQ09OVEFJTkVSX0NMQVNTTkFNRSIsIkFQUEVORCIsIlBSRVBFTkQiLCJWRVJUSUNBTCIsIkhPUklaT05UQUwiLCJDQUNIRSIsIk5PX0NBQ0hFIiwiVFJVU1RFRCIsIk5PX1RSVVNURUQiLCJNVUxUSSIsIlNJTkdMRSIsIkRVTU1ZX1BPU0lUSU9OIiwiR1JPVVBLRVlfQVRUIiwiREVGQVVMVF9PUFRJT05TIiwiaG9yaXpvbnRhbCIsIm1hcmdpbiIsImFnZW50IiwiaXNNb2JpbGUiLCJpbmRleE9mIiwiQUxJR04iLCJTVEFSVCIsIkNFTlRFUiIsIkVORCIsIkpVU1RJRlkiLCJMT0FESU5HX0FQUEVORCIsIkxPQURJTkdfUFJFUEVORCIsIlBST0NFU1NJTkciLCJ3aW4iLCJ3aW5kb3ciLCJzdHlsZSIsInBvc2l0aW9uIiwic2l6ZSIsImNhbW1lbFNpemUiLCJjb29yZGluYXRlIiwiVFJBTlNGT1JNIiwiYm9keVN0eWxlIiwiaGVhZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidGFyZ2V0IiwiaSIsImxlbiIsImxlbmd0aCIsIlBhcmFsbGF4Iiwicm9vdCIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJzZWxlY3RvciIsInN0cmVuZ3RoIiwiY2VudGVyIiwicmFuZ2UiLCJhbGlnbiIsIl9yb290IiwiX2NvbnRhaW5lciIsIl9yb290U2l6ZSIsIl9jb250YWluZXJQb3NpdGlvbiIsIl9zdHlsZSIsInJlc2l6ZSIsIl9jaGVja1BhcmFsbGF4SXRlbSIsImVsZW1lbnQiLCJfX0lNQUdFX18iLCJpbWciLCJxdWVyeVNlbGVjdG9yIiwiX19CT1hfXyIsInBhcmVudE5vZGUiLCJzaXplTmFtZSIsIl9fU0laRV9fIiwiaXRlbXMiLCJwb3NpdGlvbk5hbWUiLCJyb290UmVjdCIsImJvZHkiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjb250YWluZXJ0UmVjdCIsImRvY3VtZW50RWxlbWVudCIsImJvZHlXaWR0aCIsIm9mZnNldFdpZHRoIiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiZm9yRWFjaCIsIml0ZW0iLCJlbCIsInJlZnJlc2giLCJzY3JvbGxQb3NpdGlvblN0YXJ0Iiwic3R5bGVOYW1lcyIsImNvb3JkaW5hdGVOYW1lIiwicm9vdFNpemUiLCJzY3JvbGxQb3NpdGlvbkVuZCIsImNvbnRhaW5lclBvc2l0aW9uIiwicmVjdCIsIml0ZW1TaXplIiwiaW1hZ2VFbGVtZW50IiwiYm94RWxlbWVudCIsImJveFNpemUiLCJpbWFnZVNpemUiLCJpbWFnZVBvc2l0aW9uIiwicmF0aW8iLCJNYXRoIiwibWF4IiwibWluIiwiZGlzdCIsInRyYW5zbGF0ZSIsIl9fVFJBTlNMQVRFX18iLCJfX1JBVElPX18iLCJtb2R1bGUiLCJleHBvcnRzIiwidG9BcnJheSIsImZpbGwiLCIkIiwiYWRkRXZlbnQiLCJyZW1vdmVFdmVudCIsInNjcm9sbCIsInNjcm9sbFRvIiwic2Nyb2xsQnkiLCJnZXRTdHlsZXMiLCJpbm5lckhlaWdodCIsImdldFN0eWxlTmFtZXMiLCJhc3NpZ25PcHRpb25zIiwidG9aZXJvQXJyYXkiLCJpc1dpbmRvdyIsIm5vZGVzIiwiYXJyYXkiLCJwdXNoIiwidmFsdWUiLCJBcnJheSIsInBhcmFtIiwibXVsdGkiLCJtYXRjaCIsImR1bW15IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImNoaWxkTm9kZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidW5kZWZpbmVkIiwibm9kZU5hbWUiLCJub2RlVHlwZSIsImpRdWVyeSIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwianF1ZXJ5IiwiaXNBcnJheSIsIm1hcCIsInYiLCJ0eXBlIiwiaGFuZGxlciIsImV2ZW50TGlzdGVuZXJPcHRpb25zIiwiYXR0YWNoRXZlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGV0YWNoRXZlbnQiLCJpc1ZlcnRpY2FsIiwicHJvcCIsIngiLCJ5Iiwic2Nyb2xsTGVmdCIsInNjcm9sbFRvcCIsImdldENvbXB1dGVkU3R5bGUiLCJjdXJyZW50U3R5bGUiLCJfZ2V0U2l6ZSIsIm5hbWUiLCJkb2MiLCJ0b0xvd2VyQ2FzZSIsInBhcnNlRmxvYXQiLCJTVFlMRSIsInZlcnRpY2FsIiwicG9zMSIsImVuZFBvczEiLCJzaXplMSIsInBvczIiLCJlbmRQb3MyIiwic2l6ZTIiLCJpc0hvcml6b250YWwiLCJkZWZhdWx0T3B0aW9ucyIsIm91dGxpbmUiLCJhcnIiLCJpc1JpZ2h0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztB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QUFOLENBQVA7QUFDQTs7QUFFTSxTQUFTckQsYUFBVCxDQUF1QnNELGNBQXZCLEVBQXVDN0gsT0FBdkMsRUFBZ0Q7QUFDdEQsUUFBTyxTQUFjLEVBQWQsMkJBRU42SCxjQUZNLEVBR043SCxPQUhNLENBQVA7QUFJQTs7QUFFTSxTQUFTd0UsV0FBVCxDQUFxQnNELE9BQXJCLEVBQThCO0FBQ3BDLEtBQUksQ0FBQ0EsT0FBRCxJQUFZLENBQUNBLFFBQVFqSSxNQUF6QixFQUFpQztBQUNoQyxTQUFPLENBQUMsQ0FBRCxDQUFQO0FBQ0E7QUFDRCxRQUFPaUksT0FBUDtBQUNBOztBQUVNLFNBQVNyRCxRQUFULENBQWtCdEMsRUFBbEIsRUFBc0I7QUFDNUIsUUFBT0Esc0JBQVA7QUFDQTs7QUFFTSxTQUFTN0QsT0FBVCxDQUFpQnlKLEdBQWpCLEVBQXNCckksTUFBdEIsRUFBK0M7QUFBQSxLQUFqQnNJLE9BQWlCLHVFQUFQLEtBQU87O0FBQ3JELEtBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ2IsU0FBT0QsSUFBSXpKLE9BQUosQ0FBWW9CLE1BQVosQ0FBUDtBQUNBO0FBQ0QsS0FBTUcsU0FBU2tJLElBQUlsSSxNQUFuQjs7QUFFQSxNQUFLLElBQUlGLElBQUlFLFNBQVMsQ0FBdEIsRUFBeUJGLEtBQUssQ0FBOUIsRUFBaUMsRUFBRUEsQ0FBbkMsRUFBc0M7QUFDckMsTUFBSW9JLElBQUlwSSxDQUFKLE1BQVdELE1BQWYsRUFBdUI7QUFDdEI7QUFDQTtBQUNELFNBQU9DLENBQVA7QUFDQTtBQUNELFFBQU8sQ0FBQyxDQUFSO0FBQ0EsQyIsImZpbGUiOiJwYXJhbGxheC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlBhcmFsbGF4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImVnXCJdID0gcm9vdFtcImVnXCJdIHx8IHt9LCByb290W1wiZWdcIl1bXCJQYXJhbGxheFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZTlhYmIyMWRjOWU0M2JiYzRkNiIsImltcG9ydCB7d2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbmNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbmV4cG9ydCBjb25zdCBTVVBQT1JUX0NPTVBVVEVEU1RZTEUgPSAhIShcImdldENvbXB1dGVkU3R5bGVcIiBpbiB3aW5kb3cpO1xuZXhwb3J0IGNvbnN0IFNVUFBPUlRfQURERVZFTlRMSVNURU5FUiA9ICEhKFwiYWRkRXZlbnRMaXN0ZW5lclwiIGluIGRvY3VtZW50KTtcbmV4cG9ydCBjb25zdCBTVVBQT1JUX1BBU1NJVkUgPSAoKCkgPT4ge1xuXHRsZXQgc3VwcG9ydHNQYXNzaXZlT3B0aW9uID0gZmFsc2U7XG5cblx0dHJ5IHtcblx0XHRpZiAoU1VQUE9SVF9BRERFVkVOVExJU1RFTkVSICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFxuXHRcdFx0XHRcInBhc3NpdmVcIiwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHN1cHBvcnRzUGFzc2l2ZU9wdGlvbiA9IHRydWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSkpO1xuXHRcdH1cblx0fSBjYXRjaCAoZSkge31cblx0cmV0dXJuIHN1cHBvcnRzUGFzc2l2ZU9wdGlvbjtcbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBJU19JRSA9IC9NU0lFfFRyaWRlbnR8V2luZG93cyBQaG9uZXxFZGdlLy50ZXN0KHVhKTtcbmV4cG9ydCBjb25zdCBJU19JT1MgPSAvaVBob25lfGlQYWQvLnRlc3QodWEpO1xuZXhwb3J0IGNvbnN0IElTX0FORFJPSUQyID0gL0FuZHJvaWQgMlxcLi8udGVzdCh1YSk7XG5leHBvcnQgY29uc3QgUkVUUlkgPSAzO1xuZXhwb3J0IGNvbnN0IENPTlRBSU5FUl9DTEFTU05BTUUgPSBcIl9lZy1pbmZpbml0ZWdyaWQtY29udGFpbmVyX1wiO1xuXG5leHBvcnQgY29uc3QgQVBQRU5EID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBQUkVQRU5EID0gZmFsc2U7XG5leHBvcnQgY29uc3QgVkVSVElDQUwgPSBcInZlcnRpY2FsXCI7XG5leHBvcnQgY29uc3QgSE9SSVpPTlRBTCA9IFwiaG9yaXpvbnRhbFwiO1xuZXhwb3J0IGNvbnN0IENBQ0hFID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBOT19DQUNIRSA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IFRSVVNURUQgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IE5PX1RSVVNURUQgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBNVUxUSSA9IHRydWU7XG5leHBvcnQgY29uc3QgU0lOR0xFID0gZmFsc2U7XG5leHBvcnQgY29uc3QgRFVNTVlfUE9TSVRJT04gPSAtMTAwMDAwO1xuZXhwb3J0IGNvbnN0IEdST1VQS0VZX0FUVCA9IFwiZGF0YS1ncm91cGtleVwiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xuXHRob3Jpem9udGFsOiBmYWxzZSxcblx0bWFyZ2luOiAwLFxufTtcblxuZXhwb3J0IGNvbnN0IGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbmV4cG9ydCBjb25zdCBpc01vYmlsZSA9IGFnZW50LmluZGV4T2YoXCJNb2JpXCIpICE9PSAtMSB8fCAvaW9zfGFuZHJvaWQvLnRlc3QoYWdlbnQpO1xuXG5leHBvcnQgY29uc3QgQUxJR04gPSB7XG5cdFNUQVJUOiBcInN0YXJ0XCIsXG5cdENFTlRFUjogXCJjZW50ZXJcIixcblx0RU5EOiBcImVuZFwiLFxuXHRKVVNUSUZZOiBcImp1c3RpZnlcIixcbn07XG5cbmV4cG9ydCBjb25zdCBMT0FESU5HX0FQUEVORCA9IDE7XG5leHBvcnQgY29uc3QgTE9BRElOR19QUkVQRU5EID0gMjtcbmV4cG9ydCBjb25zdCBQUk9DRVNTSU5HID0gNDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdHMuanMiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbmNvbnN0IHdpbiA9IHdpbmRvdztcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5cbmV4cG9ydCB7d2luZG93fTtcbmV4cG9ydCBjb25zdCBkb2N1bWVudCA9IHdpbi5kb2N1bWVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9icm93c2VyLmpzIiwiaW1wb3J0IHtBTElHTiwgaXNNb2JpbGV9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHskLCBpc1dpbmRvd30gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3Qgc3R5bGUgPSB7XG5cdFwidmVydGljYWxcIjoge3Bvc2l0aW9uOiBcInRvcFwiLCBzaXplOiBcImhlaWdodFwiLCBjYW1tZWxTaXplOiBcIkhlaWdodFwiLCBjb29yZGluYXRlOiBcIllcIn0sXG5cdFwiaG9yaXpvbnRhbFwiOiB7cG9zaXRpb246IFwibGVmdFwiLCBzaXplOiBcIndpZHRoXCIsIGNhbW1lbFNpemU6IFwiV2lkdGhcIiwgY29vcmRpbmF0ZTogXCJYXCJ9LFxufTtcbmNvbnN0IHtTVEFSVCwgQ0VOVEVSfSA9IEFMSUdOO1xuY29uc3QgVFJBTlNGT1JNID0gKGZ1bmN0aW9uKCkge1xuXHRjb25zdCBib2R5U3R5bGUgPSAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0pLnN0eWxlO1xuXHRjb25zdCB0YXJnZXQgPSBbXCJ0cmFuc2Zvcm1cIiwgXCJ3ZWJraXRUcmFuc2Zvcm1cIiwgXCJtc1RyYW5zZm9ybVwiLCBcIm1velRyYW5zZm9ybVwiXTtcblxuXHRmb3IgKGxldCBpID0gMCwgbGVuID0gdGFyZ2V0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0aWYgKHRhcmdldFtpXSBpbiBib2R5U3R5bGUpIHtcblx0XHRcdHJldHVybiB0YXJnZXRbaV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiBcIlwiO1xufSkoKTtcblxuLyoqXG4gKiBQYXJhbGxheCBpcyBhIGRpc3BsYWNlbWVudCBvciBkaWZmZXJlbmNlIGluIHRoZSBhcHBhcmVudCBwb3NpdGlvbiBvZiBhbiBvYmplY3Qgdmlld2VkIGFsb25nIHR3byBkaWZmZXJlbnQgbGluZXMgb2Ygc2lnaHQuIFlvdSBjYW4gYXBwbHkgcGFyYWxsYXggYnkgc2Nyb2xsaW5nIHRoZSBpbWFnZSBhbmQgc3BlZWQgb2YgdGhlIGl0ZW0uXG4gKiBAa28gUGFyYWxsYXjripQg7ISc66GcIOuLpOuluCDrkZAg6rCc7J2YIOyLnOyEoOyXkOyEnCDrsJTrnbzrs7gg66y87LK07J2YIOyZuOq0gOyDgSDsnITsuZjsnZgg67OA7JyEIOuYkOuKlCDssKjsnbTsnoXri4jri6QuIOyKpO2BrOuhpOyXkCDrlLDrnbwg7J2066+47KeA7JmAIOyVhOydtO2FnOydmCDsho3rj4Trpbwg7LCo7J2066W8IOykjOycvOuhnOyNqCBwYXJhbGxheOydhCDsoIHsmqntlaAg7IiYIOyeiOyKteuLiOuLpC5cbiAqIEBjbGFzcyBlZy5QYXJhbGxheFxuICogQHBhcmFtIHtFbGVtZW50fFN0cmluZ30gW3Jvb3Q9d2luZG93XSBTY3JvbGxpbmcgdGFyZ2V0LiBJZiB5b3Ugc2Nyb2xsIGluIHRoZSBib2R5LCBzZXQgd2luZG93LiDsiqTtgazroaTtlZjripQg64yA7IOBLiDrp4zslb0gYm9keeyXkOyEnCDsiqTtgazroaTtlZjrqbQgd2luZG9366GcIOyEpOygle2VnOuLpC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbiBvYmplY3Qgb2YgZWcuUGFyYWxsYXggbW9kdWxlIDxrbz5lZy5QYXJhbGxheCDrqqjrk4jsnZgg7Ji17IWYIOqwneyytDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmhvcml6b250YWw9ZmFsc2VdIERpcmVjdGlvbiBvZiB0aGUgc2Nyb2xsIG1vdmVtZW50IChmYWxzZTogdmVydGljYWwsIHRydWU6IGhvcml6b250YWwpIDxrbz7siqTtgazroaQg7J2064+ZIOuwqe2WpSAoZmFsc2U6IOyEuOuhnOuwqe2WpSwgdHJ1ZTog6rCA66Gc67Cp7ZalKTwva28+XG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gQ29udGFpbmVyIHdyYXBwaW5nIGl0ZW1zLiBJZiByb290IGFuZCBjb250YWluZXIgaGF2ZSBubyBnYXBzLCBkbyBub3Qgc2V0IG9wdGlvbi4gPGtvPiDslYTsnbTthZzrk6TsnYQg6rCQ7Iu46rOgIOyeiOuKlCDsu6jthYzsnbTrhIguIOunjOyVvSByb2907JmAIGNvbnRhaW5lcuqwhOydmCDssKjsnbTqsIAg7JeG7Jy866m0LCDsmLXshZjsnYQg7ISk7KCV7ZWY7KeAIOyViuyVhOuPhCDrkJzri6QuPC9rbz5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5zZWxlY3Rvcj1cImltZ1wiXSBUaGUgc2VsZWN0b3Igb2YgdGhlIGltYWdlIHRvIGFwcGx5IHRoZSBwYXJhbGxheCBpbiB0aGUgaXRlbSA8a28+IOyVhOydtO2FnOyViOyXkCDsnojripQgcGFyYWxsYXjrpbwg7KCB7Jqp7ZWgIOydtOuvuOyngOydmCBzZWxlY3RvciA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zdHJlbmd0aD0xXSBEaW1lbnNpb25zIHRoYXQgaW5kaWNhdGUgdGhlIHNlbnNpdGl2aXR5IG9mIHBhcmFsbGF4LiBUaGUgaGlnaGVyIHRoZSBzdHJlbmd0aCwgdGhlIGZhc3Rlci5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2VudGVyPTBdIFRoZSBtaWRkbGUgcG9pbnQgb2YgcGFyYWxsYXguIFRoZSB0b3AgaXMgMSBhbmQgdGhlIGJvdHRvbSBpcyAtMS4gPGtvPiBwYXJhbGxheOqwgCDqsIDsmrTrjbDroZwg7Jik64qUIOygkC4g7IOB64uo7J20IDHsnbTqs6Ag7ZWY64uo7J20IC0x7J2064ukLiA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5yYW5nZT1bLTEsIDFdXSBSYW5nZSB0byBhcHBseSB0aGUgcGFyYWxsYXguIFRoZSB0b3AgaXMgMSBhbmQgdGhlIGJvdHRvbSBpcyAtMS4gPGtvPiBwYXJhbGxheOqwgCDsoIHsmqnrkJjripQg67KU7JyELCDsg4Hri6jsnbQgMeydtOqzoCDtlZjri6jsnbQgLTHsnbTri6QuIDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFsaWduPVwic3RhcnRcIl0gVGhlIGFsaWdubWVudCBvZiB0aGUgaW1hZ2UgaW4gdGhlIGl0ZW0uIChcInN0YXJ0XCIgOiB0b3Agb3IgbGVmdCwgXCJjZW50ZXJcIjogbWlkZGxlKSA8a28+IOyVhOydtO2FnOyViOydmCDsnbTrr7jsp4DsnZgg7KCV66CsIDwva28+XG4gKiBAZXhhbXBsZVxuYGBgXG48c2NyaXB0PlxuLy8gaXNPdmVyZmxvd1Njcm9sbDogZmFsc2VcbnZhciBwYXJhbGxheCA9IG5ldyBlZy5QYXJhbGxheCh3aW5kb3csIHtcblx0Y29udGFpbmVyOiBcIi5jb250YWluZXJcIixcblx0c2VsZWN0b3I6IFwiaW1nLnBhcmFsbGF4XCIsXG5cdHN0cmVuZ3RoOiAwLjgsXG5cdGNlbnRlcjogMCxcblx0cmFuZ2U6IFstMSwgMV0sXG5cdGFsaWduOiBcImNlbnRlclwiLFxuXHRob3Jpem9udGFsOiB0cnVlLFxufSk7XG5cbi8vIGlzT3ZlcmZsb3dTY3JvbGw6IHR1cmVcbnZhciBwYXJhbGxheCA9IG5ldyBlZy5QYXJhbGxheChcIi5jb250YWluZXJcIiwge1xuXHRzZWxlY3RvcjogXCJpbWcucGFyYWxsYXhcIixcblx0c3RyZW5ndGg6IDAuOCxcblx0Y2VudGVyOiAwLFxuXHRyYW5nZTogWy0xLCAxXSxcblx0YWxpZ246IFwiY2VudGVyXCIsXG5cdGhvcml6b250YWw6IHRydWUsXG59KTtcblxuLy8gaXRlbSBpbnRlcmZhY2VcbnZhciBpdGVtID0ge1xuXHQvLyBvcmlnaW5hbCBzaXplXG5cdHNpemU6IHtcblx0XHR3aWR0aDogMTAwLFxuXHRcdGhlaWdodDogMTAwLFxuXHR9LFxuXHQvLyB2aWV3IHNpemVcblx0cmVjdDoge1xuXHRcdHRvcDogMTAwLFxuXHRcdGxlZnQ6IDEwMCxcblx0XHR3aWR0aDogMTAwLFxuXHRcdGhlaWdodDogMTAwLFxuXHR9XG59O1xuPC9zY3JpcHQ+XG5gYGBcbiAqKi9cbmNsYXNzIFBhcmFsbGF4IHtcblx0Y29uc3RydWN0b3Iocm9vdCA9IHdpbmRvdywgb3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0XHRjb250YWluZXI6IG51bGwsXG5cdFx0XHRzZWxlY3RvcjogXCJpbWdcIixcblx0XHRcdHN0cmVuZ3RoOiAxLFxuXHRcdFx0Y2VudGVyOiAwLFxuXHRcdFx0cmFuZ2U6IFstMSwgMV0sXG5cdFx0XHRhbGlnbjogU1RBUlQsXG5cdFx0XHRob3Jpem9udGFsOiBmYWxzZSxcblx0XHR9LCBvcHRpb25zKTtcblx0XHR0aGlzLl9yb290ID0gJChyb290KTtcblx0XHR0aGlzLl9jb250YWluZXIgPSB0aGlzLm9wdGlvbnMuY29udGFpbmVyICYmICQodGhpcy5vcHRpb25zLmNvbnRhaW5lcik7XG5cdFx0dGhpcy5fcm9vdFNpemUgPSAwO1xuXHRcdHRoaXMuX2NvbnRhaW5lclBvc2l0aW9uID0gMDtcblx0XHR0aGlzLl9zdHlsZSA9IHN0eWxlW3RoaXMub3B0aW9ucy5ob3Jpem9udGFsID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCJdO1xuXHRcdHRoaXMucmVzaXplKCk7XG5cdH1cblx0X2NoZWNrUGFyYWxsYXhJdGVtKGVsZW1lbnQpIHtcblx0XHRpZiAoIWVsZW1lbnQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3Qgc2VsZWN0b3IgPSB0aGlzLm9wdGlvbnMuc2VsZWN0b3I7XG5cblx0XHRpZiAoIWVsZW1lbnQuX19JTUFHRV9fKSB7XG5cdFx0XHRjb25zdCBpbWcgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG5cdFx0XHRlbGVtZW50Ll9fSU1BR0VfXyA9IGltZyB8fCAtMTtcblx0XHRcdGlmIChlbGVtZW50Ll9fSU1BR0VfXyA9PT0gLTEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZWxlbWVudC5fX0JPWF9fID0gaW1nLnBhcmVudE5vZGU7XG5cdFx0fVxuXHRcdGlmIChlbGVtZW50Ll9fSU1BR0VfXyA9PT0gLTEpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3Qgc2l6ZU5hbWUgPSB0aGlzLl9zdHlsZS5jYW1tZWxTaXplO1xuXG5cdFx0ZWxlbWVudC5fX0lNQUdFX18uX19TSVpFX18gPSBlbGVtZW50Ll9fSU1BR0VfX1tgb2Zmc2V0JHtzaXplTmFtZX1gXTtcblx0XHRlbGVtZW50Ll9fQk9YX18uX19TSVpFX18gPSBlbGVtZW50Ll9fQk9YX19bYG9mZnNldCR7c2l6ZU5hbWV9YF07XG5cdH1cblx0LyoqXG5cdCAqIEFzIHRoZSBicm93c2VyIGlzIHJlc2l6ZWQsIHRoZSBnYXBzIGJldHdlZW4gdGhlIHJvb3QgYW5kIHRoZSBjb250YWluZXIgYW5kIHRoZSBzaXplIG9mIHRoZSBpdGVtcyBhcmUgdXBkYXRlZC5cblx0ICogQGtvIOu4jOudvOyasOyggOydmCDtgazquLDqsIAg67OA6rK965Co7Jy866GcIOyNqCByb2907JmAIGNvbnRhaW5lcuydmCDqsITqsqnqs7wg7JWE7J207YWc65Ok7J2YIO2BrOq4sOulvCDqsLHsi6DtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuUGFyYWxsYXgjcmVzaXplXG5cdCAqIEBwYXJhbSB7QXJyYXl9IFtpdGVtcyA9IFtdXSBJdGVtcyB0byBhcHBseSBwYXJhbGxheC4gSXQgZG9lcyBub3QgYXBwbHkgaWYgaXQgaXMgbm90IGluIHZpc2libGUgcmFuZ2UuIDxrbz5wYXJhbGxheOulvCDsoIHsmqntlaAg7JWE7J207YWc65OkLiDqsIDsi5zqsbDrpqzsl5Ag7KG07J6s7ZWY7KeAIOyViuycvOuptCDsoIHsmqnsnbQg7JWI65Cc64ukLjwva28+XG5cdCAqIEByZXR1cm4ge2VnLlBhcmFsbGF4fSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAZXhhbXBsZVxuYGBganNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uIChlKSB7XG5cdHBhcmFsbGF4LnJlc2l6ZShpdGVtcyk7XG59KTtcbmBgYFxuXHQgKi9cblx0cmVzaXplKGl0ZW1zID0gW10pIHtcblx0XHRjb25zdCByb290ID0gdGhpcy5fcm9vdDtcblx0XHRjb25zdCBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXI7XG5cdFx0Y29uc3QgcG9zaXRpb25OYW1lID0gdGhpcy5fc3R5bGUucG9zaXRpb247XG5cdFx0Y29uc3Qgc2l6ZU5hbWUgPSB0aGlzLl9zdHlsZS5jYW1tZWxTaXplO1xuXG5cdFx0aWYgKCFjb250YWluZXIgfHwgcm9vdCA9PT0gY29udGFpbmVyKSB7XG5cdFx0XHR0aGlzLl9jb250YWluZXJQb3NpdGlvbiA9IDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHJvb3RSZWN0ID0gKGlzV2luZG93KHJvb3QpID8gZG9jdW1lbnQuYm9keSA6IHJvb3QpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0Y29uc3QgY29udGFpbmVydFJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdHRoaXMuX2NvbnRhaW5lclBvc2l0aW9uID0gY29udGFpbmVydFJlY3RbcG9zaXRpb25OYW1lXSAtIHJvb3RSZWN0W3Bvc2l0aW9uTmFtZV07XG5cdFx0fVxuXHRcdHRoaXMuX3Jvb3RTaXplID0gaXNXaW5kb3cocm9vdCkgPyB3aW5kb3dbYGlubmVyJHtzaXplTmFtZX1gXSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbYGNsaWVudCR7c2l6ZU5hbWV9YF0gOiByb290W2BjbGllbnQke3NpemVOYW1lfWBdO1xuXHRcdGlmIChpc01vYmlsZSAmIGlzV2luZG93KHJvb3QpKSB7XG5cdFx0XHRjb25zdCBib2R5V2lkdGggPSBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aDtcblx0XHRcdGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cblx0XHRcdHRoaXMuX3Jvb3RTaXplID0gdGhpcy5fcm9vdFNpemUgLyAoYm9keVdpZHRoIC8gd2luZG93V2lkdGgpO1xuXHRcdH1cblx0XHRpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0dGhpcy5fY2hlY2tQYXJhbGxheEl0ZW0oaXRlbS5lbCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKipcblx0ICogU2Nyb2xscyB0aGUgaW1hZ2UgaW4gdGhlIGl0ZW0gYnkgYSBwYXJhbGxheC5cblx0ICogQGtvIOyKpO2BrOuhpO2VmOuptCDslYTsnbTthZzslYjsnZgg7J2066+47KeA66W8IOyLnOywqOyggeyaqeyLnO2CqOuLpC5cblx0ICogQG1ldGhvZCBlZy5QYXJhbGxheCNyZXNpemVcblx0ICogQHBhcmFtIHtBcnJheX0gW2l0ZW1zID0gW11dIEl0ZW1zIHRvIGFwcGx5IHBhcmFsbGF4LiBJdCBkb2VzIG5vdCBhcHBseSBpZiBpdCBpcyBub3QgaW4gdmlzaWJsZSByYW5nZS4gPGtvPnBhcmFsbGF466W8IOyggeyaqe2VoCDslYTsnbTthZzrk6QuIOqwgOyLnOqxsOumrOyXkCDsobTsnqztlZjsp4Ag7JWK7Jy866m0IOyggeyaqeydtCDslYjrkJzri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtzY3JvbGxQb3NpdGlvblN0YXJ0ID0gMF0gVGhlIHNjcm9sbCBwb3NpdGlvbi5cblx0ICogQHJldHVybiB7ZWcuUGFyYWxsYXh9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBleGFtcGxlXG5gYGBqc1xuZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uIChlKSB7XG5cdHBhcmFsbGF4LnJlZnJlc2goaXRlbXMsIGUuc2Nyb2xsVG9wKTtcbn0pO1xuYGBgXG5cdCAqL1xuXHRyZWZyZXNoKGl0ZW1zID0gW10sIHNjcm9sbFBvc2l0aW9uU3RhcnQgPSAwKSB7XG5cdFx0Y29uc3Qgc3R5bGVOYW1lcyA9IHRoaXMuX3N0eWxlO1xuXHRcdGNvbnN0IHBvc2l0aW9uTmFtZSA9IHN0eWxlTmFtZXMucG9zaXRpb247XG5cdFx0Y29uc3QgY29vcmRpbmF0ZU5hbWUgPSBzdHlsZU5hbWVzLmNvb3JkaW5hdGU7XG5cdFx0Y29uc3Qgc2l6ZU5hbWUgPSBzdHlsZU5hbWVzLnNpemU7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCB7c3RyZW5ndGgsIGNlbnRlciwgcmFuZ2UsIGFsaWdufSA9IG9wdGlvbnM7XG5cdFx0Y29uc3Qgcm9vdFNpemUgPSB0aGlzLl9yb290U2l6ZTtcblx0XHRjb25zdCBzY3JvbGxQb3NpdGlvbkVuZCA9IHNjcm9sbFBvc2l0aW9uU3RhcnQgKyByb290U2l6ZTtcblx0XHRjb25zdCBjb250YWluZXJQb3NpdGlvbiA9IHRoaXMuX2NvbnRhaW5lclBvc2l0aW9uO1xuXG5cdFx0aXRlbXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGlmICghaXRlbS5yZWN0IHx8ICFpdGVtLnNpemUgfHwgIWl0ZW0uZWwpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcG9zaXRpb24gPSBjb250YWluZXJQb3NpdGlvbiArIGl0ZW0ucmVjdFtwb3NpdGlvbk5hbWVdO1xuXHRcdFx0Y29uc3QgaXRlbVNpemUgPSBpdGVtLnJlY3Rbc2l6ZU5hbWVdIHx8IGl0ZW0uc2l6ZVtzaXplTmFtZV07XG5cblx0XHRcdC8vIGNoZWNrIGl0ZW0gaXMgaW4gY29udGFpbmVyLlxuXHRcdFx0aWYgKHNjcm9sbFBvc2l0aW9uU3RhcnQgPiBwb3NpdGlvbiArIGl0ZW1TaXplIHx8XG5cdFx0XHRcdHNjcm9sbFBvc2l0aW9uRW5kIDwgcG9zaXRpb24pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZWwgPSBpdGVtLmVsO1xuXG5cdFx0XHRpZiAoIWVsLl9fSU1BR0VfXykge1xuXHRcdFx0XHR0aGlzLl9jaGVja1BhcmFsbGF4SXRlbShlbCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZWwuX19JTUFHRV9fID09PSAtMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBpbWFnZUVsZW1lbnQgPSBlbC5fX0lNQUdFX187XG5cdFx0XHRjb25zdCBib3hFbGVtZW50ID0gZWwuX19CT1hfXztcblx0XHRcdGNvbnN0IGJveFNpemUgPSBib3hFbGVtZW50Ll9fU0laRV9fO1xuXHRcdFx0Y29uc3QgaW1hZ2VTaXplID0gaW1hZ2VFbGVtZW50Ll9fU0laRV9fO1xuXG5cdFx0XHQvLyBubyBwYXJhbGxheFxuXHRcdFx0aWYgKGJveFNpemUgPj0gaW1hZ2VTaXplKSB7XG5cdFx0XHRcdC8vIHJlbW92ZSB0cmFuc2Zvcm0gc3R5bGVcblx0XHRcdFx0aW1hZ2VFbGVtZW50LnN0eWxlW1RSQU5TRk9STV0gPSBcIlwiO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIGFyZWEncyBwb3NpdGlvbiBpcyBjZW50ZXIsIHJhdGlvIGlzIDAuXG5cdFx0XHQvLyBpZiBhcmVhIGlzIGhpZGRlbiBhdCB0aGUgdG9wLCByYXRpbyBpcyAxLlxuXHRcdFx0Ly8gaWYgYXJlYSBpcyBoaWRkZW4gYXQgdGhlIGJvdHRvbSwgcmF0aW8gaXMgLTEuXG5cdFx0XHRjb25zdCBpbWFnZVBvc2l0aW9uID0gcG9zaXRpb24gKyBib3hTaXplIC8gMjtcblx0XHRcdGxldCByYXRpbyA9IChzY3JvbGxQb3NpdGlvblN0YXJ0ICsgcm9vdFNpemUgLyAyIC1cblx0XHRcdFx0KHJvb3RTaXplICsgYm94U2l6ZSkgLyAyICogY2VudGVyIC0gaW1hZ2VQb3NpdGlvbikgL1xuXHRcdFx0XHQocm9vdFNpemUgKyBib3hTaXplKSAqIDIgKiBzdHJlbmd0aDtcblxuXHRcdFx0Ly8gaWYgcmF0aW8gaXMgb3V0IG9mIHRoZSByYW5nZSBvZiAtMSBhbmQgMSwgc2hvdyBlbXB0eSBzcGFjZS5cblx0XHRcdHJhdGlvID0gTWF0aC5tYXgoTWF0aC5taW4ocmF0aW8sIHJhbmdlWzFdKSwgcmFuZ2VbMF0pO1xuXG5cdFx0XHQvLyBkaXN0IGlzIHRoZSBwb3NpdGlvbiB3aGVuIHRodW1uYWlsJ3MgaW1hZ2UgaXMgY2VudGVyZWQuXG5cdFx0XHRjb25zdCBkaXN0ID0gKGJveFNpemUgLSBpbWFnZVNpemUpIC8gMjtcblx0XHRcdGxldCB0cmFuc2xhdGUgPSBkaXN0ICogKDEgLSByYXRpbyk7XG5cblx0XHRcdGlmIChhbGlnbiA9PT0gQ0VOVEVSKSB7XG5cdFx0XHRcdHRyYW5zbGF0ZSAtPSBkaXN0O1xuXHRcdFx0fVxuXG5cdFx0XHRpbWFnZUVsZW1lbnQuX19UUkFOU0xBVEVfXyA9IHRyYW5zbGF0ZTtcblx0XHRcdGltYWdlRWxlbWVudC5fX1JBVElPX18gPSByYXRpbztcblx0XHRcdGltYWdlRWxlbWVudC5zdHlsZVtUUkFOU0ZPUk1dID0gYHRyYW5zbGF0ZSR7Y29vcmRpbmF0ZU5hbWV9KCR7dHJhbnNsYXRlfXB4KWA7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJhbGxheDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9QYXJhbGxheC5qcyIsImltcG9ydCB7d2luZG93LCBkb2N1bWVudH0gZnJvbSBcIi4vYnJvd3NlclwiO1xuaW1wb3J0IHtcblx0U1VQUE9SVF9DT01QVVRFRFNUWUxFLFxuXHRTVVBQT1JUX0FEREVWRU5UTElTVEVORVIsXG5cdFNVUFBPUlRfUEFTU0lWRSxcblx0VkVSVElDQUwsXG5cdEhPUklaT05UQUwsXG5cdERFRkFVTFRfT1BUSU9OUyxcbn0gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KG5vZGVzKSB7XG5cdC8vIFNDUklQVDUwMTQgaW4gSUU4XG5cdGNvbnN0IGFycmF5ID0gW107XG5cblx0aWYgKG5vZGVzKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDAsIGxlbiA9IG5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRhcnJheS5wdXNoKG5vZGVzW2ldKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGFycmF5O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbGwobGVuZ3RoLCB2YWx1ZSkge1xuXHRjb25zdCBhcnJheSA9IHR5cGVvZiBsZW5ndGggPT09IFwib2JqZWN0XCIgPyBsZW5ndGggOiBuZXcgQXJyYXkobGVuZ3RoKTtcblx0Y29uc3QgbGVuID0gYXJyYXkubGVuZ3RoO1xuXG5cdGZvciAobGV0IGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuXHRcdGFycmF5W2ldID0gdmFsdWU7XG5cdH1cblx0cmV0dXJuIGFycmF5O1xufVxuLyoqXG4gKiBTZWxlY3Qgb3IgY3JlYXRlIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fGpRdWVyeX0gcGFyYW1cbiAqICB3aGVuIHN0cmluZyBnaXZlbiBpcyBhcyBIVE1MIHRhZywgdGhlbiBjcmVhdGUgZWxlbWVudFxuICogIG90aGVyd2lzZSBpdCByZXR1cm5zIHNlbGVjdGVkIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG11bHRpXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkKHBhcmFtLCBtdWx0aSA9IGZhbHNlKSB7XG5cdGxldCBlbDtcblxuXHRpZiAodHlwZW9mIHBhcmFtID09PSBcInN0cmluZ1wiKSB7IC8vIFN0cmluZyAoSFRNTCwgU2VsZWN0b3IpXG5cdFx0Ly8gY2hlY2sgaWYgc3RyaW5nIGlzIEhUTUwgdGFnIGZvcm1hdFxuXHRcdGNvbnN0IG1hdGNoID0gcGFyYW0ubWF0Y2goL148KFtBLXpdKylcXHMqKFtePl0qKT4vKTtcblxuXHRcdC8vIGNyZWF0aW5nIGVsZW1lbnRcblx0XHRpZiAobWF0Y2gpIHsgLy8gSFRNTFxuXHRcdFx0Y29uc3QgZHVtbXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdFx0XHRkdW1teS5pbm5lckhUTUwgPSBwYXJhbTtcblx0XHRcdGVsID0gZHVtbXkuY2hpbGROb2Rlcztcblx0XHR9IGVsc2UgeyAvLyBTZWxlY3RvclxuXHRcdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtKTtcblx0XHR9XG5cdFx0aWYgKG11bHRpKSB7XG5cdFx0XHRlbCA9IHRvQXJyYXkoZWwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbCA9IChlbCAmJiBlbC5sZW5ndGggPiAwICYmIGVsWzBdKSB8fCB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHBhcmFtID09PSB3aW5kb3cpIHsgLy8gd2luZG93XG5cdFx0ZWwgPSBwYXJhbTtcblx0fSBlbHNlIGlmIChwYXJhbS5ub2RlTmFtZSAmJlxuXHRcdChwYXJhbS5ub2RlVHlwZSA9PT0gMSB8fCBwYXJhbS5ub2RlVHlwZSA9PT0gOSkpIHsgLy8gSFRNTEVsZW1lbnQsIERvY3VtZW50XG5cdFx0ZWwgPSBwYXJhbTtcblx0fSBlbHNlIGlmICgoXCJqUXVlcnlcIiBpbiB3aW5kb3cgJiYgcGFyYW0gaW5zdGFuY2VvZiB3aW5kb3cualF1ZXJ5KSB8fFxuXHRcdHBhcmFtLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5qcXVlcnkpIHsgLy8galF1ZXJ5XG5cdFx0ZWwgPSBtdWx0aSA/IHBhcmFtLnRvQXJyYXkoKSA6IHBhcmFtLmdldCgwKTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHBhcmFtKSkge1xuXHRcdGVsID0gcGFyYW0ubWFwKHYgPT4gJCh2KSk7XG5cdFx0aWYgKCFtdWx0aSkge1xuXHRcdFx0ZWwgPSBlbC5sZW5ndGggPj0gMSA/IGVsWzBdIDogdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZWw7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnQoZWxlbWVudCwgdHlwZSwgaGFuZGxlciwgZXZlbnRMaXN0ZW5lck9wdGlvbnMpIHtcblx0aWYgKFNVUFBPUlRfQURERVZFTlRMSVNURU5FUikge1xuXHRcdGxldCBvcHRpb25zID0gZXZlbnRMaXN0ZW5lck9wdGlvbnMgfHwgZmFsc2U7XG5cblx0XHRpZiAodHlwZW9mIGV2ZW50TGlzdGVuZXJPcHRpb25zID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRvcHRpb25zID0gU1VQUE9SVF9QQVNTSVZFID8gZXZlbnRMaXN0ZW5lck9wdGlvbnMgOiBmYWxzZTtcblx0XHR9XG5cdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuXHR9IGVsc2UgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcblx0XHRlbGVtZW50LmF0dGFjaEV2ZW50KGBvbiR7dHlwZX1gLCBoYW5kbGVyKTtcblx0fSBlbHNlIHtcblx0XHRlbGVtZW50W2BvbiR7dHlwZX1gXSA9IGhhbmRsZXI7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudChlbGVtZW50LCB0eXBlLCBoYW5kbGVyKSB7XG5cdGlmIChlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcblx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuXHR9IGVsc2UgaWYgKGVsZW1lbnQuZGV0YWNoRXZlbnQpIHtcblx0XHRlbGVtZW50LmRldGFjaEV2ZW50KGBvbiR7dHlwZX1gLCBoYW5kbGVyKTtcblx0fSBlbHNlIHtcblx0XHRlbGVtZW50W2BvbiR7dHlwZX1gXSA9IG51bGw7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGwoZWwsIGlzVmVydGljYWwpIHtcblx0Y29uc3QgcHJvcCA9IGBzY3JvbGwke2lzVmVydGljYWwgPyBcIlRvcFwiIDogXCJMZWZ0XCJ9YDtcblxuXHRpZiAoZWwgPT09IHdpbmRvdykge1xuXHRcdHJldHVybiBkb2N1bWVudC5ib2R5W3Byb3BdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtwcm9wXTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZWxbcHJvcF07XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxUbyhlbCwgeCwgeSkge1xuXHRpZiAoZWwgPT09IHdpbmRvdykge1xuXHRcdGVsLnNjcm9sbCh4LCB5KTtcblx0fSBlbHNlIHtcblx0XHRlbC5zY3JvbGxMZWZ0ID0geDtcblx0XHRlbC5zY3JvbGxUb3AgPSB5O1xuXHR9XG59XG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsQnkoZWwsIHgsIHkpIHtcblx0aWYgKGVsID09PSB3aW5kb3cpIHtcblx0XHRlbC5zY3JvbGxCeSh4LCB5KTtcblx0fSBlbHNlIHtcblx0XHRlbC5zY3JvbGxMZWZ0ICs9IHg7XG5cdFx0ZWwuc2Nyb2xsVG9wICs9IHk7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZXMoZWwpIHtcblx0cmV0dXJuIFNVUFBPUlRfQ09NUFVURURTVFlMRSA/XG5cdFx0d2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpIDogZWwuY3VycmVudFN0eWxlO1xufVxuZnVuY3Rpb24gX2dldFNpemUoZWwsIG5hbWUpIHtcblx0aWYgKGVsID09PSB3aW5kb3cpIHsgLy8gV0lORE9XXG5cdFx0cmV0dXJuIGVsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtgY2xpZW50JHtuYW1lfWBdO1xuXHR9IGVsc2UgaWYgKGVsLm5vZGVUeXBlID09PSA5KSB7IC8vIERPQ1VNRU5UX05PREVcblx0XHRjb25zdCBkb2MgPSBlbC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHRyZXR1cm4gTWF0aC5tYXgoXG5cdFx0XHRlbC5ib2R5W2BzY3JvbGwke25hbWV9YF0sIGRvY1tgc2Nyb2xsJHtuYW1lfWBdLFxuXHRcdFx0ZWwuYm9keVtgb2Zmc2V0JHtuYW1lfWBdLCBkb2NbYG9mZnNldCR7bmFtZX1gXSxcblx0XHRcdGRvY1tgY2xpZW50JHtuYW1lfWBdXG5cdFx0KTtcblx0fSBlbHNlIHsgLy8gTk9ERVxuXHRcdGNvbnN0IHN0eWxlID0gZ2V0U3R5bGVzKGVsKTtcblx0XHRjb25zdCB2YWx1ZSA9IHN0eWxlW25hbWUudG9Mb3dlckNhc2UoKV07XG5cblx0XHRyZXR1cm4gcGFyc2VGbG9hdCgvYXV0b3wlLy50ZXN0KHZhbHVlKSA/IGVsW2BvZmZzZXQke25hbWV9YF0gOiBzdHlsZVtuYW1lLnRvTG93ZXJDYXNlKCldKTtcblx0fVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlubmVyV2lkdGgoZWwpIHtcblx0cmV0dXJuIF9nZXRTaXplKGVsLCBcIldpZHRoXCIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlubmVySGVpZ2h0KGVsKSB7XG5cdHJldHVybiBfZ2V0U2l6ZShlbCwgXCJIZWlnaHRcIik7XG59XG5cbmV4cG9ydCBjb25zdCBTVFlMRSA9IHtcblx0dmVydGljYWw6IHtcblx0XHRwb3MxOiBcInRvcFwiLFxuXHRcdGVuZFBvczE6IFwiYm90dG9tXCIsXG5cdFx0c2l6ZTE6IFwiaGVpZ2h0XCIsXG5cdFx0cG9zMjogXCJsZWZ0XCIsXG5cdFx0ZW5kUG9zMjogXCJyaWdodFwiLFxuXHRcdHNpemUyOiBcIndpZHRoXCIsXG5cdH0sXG5cdGhvcml6b250YWw6IHtcblx0XHRwb3MxOiBcImxlZnRcIixcblx0XHRlbmRQb3MxOiBcInJpZ2h0XCIsXG5cdFx0c2l6ZTE6IFwid2lkdGhcIixcblx0XHRwb3MyOiBcInRvcFwiLFxuXHRcdGVuZFBvczI6IFwiYm90dG9tXCIsXG5cdFx0c2l6ZTI6IFwiaGVpZ2h0XCIsXG5cdH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVOYW1lcyhpc0hvcml6b250YWwpIHtcblx0cmV0dXJuIFNUWUxFW2lzSG9yaXpvbnRhbCA/IEhPUklaT05UQUwgOiBWRVJUSUNBTF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25PcHRpb25zKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKSB7XG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LFxuXHRcdERFRkFVTFRfT1BUSU9OUyxcblx0XHRkZWZhdWx0T3B0aW9ucyxcblx0XHRvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvWmVyb0FycmF5KG91dGxpbmUpIHtcblx0aWYgKCFvdXRsaW5lIHx8ICFvdXRsaW5lLmxlbmd0aCkge1xuXHRcdHJldHVybiBbMF07XG5cdH1cblx0cmV0dXJuIG91dGxpbmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1dpbmRvdyhlbCkge1xuXHRyZXR1cm4gZWwgPT09IHdpbmRvdztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGV4T2YoYXJyLCB0YXJnZXQsIGlzUmlnaHQgPSBmYWxzZSkge1xuXHRpZiAoIWlzUmlnaHQpIHtcblx0XHRyZXR1cm4gYXJyLmluZGV4T2YodGFyZ2V0KTtcblx0fVxuXHRjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG5cdGZvciAobGV0IGkgPSBsZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuXHRcdGlmIChhcnJbaV0gIT09IHRhcmdldCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdHJldHVybiBpO1xuXHR9XG5cdHJldHVybiAtMTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy5qcyJdLCJzb3VyY2VSb290IjoiIn0=