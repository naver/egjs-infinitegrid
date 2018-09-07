import { window } from "./browser";
import { addEvent, removeEvent, innerWidth, innerHeight } from "./utils";
var elements = [];
/* eslint-disable */

function onResize(e) {
  AutoSizer.resizeAll();
}
/* eslint-enable */


var AutoSizer =
/*#__PURE__*/
function () {
  function AutoSizer() {}

  AutoSizer.add = function add(element, prefix) {
    if (prefix === void 0) {
      prefix = "data-";
    }

    if (!element.length) {
      addEvent(window, "resize", onResize);
    }

    element.__PREFIX__ = prefix;
    elements.push(element);
    AutoSizer.resize(element);
  };

  AutoSizer.remove = function remove(element, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var fixed = element.getAttribute(element.__PREFIX__ + "fixed") || "width";

    if (!isFixed) {
      element.style[fixed === "width" ? "height" : "width"] = "";
    }

    var index = elements.indexOf(element);

    if (!~index) {
      return;
    }

    elements.splice(index, 1);

    if (!elements.length) {
      removeEvent(window, "reisze", onResize);
    }
  };

  AutoSizer.resize = function resize(element, prefix) {
    if (prefix === void 0) {
      prefix = "data-";
    }

    var elementPrefix = typeof element.__PREFIX__ === "string" ? element.__PREFIX__ : prefix;
    var dataWidth = element.getAttribute(elementPrefix + "width");
    var dataHeight = element.getAttribute(elementPrefix + "height");
    var fixed = element.getAttribute(elementPrefix + "fixed");

    if (fixed === "height") {
      var size = innerHeight(element) || dataHeight;
      element.style.width = dataWidth / dataHeight * size + "px";
    } else {
      var _size = innerWidth(element) || dataWidth;

      element.style.height = dataHeight / dataWidth * _size + "px";
    }
  };

  AutoSizer.resizeAll = function resizeAll() {
    elements.forEach(function (element) {
      return AutoSizer.resize(element);
    });
  };

  return AutoSizer;
}();

export { AutoSizer as default };