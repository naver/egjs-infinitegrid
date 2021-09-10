/* eslint-disable import/no-webpack-loader-syntax */
import FrameInfiniteGridApp from "./apps/VueFrameInfiniteGridApp.vue";
// import RawMaonsryGridApp from "!!raw-loader!./apps/VueFrameInfiniteGridApp.vue";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertVueTemplate, makeArgs } from "../../../../stories/utils";
import { makeVueApp } from "../utils";


export const FrameInfiniteGridTemplate = makeVueApp(FrameInfiniteGridApp);


FrameInfiniteGridTemplate.storyName = "FrameInfiniteGrid";
