/* eslint-disable import/no-webpack-loader-syntax */
import WaitNReadyApp from "./apps/VueWaitNReadyApp.vue";
import { makeVueApp } from "../utils";


export const WaitNReadyTemplate = makeVueApp(WaitNReadyApp);


WaitNReadyTemplate.storyName = "Wait & Ready";
