import Avoid, {
    AVOID_SCROLL_REACT_TEMPLATE,
    AVOID_SCROLL_VANILLA_TEMPLATE,
    AVOID_SCROLL_ANGULAR_HTML_TEMPLATE,
    AVOID_SCROLL_ANGULAR_TEMPLATE,
    AVOID_SCROLL_SVELTE_SCRIPT_TEMPLATE,
    AVOID_SCROLL_SVELTE_JSX_TEMPLATE,
    AVOID_SCROLL_VUE_TEMPLATE,
    AVOID_SCROLL_HTML_TEMPLATE,
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
    htmlTemplate: AVOID_SCROLL_HTML_TEMPLATE,
    cssTemplate: GRIDLAYOUT_CSS_TEMPLATE,
    vanillaTemplate: AVOID_SCROLL_VANILLA_TEMPLATE,
    reactTemplate: AVOID_SCROLL_REACT_TEMPLATE,
    angularHTMLTemplate: AVOID_SCROLL_ANGULAR_HTML_TEMPLATE,
    angularComponentTemplate: AVOID_SCROLL_ANGULAR_TEMPLATE,
    vueTemplate: AVOID_SCROLL_VUE_TEMPLATE,
    svelteScriptTemplate: AVOID_SCROLL_SVELTE_SCRIPT_TEMPLATE,
    svelteJSXTemplate: AVOID_SCROLL_SVELTE_JSX_TEMPLATE,
    isVirtualScroll: true,
    isDataDelay: false,
    horizontal: false,
});
