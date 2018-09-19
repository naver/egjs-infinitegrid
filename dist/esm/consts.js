import { window, document } from "./browser";
var ua = window.navigator.userAgent;
export var SUPPORT_COMPUTEDSTYLE = !!("getComputedStyle" in window);
export var SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document);
export var SUPPORT_PASSIVE = function () {
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
export var IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
export var IS_IOS = /iPhone|iPad/.test(ua);
export var IS_ANDROID2 = /Android 2\./.test(ua);
export var CONTAINER_CLASSNAME = "_eg-infinitegrid-container_";
export var IGNORE_CLASSNAME = "_eg-infinitegrid-ignore_";
export var TRANSITION_NAME = "_INFINITEGRID_TRANSITION";
export var APPEND = true;
export var PREPEND = false;
export var VERTICAL = "vertical";
export var HORIZONTAL = "horizontal";
export var CACHE = true;
export var NO_CACHE = false;
export var TRUSTED = true;
export var NO_TRUSTED = false;
export var MULTI = true;
export var SINGLE = false;
export var DUMMY_POSITION = -100000;
export var GROUPKEY_ATT = "data-groupkey";
export var DEFAULT_OPTIONS = {
  horizontal: false,
  margin: 0
};
export var agent = ua.toLowerCase();
export var isMobile = /mobi|ios|android/.test(agent);
export var ALIGN = {
  START: "start",
  CENTER: "center",
  END: "end",
  JUSTIFY: "justify"
};
export var IDLE = 0;
export var LOADING_APPEND = 1;
export var LOADING_PREPEND = 2;
export var PROCESSING = 4;
var webkit = /applewebkit\/([\d|.]*)/g.exec(agent);
export var WEBKIT_VERSION = webkit && parseInt(webkit[1], 10) || 0;
export var DEFENSE_BROWSER = WEBKIT_VERSION && WEBKIT_VERSION < 537;

var _ref = function () {
  var properties = {
    transitionend: "",
    webkitTransitionEnd: "-webkit-",
    oTransitionEnd: "-o-",
    mozTransitionEnd: "-moz-"
  };

  for (var property in properties) {
    var prefix = properties[property];

    if ("on" + property.toLowerCase() in window) {
      return [prefix + "transform", prefix + "transition", property];
    }
  }

  return [];
}(),
    TRANSFORM = _ref[0],
    TRANSITION = _ref[1],
    TRANSITION_END = _ref[2];

export { TRANSFORM, TRANSITION, TRANSITION_END };