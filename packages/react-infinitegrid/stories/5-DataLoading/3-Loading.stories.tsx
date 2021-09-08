import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import LoadingApp from "./apps/ReactLoadingApp";
// import RawLoadingApp from "!!raw-loader!./apps/ReactLoadingApp";
import "../../../../stories/templates/default.css";

export const LoadingTemplate = () => <LoadingApp />;


LoadingTemplate.storyName = "Loading";
