import Initial, {
    INITIAL_SCROLL_REACT_TEMPLATE,
    INITIAL_SCROLL_VANILLA_TEMPLATE,
    INITIAL_SCROLL_ANGULAR_HTML_TEMPLATE,
    INITIAL_SCROLL_ANGULAR_TEMPLATE,
    INITIAL_SCROLL_SVELTE_SCRIPT_TEMPLATE,
    INITIAL_SCROLL_SVELTE_JSX_TEMPLATE,
    INITIAL_SCROLL_VUE_TEMPLATE,
    INITIAL_SCROLL_HTML_TEMPLATE,
} from "../templates/InitialScroll.template";
import "../GridLayout.css";
import { GridLayout } from "@egjs/react-infinitegrid";
import { GRIDLAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { GRIDLAYOUT_OPTIONS, getGridLayoutArgs } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";

export default makeStory(module, exports, {
    storyName: "Performance Improvement",
    title: "Initial item setting",
    layoutName: "GridLayout",
    layoutType: GridLayout,
    component: Initial,
    getLayoutArgs: getGridLayoutArgs,
    layoutOptions: GRIDLAYOUT_OPTIONS,
    htmlTemplate: INITIAL_SCROLL_HTML_TEMPLATE,
    cssTemplate: GRIDLAYOUT_CSS_TEMPLATE,
    vanillaTemplate: INITIAL_SCROLL_VANILLA_TEMPLATE,
    reactTemplate: INITIAL_SCROLL_REACT_TEMPLATE,
    angularHTMLTemplate: INITIAL_SCROLL_ANGULAR_HTML_TEMPLATE,
    angularComponentTemplate: INITIAL_SCROLL_ANGULAR_TEMPLATE,
    vueTemplate: INITIAL_SCROLL_VUE_TEMPLATE,
    svelteScriptTemplate: INITIAL_SCROLL_SVELTE_SCRIPT_TEMPLATE,
    svelteJSXTemplate: INITIAL_SCROLL_SVELTE_JSX_TEMPLATE,
    isVirtualScroll: true,
    isDataDelay: false,
    horizontal: false,
    useFirstRender: true,
});
