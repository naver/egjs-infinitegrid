import MasonryInfiniteGridWithPlaceholdersApp from "./apps/SvelteMasonryInfiniteGridWithPlaceholdersApp.svelte";
// import RawMasonryInfiniteGridWithPlaceholdersApp from "!!raw-loader!./apps/SvelteMasonryInfiniteGridWithPlaceholdersApp.svelte";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertSvelteTemplate, makeArgs } from "../../../../stories/utils";
import "../../../../stories/templates/default.css";
import "../../../../stories/templates/masonrygrid.css";


export const MasonryInfiniteGridWithPlaceholdersTemplate = (props) => ({
  Component: MasonryInfiniteGridWithPlaceholdersApp,
  props,
});

MasonryInfiniteGridWithPlaceholdersTemplate.storyName = "MasonryInfiniteGridWithPlaceholders";
// MasonryInfiniteGridWithPlaceholdersTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridWithPlaceholdersTemplate.args = {
//   ...makeArgs(MasonryInfiniteGridWithPlaceholdersTemplate.argTypes),
// };

// MasonryInfiniteGridWithPlaceholdersTemplate.parameters = {
//   preview: [
//     {
//       tab: "Svelte",
//       template: convertSvelteTemplate(convertPath(RawMasonryInfiniteGridWithPlaceholdersApp, "src", "@egjs/svelte-grid")),
//       language: "html",
//     },
//   ],
// };
