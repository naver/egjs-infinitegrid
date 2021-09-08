import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import PackingInfiniteGridApp from "./apps/ReactPackingInfiniteGridApp";
// import RawPackingInfiniteGridApp from "!!raw-loader!./apps/ReactPackingInfiniteGridApp";
import "../../../../stories/templates/default.css";

export const PackingInfiniteGridTemplate = () => <PackingInfiniteGridApp />;


PackingInfiniteGridTemplate.storyName = "PackingInfiniteGrid";
