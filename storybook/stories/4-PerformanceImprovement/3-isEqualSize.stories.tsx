
import "../GridLayout.css";
import * as React from "react";
import { GridLayout } from "@egjs/react-infinitegrid";
import { GRIDLAYOUT_CSS_TEMPLATE } from "../templates/css.template";
import { GRIDLAYOUT_OPTIONS, getGridLayoutKnobs } from "../templates/layout.template";
import { makeStory } from "../templates/story.template";
import VirtualScroll, { VIRTUAL_SCROLL_VANILLA_TEMPLATE, VIRTUAL_SCROLL_REACT_TEMPLATE, VIRTUAL_SCROLL_ANGULAR_HTML_TEMPLATE, VIRTUAL_SCROLL_ANGULAR_TEMPLATE, VIRTUAL_SCROLL_VUE_TEMPLATE, VIRTUAL_SCROLL_SVELTE_SCRIPT_TEMPLATE, VIRTUAL_SCROLL_SVELTE_JSX_TEMPLATE, VIRTUAL_SCROLL_HTML_TEMPLATE } from "../templates/VirtualScroll.template";

makeStory(module, {
    storyName: "Performance Improvement",
    title: "When all items are the same size (isEqualSize)",
    layoutName: "GridLayout",
    layoutType: GridLayout,
    component: VirtualScroll,
    getKnobs: getGridLayoutKnobs,
    layoutOptions: GRIDLAYOUT_OPTIONS,
    htmlTemplate: VIRTUAL_SCROLL_HTML_TEMPLATE,
    cssTemplate: GRIDLAYOUT_CSS_TEMPLATE,
    vanillaTemplate: VIRTUAL_SCROLL_VANILLA_TEMPLATE,
    reactTemplate: VIRTUAL_SCROLL_REACT_TEMPLATE,
    angularHTMLTemplate: VIRTUAL_SCROLL_ANGULAR_HTML_TEMPLATE,
    angularComponentTemplate: VIRTUAL_SCROLL_ANGULAR_TEMPLATE,
    vueTemplate: VIRTUAL_SCROLL_VUE_TEMPLATE,
    svelteScriptTemplate: VIRTUAL_SCROLL_SVELTE_SCRIPT_TEMPLATE,
    svelteJSXTemplate: VIRTUAL_SCROLL_SVELTE_JSX_TEMPLATE,
    isDataDelay: false,
    isVirtualScroll: true,
    isEqualSize: true,
    descriptionJSX: <ol className="description">
        <li>If all items are the same size, enable the isEqualSize option.</li>
        <li>If enabled, performance is improved because only the size of one item is calculated.</li>
    </ol>,
    description: `<ol class="description">
    <li>If all items are the same size, enable the isEqualSize option.</li>
    <li>If enabled, performance is improved because only the size of one item is calculated.</li>
</ol>`,
});
