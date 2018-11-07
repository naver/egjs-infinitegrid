function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { MULTI, GROUPKEY_ATT, IGNORE_CLASSNAME, DUMMY_POSITION } from "./consts";
import { $, toArray, isUndefined } from "./utils";

var ItemManager =
/*#__PURE__*/
function () {
  ItemManager.from = function from(elements, selector, _ref) {
    var groupKey = _ref.groupKey,
        isAppend = _ref.isAppend;
    var filted = ItemManager.selectItems($(elements, MULTI), selector); // Item Structure

    return toArray(filted).map(function (el) {
      return {
        el: el,
        groupKey: groupKey,
        content: el.outerHTML,
        rect: {
          top: DUMMY_POSITION,
          left: DUMMY_POSITION
        }
      };
    });
  };

  ItemManager.selectItems = function selectItems(elements, selector) {
    return elements.filter(function (v) {
      var classNames = v.className.split(" ");

      if (classNames.some(function (c) {
        return c === IGNORE_CLASSNAME;
      })) {
        return false;
      } else if (!selector || selector === "*") {
        return v;
      } else {
        return classNames.some(function (c) {
          return c === selector;
        });
      }
    });
  };

  ItemManager.pluck = function pluck(data, property) {
    return data.reduce(function (acc, v) {
      return acc.concat(v[property]);
    }, []);
  };

  function ItemManager() {
    this.clear();
  }

  var _proto = ItemManager.prototype;

  _proto.getStatus = function getStatus(startKey, endKey) {
    var datas = this._data;
    var startIndex = Math.max(this.indexOf(startKey), 0);
    var endIndex = this.indexOf(endKey) + 1 || datas.length;
    return {
      _data: datas.slice(startIndex, endIndex).map(function (data) {
        var items = data.items.map(function (item) {
          var item2 = _extends({}, item);

          delete item2.el;
          return item2;
        });

        var data2 = _extends({}, data);

        data2.items = items;
        return data2;
      })
    };
  };

  _proto.setStatus = function setStatus(status) {
    var data = status._data;
    this.set(data);
  };

  _proto.size = function size() {
    return this._data.length;
  };

  _proto.fit = function fit(base, horizontal) {
    if (!this._data.length) {
      return;
    }

    var property = horizontal ? "left" : "top";

    if (base !== 0) {
      this._data = this._data.map(function (v) {
        v.items = v.items.map(function (item) {
          item.rect[property] -= base;
          return item;
        });
        v.outlines.start = v.outlines.start.map(function (start) {
          return start - base;
        });
        v.outlines.end = v.outlines.end.map(function (end) {
          return end - base;
        });
        return v;
      });
    }
  };

  _proto.pluck = function pluck(property, start, end) {
    var data = isUndefined(start) ? this._data : this._data.slice(start, (isUndefined(end) ? start : end) + 1);
    return ItemManager.pluck(data, property);
  };

  _proto.getOutline = function getOutline(index, property) {
    var data = this._data[index];
    return data ? data.outlines[property] : [];
  };

  _proto.getEdgeIndex = function getEdgeIndex(cursor, start, end) {
    var prop = cursor === "start" ? "min" : "max";
    var index = -1;
    var targetValue = cursor === "start" ? Infinity : -Infinity;

    for (var i = start; i <= end; i++) {
      var value = Math[prop].apply(Math, this.getOutline(i, cursor));

      if (cursor === "start" && targetValue > value || cursor === "end" && targetValue < value) {
        targetValue = value;
        index = i;
      }
    }

    return index;
  };

  _proto.getEdgeValue = function getEdgeValue(cursor, start, end) {
    var outlines = this.pluck("outlines", this.getEdgeIndex(cursor, start, end)).reduce(function (acc, v) {
      return acc.concat(v[cursor]);
    }, []);
    return outlines.length ? Math[cursor === "start" ? "min" : "max"].apply(Math, outlines) : 0;
  };

  _proto.clearOutlines = function clearOutlines(startCursor, endCursor) {
    if (startCursor === void 0) {
      startCursor = -1;
    }

    if (endCursor === void 0) {
      endCursor = -1;
    }

    var datas = this.get();
    datas.forEach(function (group, cursor) {
      if (startCursor <= cursor && cursor <= endCursor) {
        return;
      }

      group.items.forEach(function (item) {
        item.rect.top = DUMMY_POSITION;
        item.rect.left = DUMMY_POSITION;
      });
      group.outlines.start = [];
      group.outlines.end = [];
    });
  };

  _proto.getMaxEdgeValue = function getMaxEdgeValue() {
    var groups = this.get();
    var length = groups.length;

    for (var i = length - 1; i >= 0; --i) {
      var end = groups[i].outlines.end;

      if (end.length) {
        var pos = Math.max.apply(Math, end);
        return pos;
      }
    }

    return 0;
  };

  _proto.append = function append(layouted) {
    this._data.push(layouted);

    return layouted.items;
  };

  _proto.prepend = function prepend(layouted) {
    this._data.unshift(layouted);

    return layouted.items;
  };

  _proto.clear = function clear() {
    this._data = [];
  };

  _proto.remove = function remove(element, start, end) {
    var items = [];
    var key = element.getAttribute(GROUPKEY_ATT);
    var data = this.get(start, end).filter(function (v) {
      return String(v.groupKey) === key;
    });

    if (!data.length) {
      return items;
    }

    data = data[0];
    var len = data.items.length;
    var idx = -1;

    for (var i = 0; i < len; i++) {
      if (data.items[i].el === element) {
        idx = i;
        break;
      }
    }

    if (~idx) {
      // remove item information
      data.items.splice(idx, 1);
      this.set(data, key);
      items = data.items;
    }

    return items;
  };

  _proto.indexOf = function indexOf(data) {
    var groupKey = typeof data === "object" ? data.groupKey : data;
    var datas = this._data;
    var length = datas.length;

    for (var i = 0; i < length; ++i) {
      if (groupKey === datas[i].groupKey) {
        return i;
      }
    }

    return -1;
  };

  _proto.get = function get(start, end) {
    return isUndefined(start) ? this._data : this._data.slice(start, (isUndefined(end) ? start : end) + 1);
  };

  _proto.set = function set(data, key) {
    if (!isUndefined(key) && !Array.isArray(data)) {
      var len = this._data.length;
      var idx = -1;

      for (var i = 0; i < len; i++) {
        if (this._data[i].groupKey === key) {
          idx = i;
          break;
        }
      }

      ~idx && (this._data[idx] = data);
    } else {
      this._data = data.concat();
    }
  };

  _proto.getData = function getData(index) {
    return this._data[index];
  };

  return ItemManager;
}();

export { ItemManager as default };