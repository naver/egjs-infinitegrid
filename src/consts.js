import {window} from "./browser";

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

export const agent = navigator.userAgent.toLowerCase();
export const isMobile = /mobi|ios|android/.test(agent);

export const ALIGN = {
	START: "start",
	CENTER: "center",
	END: "end",
	JUSTIFY: "justify",
};

export const LOADING_APPEND = 1;
export const LOADING_PREPEND = 2;
export const PROCESSING = 4;
export const DEFENSE_BROWSER = /android/.test(agent);

alert(agent);
/*
"Mozilla/5.0 (Linux; Android 4.3; SHV-E250S Build/JSS15J) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36"
*/
