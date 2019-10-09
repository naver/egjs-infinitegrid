/**
 * Copyright (c) NAVER Corp.
 * egjs-infinitegrid projects are licensed under the MIT license
 */
import InfiniteGrid from "./InfiniteGrid";
import GridLayout from "./layouts/GridLayout";
import FrameLayout from "./layouts/FrameLayout";
import SquareLayout from "./layouts/SquareLayout";
import PackingLayout from "./layouts/PackingLayout";
import JustifiedLayout from "./layouts/JustifiedLayout";
import DOMRenderer from "./DOMRenderer";
import ItemManager from "./ItemManager";
import Infinite from "./Infinite";
import {
	CONTAINER_CLASSNAME, IGNORE_CLASSNAME,
	DEFAULT_OPTIONS, INFINITEGRID_METHODS,
	INFINITEGRID_EVENTS,
} from "./consts";
import { categorize, withInfiniteGridMethods } from "./utils";

// fix for IE8
(InfiniteGrid as any).categorize = categorize;
(InfiniteGrid as any).INFINITEGRID_METHODS = INFINITEGRID_METHODS;
(InfiniteGrid as any).INFINITEGRID_EVENTS = INFINITEGRID_EVENTS;
(InfiniteGrid as any).withInfiniteGridMethods = withInfiniteGridMethods;
(InfiniteGrid as any).CONTAINER_CLASSNAME = CONTAINER_CLASSNAME;
(InfiniteGrid as any).IGNORE_CLASSNAME = IGNORE_CLASSNAME;
(InfiniteGrid as any).DEFAULT_OPTIONS = DEFAULT_OPTIONS;
(InfiniteGrid as any).GridLayout = GridLayout;
(InfiniteGrid as any).FrameLayout = FrameLayout;
(InfiniteGrid as any).SquareLayout = SquareLayout;
(InfiniteGrid as any).PackingLayout = PackingLayout;
(InfiniteGrid as any).JustifiedLayout = JustifiedLayout;
(InfiniteGrid as any).ItemManager = ItemManager;
(InfiniteGrid as any).Infinite = Infinite;
(InfiniteGrid as any).DOMRenderer = DOMRenderer;
(InfiniteGrid as any).default = InfiniteGrid;

export default InfiniteGrid;
