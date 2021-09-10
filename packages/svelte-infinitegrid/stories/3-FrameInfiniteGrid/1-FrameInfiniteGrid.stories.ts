import FrameInfiniteGridApp from "./apps/SvelteFrameInfiniteGridApp.svelte";
import "../../../../stories/templates/default.css";


export const FrameInfiniteGridTemplate = (props) => ({
  Component: FrameInfiniteGridApp,
  props,
});

FrameInfiniteGridTemplate.storyName = "FrameInfiniteGrid";
