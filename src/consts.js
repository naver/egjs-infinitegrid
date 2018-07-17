import {window, document} from "./browser";

const ua = window.navigator.userAgent;

export const SUPPORT_COMPUTEDSTYLE = !!("getComputedStyle" in window);
export const SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document);
export const SUPPORT_PASSIVE = (() => {
	let supportsPassiveOption = false;

	try {
		if (SUPPORT_ADDEVENTLISTENER && Object.defineProperty) {
			document.addEventListener("test", null, Object.defineProperty({},
				"passive", {
					get() {
						supportsPassiveOption = true;
					},
				}));
		}
	} catch (e) {}
	return supportsPassiveOption;
})();

export const IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
export const IS_IOS = /iPhone|iPad/.test(ua);
export const IS_ANDROID2 = /Android 2\./.test(ua);
export const RETRY = 3;
export const CONTAINER_CLASSNAME = "_eg-infinitegrid-container_";
export const IGNORE_CLASSNAME = "_eg-infinitegrid-ignore_";
export const TRANSITION_NAME = "_INFINITEGRID_TRANSITION";

export const APPEND = true;
export const PREPEND = false;
export const VERTICAL = "vertical";
export const HORIZONTAL = "horizontal";
export const CACHE = true;
export const NO_CACHE = false;
export const TRUSTED = true;
export const NO_TRUSTED = false;
export const MULTI = true;
export const SINGLE = false;
export const DUMMY_POSITION = -100000;
export const GROUPKEY_ATT = "data-groupkey";

export const DEFAULT_OPTIONS = {
	horizontal: false,
	margin: 0,
};

export const agent = ua.toLowerCase();
export const isMobile = /mobi|ios|android/.test(agent);

export const ALIGN = {
	START: "start",
	CENTER: "center",
	END: "end",
	JUSTIFY: "justify",
};

export const IDLE = 0;
export const LOADING_APPEND = 1;
export const LOADING_PREPEND = 2;
export const PROCESSING = 4;


const webkit = /applewebkit\/([\d|.]*)/g.exec(agent);

export const WEBKIT_VERSION = (webkit && parseInt(webkit[1], 10)) || 0;
export const DEFENSE_BROWSER = (WEBKIT_VERSION && WEBKIT_VERSION < 537);


export const [TRANSFORM, TRANSITION, TRANSITION_END] = (function() {
	const properties = {
		transitionend: "",
		webkitTransitionEnd: "-webkit-",
		oTransitionEnd: "-o-",
		mozTransitionEnd: "-moz-",
	};

	for (const property in properties) {
		const prefix = properties[property];

		if (`on${property.toLowerCase()}` in window) {
			return [`${prefix}transform`, `${prefix}transition`, property];
		}
	}
	return [];
})();
