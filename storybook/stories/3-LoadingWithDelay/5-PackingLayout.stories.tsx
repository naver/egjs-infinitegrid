import Loading, {
    LOADING_REACT_TEMPLATE,
    LOADING_VANILLA_TEMPLATE,
    LOADING_ANGULAR_HTML_TEMPLATE,
    LOADING_ANGULAR_TEMPLATE,
    LOADING_SVELTE_SCRIPT_TEMPLATE,
    LOADING_SVELTE_JSX_TEMPLATE,
    LOADING_VUE_TEMPLATE,
    LOADING_HTML_TEMPLATE,
} from "../templates/Loading.template";
import "../PackingLayout.css";
import { PackingLayout } from "@egjs/react-infinitegrid";
import { PACKINGLAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { PACKINGLAYOUT_OPTIONS, getPackingLayoutArgs } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";

export default makeStory(module, exports, {
    storyName: "Loading Bar with Data Delay",
    title: "PackingLayout",
    layoutName: "PackingLayout",
    layoutType: PackingLayout,
    component: Loading,
    getLayoutArgs: getPackingLayoutArgs,

    layoutOptions: PACKINGLAYOUT_OPTIONS,
    htmlTemplate: LOADING_HTML_TEMPLATE,
    cssTemplate: PACKINGLAYOUT_CSS_TEMPLATE,
    vanillaTemplate: LOADING_VANILLA_TEMPLATE,
    reactTemplate: LOADING_REACT_TEMPLATE,
    angularHTMLTemplate: LOADING_ANGULAR_HTML_TEMPLATE,
    angularComponentTemplate: LOADING_ANGULAR_TEMPLATE,
    vueTemplate: LOADING_VUE_TEMPLATE,
    svelteScriptTemplate: LOADING_SVELTE_SCRIPT_TEMPLATE,
    svelteJSXTemplate: LOADING_SVELTE_JSX_TEMPLATE,
    isDataDelay: true,
    isVirtualScroll: true,
});
