import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import MasonryInfiniteGridWithLoadingApp from "./apps/ReactMasonryInfiniteGridWithLoadingApp";
// import RawMasonryInfiniteGridWithLoadingApp from "!!raw-loader!./apps/ReactMasonryInfiniteGridWithLoadingApp";
import "../../../../stories/templates/default.css";
import "../../../../stories/templates/masonrygrid.css";

export const MasonryInfiniteGridWithLoadingTemplate = () => <MasonryInfiniteGridWithLoadingApp />;


MasonryInfiniteGridWithLoadingTemplate.storyName = "MasonryInfiniteGrid with loading bar";
// MasonryInfiniteGridWithLoadingTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridWithLoadingTemplate.args = {
//   ...makeArgs(MasonryInfiniteGridWithLoadingTemplate.argTypes),
// };

// MasonryInfiniteGridWithLoadingTemplate.parameters = {
//   preview: [
//     {
//       tab: "React",
//       template: convertReactTemplate(convertPath(RawMasonryInfiniteGridWithLoadingApp, "react-grid", "@egjs/react-grid")),
//       language: "tsx",
//     },
//   ],
// };
