import {window} from "./browser";

const ua = window.navigator.userAgent;

export const IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
export const IS_IOS = /iPhone|iPad/.test(ua);
export const IS_ANDROID2 = /Android 2\./.test(ua);
export const RETRY = 3;
export const CONTAINER_CLASSNAME = "_eg-infinitegrid-container_";

export const APPEND = true;
export const CACHE = true;
export const NO_CACHE = false;
export const PREPEND = false;
export const MULTI = true;
export const SINGLE = false;
export const DUMMY_POSITION = -100000;
