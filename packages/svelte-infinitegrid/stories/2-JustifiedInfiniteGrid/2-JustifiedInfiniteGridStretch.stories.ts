import JustifiedInfiniteGridStretchApp from "./apps/SvelteJustifiedInfiniteGridStretchApp.svelte";
import "../../../infinitegrid/stories/templates/default.css";


export const JustifiedInfiniteGridStretchTemplate = (props) => ({
  Component: JustifiedInfiniteGridStretchApp,
  props,
});

JustifiedInfiniteGridStretchTemplate.storyName = "JustifiedInfiniteGrid (stretch)";
