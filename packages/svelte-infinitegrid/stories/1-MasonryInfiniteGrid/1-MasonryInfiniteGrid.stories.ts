import MasonryInfiniteGridApp from "./apps/SvelteMasonryInfiniteGridApp.svelte";
// import RawMasonryInfiniteGridApp from "!!raw-loader!./apps/SvelteMasonryInfiniteGridApp.svelte";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertSvelteTemplate, makeArgs } from "../../../../stories/utils";
import "../../../../stories/templates/default.css";


export const MasonryInfiniteGridTemplate = (props) => ({
  Component: MasonryInfiniteGridApp,
  props,
});

MasonryInfiniteGridTemplate.storyName = "MasonryInfiniteGrid";
// MasonryInfiniteGridTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridTemplate.args = {
//   ...makeArgs(MasonryInfiniteGridTemplate.argTypes),
// };

// MasonryInfiniteGridTemplate.parameters = {
//   preview: [
//     {
//       tab: "Svelte",
//       template: convertSvelteTemplate(convertPath(RawMasonryInfiniteGridApp, "src", "@egjs/svelte-grid")),
//       language: "html",
//     },
//   ],
// };
