/* eslint-disable import/no-webpack-loader-syntax */
import PackingInfiniteGridApp from "./apps/VuePackingInfiniteGridApp.vue";
import { makeVueApp } from "../utils";


export const PackingInfiniteGridTemplate = makeVueApp(PackingInfiniteGridApp);


PackingInfiniteGridTemplate.storyName = "PackingInfiniteGrid";
