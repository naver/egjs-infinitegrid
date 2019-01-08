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

// fix for IE8
(InfiniteGrid as any).GridLayout = GridLayout;
(InfiniteGrid as any).FrameLayout = FrameLayout;
(InfiniteGrid as any).SquareLayout = SquareLayout;
(InfiniteGrid as any).PackingLayout = PackingLayout;
(InfiniteGrid as any).JustifiedLayout = JustifiedLayout;
(InfiniteGrid as any).AutoSizer = AutoSizer;
(InfiniteGrid as any).ImageLoaded = ImageLoaded;
(InfiniteGrid as any).Watcher = Watcher;
(InfiniteGrid as any).ItemManager = ItemManager;
(InfiniteGrid as any).Infinite = Infinite;
(InfiniteGrid as any).LayoutManager = LayoutManager;
(InfiniteGrid as any).DOMRenderer = DOMRenderer;
(InfiniteGrid as any).default = InfiniteGrid;

export default InfiniteGrid;
