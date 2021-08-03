
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
  container: false,
};


export const EVENTS = {
  SCROLL: "scroll",
  REQUEST_APPEND: "requestAppend",
  REQUEST_PREPEND: "requestPrepend",
  RENDER_COMPLETE: "renderComplete",
  CONTENT_ERROR: "contentError",
} as const;

// type?: ITEM_TYPE;
// groupKey?: string | number;
// key?: string | number;
// element?: HTMLElement | null;
// html?: string;
// data?: Record<string, any>;
export const ITEM_INFO_PROPERTIES = {
  type: true,
  groupKey: true,
  key: true,
  element: true,
  html: true,
  data: true,
};

export enum GROUP_TYPE {
  GROUP = 0,
  VIRTUAL = 1,
}

export enum ITEM_TYPE {
  ITEM = 0,
  VIRTUAL = 1,
  VIRTUAL_GROUP = 2,
}

export enum STATUS_TYPE {
  // does not remove anything.
  NOT_REMOVE = 0,
  // Minimize information on invisible items
  MINIMIZE_INVISIBLE_ITEMS = 1,
  // Minimize information on invisible groups
  MINIMIZE_INVISIBLE_GROUPS = 2,
  // remove invisible groups
  REMOVE_INVISIBLE_GROUPS = 3,
}
