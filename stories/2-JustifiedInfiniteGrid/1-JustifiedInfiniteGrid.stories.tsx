import * as React from "react";
import JustifiedInfiniteGridApp from "./apps/VanillaJustifiedInfiniteGridApp";
import { getApp } from "../templates/ReactJSX";
import { getPreview } from "../templates/preview";
import "../templates/default.css";

export const JustifiedInfiniteGridTemplate = getApp(
  JustifiedInfiniteGridApp,
  () => <div className="container"></div>,
);

JustifiedInfiniteGridTemplate.storyName = "JustifiedInfiniteGrid";

JustifiedInfiniteGridTemplate.parameters = {
  preview: getPreview("2-JustifiedInfiniteGrid", "JustifiedInfiniteGrid"),
};


