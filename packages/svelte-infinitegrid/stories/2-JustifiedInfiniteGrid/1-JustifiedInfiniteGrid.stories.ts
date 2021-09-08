import JustifiedInfiniteGridApp from "./apps/SvelteJustifiedInfiniteGridApp.svelte";
import "../../../../stories/templates/default.css";


export const JustifiedInfiniteGridTemplate = (props) => ({
  Component: JustifiedInfiniteGridApp,
  props,
});

JustifiedInfiniteGridTemplate.storyName = "JustifiedInfiniteGrid";
