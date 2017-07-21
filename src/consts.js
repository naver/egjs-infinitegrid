import {window} from "./browser";

const ua = window.navigator.userAgent;

export const IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
export const IS_IOS = /iPhone|iPad/.test(ua);
export const IS_ANDROID2 = /Android 2\./.test(ua);
export const RETRY = 3;
