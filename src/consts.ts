
const ua = typeof window !== "undefined" ? window.navigator.userAgent : "";

export const IS_IOS = /iPhone|iPad/.test(ua);
export const CONTAINER_CLASS_NAME = "infinitegrid-container";
export const IGNORE_PROPERITES_MAP = {
  renderOnPropertyChange: true,
  useFit: true,
  autoResize: true,
} as const;


export const DEFAULT_INFINITEGRID_OPTIONS = {
  gridConstructor: null,
};
