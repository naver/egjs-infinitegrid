/* eslint-disable import/no-webpack-loader-syntax */
import MasonryInfiniteGridApp from "./apps/VueMasonryInfiniteGridApp.vue";
// import RawMaonsryGridApp from "!!raw-loader!./apps/VueMasonryInfiniteGridApp.vue";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertVueTemplate, makeArgs } from "../../../../stories/utils";
import { makeVueApp } from "../utils";


export const MasonryInfiniteGridTemplate = makeVueApp(MasonryInfiniteGridApp);


MasonryInfiniteGridTemplate.storyName = "MasonryInfiniteGrid";
