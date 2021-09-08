import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import JustifiedInfiniteGridApp from "./apps/ReactJustifiedInfiniteGridApp";
// import RawJustifiedInfiniteGridApp from "!!raw-loader!./apps/ReactJustifiedInfiniteGridApp";
import "../../../../stories/templates/default.css";

export const JustifiedInfiniteGridTemplate = () => <JustifiedInfiniteGridApp />;


JustifiedInfiniteGridTemplate.storyName = "JustifiedInfiniteGrid";
