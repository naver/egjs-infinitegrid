import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import JustifiedInfiniteGridApp from "./apps/ReactJustifiedInfiniteGridApp";
// import RawJustifiedInfiniteGridApp from "!!raw-loader!./apps/ReactJustifiedInfiniteGridApp";
import "../../../infinitegrid/stories/templates/default.css";

export const JustifiedInfiniteGridStretchTemplate = () => <JustifiedInfiniteGridApp />;


JustifiedInfiniteGridStretchTemplate.storyName = "JustifiedInfiniteGrid (stretch)";
