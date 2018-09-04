function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var BoxModel =
/*#__PURE__*/
function () {
  function BoxModel(options) {
    _extends(this, {
      originWidth: 0,
      originHeight: 0,
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      items: []
    }, options);
  }

  var _proto = BoxModel.prototype;

  _proto.scaleTo = function scaleTo(width, height) {
    var scaleX = this.width ? width / this.width : 0;
    var scaleY = this.height ? height / this.height : 0;
    this.items.forEach(function (v) {
      if (scaleX !== 0) {
        v.left *= scaleX;
        v.width *= scaleX;
      }

      if (scaleY !== 0) {
        v.top *= scaleY;
        v.height *= scaleY;
      }
    });
    this.width = width;
    this.height = height;
  };

  _proto.push = function push(item) {
    this.items.push(item);
  };

  _proto.getOriginSize = function getOriginSize() {
    return this.originWidth * this.originHeight;
  };

  _proto.getSize = function getSize() {
    return this.width * this.height;
  };

  _proto.getOriginRatio = function getOriginRatio() {
    return this.originHeight === 0 ? 0 : this.originWidth / this.originHeight;
  };

  _proto.getRatio = function getRatio() {
    return this.height === 0 ? 0 : this.width / this.height;
  };

  return BoxModel;
}();

export { BoxModel as default };