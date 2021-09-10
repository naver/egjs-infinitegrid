import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import StatusApp from "./apps/ReactStatusApp";
// import RawStatusApp from "!!raw-loader!./apps/ReactStatusApp";
import "../../../../stories/templates/default.css";

export const StatusTemplate = () => <StatusApp />;


StatusTemplate.storyName = "Status";
