import {window, document} from "./browser";

const utils = {
	getElement(el) {
		if (typeof el === "string") {
			return document.querySelector(el);
		} else if (window.jQuery && (el instanceof jQuery) && el.length > 0) {
			// if you were using jQuery
			return el[0];
		} else {
			return el;
		}
	},
	getElements(el) {
		if (typeof el === "string") {
			return Array.from(document.querySelectorAll(el));
		} else if (window.jQuery && (el instanceof jQuery)) {
			// if you were using jQuery
			return el.toArray();
		} else {
			Array.isArray(el) ? el : [el];
		}
	},
	addEvent(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent(`on${type}`, handler);
		} else {
			element[`on${type}`] = handler;
		}
	},
	removeEvent(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent(`on${type}`, handler);
		} else {
			element[`on${type}`] = null;
		}
	},
	scrollTop() {
		return document.body.scrollTop || document.documentElement.scrollTop;
	},
	innerWidth(el) {
		// @todo check it!


		// // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
		// jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		// 	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		// 		function( defaultExtra, funcName ) {

		// 		// Margin is only for outerHeight, outerWidth
		// 		jQuery.fn[ funcName ] = function( margin, value ) {
		// 			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
		// 				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

		// 			return access( this, function( elem, type, value ) {
		// 				var doc;

		// 				if ( jQuery.isWindow( elem ) ) {

		// 					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
		// 					// isn't a whole lot we can do. See pull request at this URL for discussion:
		// 					// https://github.com/jquery/jquery/pull/764
		// 					return elem.document.documentElement[ "client" + name ];
		// 				}

		// 				// Get document width or height
		// 				if ( elem.nodeType === 9 ) {
		// 					doc = elem.documentElement;

		// 					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
		// 					// whichever is greatest
		// 					return Math.max(
		// 						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
		// 						elem.body[ "offset" + name ], doc[ "offset" + name ],
		// 						doc[ "client" + name ]
		// 					);
		// 				}

		// 				return value === undefined ?

		// 					// Get width or height on the element, requesting but not forcing parseFloat
		// 					jQuery.css( elem, type, extra ) :

		// 					// Set width or height on the element
		// 					jQuery.style( elem, type, value, extra );
		// 			}, type, chainable ? margin : undefined, chainable, null );
		// 		};
		// 	} );
		// } );

		return el.innerWidth;
	},
	innerHeight(el) {
		// @todo check it!
		return el.innerHeight;
	},
	isEmptyObject(obj) {
		let name;
		for (name in obj) {
			return false;
		}
		return true;
	}
};

class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass || class {};
	}
	with(...mixins) {
		return mixins.reduce((c, m) => m(c), this.superclass);
	}
}

const Mixin = superclass => new MixinBuilder(superclass);

export {Mixin, utils};
