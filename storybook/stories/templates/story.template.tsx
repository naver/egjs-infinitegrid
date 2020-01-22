import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";
import {
    withPreview,
    DEFAULT_VANILLA_CODESANDBOX,
    DEFAULT_REACT_CODESANDBOX,
    DEFAULT_ANGULAR_CODESANDBOX,
    DEFAULT_SVELTE_CODESANDBOX,
    DEFAULT_VUE_CODESANDBOX,
} from "storybook-addon-preview";
import { DEFAULT_ANGULAR_MODULE_TEMPLATE } from "./default.template";
import { IMAGE_SIZES } from "../consts";
import { getDefaultOptions, getDefaultOptionKeys } from "./layout.template";
import { ga } from "../ga";

export function makeStory(module, {
    component,
    storyName,
    layoutName = storyName,
    title,
    description = "",
    getKnobs,
    layoutType,
    layoutOptions,
    htmlTemplate,
    cssTemplate,
    vanillaTemplate,
    reactTemplate,
    angularHTMLTemplate,
    angularComponentTemplate,
    vueTemplate,
    svelteScriptTemplate,
    svelteJSXTemplate,
    isDataDelay,
    isVirtualScroll,
    useFirstRender,
    horizontal = true,
    isContantSize,
    isEqualSize,
    descriptionJSX = null,
}: {
    component: any,
    storyName: string,
    layoutName: string,
    title: string,
    layoutType: any,
    getKnobs: Function,
    layoutOptions: string[],
    htmlTemplate: any,
    cssTemplate: any,
    vanillaTemplate: any,
    reactTemplate: any,
    angularHTMLTemplate: any,
    angularComponentTemplate: any,
    vueTemplate: any,
    svelteScriptTemplate: any,
    svelteJSXTemplate: any,
    isDataDelay: boolean,
    isVirtualScroll: boolean,
    useFirstRender?: boolean,
    horizontal?: boolean,
    isContantSize?: boolean,
    isEqualSize?: boolean,
    description?: string,
    descriptionJSX?: any,
}) {
    const stories = storiesOf(storyName, module);
    const VirtualComponent = component;
    const optionParams = {
        useVirtualScroll: isVirtualScroll,
        useHorizontal: horizontal,
        useIsConstantSize: isContantSize,
        useIsEqualSize: isEqualSize,
    };
    const optionKeys = getDefaultOptionKeys(optionParams);

    stories.addDecorator(withKnobs).addDecorator(withPreview);
    stories.add(title, e => {
        const itemCount = isVirtualScroll ? number("itemCount", 10) : 10;
        const dataDelay = isDataDelay ? number("dataDelay", 1000) : 0;
        const options = getDefaultOptions(optionParams);

        React.useEffect(() => {
            ga(`${storyName} - ${title}`);
        }, []);
        return <VirtualComponent
            title={title}
            storyName={storyName}
            key={Math.random()}
            className={`${layoutName.toLowerCase()} container ${options.horizontal ? "horizontal" : ""} ${options.isEqualSize ? "equal" : ""}`}
            itemCount={itemCount}
            LayoutType={layoutType}
            useFirstRender={useFirstRender ? boolean("useFirstRender", false) : false}
            options={options}
            layoutOptions={getKnobs()}
            dataDelay={dataDelay}
            description={descriptionJSX}
        />;
    }, {
        preview: [
            {
                tab: "HTML",
                template: htmlTemplate,
                language: "html",
                knobs: {
                    sizes: IMAGE_SIZES,
                    layoutType: layoutName.toLowerCase(),
                    storyName,
                    title,
                    description,
                },
                copy: true,
            },
            {
                tab: "CSS",
                template: cssTemplate,
                language: "css",
                copy: true,
            },
            {
                tab: "Vanilla",
                template: vanillaTemplate({
                    layoutType: layoutName,
                    options: optionKeys,
                    layoutOptions,
                    storyName,
                    title,
                    description,
                }),
                language: "tsx",
                codesandbox: DEFAULT_VANILLA_CODESANDBOX(["@egjs/infinitegrid"]),
                copy: true,
            },
            {
                tab: "React",
                template: reactTemplate({
                    layoutType: layoutName,
                    options: optionKeys,
                    layoutOptions,
                    storyName,
                    title,
                    description,
                }),
                language: "tsx",
                codesandbox: DEFAULT_REACT_CODESANDBOX(["@egjs/react-infinitegrid"]),
                copy: true,
            },
            {
                tab: "Angular",
                description: "app.component.html",
                template: angularHTMLTemplate({
                    layoutType: layoutName,
                    storyName,
                    title,
                    description,
                }),
                language: "markup",
                codesandbox: DEFAULT_ANGULAR_CODESANDBOX(["@egjs/ngx-infinitegrid"]),
                copy: true,
            },

            {
                tab: "Angular",
                description: "app.component.ts",
                template: angularComponentTemplate({
                    options: optionKeys,
                    layoutOptions,
                }),
                language: "tsx",
                codesandbox: DEFAULT_ANGULAR_CODESANDBOX(["@egjs/ngx-infinitegrid"]),
                copy: true,
            },
            {
                tab: "Angular",
                description: "app.module.ts",
                template: DEFAULT_ANGULAR_MODULE_TEMPLATE,
                language: "typescript",
                codesandbox: DEFAULT_ANGULAR_CODESANDBOX(["@egjs/ngx-infinitegrid"]),
                copy: true,
            },
            {
                tab: "Vue",
                template: vueTemplate({
                    layoutType: layoutName,
                    options: optionKeys,
                    layoutOptions,
                    cssTemplate,
                    storyName,
                    title,
                    description,
                }),
                language: "html",
                codesandbox: DEFAULT_VUE_CODESANDBOX(["@egjs/vue-infinitegrid"]),
                copy: true,
            },
            {
                tab: "Svelte",
                template: svelteScriptTemplate({
                    layoutType: layoutName,
                    cssTemplate,
                }),
                language: "html",
                codesandbox: DEFAULT_SVELTE_CODESANDBOX(["@egjs/svelte-infinitegrid"]),
                copy: true,
            },
            {
                tab: "Svelte",
                continue: true,
                template: svelteJSXTemplate({
                    layoutType: layoutName,
                    options: optionKeys,
                    layoutOptions,
                    storyName,
                    title,
                    description,
                }),
                language: "jsx",
                codesandbox: DEFAULT_SVELTE_CODESANDBOX(["@egjs/svelte-infinitegrid"]),
            },
        ],
    });
}
