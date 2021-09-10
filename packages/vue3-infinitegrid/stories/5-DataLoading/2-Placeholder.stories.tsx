/* eslint-disable import/no-webpack-loader-syntax */
import PlaceholderApp from "./apps/VuePlaceholderApp.vue";
// import RawMaonsryGridApp from "!!raw-loader!./apps/VuePlaceholderApp.vue";
// import { MASONRY_GRID_CONTROLS } from "../../../../stories/templates/controls";
// import { convertPath, convertVueTemplate, makeArgs } from "../../../../stories/utils";
import { makeVueApp } from "../utils";


export const PlaceholderTemplate = makeVueApp(PlaceholderApp);


PlaceholderTemplate.storyName = "Placeholder";
