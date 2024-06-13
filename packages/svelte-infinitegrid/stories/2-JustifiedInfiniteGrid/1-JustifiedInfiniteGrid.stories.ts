import JustifiedInfiniteGridApp from "./apps/SvelteJustifiedInfiniteGridApp.svelte";
import "../../../infinitegrid/stories/templates/default.css";


export const JustifiedInfiniteGridTemplate = (props) => ({
  Component: JustifiedInfiniteGridApp,
  props,
});

JustifiedInfiniteGridTemplate.storyName = "JustifiedInfiniteGrid";
