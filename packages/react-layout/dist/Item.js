"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("@egjs/infinitegrid/src/utils");

var _consts = require("@egjs/infinitegrid/src/consts");

var _consts2 = require("./consts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = function () {
	function Item(element) {
		_classCallCheck(this, Item);

		this.state = {
			id: element[_consts2.LAYOUT_ID],
			el: element,
			orgSize: {},
			size: {},
			rect: {
				top: _consts.DUMMY_POSITION,
				left: _consts.DUMMY_POSITION
			},
			cssText: "",
			contents: element.innerHTML,
			loaded: _consts2.NOT_LOADED
		};
	}

	_createClass(Item, [{
		key: "resetSize",
		value: function resetSize() {
			this.state.size = {};
			this.state.loaded = _consts2.NOT_LOADED;
		}
	}, {
		key: "reset",
		value: function reset() {
			var el = this.state.el;

			if (el) {
				el.style.width = "";
				el.style.height = "";
			}
			this.state.orgSize = {};
			this.resetSize();
		}
	}, {
		key: "update",
		value: function update() {
			var el = this.state.el;

			if (!el || this.state.loaded === _consts2.NOT_LOADED) {
				return;
			}
			var contents = this.state.contents;

			this.state.contents = el.innerHTML;
			if (contents !== this.state.contents) {
				this.reset();
			}
		}
	}, {
		key: "updateSize",
		value: function updateSize(size) {
			var element = this.state.el;
			var state = this.state;

			state.size = size || {
				width: (0, _utils.innerWidth)(element),
				height: (0, _utils.innerHeight)(element)
			};
			if (!state.orgSize || !state.orgSize.width) {
				state.orgSize = {
					width: state.size.width,
					height: state.size.height
				};
			}
		}
	}]);

	return Item;
}();

exports.default = Item;
module.exports = exports["default"];