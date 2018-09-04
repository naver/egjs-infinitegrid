import { IS_IE } from "./consts";
import { addEvent, removeEvent, toArray } from "./utils";
import AutoSizer from "./AutoSizer";
export var CHECK_ALL = 1;
export var CHECK_ONLY_ERROR = 2;

function isDataAttribute(target, prefix) {
  return !!target.getAttribute(prefix + "width");
}

var ImageLoaded =
/*#__PURE__*/
function () {
  function ImageLoaded() {}

  ImageLoaded.waitImageLoaded = function waitImageLoaded(needCheck, _ref) {
    var _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === void 0 ? "" : _ref$prefix,
        length = _ref.length,
        type = _ref.type,
        complete = _ref.complete,
        error = _ref.error,
        end = _ref.end;
    var checkCount = 0;
    var endCount = length;

    if (type !== CHECK_ONLY_ERROR) {
      checkCount = endCount;
    }

    var checkEnd = function checkEnd() {
      if (--endCount !== 0) {
        return;
      }

      end && end();
    };

    var checkImage = function checkImage() {
      checkCount--;

      if (checkCount !== 0) {
        return;
      }

      complete && complete();
    };

    var onError = function onError(target, itemIndex) {
      if (itemIndex === void 0) {
        itemIndex = target.__ITEM_INDEX__;
      }

      error && error({
        target: target,
        itemIndex: itemIndex
      });
    };

    var onCheck = function onCheck(e) {
      var target = e.target || e.srcElement;
      removeEvent(target, "error", onCheck);
      removeEvent(target, "load", onCheck);

      if (type === CHECK_ALL && isDataAttribute(target, prefix)) {
        AutoSizer.remove(target, e.type === "error");
      } else {
        checkImage();
      }

      if (e.type === "error") {
        onError(target);
      }

      delete target.__ITEM_INDEX__;
      checkEnd();
    };

    needCheck.forEach(function (images, i) {
      images.forEach(function (v) {
        // workaround for IE
        if (v.complete && (!IS_IE || IS_IE && v.naturalWidth)) {
          if (!v.naturalWidth) {
            onError(v, i);
          }

          checkImage();
          checkEnd();
          return;
        }

        v.__ITEM_INDEX__ = i;

        if (type === CHECK_ALL && isDataAttribute(v, prefix)) {
          AutoSizer.add(v, prefix);
          checkImage();
        }

        addEvent(v, "load", onCheck);
        addEvent(v, "error", onCheck);
        IS_IE && v.setAttribute("src", v.getAttribute("src"));
      });
    });
  };

  ImageLoaded.checkImageLoaded = function checkImageLoaded(el) {
    if (el.tagName === "IMG") {
      return el.complete ? [] : [el];
    } else {
      return toArray(el.querySelectorAll("img"));
    }
  };

  ImageLoaded.check = function check(elements, _ref2) {
    var _this = this;

    var prefix = _ref2.prefix,
        _ref2$type = _ref2.type,
        type = _ref2$type === void 0 ? CHECK_ALL : _ref2$type,
        complete = _ref2.complete,
        error = _ref2.error,
        end = _ref2.end;
    var images = elements.map(function (element) {
      return _this.checkImageLoaded(element);
    });
    var length = images.reduce(function (sum, element) {
      return sum + element.length;
    }, 0);

    if (type === CHECK_ONLY_ERROR || length === 0) {
      // convert to async
      setTimeout(function () {
        complete && complete();

        if (length === 0) {
          end && end();
        }
      }, 0);
    }

    if (length > 0) {
      setTimeout(function () {
        _this.waitImageLoaded(images, {
          prefix: prefix,
          length: length,
          type: type,
          complete: complete,
          error: error,
          end: end
        });
      }, 0);
    }
  };

  return ImageLoaded;
}();

export default ImageLoaded;