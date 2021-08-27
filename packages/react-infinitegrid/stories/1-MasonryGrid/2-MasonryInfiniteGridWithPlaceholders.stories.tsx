import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import MasonryInfiniteGridWithPlaceholdersApp from "./apps/ReactMasonryInfiniteGridWithPlaceholdersApp";
// import RawMasonryInfiniteGridWithPlaceholdersApp from "!!raw-loader!./apps/ReactMasonryInfiniteGridWithPlaceholdersApp";
import "../../../../stories/templates/default.css";
import "../../../../stories/templates/masonrygrid.css";

export const MasonryInfiniteGridWithPlaceholdersTemplate = () => <MasonryInfiniteGridWithPlaceholdersApp />;


MasonryInfiniteGridWithPlaceholdersTemplate.storyName = "MasonryInfiniteGrid with placeholders";
// MasonryInfiniteGridWithPlaceholdersTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridWithPlaceholdersTemplate.args = {
//   ...makeArgs(MasonryInfiniteGridWithPlaceholdersTemplate.argTypes),
// };

// MasonryInfiniteGridWithPlaceholdersTemplate.parameters = {
//   preview: [
//     {
//       tab: "React",
//       template: convertReactTemplate(convertPath(RawMasonryInfiniteGridWithPlaceholdersApp, "react-grid", "@egjs/react-grid")),
//       language: "tsx",
//     },
//   ],
// };
