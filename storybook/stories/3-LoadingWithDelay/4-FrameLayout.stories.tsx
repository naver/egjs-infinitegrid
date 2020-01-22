import "../FrameLayout.css";
import { HTML_TEMPLATE } from "../templates/default.template";
import { FrameLayout } from "@egjs/react-infinitegrid";
import { FRAMELAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { getFrameLayoutKnobs, FRAMELAYOUT_OPTIONS } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";
import VirtualScroll, { LOADING_VANILLA_TEMPLATE, LOADING_REACT_TEMPLATE, LOADING_ANGULAR_HTML_TEMPLATE, LOADING_ANGULAR_TEMPLATE, LOADING_VUE_TEMPLATE, LOADING_SVELTE_SCRIPT_TEMPLATE, LOADING_SVELTE_JSX_TEMPLATE } from "../templates/Loading.template";

makeStory(module, {
    storyName: "Loading Bar with Data Delay",
    title: "FrameLayout",
    layoutName: "FrameLayout",
    layoutType: FrameLayout,
    component: VirtualScroll,
    getKnobs: getFrameLayoutKnobs,
    layoutOptions: FRAMELAYOUT_OPTIONS,
    htmlTemplate: HTML_TEMPLATE,
    cssTemplate: FRAMELAYOUT_CSS_TEMPLATE,
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
