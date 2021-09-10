import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import MasonryInfiniteGridApp from "./apps/ReactMasonryInfiniteGridApp";
// import RawMasonryInfiniteGridApp from "!!raw-loader!./apps/ReactMasonryInfiniteGridApp";
import "../../../../stories/templates/default.css";

export const MasonryInfiniteGridTemplate = () => <MasonryInfiniteGridApp />;


MasonryInfiniteGridTemplate.storyName = "MasonryInfiniteGrid";
// MasonryInfiniteGridTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridTemplate.args = {
//   ...makeArgs(MasonryInfiniteGridTemplate.argTypes),
// };

// MasonryInfiniteGridTemplate.parameters = {
//   preview: [
//     {
//       tab: "React",
//       template: convertReactTemplate(convertPath(RawMasonryInfiniteGridApp, "react-grid", "@egjs/react-grid")),
//       language: "tsx",
//     },
//   ],
// };
