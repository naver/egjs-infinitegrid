function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import AutoSizer from "./AutoSizer";
import ImageLoaded, { CHECK_ALL, CHECK_ONLY_ERROR } from "./ImageLoaded";
import ItemManager from "./ItemManager";
import { matchHTML, $ } from "./utils";
import { DUMMY_POSITION } from "./consts";
import DOMRenderer from "./DOMRenderer";

function hasTarget(target, value) {
  return ~target.indexOf(value);
}

var LayoutMananger =
/*#__PURE__*/
function () {
  function LayoutMananger(items, renderer, options) {
    if (options === void 0) {
      options = {};
    }

    _extends(this.options = {
      attributePrefix: "data-",
      isEqualSize: false,
      isConstantSize: false,
      horizontal: false
    }, options);

    this._items = items;
    this._renderer = renderer;
    this._layout = null;
  }

  var _proto = LayoutMananger.prototype;

  _proto.setLayout = function setLayout(layout) {
    this._layout = layout;
  };

  _proto.setSize = function setSize(size) {
    this._layout.setSize(size);
  };

  _proto._complete = function _complete(groups, items, isAppend, isUpdate, callback) {
    var _this = this;

    var itemManager = this._items;
    var cursor = isAppend ? "end" : "start";
    var groupIndex = itemManager.indexOf(groups[0]);
    var prevGroup = itemManager.getData(groupIndex + (isAppend ? -1 : 1));
    var outline = prevGroup ? prevGroup.outlines[cursor] : [0];

    this._renderer.updateSize(items);

    var groupInfos = groups.map(function (group) {
      var groupOutline = group.outlines[isAppend ? "start" : "end"];
      var isRelayout = isUpdate || !outline.length || (outline.length === groupOutline.length ? !outline.every(function (v, index) {
        return v === groupOutline[index];
      }) : true);

      if (!isRelayout) {
        outline = group.outlines[isAppend ? "end" : "start"];
        DOMRenderer.renderItems(group.items);
        return group;
      }

      var groupItems = group.items;

      var groupInfo = _this._layout[isAppend ? "append" : "prepend"](groupItems, outline, true);

      _extends(group, groupInfo);

      DOMRenderer.renderItems(groupInfo.items);
      outline = groupInfo.outlines[isAppend ? "end" : "start"];
      return groupInfo;
    });
    callback({
      groups: groupInfos,
      items: items,
      isAppend: isAppend
    });
  };

  _proto._error = function _error(removeTarget, replaceTarget, target, items, errorIndex, callback) {
    var item = items[errorIndex];
    var element = item.el;
    var prefix = this.options.attributePrefix; // remove item

    var removeItem = function removeItem() {
      if (hasTarget(removeTarget, element)) {
        return;
      }

      removeTarget.push(element);
      var index = replaceTarget.indexOf(errorIndex);
      index !== -1 && replaceTarget.splice(index, 1);
    }; // remove image


    var remove = function remove() {
      if (target === element) {
        removeItem();
        return;
      }

      if (hasTarget(removeTarget, element)) {
        return;
      }

      target.parentNode.removeChild(target);
      item.content = element.outerHTML;

      if (hasTarget(replaceTarget, errorIndex)) {
        return;
      }

      replaceTarget.push(errorIndex);
    }; // replace image


    var replace = function replace(src) {
      if (hasTarget(removeTarget, element)) {
        return;
      }

      if (src) {
        if (matchHTML(src) || typeof src === "object") {
          var parentNode = target.parentNode;
          parentNode.insertBefore($(src), target);
          parentNode.removeChild(target);
          item.content = element.outerHTML;
        } else {
          target.src = src;

          if (target.getAttribute(prefix + "width")) {
            AutoSizer.remove(target);
            target.removeAttribute(prefix + "width");
            target.removeAttribute(prefix + "height");
          }
        }
      }

      item.content = element.outerHTML;

      if (hasTarget(replaceTarget, errorIndex)) {
        return;
      }

      replaceTarget.push(errorIndex);
    }; // replace item


    var replaceItem = function replaceItem(content) {
      if (hasTarget(removeTarget, element)) {
        return;
      }

      element.innerHTML = content;
      item.content = element.outerHTML;

      if (hasTarget(replaceTarget, errorIndex)) {
        return;
      }

      replaceTarget.push(errorIndex);
    };

    callback({
      target: target,
      element: element,
      items: items,
      item: item,
      itemIndex: errorIndex,
      replace: replace,
      replaceItem: replaceItem,
      remove: remove,
      removeItem: removeItem
    });
  };

  _proto._end = function _end(removeTarget, replaceTarget, items, callback) {
    var _this2 = this;

    var attributePrefix = this.options.attributePrefix;
    var removeTargetLength = removeTarget.length;
    var replaceTargetLength = replaceTarget.length;

    if (!removeTargetLength && !replaceTargetLength) {
      callback({
        remove: []
      });
      return;
    }

    var layoutedItems = replaceTarget.map(function (itemIndex) {
      return items[itemIndex];
    });

    if (!replaceTargetLength) {
      callback({
        remove: removeTarget,
        layout: true
      });
      return;
    } // wait layoutComplete beacause of error event.


    ImageLoaded.check(layoutedItems.map(function (v) {
      return v.el;
    }), {
      prefix: attributePrefix,
      complete: function complete() {
        _this2._renderer.updateSize(layoutedItems);

        callback({
          remove: removeTarget,
          layout: true
        });
      }
    });
  };

  _proto._insert = function _insert(_ref, _ref2) {
    var _this3 = this;

    var groups = _ref.groups,
        _ref$items = _ref.items,
        items = _ref$items === void 0 ? ItemManager.pluck(groups, "items") : _ref$items,
        isAppend = _ref.isAppend,
        isUpdate = _ref.isUpdate;

    var _ref2$error = _ref2.error,
        _error2 = _ref2$error === void 0 ? function () {} : _ref2$error,
        _ref2$complete = _ref2.complete,
        _complete2 = _ref2$complete === void 0 ? function () {} : _ref2$complete,
        _ref2$end = _ref2.end,
        _end2 = _ref2$end === void 0 ? function () {} : _ref2$end;

    if (!groups.length) {
      return;
    }

    var checkGroups = isAppend ? groups : groups.reverse();
    var replaceTarget = [];
    var removeTarget = [];
    var elements = items.map(function (item) {
      return item.el;
    });
    var type = this.options.isEqualSize && this._renderer._size.item ? CHECK_ONLY_ERROR : CHECK_ALL;
    var prefix = this.options.attributePrefix;
    ImageLoaded.check(elements, {
      prefix: prefix,
      type: type,
      complete: function complete() {
        if (!_this3._items) {
          return;
        }

        _this3._complete(checkGroups, items, isAppend, isUpdate, _complete2);
      },
      error: function error(_ref3) {
        var target = _ref3.target,
            itemIndex = _ref3.itemIndex;

        if (!_this3._items) {
          return;
        }

        _this3._error(removeTarget, replaceTarget, target, items, itemIndex, _error2);
      },
      end: function end() {
        if (!_this3._items) {
          return;
        }

        _this3._end(removeTarget, replaceTarget, items, _end2);
      }
    });
  };

  _proto.append = function append(_ref4, callbacks) {
    var groups = _ref4.groups,
        items = _ref4.items,
        isUpdate = _ref4.isUpdate;

    if (callbacks === void 0) {
      callbacks = {};
    }

    this._insert({
      groups: groups,
      items: items,
      isUpdate: isUpdate,
      isAppend: true
    }, callbacks);
  };

  _proto.prepend = function prepend(_ref5, callbacks) {
    var groups = _ref5.groups,
        items = _ref5.items,
        isUpdate = _ref5.isUpdate;

    if (callbacks === void 0) {
      callbacks = {};
    }

    this._insert({
      groups: groups,
      items: items,
      isUpdate: isUpdate,
      isAppend: false
    }, callbacks);
  };

  _proto.layout = function layout(isRelayout, groups, items) {
    var renderer = this._renderer;
    var _renderer$options = renderer.options,
        isEqualSize = _renderer$options.isEqualSize,
        isConstantSize = _renderer$options.isConstantSize;
    var layoutGroups = groups.filter(function (group) {
      var item = group.items[0];
      return item.orgSize && item.rect.top > DUMMY_POSITION / 10;
    });

    if (!layoutGroups.length) {
      return [];
    }

    var outline = layoutGroups[0].outlines.start;

    if (isRelayout) {
      outline = [outline.length ? Math.min.apply(Math, outline) : 0];

      if (!isConstantSize && items.length) {
        renderer.updateSize(items); // update invisible items' size

        if (isEqualSize && items[0].size) {
          ItemManager.pluck(layoutGroups, "items").forEach(function (item) {
            item.size = _extends({}, items[0].size);
          });
        }
      }
    }

    this._layout.layout(layoutGroups, outline);

    return layoutGroups;
  };

  _proto.destroy = function destroy() {
    this._items = null;
    this._renderer = null;
  };

  return LayoutMananger;
}();

export { LayoutMananger as default };