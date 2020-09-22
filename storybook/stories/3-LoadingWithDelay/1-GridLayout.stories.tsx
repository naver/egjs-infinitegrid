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
import "../GridLayout.css";
import { GridLayout } from "@egjs/react-infinitegrid";
import { GRIDLAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { GRIDLAYOUT_OPTIONS, getGridLayoutArgs } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";

export default makeStory(module, exports, {
    storyName: "Loading Bar with Data Delay",
    title: "GridLayout",
    layoutName: "GridLayout",
    layoutType: GridLayout,
    component: Loading,
    getLayoutArgs: getGridLayoutArgs,
    layoutOptions: GRIDLAYOUT_OPTIONS,
    htmlTemplate: LOADING_HTML_TEMPLATE,
    cssTemplate: GRIDLAYOUT_CSS_TEMPLATE,
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
