import * as React from "react";
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

function getKeyObject(keys: string[], obj: object) {
    return keys.reduce((prev, key) => {
        if (key in obj) {
            prev[key] = obj[key];
        }
        return prev;
    }, {});
}

export function makeStory(module, exports, {
    component,
    storyName,
    layoutName = storyName,
    title,
    description = "",
    getLayoutArgs,
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
    getLayoutArgs: Function,
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

    const VirtualComponent = component;
    const optionParams = {
        useVirtualScroll: isVirtualScroll,
        useHorizontal: horizontal,
        useIsConstantSize: isContantSize,
        useIsEqualSize: isEqualSize,
    };
    const layoutArgs = getLayoutArgs();
    const optionsKeys = getDefaultOptionKeys(optionParams);
    const layoutOptionsKeys = Object.keys(layoutArgs);
    const func = (props: any) => {
        React.useEffect(() => {
            ga(`${storyName} - ${title}`);
        }, []);

        const layoutProps = getKeyObject(layoutOptionsKeys, props);

        return <VirtualComponent
            title={title}
            storyName={storyName}
            key={Math.random()}
            className={`${layoutName.toLowerCase()} container ${props.horizontal ? "horizontal" : ""} ${props.isEqualSize ? "equal" : ""}`}
            LayoutType={layoutType}
            itemCount={props.itemCount}
            dataDelay={props.dataDelay}
            useFirstRender={props.useFirstRender}
            options={props}
            layoutOptions={layoutProps}
            description={descriptionJSX}
        />;
    };
    func.storyName = title;
    func.parameters = {
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
                    options: optionsKeys,
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
                    options: optionsKeys,
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
                    options: optionsKeys,
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
                    options: optionsKeys,
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
                    options: optionsKeys,
                    layoutOptions,
                    storyName,
                    title,
                    description,
                }),
                language: "jsx",
                codesandbox: DEFAULT_SVELTE_CODESANDBOX(["@egjs/svelte-infinitegrid"]),
            },
        ],
    };

    const options = {
        itemCount: {
            type: "number", default: 10,
            description: "Number of items to be shown at one time(group)",
        },
        dataDelay: {
            type: "number", default: isDataDelay ? 1000 : 0, disable: !isDataDelay,
            description: "Time it takes to asynchronously fetch item data",
        },
        useFirstRender: {
            type: "boolean", default: false, disable: !useFirstRender,
            description: "At the first render, the item is immediately displayed without CSS applied during image processing.",
        },
        ...getDefaultOptions(optionParams),
        ...layoutArgs,
    };
    const argTypes = {};
    const args = {};

    Object.keys(options).forEach(name => {
        const opt = options[name];

        argTypes[name] = {
            control: opt,
            defaultValue: opt.default,
            table: {
                defaultValue: { summary: opt.default },
            },
            description: opt.description,
        };
        args[name] = opt.default;
    });

    func.args = args;
    func.argTypes = argTypes;

    exports[title] = func;

    return {
        title: storyName,
        component: func,
        // decorators: [withPreview],
    };
}
