"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Layout2 = require("../Layout");

var _Layout3 = _interopRequireDefault(_Layout2);

var _infinitegrid = require("@egjs/infinitegrid");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PackingLayout = function (_Layout) {
    _inherits(PackingLayout, _Layout);

    function PackingLayout() {
        _classCallCheck(this, PackingLayout);

        return _possibleConstructorReturn(this, (PackingLayout.__proto__ || Object.getPrototypeOf(PackingLayout)).apply(this, arguments));
    }

    return PackingLayout;
}(_Layout3.default);

PackingLayout.defaultProps = _extends({}, _Layout3.default.defaultProps, {
    type: _infinitegrid.PackingLayout
});
exports.default = PackingLayout;
module.exports = exports["default"];