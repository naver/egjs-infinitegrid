function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { APPEND, PREPEND, DUMMY_POSITION, MULTI, GROUPKEY_ATT, CONTAINER_CLASSNAME, TRANSITION_NAME, TRANSITION, TRANSITION_END, TRANSFORM } from "./consts";
import { window, document } from "./browser";
import { $, innerHeight, innerWidth, getSize, getStyles, addOnceEvent } from "./utils";

function createContainer(element) {
  var container = document.createElement("div");
  container.className = CONTAINER_CLASSNAME;
  container.style.position = "relative";
  container.style.height = "100%";
  var children = element.children;
  var length = children.length; // for IE8

  for (var i = 0; i < length; i++) {
    container.appendChild(children[0]);
  }

  element.appendChild(container);
  return container;
}

function render(properties, rect, styles) {
  properties.forEach(function (p) {
    p in rect && (styles[p] = rect[p] + "px");
  });
}

function setTransition(styles, transitionDuration, pos1, pos2) {
  styles[TRANSITION + "-property"] = transitionDuration ? TRANSFORM + ",width,height" : "";
  styles[TRANSITION + "-duration"] = transitionDuration ? transitionDuration + "s" : "";
  styles[TRANSITION + "-delay"] = transitionDuration ? "0s" : "";
  styles[TRANSFORM] = transitionDuration ? "translate(" + (pos1.left - pos2.left) + "px," + (pos1.top - pos2.top) + "px)" : "";
}

var DOMRenderer =
/*#__PURE__*/
function () {
  DOMRenderer.renderItem = function renderItem(item, rect, transitionDuration) {
    if (!item.el) {
      return;
    }

    var el = item.el,
        prevRect = item.prevRect;
    var styles = el.style; // for debugging

    el.setAttribute(GROUPKEY_ATT, item.groupKey);
    styles.position = "absolute";
    render(["width", "height"], rect, styles);

    if (transitionDuration && TRANSITION && prevRect) {
      setTransition(styles, transitionDuration, rect, prevRect);

      if (el[TRANSITION_NAME]) {
        return;
      }

      el[TRANSITION_NAME] = true;
      addOnceEvent(el, TRANSITION_END, function () {
        var itemRect = item.rect;
        setTransition(styles);
        render(["left", "top"], itemRect, styles);
        item.prevRect = itemRect;
        el[TRANSITION_NAME] = false;
      });
    } else {
      render(["left", "top"], rect, styles);
      item.prevRect = rect;
    }
  };

  DOMRenderer.renderItems = function renderItems(items, transitionDuration) {
    items.forEach(function (item) {
      DOMRenderer.renderItem(item, item.rect, transitionDuration);
    });
  };

  DOMRenderer.removeItems = function removeItems(items) {
    items.forEach(function (item) {
      if (item.el) {
        DOMRenderer.removeElement(item.el);
        item.el = null;
      }
    });
  };

  DOMRenderer.removeElement = function removeElement(element) {
    var parentNode = element && element.parentNode;

    if (!parentNode) {
      return;
    }

    parentNode.removeChild(element);
  };

  DOMRenderer.createElements = function createElements(items) {
    if (!items.length) {
      return;
    }

    var noElementItems = items.filter(function (item) {
      return !item.el;
    });

    if (!noElementItems.length) {
      return;
    }

    var elements = $(noElementItems.map(function (_ref) {
      var content = _ref.content;
      return content.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
    }).join(""), MULTI);
    noElementItems.forEach(function (item, index) {
      item.el = elements[index];
    });
  };

  function DOMRenderer(element, options) {
    _extends(this.options = {
      isEqualSize: false,
      isConstantSize: false,
      horizontal: false,
      container: false
    }, options);

    this._size = {
      container: -1,
      view: -1,
      viewport: -1,
      item: null
    };

    this._init(element);

    this.resize();
  }

  var _proto = DOMRenderer.prototype;

  _proto.getStatus = function getStatus() {
    return {
      cssText: this.container.style.cssText,
      _size: _extends({}, this._size)
    };
  };

  _proto.setStatus = function setStatus(status) {
    this.container.style.cssText = status.cssText;

    _extends(this._size, status._size);
  };

  _proto.updateSize = function updateSize(items) {
    var _this$options = this.options,
        isEqualSize = _this$options.isEqualSize,
        isConstantSize = _this$options.isConstantSize;
    var size = this._size;
    return items.map(function (item) {
      if (!item.el) {
        return item;
      }

      if (isEqualSize && !size.item) {
        size.item = getSize(item.el);
      }

      item.size = isEqualSize && _extends(size.item) || isConstantSize && item.orgSize && _extends(item.orgSize) || getSize(item.el);

      if (!item.orgSize) {
        item.orgSize = _extends({}, item.size);
      }

      return item;
    });
  };

  _proto._init = function _init(el) {
    var element = $(el);
    var style = getStyles(element);
    var _this$options2 = this.options,
        container = _this$options2.container,
        horizontal = _this$options2.horizontal;
    this._orgStyle = {};

    if (style.position === "static") {
      this._orgStyle.position = element.style.position;
      element.style.position = "relative";
    }

    if (container) {
      var target = horizontal ? ["X", "Y"] : ["Y", "X"];
      this._orgStyle.overflowX = element.style.overflowX;
      this._orgStyle.overflowY = element.style.overflowY;
      element.style["overflow" + target[0]] = "scroll";
      element.style["overflow" + target[1]] = "hidden";
      this.view = element;
      this.container = container === true ? createContainer(this.view) : container;
    } else {
      this.view = window;
      this.container = element;
    }
  };

  _proto.append = function append(items) {
    this._insert(items, APPEND, {
      top: DUMMY_POSITION,
      left: DUMMY_POSITION
    });
  };

  _proto.prepend = function prepend(items) {
    this._insert(items, PREPEND, {
      top: DUMMY_POSITION,
      left: DUMMY_POSITION
    });
  };

  _proto.createAndInsert = function createAndInsert(items, isAppend) {
    DOMRenderer.createElements(items);
    DOMRenderer.renderItems(items);

    this._insert(items, isAppend);
  };

  _proto._insert = function _insert(items, isAppend, styles) {
    var container = this.container;
    var df = document.createDocumentFragment();
    items.forEach(function (item) {
      styles && DOMRenderer.renderItem(item, styles);
      isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
    });
    isAppend ? container.appendChild(df) : container.insertBefore(df, container.firstChild);
  };

  _proto._calcSize = function _calcSize() {
    return this.options.horizontal ? innerHeight(this.container) : innerWidth(this.container);
  };

  _proto.getViewSize = function getViewSize() {
    return this._size.view;
  };

  _proto.getViewportSize = function getViewportSize() {
    return this._size.viewport;
  };

  _proto.setContainerSize = function setContainerSize(size) {
    this.container.style[this.options.horizontal ? "width" : "height"] = size + "px";
  };

  _proto.resize = function resize() {
    var horizontal = this.options.horizontal;
    var view = this.view;
    var isResize = this.isNeededResize();

    if (isResize) {
      this._size = {
        viewport: this._calcSize(),
        item: null
      };
    }

    this._size.view = horizontal ? innerWidth(view) : innerHeight(view);
    return isResize;
  };

  _proto.isNeededResize = function isNeededResize() {
    return this._calcSize() !== this._size.viewport;
  };

  _proto.clear = function clear() {
    this.container.innerHTML = "";
    this.container.style[this.options.horizontal ? "width" : "height"] = "";
    this._size = {
      item: null,
      viewport: -1,
      container: -1,
      view: -1
    };
  };

  _proto.destroy = function destroy() {
    this.clear();
    var container = this.options.container;

    for (var p in this._orgStyle) {
      this[container ? "view" : "container"].style[p] = this._orgStyle[p];
    }

    container && this.container.parentNode.removeChild(this.container);
  };

  return DOMRenderer;
}();

export { DOMRenderer as default };