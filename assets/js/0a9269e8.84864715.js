"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5182],{63217:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(67294),r=n(6277);const i={tabItem:"tabItem_Ymn6"};function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(i.tabItem,l),hidden:n},t)}},42187:(e,t,n)=>{n.d(t,{Z:()=>y});var a=n(7896),r=n(67294),i=n(6277),l=n(81347),o=n(16550),u=n(11026),s=n(63171),d=n(71647);function m(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function p(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??m(n);return function(e){const t=(0,s.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function c(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const a=(0,o.k6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,u._X)(i),(0,r.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(a.location.search);t.set(i,e),a.replace({...a.location,search:t.toString()})}),[i,a])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,i=p(e),[l,o]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!c({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:i}))),[u,s]=g({queryString:n,groupId:a}),[m,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,i]=(0,d.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:a}),v=(()=>{const e=u??m;return c({value:e,tabValues:i})?e:null})();(0,r.useLayoutEffect)((()=>{v&&o(v)}),[v]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!c({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);o(e),s(e),f(e)}),[s,f,i]),tabValues:i}}var v=n(8864);const k={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function h(e){let{className:t,block:n,selectedValue:o,selectValue:u,tabValues:s}=e;const d=[],{blockElementScrollPositionUntilNextRender:m}=(0,l.o5)(),p=e=>{const t=e.currentTarget,n=d.indexOf(t),a=s[n].value;a!==o&&(m(t),u(a))},c=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const n=d.indexOf(e.currentTarget)+1;t=d[n]??d[0];break}case"ArrowLeft":{const n=d.indexOf(e.currentTarget)-1;t=d[n]??d[d.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},t)},s.map((e=>{let{value:t,label:n,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,key:t,ref:e=>d.push(e),onKeyDown:c,onClick:p},l,{className:(0,i.Z)("tabs__item",k.tabItem,l?.className,{"tabs__item--active":o===t})}),n??t)})))}function N(e){let{lazy:t,children:n,selectedValue:a}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},i.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function b(e){const t=f(e);return r.createElement("div",{className:(0,i.Z)("tabs-container",k.tabList)},r.createElement(h,(0,a.Z)({},e,t)),r.createElement(N,(0,a.Z)({},e,t)))}function y(e){const t=(0,v.Z)();return r.createElement(b,(0,a.Z)({key:String(t)},e))}},8470:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>d,default:()=>v,frontMatter:()=>s,metadata:()=>m,toc:()=>c});var a=n(7896),r=(n(67294),n(3905)),i=n(42187),l=n(63217),o=n(63095),u=n(30756);const s={title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},d=void 0,m={unversionedId:"migration-from-v3",id:"version-4.8.1/migration-from-v3",title:"Migration Guide from v3 to v4",description:"Changed Usage",source:"@site/versioned_docs/version-4.8.1/migration-from-v3.mdx",sourceDirName:".",slug:"/migration-from-v3",permalink:"/egjs-infinitegrid/docs/4.8.1/migration-from-v3",draft:!1,editUrl:null,tags:[],version:"4.8.1",frontMatter:{title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},sidebar:"started",previous:{title:"Listening to Events",permalink:"/egjs-infinitegrid/docs/4.8.1/listening-to-events"}},p={},c=[{value:"Changed Usage",id:"changed-usage",level:2},{value:"HTML structure",id:"html-structure",level:2},{value:"Changes when using umd modules",id:"changes-when-using-umd-modules",level:2},{value:"Changed module names",id:"changed-module-names",level:2},{value:"Changed Options",id:"changed-options",level:2},{value:"Changed Events",id:"changed-events",level:2},{value:"Changed Methods",id:"changed-methods",level:2},{value:"Removed Options",id:"removed-options",level:2},{value:"Removed Methods",id:"removed-methods",level:2}],g={toc:c},f="wrapper";function v(e){let{components:t,...n}=e;return(0,r.kt)(f,(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"changed-usage"},"Changed Usage"),(0,r.kt)("p",null,"Double options are combined into one option."),(0,r.kt)(i.Z,{groupId:"modules",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"js",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n\nconst ig = new MasonryInfiniteGrid(".container", {\n  attributePrefix: "data-grid-",\n  column: 5,\n});\n\nig.renderItems();\n'))),(0,r.kt)(l.Z,{value:"react",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\n\n<MasonryInfiniteGrid\n  attributePrefix={"data-grid-"}\n  column={5}\n  >\n  ...\n</MasonryInfiniteGrid>\n'))),(0,r.kt)(l.Z,{value:"vue",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,r.kt)(l.Z,{value:"vue3",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue3-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,r.kt)(l.Z,{value:"angular",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<div NgxMasonryInfiniteGrid\n  [gap]="5"\n  attributePrefix="data-grid-"\n  >\n  ...\n</div>\n'))),(0,r.kt)(l.Z,{value:"svelte",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<script>\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n<\/script>\n<MasonryInfiniteGrid\n  gap={5}\n  attributePrefix={"data-grid-"}\n>\n  ...\n</MasonryInfiniteGrid>\n')))),(0,r.kt)("h2",{id:"html-structure"},"HTML structure"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The option called ",(0,r.kt)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"container"),"."),(0,r.kt)("li",{parentName:"ul"},"If you set the ",(0,r.kt)("inlineCode",{parentName:"li"},"container")," option to true, a container is created inside the wrapper.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"The class name of container has been changed from ",(0,r.kt)("inlineCode",{parentName:"li"},"_eg-infinitegrid-container_")," to ",(0,r.kt)("inlineCode",{parentName:"li"},"infinitegrid-container"))))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html",metastring:"{3}","{3}":!0},'<body>\n  <div class="wrapper">\n    <div class="infinitegrid-container">\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n    </div>\n  </div>\n</body>\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const ig = new InfiniteGrid(".container", {\n  container: true,\n});\n')),(0,r.kt)("h2",{id:"changes-when-using-umd-modules"},"Changes when using umd modules"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"We've removed ",(0,r.kt)("inlineCode",{parentName:"li"},"eg")," namespace on umd modules.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"eg.InfiniteGrid")," is now just ",(0,r.kt)("inlineCode",{parentName:"li"},"InfiniteGrid"))))),(0,r.kt)("h2",{id:"changed-module-names"},"Changed module names"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"From"),(0,r.kt)("th",{parentName:"tr",align:null},"To"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"GridLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"MasonryInfiniteGrid")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"JustifiedLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"JustifiedInfiniteGrid")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"FrameLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"FrameInfiniteGrid")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SquareLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"Integration into MasonryInfiniteGrid")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"PackingLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"PackingInfiniteGrid")))),(0,r.kt)("h2",{id:"changed-options"},"Changed Options"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Default value of ",(0,r.kt)("strong",{parentName:"li"},"attributePrefix")," is now ",(0,r.kt)("inlineCode",{parentName:"li"},"data-grid-")," (was ",(0,r.kt)("inlineCode",{parentName:"li"},"data-"),")"),(0,r.kt)("li",{parentName:"ul"},"The option called ",(0,r.kt)("inlineCode",{parentName:"li"},"margin")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"gap"),"."),(0,r.kt)("li",{parentName:"ul"},"The option called ",(0,r.kt)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"container"),".")),(0,r.kt)("h2",{id:"changed-events"},"Changed Events"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"append")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"requestAppend"),"."),(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"prepend")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"requestPrepend"),"."),(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"layoutComplete")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"renderComplete"),"."),(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"change")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"changeScroll"),"."),(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"imageError")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"contentError"),".")),(0,r.kt)("h2",{id:"changed-methods"},"Changed Methods"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"layout")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"renderItems"),"."),(0,r.kt)("li",{parentName:"ul"},"The method ",(0,r.kt)("inlineCode",{parentName:"li"},"getItems(true)")," can be used as ",(0,r.kt)("inlineCode",{parentName:"li"},"getItems()"),"."),(0,r.kt)("li",{parentName:"ul"},"The method ",(0,r.kt)("inlineCode",{parentName:"li"},"getItems(false)")," can be used as ",(0,r.kt)("inlineCode",{parentName:"li"},"getVisibleItems()"),"."),(0,r.kt)("li",{parentName:"ul"},"The usage of the ",(0,r.kt)("inlineCode",{parentName:"li"},"getStatus")," method has changed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.NOT_REMOVE)"),"(default) gets all infos"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.REMOVE_INVISIBLE_GROUPS)")," gets visible infos"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_ITEMS)")," gets visible infos. However, the information is simplified for invisible items."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_GROUPS)")," gets visible infos. However, invisible items are removed and only the outline remains.")))),(0,r.kt)("h2",{id:"removed-options"},"Removed Options"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The option called ",(0,r.kt)("inlineCode",{parentName:"li"},"transitionDuration")," is removed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Use CSS. See ",(0,r.kt)(o.Z,{to:(0,u.Z)("Guides#use-transition"),mdxType:"Link"},"Guides"))))),(0,r.kt)("h2",{id:"removed-methods"},"Removed Methods"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"startLoading")," is removed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Use a method called ",(0,r.kt)("inlineCode",{parentName:"li"},"wait")," instead."))),(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"endLoading")," is removed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Automatically check whether loading is ended."))),(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"isLoading")," is removed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Use a method called ",(0,r.kt)("inlineCode",{parentName:"li"},"isWait")," instead."))),(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"isProcessing")," is removed.")))}v.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),s=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(u.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),m=s(n),c=r,g=m["".concat(u,".").concat(c)]||m[c]||p[c]||i;return n?a.createElement(g,l(l({ref:t},d),{},{components:n})):a.createElement(g,l({ref:t},d))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=c;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o[m]="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"}}]);