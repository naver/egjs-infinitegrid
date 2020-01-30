import * as React from "react";
import { previewTemplate, previewFunction, codeIndent, CODE_TYPE, convertGlobalCSS } from "storybook-addon-preview";
import { VANILLA_MARKUP_TEMPLATE, REACT_MARKUP_TEMPLATE, ANGULAR_MARKUP_TEMPLATE, VUE_MARKUP_TEMPLATE, SVELTE_MARKUP_TEMPLATE, SVELTE_SQUARE_MARKUP_TEMPLATE, VUE_SQUARE_MARKUP_TEMPLATE, ANGULAR_SQUARE_MARKUP_TEMPLATE, REACT_SQUARE_MARKUP_TEMPLATE, VANILLA_SQUARE_MARKUP_TEMPLATE, Item } from "./markup.template";
import { GET_ITEMS_TEMPLATE } from "./default.template";

function getItems(nextGroupKey, nextKey, count) {
    const nextItems: Array<{ groupKey: number, key: number }> = [];

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}

export default function VirtualScroll({ storyName, title, description, itemCount, LayoutType, className, options, layoutOptions, useFirstRender }) {
    const [items, setItems] = React.useState(getItems(0, 0, itemCount));
    return <div className="app">
        <h1 className="header">
            <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">{storyName} - {title}</a>
        </h1>
        {description}
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
            {items.map(item => <Item data-groupkey={item.groupKey} key={item.key} num={item.key} />)}
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
export const VIRTUAL_SCROLL_HTML_TEMPLATE = ({ storyName, title, description, layoutType }) => `
<h1 class="header">
    <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
</h1>
${description}
<div class="container ${layoutType}">
</div>
`;

export const VIRTUAL_SCROLL_VANILLA_TEMPLATE = ({ layoutType, options, layoutOptions }) => {
    return previewTemplate`
import InfiniteGrid, { ${layoutType} } from "@egjs/infinitegrid";
const itemCount = ${"itemCount"};

function getItems(nextGroupKey, count) {
    const nextItems = [];

    for (let i = 0; i < count; ++i) {
        const num = nextGroupKey * count + i;
        nextItems.push(${"`"}${layoutType === "SquareLayout" ? VANILLA_SQUARE_MARKUP_TEMPLATE : VANILLA_MARKUP_TEMPLATE}${"`"});
    }
    return nextItems.join("");
}
const ig = new InfiniteGrid(".container", ${previewTemplate.object(options, {
    indent: 4,
})});

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

export const VIRTUAL_SCROLL_REACT_TEMPLATE = ({ storyName, title, description, layoutType, options, layoutOptions }) => {
    return previewTemplate`
import * as React from "react";
import { ${layoutType} } from "@egjs/react-infinitegrid";

${GET_ITEMS_TEMPLATE}
const Item = ({ num }) => ${layoutType === "SquareLayout" ? REACT_SQUARE_MARKUP_TEMPLATE : REACT_MARKUP_TEMPLATE};

export default function App() {
    const [items, setItems] = React.useState(getItems(0, 0, ${"itemCount"}));

    return <div className="app">
        <h1 className="header">
            <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
        </h1>
        ${codeIndent(description.replace("class", "className"), { indent: 8, endIndet: 8 })}
        <${layoutType}
            className="${layoutType.toLowerCase()} container"
            groupBy={item => item.props["data-groupkey"]}
            options={${previewTemplate.object(options, {
                indent: 16,
            })}}
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

export const VIRTUAL_SCROLL_ANGULAR_TEMPLATE = ({ options, layoutOptions }) => {
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
    options = ${previewTemplate.object(options, {
        indent: 8,
    })};
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
export const VIRTUAL_SCROLL_ANGULAR_HTML_TEMPLATE = ({ storyName, title, description, layoutType }) => {
    return previewTemplate`
<h1 class="header">
    <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
</h1>
${description}
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
    ${codeIndent(layoutType === "SquareLayout" ? ANGULAR_SQUARE_MARKUP_TEMPLATE : ANGULAR_MARKUP_TEMPLATE, { indent: 4 })}
</div>
`;
};

export const VIRTUAL_SCROLL_VUE_TEMPLATE = ({ storyName, title, description, layoutType, options, layoutOptions, cssTemplate }) => {
    return previewTemplate`
<template>
    <div class="app">
        <h1 class="header">
            <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
        </h1>
        ${codeIndent(description, { indent: 8, endIndet: 8 })}
        <${layoutType}
            class="container ${layoutType.toLowerCase()}"
            :options="options"
            :layoutOptions="layoutOptions"
            @append="onAppend"
        >
            ${codeIndent(layoutType === "SquareLayout" ? VUE_SQUARE_MARKUP_TEMPLATE : VUE_MARKUP_TEMPLATE, { indent: 12 })}
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
                items: getItems(0, 0, itemCount),
                options: ${previewTemplate.object(options, {
                    indent: 20,
                })},
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

export const VIRTUAL_SCROLL_SVELTE_SCRIPT_TEMPLATE = ({ layoutType, cssTemplate }) => {
    return previewTemplate`
<script>
    import { ${layoutType} } from "@egjs/svelte-infinitegrid";

    const itemCount = ${"itemCount"};
    let items = getItems(0, 0, itemCount);
    ${codeIndent(GET_ITEMS_TEMPLATE, { indent: 4 })}
</script>
<style>
    ${codeIndent(convertGlobalCSS(cssTemplate, [`.${layoutType.toLowerCase()}`, ".container", "html", "body"]), { indent: 4 })}
</style>`;
};

export const VIRTUAL_SCROLL_SVELTE_JSX_TEMPLATE = ({ storyName, title, description, layoutType, options, layoutOptions }) => previewTemplate`
<h1 class="header">
    <a href="https://github.com/naver/egjs-infinitegrid" target="_blank">${storyName} - ${title}</a>
</h1>
${description}
<${layoutType}
    class="container ${layoutType.toLowerCase()}"
    items={items}
    itemBy={item => item.key}
    groupBy={item => item.groupKey}
    status={null}
    options={${previewTemplate.object(options, {
        indent: 8,
    })}}
    layoutOptions={${previewTemplate.object(layoutOptions, {
    indent: 8,
})}}
    on:append={${codeIndent(ON_APPEND_TEMPLATE(CODE_TYPE.CUSTOM_EVENT_ARROW), { indent: 4 })}}
    let:visibleItems>
    {#each visibleItems as item (item.key)}
        ${codeIndent(layoutType === "SquareLayout" ? SVELTE_SQUARE_MARKUP_TEMPLATE : SVELTE_MARKUP_TEMPLATE, { indent: 8 })}
    {/each}
</${layoutType}>`;
