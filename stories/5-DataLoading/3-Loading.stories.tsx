import * as React from "react";
import LoadingApp from "./apps/VanillaLoadingApp";
import { getApp } from "../templates/ReactJSX";
import { getPreview } from "../templates/preview";
import "../templates/default.css";

export const LoadingTemplate = getApp(
  LoadingApp,
  () => <div className="container"></div>,
);

LoadingTemplate.storyName = "Loading";

LoadingTemplate.parameters = {
  preview: getPreview("5-DataLoading", "Loading"),
};


