import * as React from "react";
import PlaceholderApp from "./apps/VanillaPlaceholderApp";
import { getApp } from "../templates/ReactJSX";
import { getPreview } from "../templates/preview";
import "../templates/default.css";

export const PlaceholderTemplate = getApp(
  PlaceholderApp,
  () => <div className="container"></div>,
);

PlaceholderTemplate.storyName = "Placeholder";

PlaceholderTemplate.parameters = {
  preview: getPreview("5-DataLoading", "Placeholder"),
};


