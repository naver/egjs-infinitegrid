import { GRID_PROPERTY_TYPES } from "@egjs/grid";
import { InfiniteGridItemInfo } from "./types";

const ua = typeof window !== "undefined" ? window.navigator.userAgent : "";

export const IS_IOS = /iPhone|iPad/.test(ua);
export const CONTAINER_CLASS_NAME = "infinitegrid-container";
export const IGNORE_PROPERITES_MAP = {
  renderOnPropertyChange: true,
  useFit: true,
  autoResize: true,
} as const;


export const INFINITEGRID_PROPERTY_TYPES = {
  ...GRID_PROPERTY_TYPES,
};

export const DIRECTION = {
  START: "start",
  END: "end",
  NONE: "",
} as const;

export const INFINITEGRID_EVENTS = {
  CHANGE_SCROLL: "changeScroll",
  REQUEST_APPEND: "requestAppend",
  REQUEST_PREPEND: "requestPrepend",
  RENDER_COMPLETE: "renderComplete",
  CONTENT_ERROR: "contentError",
} as const;

export const ITEM_INFO_PROPERTIES: Record<keyof InfiniteGridItemInfo, true> = {
  type: true,
  groupKey: true,
  key: true,
  element: true,
  html: true,
  data: true,
  inserted: true,
  attributes: true,
};


export const INFINITEGRID_METHODS = [
  "insertByGroupIndex",
  "updateItems",
  "getItems",
  "getVisibleItems",
  "getGroups",
  "getVisibleGroups",
  "renderItems",
  "getContainerElement",
  "getScrollContainerElement",
  "getWrapperElement",
  "setStatus",
  "getStatus",
  "removePlaceholders",
  "prependPlaceholders",
  "appendPlaceholders",
  "getStartCursor",
  "getEndCursor",
  "setCursors",
] as const;


export enum GROUP_TYPE {
  NORMAL = 0,
  VIRTUAL = 1,
  LOADING = 2,
}

export enum ITEM_TYPE {
  NORMAL = 0,
  VIRTUAL = 1,
  LOADING = 2,
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


export const INVISIBLE_POS = -9999;
