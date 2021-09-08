/* eslint-disable import/no-webpack-loader-syntax */
import LoadingApp from "./apps/VueLoadingApp.vue";
// import RawMaonsryGridApp from "!!raw-loader!./apps/VueLoadingApp.vue";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertVueTemplate, makeArgs } from "../../../../stories/utils";
import { makeVueApp } from "../utils";


export const LoadingTemplate = makeVueApp(LoadingApp);


LoadingTemplate.storyName = "Loading";
