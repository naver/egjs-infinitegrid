import PackingInfiniteGridApp from "./apps/SveltePackingInfiniteGridApp.svelte";
import "../../../../stories/templates/default.css";


export const PackingInfiniteGridTemplate = (props) => ({
  Component: PackingInfiniteGridApp,
  props,
});

PackingInfiniteGridTemplate.storyName = "PackingInfiniteGrid";
