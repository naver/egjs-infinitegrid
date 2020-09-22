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
import "../SquareLayout.css";
import { HTML_TEMPLATE } from "../templates/default.template";
import { SquareLayout } from "@egjs/react-infinitegrid";
import { SQUARELAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { SQUARELAYOUT_OPTIONS, getSquareLayoutArgs } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";

export default makeStory(module, exports, {
    storyName: "Loading Bar with Data Delay",
    title: "SquareLayout",
    layoutName: "SquareLayout",
    layoutType: SquareLayout,
    component: Loading,
    getLayoutArgs: getSquareLayoutArgs,
    layoutOptions: SQUARELAYOUT_OPTIONS,
    htmlTemplate: LOADING_HTML_TEMPLATE,
    cssTemplate: SQUARELAYOUT_CSS_TEMPLATE,
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
