
export const REACT_INFINITEGRID_EVENT_MAP = {
  "onContentError": "contentError",
  "onRenderComplete": "renderComplete",
  "onRequestAppend": "requestAppend",
  "onRequestPrepend": "requestPrepend",
  "onChangeScroll": "changeScroll",
} as const;

export const REACT_INFINITEGRID_EVENTS: string[] = [];

for (const name in REACT_INFINITEGRID_EVENT_MAP) {
  REACT_INFINITEGRID_EVENTS.push(name);
}

export const REACT_INFINITEGRID_PROPS = [
  "tag",
  "placeholder",
  "status",
  "useFirstRender",
  "loading",
  "itemBy",
  "groupBy",
  ...REACT_INFINITEGRID_EVENTS,
];
