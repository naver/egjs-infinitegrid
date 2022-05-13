import * as React from "react";
import WaitNReadyApp from "./apps/VanillaWaitNReadyApp";
import { getApp } from "../templates/ReactJSX";
import { getPreview } from "../templates/preview";
import "../templates/default.css";

export const WaitNReadyTemplate = getApp(
  WaitNReadyApp,
  () => <div className="container"></div>,
);

WaitNReadyTemplate.storyName = "Wait & Ready";

WaitNReadyTemplate.parameters = {
  preview: getPreview("5-DataLoading", "WaitNReady"),
};


