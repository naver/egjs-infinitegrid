import * as React from "react";
import JustifiedInfiniteGridStretchApp from "./apps/VanillaJustifiedInfiniteGridStretchApp";
import { getApp } from "../templates/ReactJSX";
import { getPreview } from "../templates/preview";
import "../templates/default.css";

export const JustifiedInfiniteGridStretchTemplate = getApp(
  JustifiedInfiniteGridStretchApp,
  () => <div className="container"></div>,
);

JustifiedInfiniteGridStretchTemplate.storyName = "JustifiedInfiniteGrid (stretch)";

JustifiedInfiniteGridStretchTemplate.parameters = {
  preview: getPreview("2-JustifiedInfiniteGrid", "JustifiedInfiniteGridStretch"),
};


