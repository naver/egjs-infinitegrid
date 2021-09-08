import PlaceholderApp from "./apps/SveltePlaceholderApp.svelte";
import "../../../../stories/templates/default.css";


export const PlaceholderTemplate = (props) => ({
  Component: PlaceholderApp,
  props,
});

PlaceholderTemplate.storyName = "Placeholder";
