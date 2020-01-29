import Avoid, {
    AVOID_IMAGE_LOADING_REACT_TEMPLATE,
    AVOID_IMAGE_LOADING_VANILLA_TEMPLATE,
    AVOID_IMAGE_LOADING_ANGULAR_HTML_TEMPLATE,
    AVOID_IMAGE_LOADING_ANGULAR_TEMPLATE,
    AVOID_IMAGE_LOADING_SVELTE_SCRIPT_TEMPLATE,
    AVOID_IMAGE_LOADING_SVELTE_JSX_TEMPLATE,
    AVOID_IMAGE_LOADING_VUE_TEMPLATE,
    AVOID_IMAGE_LOADING_HTML_TEMPLATE,
} from "../templates/Avoid.template";
import "../GridLayout.css";
import { GridLayout } from "@egjs/react-infinitegrid";
import { GRIDLAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { GRIDLAYOUT_OPTIONS, getGridLayoutKnobs } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";

makeStory(module, {
    storyName: "Performance Improvement",
    title: "Avoid Image Loading (Lazy loading)",
    layoutName: "GridLayout",
    layoutType: GridLayout,
    component: Avoid,
    getKnobs: getGridLayoutKnobs,
    layoutOptions: GRIDLAYOUT_OPTIONS,
    htmlTemplate: AVOID_IMAGE_LOADING_HTML_TEMPLATE,
    cssTemplate: GRIDLAYOUT_CSS_TEMPLATE,
    vanillaTemplate: AVOID_IMAGE_LOADING_VANILLA_TEMPLATE,
    reactTemplate: AVOID_IMAGE_LOADING_REACT_TEMPLATE,
    angularHTMLTemplate: AVOID_IMAGE_LOADING_ANGULAR_HTML_TEMPLATE,
    angularComponentTemplate: AVOID_IMAGE_LOADING_ANGULAR_TEMPLATE,
    vueTemplate: AVOID_IMAGE_LOADING_VUE_TEMPLATE,
    svelteScriptTemplate: AVOID_IMAGE_LOADING_SVELTE_SCRIPT_TEMPLATE,
    svelteJSXTemplate: AVOID_IMAGE_LOADING_SVELTE_JSX_TEMPLATE,
    isVirtualScroll: true,
    isDataDelay: false,
    horizontal: false,
});
