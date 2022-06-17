/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/indent */
import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

import { convertClassName, convertMaintained, convertOptions, decamelize } from "./utils";

export default (props: {
  htmlCode: string;
  jsCode: string;
  reactCode: string;
  vueCode: string;
  angularComponentCode: string;
  angularHTMLCode: string;
  svelteCode: string;
  className: string;
  hasMaintained: boolean;
  options: Record<string, any>;
}) => {
  const className = props.className;
  const hasMaintained = props.hasMaintained;
  const options = props.options || { gap: 5 };
  const deClassName = decamelize(className);

  const htmlCode =  props.htmlCode;
  const angularComponentCode = props.angularComponentCode;
  let jsCode = convertClassName(props.jsCode, className, deClassName);
  let reactCode = convertClassName(props.reactCode, className, deClassName);
  let vueCode = convertClassName(props.vueCode, className, deClassName);
  let angularHTMLCode = convertClassName(props.angularHTMLCode, className, deClassName);
  let svelteCode = convertClassName(props.svelteCode, className, deClassName);

  jsCode = convertOptions(jsCode, options, (name, value) => `  ${name}: ${JSON.stringify(value)},`);
  reactCode = convertOptions(reactCode, options, (name, value) => `    ${name}={${JSON.stringify(value)}}`);
  vueCode = convertOptions(vueCode, options, (name, value) => `    v-bind:${name}="${JSON.stringify(value)}"`);
  angularHTMLCode = convertOptions(angularHTMLCode, options, (name, value) => `  [${name}]="${JSON.stringify(value)}"`);
  svelteCode = convertOptions(svelteCode, options, (name, value) => `  ${name}={${JSON.stringify(value)}}`);

  jsCode = convertMaintained(jsCode, hasMaintained);
  reactCode = convertMaintained(reactCode, hasMaintained);
  vueCode = convertMaintained(vueCode, hasMaintained);
  angularHTMLCode = convertMaintained(angularHTMLCode, hasMaintained);
  svelteCode = convertMaintained(svelteCode, hasMaintained);

  return <Tabs
    groupId="cfc"
    defaultValue="js"
    values={[
      { label: "JavaScript", value: "js" },
      { label: "React", value: "react" },
      { label: "Vue@2", value: "vue" },
      { label: "Vue@3", value: "vue3" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ]}>
    <TabItem value="js">
    <CodeBlock className="language-html">
      {htmlCode}
    </CodeBlock>

      <CodeBlock className="language-js">
        {jsCode}
      </CodeBlock>
    </TabItem>
    <TabItem value="react">
      <CodeBlock className="language-jsx">
        {reactCode}
      </CodeBlock>
    </TabItem>
    <TabItem value="vue">
      <CodeBlock className="language-html">
        {vueCode}
      </CodeBlock>
    </TabItem>
    <TabItem value="vue3">
      <CodeBlock className="language-html">
        {vueCode.replace("vue-infinitegrid", "vue3-infinitegrid")}
      </CodeBlock>
    </TabItem>
    <TabItem value="angular">
      <CodeBlock className="language-html">
        {angularHTMLCode}
      </CodeBlock>

      <CodeBlock className="language-ts">
        {angularComponentCode}
      </CodeBlock>
    </TabItem>
    <TabItem value="svelte">
      <CodeBlock className="language-html">
        {svelteCode}
      </CodeBlock>
    </TabItem>
  </Tabs>;
};
