import {window} from "./browser";

const ua = window.navigator.userAgent;
export const IS_IE = /MSIE|Trident|Windows Phone/.test(ua);
export const IS_IOS = /iPhone|iPad/.test(ua);
