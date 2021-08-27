import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import MasonryInfiniteGridWithStatusApp from "./apps/ReactMasonryInfiniteGridWithStatusApp";
// import RawMasonryInfiniteGridWithStatusApp from "!!raw-loader!./apps/ReactMasonryInfiniteGridWithStatusApp";
import "../../../../stories/templates/default.css";
import "../../../../stories/templates/masonrygrid.css";

export const MasonryInfiniteGridWithStatusTemplate = () => <MasonryInfiniteGridWithStatusApp />;


MasonryInfiniteGridWithStatusTemplate.storyName = "MasonryInfiniteGrid with status";
// MasonryInfiniteGridWithStatusTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridWithStatusTemplate.args = {
//   ...makeArgs(MasonryInfiniteGridWithStatusTemplate.argTypes),
// };

// MasonryInfiniteGridWithStatusTemplate.parameters = {
//   preview: [
//     {
//       tab: "React",
//       template: convertReactTemplate(convertPath(RawMasonryInfiniteGridWithStatusApp, "react-grid", "@egjs/react-grid")),
//       language: "tsx",
//     },
//   ],
// };
