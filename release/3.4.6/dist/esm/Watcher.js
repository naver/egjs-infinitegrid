function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IS_IOS } from "./consts";
import { window } from "./browser";
import { addEvent, removeEvent, scroll, scrollTo as _scrollTo, scrollBy as _scrollBy } from "./utils";

var Watcher =
/*#__PURE__*/
function () {
  function Watcher(view, options) {
    _extends(this.options = {
      container: view,
      resize: function resize() {},
      check: function check() {},
      isOverflowScroll: false,
      horizontal: false
    }, options);

    this._timer = {
      resize: null // doubleCheck: null,
      // doubleCheckCount: RETRY,

    };
    this.reset();
    this._containerOffset = 0;
    this._view = view;
    this._scrollIssue = IS_IOS;
    this._onCheck = this._onCheck.bind(this);
    this._onResize = this._onResize.bind(this);
    this.attachEvent();
    this.resize();
    this.setScrollPos();
  }

  var _proto = Watcher.prototype;

  _proto.getStatus = function getStatus() {
    return {
      _prevPos: this._prevPos,
      scrollPos: this.getOrgScrollPos()
    };
  };

  _proto.setStatus = function setStatus(status, applyScrollPos) {
    if (applyScrollPos === void 0) {
      applyScrollPos = true;
    }

    this._prevPos = status._prevPos;
    applyScrollPos && this.scrollTo(status.scrollPos);
  };

  _proto.scrollBy = function scrollBy(pos) {
    var arrPos = this.options.horizontal ? [pos, 0] : [0, pos];

    _scrollBy.apply(void 0, [this._view].concat(arrPos));

    this.setScrollPos();
  };

  _proto.scrollTo = function scrollTo(pos) {
    var arrPos = this.options.horizontal ? [pos, 0] : [0, pos];

    _scrollTo.apply(void 0, [this._view].concat(arrPos));
  };

  _proto.getScrollPos = function getScrollPos() {
    return this._prevPos;
  };

  _proto.setScrollPos = function setScrollPos(pos) {
    var rawPos = pos;

    if (typeof pos === "undefined") {
      rawPos = this.getOrgScrollPos();
    }

    this._prevPos = rawPos - this.getContainerOffset();
  };

  _proto.attachEvent = function attachEvent() {
    addEvent(this._view, "scroll", this._onCheck);
    addEvent(window, "resize", this._onResize);
  };

  _proto.getOrgScrollPos = function getOrgScrollPos() {
    return scroll(this._view, this.options.horizontal);
  };

  _proto.reset = function reset() {
    this._prevPos = null;
  };

  _proto._onCheck = function _onCheck() {
    var prevPos = this.getScrollPos();
    var orgScrollPos = this.getOrgScrollPos();
    this.setScrollPos(orgScrollPos);
    var scrollPos = this.getScrollPos();

    if (prevPos === null || this._scrollIssue && orgScrollPos === 0 || prevPos === scrollPos) {
      orgScrollPos && (this._scrollIssue = false);
      return;
    }

    this._scrollIssue = false;
    this.options.check({
      isForward: prevPos < scrollPos,
      scrollPos: scrollPos,
      orgScrollPos: orgScrollPos,
      horizontal: this.options.horizontal
    });
  };

  _proto.getContainerOffset = function getContainerOffset() {
    return this._containerOffset;
  };

  _proto._getOffset = function _getOffset() {
    var _this$options = this.options,
        container = _this$options.container,
        horizontal = _this$options.horizontal;
    var rect = container.getBoundingClientRect();
    return rect[horizontal ? "left" : "top"] + this.getOrgScrollPos();
  };

  _proto.resize = function resize() {
    this._containerOffset = this.options.isOverflowScroll ? 0 : this._getOffset();
  };

  _proto._onResize = function _onResize() {
    var _this = this;

    if (this._timer.resize) {
      clearTimeout(this._timer.resize);
    }

    this._timer.resize = setTimeout(function () {
      _this.resize();

      _this.options.resize();

      _this._timer.resize = null;

      _this.reset();
    }, 100);
  };

  _proto.detachEvent = function detachEvent() {
    removeEvent(this._view, "scroll", this._onCheck);
    removeEvent(window, "resize", this._onResize);
  };

  _proto.destroy = function destroy() {
    this.detachEvent();
    this.reset();
  };

  return Watcher;
}();

export { Watcher as default };