import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import FrameInfiniteGridApp from "./apps/ReactFrameInfiniteGridApp";
// import RawFrameInfiniteGridApp from "!!raw-loader!./apps/ReactFrameInfiniteGridApp";
import "../../../../stories/templates/default.css";

export const FrameInfiniteGridTemplate = () => <FrameInfiniteGridApp />;


FrameInfiniteGridTemplate.storyName = "FrameInfiniteGrid";
