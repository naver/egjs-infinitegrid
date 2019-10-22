import InfiniteGrid from "./InfiniteGrid";
import GridLayout from "./layouts/GridLayout";
import JustifiedLayout from "./layouts/JustifiedLayout";
import FrameLayout from "./layouts/FrameLayout";
import SquareLayout from "./layouts/SquareLayout";
import PackingLayout from "./layouts/PackingLayout";

export default InfiniteGrid;
(InfiniteGrid as any).GridLayout = GridLayout;
(InfiniteGrid as any).JustifiedLayout = JustifiedLayout;
(InfiniteGrid as any).FrameLayout = FrameLayout;
(InfiniteGrid as any).SquareLayout = SquareLayout;
(InfiniteGrid as any).PackingLayout = PackingLayout;
