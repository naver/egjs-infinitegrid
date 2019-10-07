import { window, document } from "./browser";
import { IAlign } from "./types";

const ua = window.navigator.userAgent;

export const SUPPORT_COMPUTEDSTYLE = !!("getComputedStyle" in window);
export const SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document);
export const SUPPORT_PASSIVE = (() => {
	let supportsPassiveOption = false;

	try {
		if (SUPPORT_ADDEVENTLISTENER && Object.defineProperty) {
			// tslint:disable-next-line: no-empty
			document.addEventListener("test", () => {}, Object.defineProperty({},
				"passive", {
					get() {
						supportsPassiveOption = true;
					},
				}));
		}
	} catch (e) {
		//
	}
	return supportsPassiveOption;
})();

export const IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
export const IS_IOS = /iPhone|iPad/.test(ua);
export const IS_ANDROID2 = /Android 2\./.test(ua);
export const CONTAINER_CLASSNAME = "_eg-infinitegrid-container_";
export const IGNORE_CLASSNAME = "_eg-infinitegrid-ignore_";
export const TRANSITION_NAME = "_INFINITEGRID_TRANSITION";

export const VERTICAL = "vertical";
export const HORIZONTAL = "horizontal";

export const DUMMY_POSITION = -100000;
export const GROUPKEY_ATT = "data-groupkey";

export const DEFAULT_OPTIONS = {
	horizontal: false,
	margin: 0,
};

export const agent = ua.toLowerCase();
export const isMobile = /mobi|ios|android/.test(agent);

export const ALIGN: IAlign = {
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

export const ITEM_KEYS = ["content", "groupKey", "itemKey", "orgSize", "mounted", "prevRect", "rect", "size"] as const;
interface ITransitionEnd {
	transitionend: string;
	webkitTransitionEnd: string;
	MSTransitionEnd: string;
	oTransitionEnd: string;
	mozTransitionEnd: string;
}

export const [TRANSFORM, TRANSITION, TRANSITION_END] = (() => {
	const properties: ITransitionEnd = {
		transitionend: "",
		webkitTransitionEnd: "-webkit-",
		MSTransitionEnd: "-ms-",
		oTransitionEnd: "-o-",
		mozTransitionEnd: "-moz-",
	};

	for (const property in properties) {
		const prefix = properties[property as keyof ITransitionEnd];

		if (`on${property.toLowerCase()}` in window) {
			return [`${prefix}transform`, `${prefix}transition`, property];
		}
	}
	return [];
})() as ["transform", "transition", "transitionend"];
