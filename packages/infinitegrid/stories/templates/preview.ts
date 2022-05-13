import {
  DEFAULT_VANILLA_CODESANDBOX,
  DEFAULT_REACT_CODESANDBOX,
  DEFAULT_ANGULAR_CODESANDBOX,
  DEFAULT_SVELTE_CODESANDBOX,
  DEFAULT_VUE_CODESANDBOX,
} from "storybook-addon-preview";
import {
  convertVanillaTemplate, convertPath, convertTemplate,
  convertReactTemplate, convertAngularHTMLTemplate,
  convertSvelteTemplate, convertVueTemplate, convertAngularTemplate,
} from "./utils";

export function getPreview(folderName: string, fileName: string, {
  htmlCode = require(`!!raw-loader!./default.html`).default,
  cssCode = require(`!!raw-loader!./default.css`).default,
  vanillaCode = require(`!!raw-loader!../${folderName}/apps/Vanilla${fileName}App`).default,
} = {}) {
  const reactCode = require(`!!raw-loader!../../../react-infinitegrid/stories/${folderName}/apps/React${fileName}App`).default;
  let ngxComponentCode = require(`!!raw-loader!../../../ngx-infinitegrid/stories/${folderName}/apps/Ngx${fileName}App/app.component.ts`).default;

  ngxComponentCode = ngxComponentCode.replace(/"(.+)\.css"/g, `"./app.component.css"`);
  const ngxHTMLCode = require(`!!raw-loader!../../../ngx-infinitegrid/stories/${folderName}/apps/Ngx${fileName}App/app.component.html`).default;
  const ngxModuleCode = require(`!!raw-loader!../../../ngx-infinitegrid/stories/apps/default/app.module.ts`).default;
  const vueCode = require(`!!raw-loader!../../../vue-infinitegrid/stories/${folderName}/apps/Vue${fileName}App.vue`).default;
  const svelteCode = require(`!!raw-loader!../../../svelte-infinitegrid/stories/${folderName}/apps/Svelte${fileName}App.svelte`).default;

  return [
    {
      tab: "HTML",
      template: htmlCode,
      language: "html",
      codesandbox: DEFAULT_VANILLA_CODESANDBOX(["@egjs/infinitegrid"]),
      copy: true,
    },
    {
      tab: "CSS",
      template: cssCode,
      language: "css",
    },
    {
      tab: "Vanilla",
      template: convertVanillaTemplate(convertPath(vanillaCode, "src", "@egjs/infinitegrid")),
      language: "tsx",
      codesandbox: DEFAULT_VANILLA_CODESANDBOX(["@egjs/infinitegrid"]),
      copy: true,
    },
    {
      tab: "React",
      template: convertReactTemplate(convertPath(reactCode, "src", "@egjs/react-infinitegrid")),
      language: "tsx",
      codesandbox: DEFAULT_REACT_CODESANDBOX(["@egjs/react-infinitegrid"]),
      copy: true,
    },
    {
      tab: "Angular",
      template: convertAngularHTMLTemplate(convertPath(ngxHTMLCode, "src", "@egjs/ngx-infinitegrid")),
      language: "tsx",
      description: "app.component.html",
      codesandbox: DEFAULT_ANGULAR_CODESANDBOX(["@egjs/ngx-infinitegrid"]),
      copy: true,
    },
    {
      tab: "Angular",
      template: convertAngularTemplate(convertPath(ngxComponentCode, "src", "@egjs/ngx-infinitegrid")),
      language: "tsx",
      description: "app.component.ts",
      codesandbox: DEFAULT_ANGULAR_CODESANDBOX(["@egjs/ngx-infinitegrid"]),
      copy: true,
    },
    {
      tab: "Angular",
      template: convertTemplate(convertPath(ngxModuleCode, "src", "@egjs/ngx-infinitegrid")),
      language: "tsx",
      description: "app.module.ts",
      codesandbox: DEFAULT_ANGULAR_CODESANDBOX(["@egjs/ngx-infinitegrid"]),
      copy: true,
    },
    {
      tab: "Vue",
      template: convertVueTemplate(convertPath(vueCode, "src", "@egjs/vue-infinitegrid")),
      language: "html",
      codesandbox: DEFAULT_VUE_CODESANDBOX(["@egjs/vue-infinitegrid"]),
      copy: true,
    },
    {
      tab: "Svelte",
      template: convertSvelteTemplate(convertPath(svelteCode, "src", "@egjs/svelte-infinitegrid"), cssCode),
      language: "html",
      codesandbox: DEFAULT_SVELTE_CODESANDBOX(["@egjs/svelte-infinitegrid"]),
      copy: true,
    },
  ];
}
