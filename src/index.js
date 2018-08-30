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
import ImageLoaded from "./ImageLoaded";
import AutoSizer from "./AutoSizer";
import DOMRenderer from "./DOMRenderer";
import Watcher from "./Watcher";
import ItemManager from "./ItemManager";
import Infinite from "./Infinite";
import LayoutManager from "./LayoutManager";

/**
 * Version info string
 * @ko 버전정보 문자열
 * @name VERSION
 * @static
 * @type {String}
 * @example
 * eg.InfiniteGrid.VERSION;  // ex) 3.3.3
 * @memberof eg.InfiniteGrid
 */
export const VERSION = "#__VERSION__#";
export {
	GridLayout,
	FrameLayout,
	SquareLayout,
	PackingLayout,
	JustifiedLayout,
	Infinite,
	ImageLoaded,
	AutoSizer,
	DOMRenderer,
	Watcher,
	ItemManager,
	LayoutManager,
	InfiniteGrid as default,
};
