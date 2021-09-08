import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import PlaceholderApp from "./apps/ReactPlaceholderApp";
// import RawPlaceholderApp from "!!raw-loader!./apps/ReactPlaceholderApp";
import "../../../../stories/templates/default.css";

export const PlaceholderTemplate = () => <PlaceholderApp />;


PlaceholderTemplate.storyName = "Placeholder";
