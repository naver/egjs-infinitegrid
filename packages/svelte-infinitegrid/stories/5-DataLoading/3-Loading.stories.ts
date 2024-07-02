import LoadingApp from "./apps/SvelteLoadingApp.svelte";
import "../../../infinitegrid/stories/templates/default.css";


export const LoadingTemplate = (props) => ({
  Component: LoadingApp,
  props,
});

LoadingTemplate.storyName = "Loading";
