/* eslint-disable import/no-webpack-loader-syntax */
import JustifiedInfiniteGridApp from "./apps/VueJustifiedInfiniteGridApp.vue";
// import RawMaonsryGridApp from "!!raw-loader!./apps/VueJustifiedInfiniteGridApp.vue";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertVueTemplate, makeArgs } from "../../../../stories/utils";
import { makeVueApp } from "../utils";


export const JustifiedInfiniteGridTemplate = makeVueApp(JustifiedInfiniteGridApp);


JustifiedInfiniteGridTemplate.storyName = "JustifiedInfiniteGrid";
