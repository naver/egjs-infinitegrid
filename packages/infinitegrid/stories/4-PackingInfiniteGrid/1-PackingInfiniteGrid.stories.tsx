import * as React from "react";
import PackingInfiniteGridApp from "./apps/VanillaPackingInfiniteGridApp";
import { getApp } from "../templates/ReactJSX";
import { getPreview } from "../templates/preview";
import "../templates/default.css";

export const PackingInfiniteGridTemplate = getApp(
  PackingInfiniteGridApp,
  () => <div className="container"></div>,
);

PackingInfiniteGridTemplate.storyName = "PackingInfiniteGrid";
// PackingInfiniteGridTemplate.argTypes = MASONRY_GRID_CONTROLS;
// PackingInfiniteGridTemplate.args = { ...makeArgs(PackingInfiniteGridTemplate.argTypes) };

PackingInfiniteGridTemplate.parameters = {
  preview: getPreview("4-PackingInfiniteGrid", "PackingInfiniteGrid"),
};


