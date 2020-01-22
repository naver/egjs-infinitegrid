import "../JustifiedLayout.css";
import { HTML_TEMPLATE } from "../templates/default.template";
import { JustifiedLayout } from "@egjs/react-infinitegrid";
import { JUSTIFIEDLAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { JUSTIFIEDLAYOUT_OPTIONS, getJustifiedLayoutKnobs } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";
import NoVirtualScroll, { NO_VIRTUAL_SCROLL_VANILLA_TEMPLATE, NO_VIRTUAL_SCROLL_REACT_TEMPLATE, NO_VIRTUAL_SCROLL_ANGULAR_HTML_TEMPLATE, NO_VIRTUAL_SCROLL_ANGULAR_TEMPLATE, NO_VIRTUAL_SCROLL_VUE_TEMPLATE, NO_VIRTUAL_SCROLL_SVELTE_SCRIPT_TEMPLATE, NO_VIRTUAL_SCROLL_SVELTE_JSX_TEMPLATE } from "../templates/NoVirtualScroll.template";

makeStory(module, {
    storyName: "No Virtual Scroll",
    title: "JustifiedLayout",
    layoutName: "JustifiedLayout",
    layoutType: JustifiedLayout,
    component: NoVirtualScroll,
    getKnobs: getJustifiedLayoutKnobs,
    layoutOptions: JUSTIFIEDLAYOUT_OPTIONS,
    htmlTemplate: HTML_TEMPLATE,
    cssTemplate: JUSTIFIEDLAYOUT_CSS_TEMPLATE,
    vanillaTemplate: NO_VIRTUAL_SCROLL_VANILLA_TEMPLATE,
    reactTemplate: NO_VIRTUAL_SCROLL_REACT_TEMPLATE,
    angularHTMLTemplate: NO_VIRTUAL_SCROLL_ANGULAR_HTML_TEMPLATE,
    angularComponentTemplate: NO_VIRTUAL_SCROLL_ANGULAR_TEMPLATE,
    vueTemplate: NO_VIRTUAL_SCROLL_VUE_TEMPLATE,
    svelteScriptTemplate: NO_VIRTUAL_SCROLL_SVELTE_SCRIPT_TEMPLATE,
    svelteJSXTemplate: NO_VIRTUAL_SCROLL_SVELTE_JSX_TEMPLATE,
    isDataDelay: false,
    isVirtualScroll: false,
});
