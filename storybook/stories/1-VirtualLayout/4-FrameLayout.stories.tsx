import "../FrameLayout.css";
import { HTML_TEMPLATE } from "../templates/default.template";
import { FrameLayout } from "@egjs/react-infinitegrid";
import { FRAMELAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { getFrameLayoutKnobs, FRAMELAYOUT_OPTIONS } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";
import VirtualScroll, { VIRTUAL_SCROLL_VANILLA_TEMPLATE, VIRTUAL_SCROLL_REACT_TEMPLATE, VIRTUAL_SCROLL_ANGULAR_HTML_TEMPLATE, VIRTUAL_SCROLL_ANGULAR_TEMPLATE, VIRTUAL_SCROLL_VUE_TEMPLATE, VIRTUAL_SCROLL_SVELTE_SCRIPT_TEMPLATE, VIRTUAL_SCROLL_SVELTE_JSX_TEMPLATE } from "../templates/VirtualScroll.template";

makeStory(module, {
    storyName: "Virtual Scroll",
    title: "FrameLayout",
    layoutName: "FrameLayout",
    layoutType: FrameLayout,
    component: VirtualScroll,
    getKnobs: getFrameLayoutKnobs,
    layoutOptions: FRAMELAYOUT_OPTIONS,
    htmlTemplate: HTML_TEMPLATE,
    cssTemplate: FRAMELAYOUT_CSS_TEMPLATE,
    vanillaTemplate: VIRTUAL_SCROLL_VANILLA_TEMPLATE,
    reactTemplate: VIRTUAL_SCROLL_REACT_TEMPLATE,
    angularHTMLTemplate: VIRTUAL_SCROLL_ANGULAR_HTML_TEMPLATE,
    angularComponentTemplate: VIRTUAL_SCROLL_ANGULAR_TEMPLATE,
    vueTemplate: VIRTUAL_SCROLL_VUE_TEMPLATE,
    svelteScriptTemplate: VIRTUAL_SCROLL_SVELTE_SCRIPT_TEMPLATE,
    svelteJSXTemplate: VIRTUAL_SCROLL_SVELTE_JSX_TEMPLATE,
    isDataDelay: false,
    isVirtualScroll: true,
});
