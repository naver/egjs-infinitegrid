/* eslint-disable import/no-webpack-loader-syntax */
import MasonryInfiniteGridWithPlaceholdersApp from "./apps/VueMasonryInfiniteGridWithPlaceholdersApp.vue";
// import RawMaonsryGridApp from "!!raw-loader!./apps/VueMasonryInfiniteGridWithPlaceholdersApp.vue";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertVueTemplate, makeArgs } from "../../../../stories/utils";
import { makeVueApp } from "../utils";


export const MasonryInfiniteGridWithPlaceholdersTemplate = makeVueApp(MasonryInfiniteGridWithPlaceholdersApp);


MasonryInfiniteGridWithPlaceholdersTemplate.storyName = "MasonryInfiniteGridWithPlaceholders";
