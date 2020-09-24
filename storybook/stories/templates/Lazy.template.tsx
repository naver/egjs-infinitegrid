import * as React from "react";
import { previewTemplate, previewFunction, codeIndent, CODE_TYPE, convertGlobalCSS } from "storybook-addon-preview";
import { VANILLA_MARKUP_TEMPLATE, LazyItem, REACT_LAZY_MARKUP_TEMPLATE, ANGULAR_LAZY_MARKUP_TEMPLATE, VUE_LAZY_MARKUP_TEMPLATE, VANILLA_LAZY_MARKUP_TEMPLATE, SVELTE_LAZY_MARKUP_TEMPLATE } from "./markup.template";
import { GET_ITEMS_TEMPLATE } from "./default.template";
import { IMAGE_SIZES } from "../consts";

const TEXT_IMAGE_SIZES = JSON.stringify(IMAGE_SIZES);

function getItems(nextGroupKey, nextKey, count) {
    const nextItems: Array<{ groupKey: number, key: number }> = [];

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}

export default function LazyLoading({ storyName, itemCount, title, LayoutType, className, options, layoutOptions, useFirstRender }) {
    const [items, setItems] = React.useState(getItems(0, 0, itemCount));

    return <div className="app">
        <h1 className="header">
            <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">{storyName} - {title}</a>
        </h1>
        <ol className="description">
            <li>Open the Network tab of Chrome Dev Tools to test it.</li>
            <li>Disable cache and also change the Throttling to Slow 3G (or Fast 3G)</li>
            <li>If the image has data-width and data-height, it will automatically calculate the ratio even if the image is not loaded.</li>
        </ol>
        <LayoutType
            useFirstRender={useFirstRender}
            className={className}
            groupBy={item => item.props["data-groupkey"]}
            options={options}
            layoutOptions={layoutOptions}
            onAppend={e => {
                const nextGroupKey = (+e.groupKey! || 0) + 1;
                const nextKey = items.length;

                setItems([
                    ...items,
                    ...getItems(nextGroupKey, nextKey, itemCount),
                ]);
            }}
        >
            {items.map(item => <LazyItem data-groupkey={item.groupKey} key={item.key} num={item.key} />)}
        </LayoutType>
    </div>;
}

const ON_APPEND_TEMPLATE = previewFunction(`function onAppend(e) {
    const nextGroupKey = (typeof e.groupKey === "undefined" ? 0 : +e.groupKey || 0) + 1;
    const nextKey = this.items.length;

    this.items = [
        ...this.items,
        ...getItems(nextGroupKey, nextKey, itemCount),
    ];
}`);

export const LAZY_LOADING_HTML_TEMPLATE = ({ storyName, title, layoutType, itemCount = 10, useFirstRender }) => {
    const items: number[] = [];

    if (!useFirstRender) {
        itemCount = 0;
    }
    for (let i = 0; i < itemCount; ++i) {
        items.push(i);
    }
    return `<h1 class="header">
    ${storyName} - ${title}
</h1>
<ol class="description">
    <li>Open the Network tab of Chrome Dev Tools to test it.</li>
    <li>Disable cache and also change the Throttling to Slow 3G (or Fast 3G)</li>
    <li>If the image has data-width and data-height, it will automatically calculate the ratio even if the image is not loaded.</li>
</ol>
<div class="${layoutType} container">
${items.map(i => `    <div class="item" data-groupkey="0">
        <div class="thumbnail">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${i + 1}.jpg" alt="egjs">
        </div>
        <div class="info">egjs ${i}</div>
    </div>`).join("\n")}
</div>
`;
};

export const LAZY_LOADING_VANILLA_TEMPLATE = ({ layoutType, layoutOptions }) => {
    return previewTemplate`
import InfiniteGrid, { ${layoutType} } from "@egjs/infinitegrid";
const itemCount = ${"itemCount"};
const IMAGE_SIZES = ${TEXT_IMAGE_SIZES};

function getItems(nextGroupKey, count) {
    const nextItems = [];

    for (let i = 0; i < count; ++i) {
        const num = nextGroupKey * count + i;
        nextItems.push(${"`"}${VANILLA_LAZY_MARKUP_TEMPLATE}${"`"});
    }
    return nextItems.join("");
}
const ig = new InfiniteGrid(".container", {
    isOverflowScroll: ${"isOverflowScroll"},
    useRecycle: ${"useRecycle"},
    horizontal: ${"horizontal"},
    useFit: ${"useFit"},
});

ig.setLayout(${layoutType}, ${previewTemplate.object(layoutOptions, {
        indent: 4,
    })});

ig.on("append", e => {
    const nextGroupKey = (+e.groupKey! || 0) + 1;

    ig.append(getItems(nextGroupKey, ${"itemCount"}), nextGroupKey);
});

ig.layout();
    `;
};

export const LAZY_LOADING_REACT_TEMPLATE = ({ storyName, title, layoutType, layoutOptions }) => {
    return previewTemplate`
import * as React from "react";
import { ${layoutType} } from "@egjs/react-infinitegrid";

${GET_ITEMS_TEMPLATE}
const IMAGE_SIZES = ${TEXT_IMAGE_SIZES};
const Item = ({ num }) => ${REACT_LAZY_MARKUP_TEMPLATE};

export default function App() {
    const [items, setItems] = React.useState(getItems(0, 0, ${"itemCount"}));

    return <div className="app">
        <h1 className="header">
            ${storyName} - ${title}
        </h1>
        <ol className="description">
            <li>Open the Network tab of Chrome Dev Tools to test it.</li>
            <li>Disable cache and also change the Throttling to Slow 3G (or Fast 3G)</li>
            <li>If the image has data-width and data-height, it will automatically calculate the ratio even if the image is not loaded.</li>
        </ol>
        <${layoutType}
            className="${layoutType.toLowerCase()} container"
            groupBy={item => item.props["data-groupkey"]}
            options={{
                isOverflowScroll: ${"isOverflowScroll"},
                useRecycle: ${"useRecycle"},
                horizontal: ${"horizontal"},
                useFit: ${"useFit"},
            }}
            layoutOptions={${previewTemplate.object(layoutOptions, {
                indent: 16,
            })}}
            onAppend={e => {
                const nextGroupKey = (+e.groupKey! || 0) + 1;
                const nextKey = items.length;

                setItems([
                    ...items,
                    ...getItems(nextGroupKey, nextKey, ${"itemCount"}),
                ]);
            }}>
            {items.map(item => <Item data-groupkey={item.groupKey} key={item.key} num={item.key} />)}
        </${layoutType}>
    </div>;
}
    `;
};

export const LAZY_LOADING_ANGULAR_TEMPLATE = ({ layoutOptions }) => {
    return previewTemplate`
import { Component } from "@angular/core";

const itemCount = ${"itemCount"};

${GET_ITEMS_TEMPLATE}

@Component({
    selector: 'app-root',
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    items = getItems(0, 0, ${"itemCount"});
    IMAGE_SIZE = ${TEXT_IMAGE_SIZES};
    options = {
        isOverflowScroll: ${"isOverflowScroll"},
        useRecycle: ${"useRecycle"},
        horizontal: ${"horizontal"},
        useFit: ${"useFit"},
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
    ${codeIndent(ON_APPEND_TEMPLATE(CODE_TYPE.METHOD), { indent: 4 })}
}`;
};
export const LAZY_LOADING_ANGULAR_HTML_TEMPLATE = ({ storyName, title, layoutType }) => {
    return previewTemplate`
<h1 class="header">
    ${storyName} - ${title}
</h1>
<ol class="description">
    <li>Open the Network tab of Chrome Dev Tools to test it.</li>
    <li>Disable cache and also change the Throttling to Slow 3G (or Fast 3G)</li>
    <li>If the image has data-width and data-height, it will automatically calculate the ratio even if the image is not loaded.</li>
</ol>
<div
    class="container ${layoutType.toLowerCase()}"
    Ngx${layoutType}
    [options]="options"
    [layoutOptions]="layoutOptions"
    [items]="items"
    [trackBy]="trackBy"
    [groupBy]="groupBy"
    (append)="onAppend($event)"
    #ig
>
    ${codeIndent(ANGULAR_LAZY_MARKUP_TEMPLATE, { indent: 4 })}
</div>
`;
};

export const LAZY_LOADING_VUE_TEMPLATE = ({ storyName, title, layoutType, layoutOptions, cssTemplate }) => {
    return previewTemplate`
<template>
    <div class="app">
        <h1 class="header">
            ${storyName} - ${title}
        </h1>
        <ol class="description">
            <li>Open the Network tab of Chrome Dev Tools to test it.</li>
            <li>Disable cache and also change the Throttling to Slow 3G (or Fast 3G)</li>
            <li>If the image has data-width and data-height, it will automatically calculate the ratio even if the image is not loaded.</li>
        </ol>
        <${layoutType}
            class="container ${layoutType.toLowerCase()}"
            :options="options"
            :layoutOptions="layoutOptions"
            @append="onAppend"
        >
            ${codeIndent(VUE_LAZY_MARKUP_TEMPLATE, { indent: 12 })}
        </${layoutType}>
    </div>
</template>
<script>
    import { ${layoutType} } from "@egjs/vue-infinitegrid";

    const itemCount = ${"itemCount"};
    ${codeIndent(GET_ITEMS_TEMPLATE, { indent: 4 })}

    export default {
        components: {
            ${layoutType},
        },
        data() {
            return {
                IMAGE_SIZES: ${TEXT_IMAGE_SIZES},
                items: getItems(0, 0, itemCount),
                options: {
                    isOverflowScroll: ${"isOverflowScroll"},
                    useRecycle: ${"useRecycle"},
                    horizontal: ${"horizontal"},
                    useFit: ${"useFit"},
                },
                layoutOptions: ${previewTemplate.object(layoutOptions, { indent: 20 })},
            };
        },
        methods: {
            ${codeIndent(ON_APPEND_TEMPLATE(CODE_TYPE.METHOD), { indent: 12 })}
        },
    };
</script>
<style scoped>
    ${codeIndent(cssTemplate, { indent: 4 })}
</style>
`;
};

export const LAZY_LOADING_SVELTE_SCRIPT_TEMPLATE = ({ layoutType, cssTemplate }) => {
    return previewTemplate`
<script>
    import { ${layoutType} } from "@egjs/svelte-infinitegrid";

    const itemCount = ${"itemCount"};
    const IMAGE_SIZES = ${IMAGE_SIZES};
    let items = getItems(0, 0, itemCount);
    ${codeIndent(GET_ITEMS_TEMPLATE, { indent: 4 })}
</script>
<style>
    ${codeIndent(convertGlobalCSS(cssTemplate, [`.${layoutType.toLowerCase()}`, ".container", "html", "body"]), { indent: 4 })}
</style>`;
};

export const LAZY_LOADING_SVELTE_JSX_TEMPLATE = ({ storyName, title, layoutType, layoutOptions }) => previewTemplate`
<h1 class="header">
    ${storyName} - ${title}
</h1>
<ol class="description">
    <li>Open the Network tab of Chrome Dev Tools to test it.</li>
    <li>Disable cache and also change the Throttling to Slow 3G (or Fast 3G)</li>
    <li>If the image has data-width and data-height, it will automatically calculate the ratio even if the image is not loaded.</li>
</ol>
<${layoutType}
    class="container ${layoutType.toLowerCase()}"
    items={items}
    itemBy={item => item.key}
    groupBy={item => item.groupKey}
    status={null}
    options={{
        isOverflowScroll: ${"isOverflowScroll"},
        useRecycle: ${"useRecycle"},
        horizontal: ${"horizontal"},
        useFit: ${"useFit"},
    }}
    layoutOptions={${previewTemplate.object(layoutOptions, {
    indent: 8,
})}}
    on:append={${codeIndent(ON_APPEND_TEMPLATE(CODE_TYPE.CUSTOM_EVENT_ARROW), { indent: 4 })}}
    let:visibleItems>
    {#each visibleItems as item (item.key)}
        ${codeIndent(SVELTE_LAZY_MARKUP_TEMPLATE, { indent: 8 })}
    {/each}
</${layoutType}>`;
