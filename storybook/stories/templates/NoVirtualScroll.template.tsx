import * as React from "react";
import { previewTemplate, previewFunction, codeIndent, CODE_TYPE, convertGlobalCSS } from "storybook-addon-preview";
import { VANILLA_MARKUP_TEMPLATE, REACT_MARKUP_TEMPLATE, ANGULAR_MARKUP_TEMPLATE, VUE_MARKUP_TEMPLATE, SVELTE_MARKUP_TEMPLATE, SVELTE_SQUARE_MARKUP_TEMPLATE, VUE_SQUARE_MARKUP_TEMPLATE, ANGULAR_SQUARE_MARKUP_TEMPLATE, REACT_SQUARE_MARKUP_TEMPLATE, VANILLA_SQUARE_MARKUP_TEMPLATE, Item } from "./markup.template";
import { GET_ITEMS_TEMPLATE } from "./default.template";

export default function NoVirtualScroll({ storyName, title, LayoutType, className, options, layoutOptions, useFirstRender }) {
    return <div className="app">
        <h1 className="header">
            <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">{storyName} - {title}</a>
        </h1>
        <LayoutType
            key={Math.random()}
            useFirstRender={useFirstRender}
            className={className}
            groupBy={item => item.props["data-groupkey"]}
            LayoutType={LayoutType}
            options={options}
            layoutOptions={layoutOptions}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
                return <Item num={i} key={i} />;
            })}
        </LayoutType>
    </div>;
}

export const NO_VIRTUAL_SCROLL_VANILLA_TEMPLATE = ({ layoutType, layoutOptions }) => previewTemplate`
import InfiniteGrid, { ${layoutType} } from "@egjs/infinitegrid";

const ig = new InfiniteGrid(".container", {
    isOverflowScroll: ${"isOverflowScroll"},
    horizontal: ${"horizontal"},
});

ig.setLayout(${layoutType}, ${previewTemplate.object(layoutOptions, {
    indent: 4,
})});
ig.layout();
`;
export const NO_VIRTUAL_SCROLL_REACT_TEMPLATE = ({ title, storyName, layoutType, layoutOptions }) => {
    return previewTemplate`
import * as React from "react";
import { ${layoutType} } from "@egjs/react-infinitegrid";

const Item = ({ num }) => ${REACT_MARKUP_TEMPLATE};

export default function App() {
    return <div className="app">
        <h1 className="header">
            <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
        </h1>
        <${layoutType}
            className="${layoutType.toLowerCase()} container"
            options={{
                horizontal: ${"horizontal"},
                isOverflowScroll: ${"isOverflowScroll"},
            }}
            layoutOptions={${previewTemplate.object(layoutOptions, {
                indent: 16,
            })}}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
                return <Item num={i} key={i}/>
            })}
        </${layoutType}>
    </div>;
}
        `;
};
export const NO_VIRTUAL_SCROLL_ANGULAR_TEMPLATE = ({ layoutOptions }) => {
    return previewTemplate`
import { Component, ViewChild } from "@angular/core";

${GET_ITEMS_TEMPLATE}

@Component({
    selector: 'app-root',
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    items = getItems(0, 0, 10);
    options = {
        horizontal: ${"horizontal"},
        isOverflowScroll: ${"isOverflowScroll"},
    };
    layoutOptions = ${previewTemplate.object(layoutOptions, {
        indent: 8,
    })};
    groupBy(index, item) {
        return item.groupKey;
    }
    trackBy(index, item) {
        return item.key;
    }
}`;
};
export const NO_VIRTUAL_SCROLL_ANGULAR_HTML_TEMPLATE = ({ storyName, title, layoutType }) => {
    return previewTemplate`
<h1 class="header">
    <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
</h1>
<div
    class="container ${layoutType.toLowerCase()}"
    Ngx${layoutType}
    [options]="options"
    [layoutOptions]="layoutOptions"
    [items]="items"
    [trackBy]="trackBy"
    [groupBy]="groupBy"
    #ig
>
    ${codeIndent(ANGULAR_MARKUP_TEMPLATE, { indent: 4 })}
</div>
`;
};

export const NO_VIRTUAL_SCROLL_VUE_TEMPLATE = ({ storyName, title, layoutType, layoutOptions, cssTemplate }) => {
    return previewTemplate`
<template>
    <div class="app">
        <h1 class="header">
            <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
        </h1>
        <${layoutType}
            class="container ${layoutType.toLowerCase()}"
            :options="options"
            :layoutOptions="layoutOptions"
        >
            ${codeIndent(VUE_MARKUP_TEMPLATE, { indent: 12 })}
        </${layoutType}>
    </div>
</template>
<script>
    import { ${layoutType} } from "@egjs/vue-infinitegrid";

    ${codeIndent(GET_ITEMS_TEMPLATE, { indent: 4 })}
    export default {
        components: {
            ${layoutType},
        },
        data() {
            return {
                items: getItems(0, 0, 10),
                options: {
                    horizontal: ${"horizontal"},
                    isOverflowScroll: ${"isOverflowScroll"},
                },
                layoutOptions: ${previewTemplate.object(layoutOptions, {
        indent: 20,
    })},
            };
        },
    };
</script>
<style scoped>
    ${codeIndent(cssTemplate, { indent: 4 })}
</style>
`;
};

export const NO_VIRTUAL_SCROLL_SVELTE_SCRIPT_TEMPLATE = ({ layoutType, cssTemplate }) => {
    return previewTemplate`
<script>
    import { ${layoutType} } from "@egjs/svelte-infinitegrid";

    ${codeIndent(GET_ITEMS_TEMPLATE, { indent: 4 })}
    const items = getItems(0, 0, 10);
</script>
<style>
    ${codeIndent(convertGlobalCSS(cssTemplate, [`.${layoutType.toLowerCase()}`, ".container"]), { indent: 4 })}
</style>`;
};

export const NO_VIRTUAL_SCROLL_SVELTE_JSX_TEMPLATE = ({ storyName, title, layoutType, layoutOptions }) => previewTemplate`
<h1 class="header">
    <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
</h1>
<${layoutType}
    class="container ${layoutType.toLowerCase()}"
    items={items}
    itemBy={item => item.key}
    groupBy={item => item.groupKey}
    status={null}
    options={{
        horizontal: ${"horizontal"},
        isOverflowScroll: ${"isOverflowScroll"},
    }}
    layoutOptions={${previewTemplate.object(layoutOptions, {
    indent: 8,
})}}
    let:visibleItems>
    {#each visibleItems as item (item.key)}
        ${codeIndent(SVELTE_MARKUP_TEMPLATE, { indent: 8 })}
    {/each}
</${layoutType}>`;
