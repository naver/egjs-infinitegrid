import * as React from "react";
import MasonryInfiniteGridApp from "./apps/VanillaMasonryInfiniteGridApp";
import { getApp } from "../templates/ReactJSX";
import { getPreview } from "../templates/preview";
import "../templates/default.css";

export const MasonryInfiniteGridTemplate = getApp(
  MasonryInfiniteGridApp,
  () => <div className="container"></div>,
);

MasonryInfiniteGridTemplate.storyName = "MasonryInfiniteGrid";
// MasonryInfiniteGridTemplate.argTypes = MASONRY_GRID_CONTROLS;
// MasonryInfiniteGridTemplate.args = { ...makeArgs(MasonryInfiniteGridTemplate.argTypes) };

MasonryInfiniteGridTemplate.parameters = {
  preview: getPreview("1-MasonryInfiniteGrid", "MasonryInfiniteGrid"),
};


