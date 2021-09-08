import * as React from "react";
/* eslint-disable import/no-webpack-loader-syntax */
import WaitNReadyApp from "./apps/ReactWaitNReadyApp";
// import RawWaitNReadyApp from "!!raw-loader!./apps/ReactWaitNReadyApp";
import "../../../../stories/templates/default.css";

export const WaitNReadyTemplate = () => <WaitNReadyApp />;


WaitNReadyTemplate.storyName = "Wait & Ready";
