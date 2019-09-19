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

// fix for IE8
(InfiniteGrid as any).GridLayout = GridLayout;
(InfiniteGrid as any).FrameLayout = FrameLayout;
(InfiniteGrid as any).SquareLayout = SquareLayout;
(InfiniteGrid as any).PackingLayout = PackingLayout;
(InfiniteGrid as any).JustifiedLayout = JustifiedLayout;
(InfiniteGrid as any).default = InfiniteGrid;

export default InfiniteGrid;
