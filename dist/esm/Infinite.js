function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function isVisible(group, threshold, scrollPos, endScrollPos) {
  var items = group.items,
      outlines = group.outlines;
  var start = outlines.start;
  var end = outlines.end;

  if (start.legnth === 0 || end.length === 0 || !items.length || !items[0].el) {
    return 2;
  }

  var min = Math.min.apply(Math, start);
  var max = Math.max.apply(Math, end);

  if (endScrollPos + threshold < min) {
    return +1;
  } else if (scrollPos - threshold > max) {
    return -1;
  }

  return 0;
}

var Infinite =
/*#__PURE__*/
function () {
  function Infinite(itemManger, options) {
    this.options = _extends({
      useRecycle: true,
      threshold: 100,
      append: function append() {},
      prepend: function prepend() {},
      recycle: function recycle() {}
    }, options);
    this._items = itemManger;
    this.clear();
  }

  var _proto = Infinite.prototype;

  _proto.setSize = function setSize(size) {
    this._status.size = size;
  };

  _proto.recycle = function recycle(scrollPos, isForward) {
    if (!this.options.useRecycle) {
      return;
    }

    var _this$_status = this._status,
        startCursor = _this$_status.startCursor,
        endCursor = _this$_status.endCursor,
        size = _this$_status.size;

    if (startCursor === -1 || endCursor === -1) {
      return;
    }

    var endScrollPos = scrollPos + size;
    var _this$options = this.options,
        threshold = _this$options.threshold,
        recycle = _this$options.recycle;

    var visibles = this._items.get(startCursor, endCursor).map(function (group) {
      return isVisible(group, threshold, scrollPos, endScrollPos);
    });

    var length = visibles.length;
    var start = isForward ? 0 : visibles.lastIndexOf(0);
    var end = isForward ? visibles.indexOf(0) - 1 : visibles.length - 1;

    if (!isForward && start !== -1) {
      start += 1;
    }

    if (start < 0 || end < 0 || start > end || end - start + 1 >= length) {
      return;
    }

    start = startCursor + start;
    end = startCursor + end;
    recycle({
      start: start,
      end: end
    });

    if (isForward) {
      this.setCursor("start", end + 1);
    } else {
      this.setCursor("end", start - 1);
    }
  };

  _proto.scroll = function scroll(scrollPos) {
    var startCursor = this.getCursor("start");
    var endCursor = this.getCursor("end");
    var items = this._items;

    if (typeof scrollPos !== "number" || startCursor === -1 || endCursor === -1 || !items.size()) {
      return;
    }

    var size = this._status.size;
    var _this$options2 = this.options,
        threshold = _this$options2.threshold,
        append = _this$options2.append,
        prepend = _this$options2.prepend;
    var datas = items.get();
    var endScrollPos = scrollPos + size;
    var startEdgePos = Math.max.apply(Math, datas[startCursor].outlines.start);
    var endEdgePos = Math.min.apply(Math, datas[endCursor].outlines.end);
    var visibles = datas.map(function (group, i) {
      var _group$outlines = group.outlines,
          start = _group$outlines.start,
          end = _group$outlines.end;

      if (!start.length || !end.length) {
        return false;
      }

      var startPos = Math.min.apply(Math, start);
      var endPos = Math.max.apply(Math, end);

      if (startPos - threshold <= endScrollPos && scrollPos <= endPos + threshold) {
        return true;
      }

      return false;
    });
    var start = visibles.indexOf(true);
    var end = visibles.lastIndexOf(true);

    if (~start && start < startCursor) {
      prepend({
        cache: datas.slice(start, Math.min(startCursor, end + 1))
      });
    } else if (endCursor < end) {
      append({
        cache: datas.slice(Math.max(start, endCursor + 1), end + 1)
      });
    } else if (endScrollPos >= endEdgePos - threshold) {
      append({
        cache: datas.slice(endCursor + 1, endCursor + 2)
      });
    } else if (scrollPos <= startEdgePos + threshold) {
      prepend({
        cache: datas.slice(startCursor - 1, startCursor)
      });
    }
  };

  _proto.setCursor = function setCursor(cursor, index) {
    var status = this._status;
    var items = this._items;
    var size = items.size();

    if (!this.options.useRecycle) {
      status.startCursor = 0;

      if (items.getOutline(size - 1, "end").length) {
        status.endCursor = size - 1;
        return;
      }

      if (cursor !== "end") {
        return;
      }
    }

    if (cursor === "start") {
      status.startCursor = index;
    } else {
      status.endCursor = Math.min(size - 1, index);
    }

    status.startCursor = Math.max(0, status.startCursor);
  };

  _proto.setStatus = function setStatus(status) {
    this._status = _extends(this._status, status);
  };

  _proto.getStatus = function getStatus(startKey, endKey) {
    var _this$_status2 = this._status,
        startCursor = _this$_status2.startCursor,
        endCursor = _this$_status2.endCursor,
        size = _this$_status2.size;
    var startIndex = Math.max(this._items.indexOf(startKey), 0);
    var endIndex = (this._items.indexOf(endKey) + 1 || this._items.size()) - 1;
    var start = Math.max(startCursor - startIndex, ~startCursor ? 0 : -1);
    var end = Math.max(Math.min(endCursor - startIndex, endIndex - startIndex), start);
    return {
      startCursor: start,
      endCursor: end,
      size: size
    };
  };

  _proto.getEdgeOutline = function getEdgeOutline(cursor) {
    var _this$_status3 = this._status,
        startCursor = _this$_status3.startCursor,
        endCursor = _this$_status3.endCursor;

    if (startCursor === -1 || endCursor === -1) {
      return [];
    }

    return this._items.getOutline(cursor === "start" ? startCursor : endCursor, cursor);
  };

  _proto.getEdgeValue = function getEdgeValue(cursor) {
    var outlines = this.getEdgeOutline(cursor);
    return outlines.length ? Math[cursor === "start" ? "min" : "max"].apply(Math, outlines) : 0;
  };

  _proto.getVisibleItems = function getVisibleItems() {
    return this._items.pluck("items", this._status.startCursor, this._status.endCursor);
  };

  _proto.getCursor = function getCursor(cursor) {
    return this._status[cursor === "start" ? "startCursor" : "endCursor"];
  };

  _proto.getVisibleData = function getVisibleData() {
    return this._items.get(this._status.startCursor, this._status.endCursor);
  };

  _proto.remove = function remove(element) {
    return this._items.remove(element, this._status.startCursor, this._status.endCursor);
  };

  _proto.clear = function clear() {
    this._status = {
      startCursor: -1,
      endCursor: -1,
      size: -1
    };
  };

  return Infinite;
}();

export default Infinite;