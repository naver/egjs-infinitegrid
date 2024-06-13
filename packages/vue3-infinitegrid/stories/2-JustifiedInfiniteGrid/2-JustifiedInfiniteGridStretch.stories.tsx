/* eslint-disable import/no-webpack-loader-syntax */
import JustifiedInfiniteGridStretchApp from "./apps/VueJustifiedInfiniteGridStretchApp.vue";
// import RawMaonsryGridApp from "!!raw-loader!./apps/VueJustifiedInfiniteGridApp.vue";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertVueTemplate, makeArgs } from "../../../../stories/utils";
import { makeVueApp } from "../utils";


export const JustifiedInfiniteGridStretchTemplate = makeVueApp(JustifiedInfiniteGridStretchApp);


JustifiedInfiniteGridStretchTemplate.storyName = "JustifiedInfiniteGrid (stretch)";
