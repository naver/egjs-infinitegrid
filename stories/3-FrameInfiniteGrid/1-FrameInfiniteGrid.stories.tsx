import * as React from "react";
import FrameInfiniteGridApp from "./apps/VanillaFrameInfiniteGridApp";
import { getApp } from "../templates/ReactJSX";
import { getPreview } from "../templates/preview";
import "../templates/default.css";

export const FrameInfiniteGridTemplate = getApp(
  FrameInfiniteGridApp,
  () => <div className="container"></div>,
);

FrameInfiniteGridTemplate.storyName = "FrameInfiniteGrid";

FrameInfiniteGridTemplate.parameters = {
  preview: getPreview("3-FrameInfiniteGrid", "FrameInfiniteGrid"),
};

