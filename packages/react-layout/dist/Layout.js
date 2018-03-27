"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _infinitegrid = require("@egjs/infinitegrid");

var _consts = require("@egjs/infinitegrid/src/consts");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

var _consts2 = require("./consts");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = function (_Component) {
	_inherits(Layout, _Component);

	function Layout(props) {
		_classCallCheck(this, Layout);

		var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

		var _this$props = _this.props,
		    margin = _this$props.margin,
		    size = _this$props.size,
		    type = _this$props.type,
		    children = _this$props.children;


		_this.state = {
			datas: {},
			items: [],
			outline: _this.props.outline,
			size: parseFloat(size),
			render: _consts2.NOT_RENDER,
			outlines: {
				start: [],
				end: []
			}
		};
		var options = {};
		var layoutProps = _this.constructor.layoutProps;

		for (var name in layoutProps) {
			if (name in props) {
				options[name] = props[name];
			}
		}
		_this._layout = new type(_extends({}, options, {
			horizontal: _this.props.horizontal
		}));
		_this._updateLayout();
		return _this;
	}

	_createClass(Layout, [{
		key: "getItems",
		value: function getItems() {
			return this.state.items;
		}
	}, {
		key: "_render",
		value: function _render(item) {
			var element = item.state.el;

			if (!element) {
				return;
			}
			var rect = item.state.rect || { left: DUMMY_POSITION, top: DUMMY_POSITION };
			var style = ["position:absolute;"];
			var size = this.state.size;
			var _props = this.props,
			    horizontal = _props.horizontal,
			    percentage = _props.percentage;


			["left", "top", "width", "height"].forEach(function (p) {
				if (!(p in rect)) {
					return;
				}
				if (percentage && (horizontal && p === "top" || !horizontal && p === "left")) {
					style.push(p + ":" + rect[p] / size * 100 + "%;");
				} else {
					style.push(p + ":" + rect[p] + "px;");
				}
			});
			var cssText = style.join("");

			item.state.cssText = cssText;
			element.style.cssText += cssText;
		}
	}, {
		key: "_resetSize",
		value: function _resetSize() {
			var items = this.state.items;

			items.forEach(function (item) {
				item.resetSize();
			});
		}
	}, {
		key: "_updateLayout",
		value: function _updateLayout() {
			var options = this._layout.options;
			var props = this.props;

			this._layout.setSize(this.state.size);
			for (var name in options) {
				if (name in props) {
					options[name] = props[name];
				}
			}
		}
	}, {
		key: "_newItem",
		value: function _newItem(element) {
			var id = new Date().getTime() + Math.floor(Math.random() * 1000);

			element[_consts2.LAYOUT_ID] = id;

			var item = new _Item2.default(element);

			this._render(item);
			this.state.render = _consts2.NOT_RENDER;
			return item;
		}
	}, {
		key: "_searchItem",
		value: function _searchItem(element) {
			var datas = this.state.datas;
			var id = element[_consts2.LAYOUT_ID];

			if (id && id in datas) {
				return datas[id];
			}
			return this._newItem(element);
		}
	}, {
		key: "_updateItems",
		value: function _updateItems() {
			var _this2 = this;

			var ids = this.state.items.map(function (item) {
				return item.state.id;
			});

			this.state.items = [];

			var datas = {};
			var items = this.state.items;
			var elements = Array.prototype.slice.call(this._container.children, 0);

			elements.forEach(function (element) {
				var item = _this2._searchItem(element);

				item.update();
				items.push(item);
				datas[item.state.id] = item;
			});
			if (!ids.every(function (id, index) {
				return id === items[index].state.id;
			})) {
				this.state.render = _consts2.NOT_RENDER;
			}
			this.state.datas = datas;
		}
	}, {
		key: "layout",
		value: function layout(outline) {
			var _this3 = this;

			this._updateLayout();
			var items = this.state.items;

			if (!items.length) {
				return;
			}
			var group = {
				items: items.map(function (item) {
					return item.state;
				}),
				outlines: this.state.outlines
			};
			if (outline) {
				this.state.outline = outline.slice();
			}
			this._layout.layout([group], outline || this.state.outline);
			this.state.items.forEach(function (item, index) {
				_this3._render(item);
			});

			var max = Math.max.apply(Math, _toConsumableArray(group.outlines.end));
			this._container.style.height = max + "px";
			this.props.onLayoutComplete && this.props.onLayoutComplete({
				target: items,
				size: max - Math.min.apply(Math, _toConsumableArray(group.outlines.start))
			});
			this.state.render = _consts2.RENDERED;
		}
	}, {
		key: "_loadImage",
		value: function _loadImage() {
			var _this4 = this;

			var items = this.state.items.filter(function (item) {
				var loaded = item.state.loaded !== _consts2.NOT_LOADED;

				return !loaded;
			});
			if (!items.length) {
				this.setState({ render: _consts2.REQUEST_RENDER });
				return;
			}
			var elements = items.map(function (item) {
				return item.state.el;
			});

			items.forEach(function (item) {
				return item.state.loaded = _consts2.LOADING;
			});
			_infinitegrid.ImageLoaded.check(elements, {
				type: this.props.isEqualSize && this.state.items[0].state.size.width ? _consts.CHECK_ONLY_ERROR : _consts.CHECK_ALL,
				complete: function complete() {
					var size = void 0;
					items.forEach(function (item) {
						item.state.loaded = _consts2.LOADED;
						item.updateSize(size);
						if (_this4.props.isEqualSize && !size) {
							size = _extends({}, _this4.state.items[0].state.size);
						}
					});
					_this4.setState({ render: _consts2.REQUEST_RENDER });
				}
			});
		}
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(props, state) {
			var _this5 = this;

			var size = parseFloat(props.size);

			if (this.props.outline.length !== props.outline.length || !this.props.outline.every(function (v, index) {
				return v === props.outline[index];
			})) {
				this.state.render = _consts2.REQUEST_RENDER;
				this.state.outline = props.outline;
			}
			if (size !== 0 && this.state.size !== size && size !== state.size) {
				clearTimeout(this._timer);
				this._timer = setTimeout(function () {
					_this5.setState({ size: size, render: _consts2.NOT_RENDER });
				}, 100);
				return false;
			} else if (this.state.size !== state.size) {
				this._resetSize();
			}
			return true;
		}
	}, {
		key: "render",
		value: function render() {
			var attributes = {};
			var layout = this._layout;
			var props = this.props;
			var Tag = props.tag;

			for (var name in props) {
				if (name in Layout.propTypes || name in layout.options) {
					continue;
				}
				attributes[name] = props[name];
			}
			return _react2.default.createElement(
				Tag,
				attributes,
				this.props.children
			);
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps) {
			if (this.state.render === _consts2.REQUEST_RENDER) {
				this.layout();
			} else {
				this._updateItems();
				this._loadImage();
			}
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this6 = this;

			this._container = _reactDom2.default.findDOMNode(this);

			if (this.props.size === 0) {
				this.state.size = this._container.clientWidth;

				window.addEventListener("resize", function () {
					clearTimeout(_this6._timer);
					_this6._timer = setTimeout(function () {
						var size = _this6._container.clientWidth;

						_this6.setState({ size: size, render: _consts2.NOT_RENDER });
					}, 100);
				});
			}
			this._updateItems();
			this._loadImage();
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			var datas = this.state.datas;

			for (var item in datas) {
				item.state.el = null;
			}
		}
	}]);

	return Layout;
}(_react.Component);

Layout.propTypes = {
	tag: _propTypes2.default.string,
	type: _propTypes2.default.func,
	size: _propTypes2.default.number,
	outline: _propTypes2.default.array,
	options: _propTypes2.default.object,
	horizontal: _propTypes2.default.bool,
	isEqualSize: _propTypes2.default.bool,
	onLayoutComplete: _propTypes2.default.func,
	percentage: _propTypes2.default.bool
};
Layout.defaultProps = {
	tag: "div",
	type: _infinitegrid.GridLayout,
	options: {},
	margin: 0,
	size: 0,
	horizontal: false,
	outline: [],
	isEqualSize: false,
	percentage: false
};
Layout.layoutProps = {};
exports.default = Layout;
module.exports = exports["default"];