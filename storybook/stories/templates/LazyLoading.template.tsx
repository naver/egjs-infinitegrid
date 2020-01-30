import * as React from "react";
import { previewTemplate, previewFunction, codeIndent, CODE_TYPE, convertGlobalCSS } from "storybook-addon-preview";
import {
    LazyItem, VANILLA_MARKUP_TEMPLATE, REACT_MARKUP_TEMPLATE,
    ANGULAR_MARKUP_TEMPLATE, VUE_MARKUP_TEMPLATE, SVELTE_MARKUP_TEMPLATE,
    SVELTE_SQUARE_MARKUP_TEMPLATE, VUE_SQUARE_MARKUP_TEMPLATE, ANGULAR_SQUARE_MARKUP_TEMPLATE,
    REACT_SQUARE_MARKUP_TEMPLATE, VANILLA_SQUARE_MARKUP_TEMPLATE
} from "./markup.template";
import { GET_ITEMS_TEMPLATE } from "./default.template";

interface ItemInterface {
    groupKey: number;
    key: number;
}
function getItems(nextGroupKey, nextKey, count) {
    const nextItems: Array<{ groupKey: number, key: number }> = [];

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}

export default function LazyLoading({
    itemCount,
    LayoutType,
    className,
    options,
    layoutOptions,
    loading,
}) {
    const [items, setItems] = React.useState<ItemInterface[]>(getItems(0, 0, itemCount));
    return <LayoutType
        className={className}
        groupBy={item => item.props["data-groupkey"]}
        options={options}
        layoutOptions={layoutOptions}
        loading={loading}
        onAppend={e => {
            const nextGroupKey = (+e.groupKey! || 0) + 1;
            const nextKey = items.length;

            e.startLoading();
            setItems([
                ...items,
                ...getItems(nextGroupKey, nextKey, itemCount),
            ]);
        }}
        onLayoutComplete={e => {
            !e.isLayout && e.endLoading();
        }}
    >
        {items.map(item => <LazyItem data-groupkey={item.groupKey} key={item.key} num={item.key} />)}
    </LayoutType>;
}

const ON_APPEND_TEMPLATE = previewFunction(`function onAppend(e) {
    if (e.currentTarget.isProcessing()) {
        return;
    }
    const nextGroupKey = (typeof e.groupKey === "undefined" ? 0 : +e.groupKey || 0) + 1;
    const nextKey = this.items.length;

    e.startLoading();
    setTimeout(() => {
        //-react this.items = [
        //-react     ...this.items,
        //-react     ...getItems(nextGroupKey, nextKey, itemCount),
        //-react ];
        //react setItems([
        //react     ...this.items,
        //react     ...getItems(nextGroupKey, nextKey, itemCount),
        //react ]);
    }, dataDelay);
}`);
const ON_LAYOUT_COMPLETE_TEMPLATE = previewFunction(`function onLayoutComplete(e) {
    !e.isLayout && e.endLoading();
}`);
export const LOADING_HTML_TEMPLATE = ({ layoutType }) => `
<div class="container ${layoutType}">
</div>
`;

export const LOADING_VANILLA_TEMPLATE = ({ layoutType, layoutOptions }) => {
    return previewTemplate`
import InfiniteGrid, { ${layoutType} } from "@egjs/infinitegrid";
const itemCount = ${"itemCount"};
const dataDelay = ${"dataDelay"};

function getItems(nextGroupKey, count) {
    const nextItems = [];

    for (let i = 0; i < count; ++i) {
        const num = nextGroupKey * count + i;
        nextItems.push(${"`"}${layoutType === "SquareLayout" ? VANILLA_SQUARE_MARKUP_TEMPLATE : VANILLA_MARKUP_TEMPLATE}${"`"});
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
    if (ig.isProcessing()) {
        return;
    }
    const nextGroupKey = (+e.groupKey! || 0) + 1;

    e.startLoading();
    ig.append(getItems(nextGroupKey, itemCount), nextGroupKey);
}).on("layoutComplete", ${ON_LAYOUT_COMPLETE_TEMPLATE(CODE_TYPE.ARROW)});

ig.setLoadingBar(${"`"}<div class="loading">Loading...</div>${"`"});
ig.layout();
    `;
};

export const LOADING_REACT_TEMPLATE = ({ layoutType, layoutOptions }) => {
    return previewTemplate`
import * as React from "react";
import { ${layoutType} } from "@egjs/react-infinitegrid";

const itemCount = ${"itemCount"};
const dataDelay= ${"dataDelay"};
const Item = ({ num }) => ${layoutType === "SquareLayout" ? REACT_SQUARE_MARKUP_TEMPLATE : REACT_MARKUP_TEMPLATE};

${GET_ITEMS_TEMPLATE}

export default function App() {
    const [items, setItems] = React.useState(getItems(0, 0, itemCount));

    return <${layoutType}
        className="${layoutType.toLowerCase()} container"
        loading={<div className="loading">Loading...</div>}
        groupBy={item => item.props["data-groupkey"]}
        options={{
            isOverflowScroll: ${"isOverflowScroll"},
            useRecycle: ${"useRecycle"},
            horizontal: ${"horizontal"},
            useFit: ${"useFit"},
        }}
        layoutOptions={${previewTemplate.object(layoutOptions, {
        indent: 12,
    })}}
        onAppend={${codeIndent(ON_APPEND_TEMPLATE(CODE_TYPE.ARROW, "react"), { indent: 8 })}}
        onLayoutComplete={${codeIndent(ON_LAYOUT_COMPLETE_TEMPLATE(CODE_TYPE.ARROW), { indent: 8 })}}
    >
        {items.map(item => <Item data-groupkey={item.groupKey} key={item.key} num={item.key} />)}
    </${layoutType}>;
}
    `;
};

export const LOADING_ANGULAR_TEMPLATE = ({ layoutOptions }) => {
    return previewTemplate`
import { Component } from "@angular/core";

const itemCount = ${"itemCount"};
const dataDelay = ${"dataDelay"};

${GET_ITEMS_TEMPLATE}

@Component({
    selector: 'app-root',
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    items = getItems(0, 0, ${"itemCount"});
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
    ${codeIndent(ON_LAYOUT_COMPLETE_TEMPLATE(CODE_TYPE.METHOD), { indent: 4 })}
}`;
};
export const LOADING_ANGULAR_HTML_TEMPLATE = ({ layoutType }) => {
    return previewTemplate`
<div
    class="container ${layoutType.toLowerCase()}"
    Ngx${layoutType}
    [options]="options"
    [layoutOptions]="layoutOptions"
    [items]="items"
    [trackBy]="trackBy"
    [groupBy]="groupBy"
    [loading]="loading"
    (append)="onAppend($event)"
    (layoutComplete)="onLayoutComplete($event)"
    #ig
>
    ${codeIndent(layoutType === "SquareLayout" ? ANGULAR_SQUARE_MARKUP_TEMPLATE : ANGULAR_MARKUP_TEMPLATE, { indent: 4 })}
    <div class="loading" #loading>Loading...</div>
</div>
`;
};

export const LOADING_VUE_TEMPLATE = ({ layoutType, layoutOptions, cssTemplate }) => {
    return previewTemplate`
<template>
    <${layoutType}
        class="container ${layoutType.toLowerCase()}"
        :options="options"
        :layoutOptions="layoutOptions"
        @append="onAppend"
        @layout-complete="onLayoutComplete"
    >
        ${codeIndent(layoutType === "SquareLayout" ? VUE_SQUARE_MARKUP_TEMPLATE : VUE_MARKUP_TEMPLATE, { indent: 8 })}
        <div class="loading" slot="loading">Loading...</div>
    </${layoutType}>
</template>
<script>
    import { ${layoutType} } from "@egjs/vue-infinitegrid";

    const itemCount = ${"itemCount"};
    const dataDelay = ${"dataDelay"};
    ${codeIndent(GET_ITEMS_TEMPLATE, { indent: 4 })}

    export default {
        components: {
            ${layoutType},
        },
        data() {
            return {
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
            ${codeIndent(ON_APPEND_TEMPLATE(CODE_TYPE.METHOD), { indent: 12 })},
            ${codeIndent(ON_LAYOUT_COMPLETE_TEMPLATE(CODE_TYPE.METHOD), { indent: 12 })}
        },
    };
</script>
<style scoped>
    ${codeIndent(cssTemplate, { indent: 4 })}
</style>
`;
};

export const LOADING_SVELTE_SCRIPT_TEMPLATE = ({ layoutType, cssTemplate }) => {
    return previewTemplate`
<script>
    import { ${layoutType} } from "@egjs/svelte-infinitegrid";

    const itemCount = ${"itemCount"};
    const dataDelay = ${"dataDelay"};
    let items = getItems(0, 0, itemCount);
    ${codeIndent(GET_ITEMS_TEMPLATE, { indent: 4 })}
</script>
<style>
    ${codeIndent(convertGlobalCSS(cssTemplate, [`.${layoutType.toLowerCase()}`, ".container"]), { indent: 4 })}
</style>`;
};

export const LOADING_SVELTE_JSX_TEMPLATE = ({ layoutType, layoutOptions }) => previewTemplate`
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
    on:layoutComplete={${codeIndent(ON_LAYOUT_COMPLETE_TEMPLATE(CODE_TYPE.CUSTOM_EVENT_ARROW), { indent: 4 })}}
    let:visibleItems>
    {#each visibleItems as item (item.key)}
        ${codeIndent(layoutType === "SquareLayout" ? SVELTE_SQUARE_MARKUP_TEMPLATE : SVELTE_MARKUP_TEMPLATE, { indent: 8 })}
    {/each}
    <div class="loading" slot="loading">Loading...</div>
</${layoutType}>`;
