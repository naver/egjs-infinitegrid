import "../SquareLayout.css";
import { HTML_TEMPLATE } from "../templates/default.template";
import { SquareLayout } from "@egjs/react-infinitegrid";
import { SQUARELAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { SQUARELAYOUT_OPTIONS, getSquareLayoutArgs } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";
import VirtualScroll, { VIRTUAL_SCROLL_VANILLA_TEMPLATE, VIRTUAL_SCROLL_REACT_TEMPLATE, VIRTUAL_SCROLL_ANGULAR_HTML_TEMPLATE, VIRTUAL_SCROLL_ANGULAR_TEMPLATE, VIRTUAL_SCROLL_VUE_TEMPLATE, VIRTUAL_SCROLL_SVELTE_SCRIPT_TEMPLATE, VIRTUAL_SCROLL_SVELTE_JSX_TEMPLATE, VIRTUAL_SCROLL_HTML_TEMPLATE } from "../templates/VirtualScroll.template";

export default makeStory(module, exports, {
    storyName: "Virtual Scroll",
    title: "SquareLayout",
    layoutName: "SquareLayout",
    layoutType: SquareLayout,
    component: VirtualScroll,
    getLayoutArgs: getSquareLayoutArgs,
    layoutOptions: SQUARELAYOUT_OPTIONS,
    htmlTemplate: VIRTUAL_SCROLL_HTML_TEMPLATE,
    cssTemplate: SQUARELAYOUT_CSS_TEMPLATE,
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
