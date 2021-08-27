import { InfiniteGridEvents, InfiniteGridItem, InfiniteGridStatus } from "@egjs/infinitegrid";
import * as React from "react";
import { REACT_INFINITEGRID_EVENT_MAP } from "./consts";


export type ReactInfiniteGridEvents = {
  -readonly [key in keyof typeof REACT_INFINITEGRID_EVENT_MAP]?:
  (e: InfiniteGridEvents[typeof REACT_INFINITEGRID_EVENT_MAP[key]]) => any;
}


export interface ReactInfiniteGridProps extends ReactInfiniteGridEvents {
  tag?: string;
  status?: InfiniteGridStatus;
  placeholder?: React.ReactElement | ((item: InfiniteGridItem) => React.ReactElement);
  loading?: React.ReactElement | ((item: InfiniteGridItem) => React.ReactElement);
  useFirstRender?: boolean;
  itemBy?: (item: React.ReactElement, index: number) => string | number;
  groupBy?: (item: React.ReactElement, index: number) => string | number;
}
