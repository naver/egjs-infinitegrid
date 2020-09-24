import LazyLoading, {
    LAZY_LOADING_REACT_TEMPLATE,
    LAZY_LOADING_VANILLA_TEMPLATE,
    LAZY_LOADING_ANGULAR_HTML_TEMPLATE,
    LAZY_LOADING_ANGULAR_TEMPLATE,
    LAZY_LOADING_SVELTE_SCRIPT_TEMPLATE,
    LAZY_LOADING_SVELTE_JSX_TEMPLATE,
    LAZY_LOADING_VUE_TEMPLATE,
    LAZY_LOADING_HTML_TEMPLATE,
} from "../templates/Lazy.template";
import "../GridLayout.css";
import { GridLayout } from "@egjs/react-infinitegrid";
import { GRIDLAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { GRIDLAYOUT_OPTIONS, getGridLayoutArgs } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";

export default makeStory(module, exports, {
    storyName: "Performance Improvement",
    title: "Image Lazy Loading",
    layoutName: "GridLayout",
    layoutType: GridLayout,
    component: LazyLoading,
    getLayoutArgs: getGridLayoutArgs,
    layoutOptions: GRIDLAYOUT_OPTIONS,
    htmlTemplate: LAZY_LOADING_HTML_TEMPLATE,
    cssTemplate: GRIDLAYOUT_CSS_TEMPLATE,
    vanillaTemplate: LAZY_LOADING_VANILLA_TEMPLATE,
    reactTemplate: LAZY_LOADING_REACT_TEMPLATE,
    angularHTMLTemplate: LAZY_LOADING_ANGULAR_HTML_TEMPLATE,
    angularComponentTemplate: LAZY_LOADING_ANGULAR_TEMPLATE,
    vueTemplate: LAZY_LOADING_VUE_TEMPLATE,
    svelteScriptTemplate: LAZY_LOADING_SVELTE_SCRIPT_TEMPLATE,
    svelteJSXTemplate: LAZY_LOADING_SVELTE_JSX_TEMPLATE,
    isVirtualScroll: true,
    isDataDelay: false,
    horizontal: false,
});
