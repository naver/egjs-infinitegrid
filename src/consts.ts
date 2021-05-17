
const ua = typeof window !== "undefined" ? window.navigator.userAgent : "";

export const IS_IOS = /iPhone|iPad/.test(ua);
export const CONTAINER_CLASS_NAME = "infinitegrid-container";
