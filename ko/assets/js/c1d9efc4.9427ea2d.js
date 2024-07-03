"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4338],{58032:(e,n,t)=>{t.d(n,{A:()=>l});var a=t(96540),r=t(9546);const i={tabItem:"tabItem_Ymn6"};function l(e){let{children:n,hidden:t,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.A)(i.tabItem,l),hidden:t},n)}},13488:(e,n,t)=>{t.d(n,{A:()=>I});var a=t(89575),r=t(96540),i=t(9546),l=t(61009),o=t(56347),u=t(77754),s=t(63651),d=t(21873);function m(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:r}}=e;return{value:n,label:t,attributes:a,default:r}}))}function g(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??m(t);return function(e){const n=(0,s.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function c(e){let{queryString:n=!1,groupId:t}=e;const a=(0,o.W6)(),i=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,u.aZ)(i),(0,r.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(a.location.search);n.set(i,e),a.replace({...a.location,search:n.toString()})}),[i,a])]}function y(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,i=g(e),[l,o]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:i}))),[u,s]=c({queryString:t,groupId:a}),[m,y]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,i]=(0,d.Dv)(t);return[a,(0,r.useCallback)((e=>{t&&i.set(e)}),[t,i])]}({groupId:a}),f=(()=>{const e=u??m;return p({value:e,tabValues:i})?e:null})();(0,r.useLayoutEffect)((()=>{f&&o(f)}),[f]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);o(e),s(e),y(e)}),[s,y,i]),tabValues:i}}var f=t(6642);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function h(e){let{className:n,block:t,selectedValue:o,selectValue:u,tabValues:s}=e;const d=[],{blockElementScrollPositionUntilNextRender:m}=(0,l.a_)(),g=e=>{const n=e.currentTarget,t=d.indexOf(n),a=s[t].value;a!==o&&(m(n),u(a))},p=e=>{let n=null;switch(e.key){case"Enter":g(e);break;case"ArrowRight":{const t=d.indexOf(e.currentTarget)+1;n=d[t]??d[0];break}case"ArrowLeft":{const t=d.indexOf(e.currentTarget)-1;n=d[t]??d[d.length-1];break}}n?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":t},n)},s.map((e=>{let{value:n,label:t,attributes:l}=e;return r.createElement("li",(0,a.A)({role:"tab",tabIndex:o===n?0:-1,"aria-selected":o===n,key:n,ref:e=>d.push(e),onKeyDown:p,onClick:g},l,{className:(0,i.A)("tabs__item",v.tabItem,l?.className,{"tabs__item--active":o===n})}),t??n)})))}function N(e){let{lazy:n,children:t,selectedValue:a}=e;const i=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=i.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},i.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==a}))))}function b(e){const n=y(e);return r.createElement("div",{className:(0,i.A)("tabs-container",v.tabList)},r.createElement(h,(0,a.A)({},e,n)),r.createElement(N,(0,a.A)({},e,n)))}function I(e){const n=(0,f.A)();return r.createElement(b,(0,a.A)({key:String(n)},e))}},60726:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>g,contentTitle:()=>d,default:()=>f,frontMatter:()=>s,metadata:()=>m,toc:()=>p});var a=t(89575),r=(t(96540),t(15680)),i=t(13488),l=t(58032),o=t(80406),u=t(36096);const s={title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},d=void 0,m={unversionedId:"migration-from-v3",id:"version-4.3.1/migration-from-v3",title:"Migration Guide from v3 to v4",description:"Changed Usage",source:"@site/versioned_docs/version-4.3.1/migration-from-v3.mdx",sourceDirName:".",slug:"/migration-from-v3",permalink:"/egjs-infinitegrid/ko/docs/4.3.1/migration-from-v3",draft:!1,editUrl:null,tags:[],version:"4.3.1",frontMatter:{title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},sidebar:"started",previous:{title:"Listening to Events",permalink:"/egjs-infinitegrid/ko/docs/4.3.1/listening-to-events"}},g={},p=[{value:"Changed Usage",id:"changed-usage",level:2},{value:"HTML structure",id:"html-structure",level:2},{value:"Changes when using umd modules",id:"changes-when-using-umd-modules",level:2},{value:"Changed module names",id:"changed-module-names",level:2},{value:"Changed Options",id:"changed-options",level:2},{value:"Changed Events",id:"changed-events",level:2},{value:"Changed Methods",id:"changed-methods",level:2},{value:"Removed Options",id:"removed-options",level:2},{value:"Removed Methods",id:"removed-methods",level:2}],c={toc:p},y="wrapper";function f(e){let{components:n,...t}=e;return(0,r.yg)(y,(0,a.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"changed-usage"},"Changed Usage"),(0,r.yg)("p",null,"Double options are combined into one option."),(0,r.yg)(i.A,{groupId:"modules",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,r.yg)(l.A,{value:"js",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n\nconst ig = new MasonryInfiniteGrid(".container", {\n  attributePrefix: "data-grid-",\n  column: 5,\n});\n\nig.renderItems();\n'))),(0,r.yg)(l.A,{value:"react",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-jsx"},'import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\n\n<MasonryInfiniteGrid\n  attributePrefix={"data-grid-"}\n  column={5}\n  >\n  ...\n</MasonryInfiniteGrid>\n'))),(0,r.yg)(l.A,{value:"vue",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,r.yg)(l.A,{value:"vue3",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue3-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,r.yg)(l.A,{value:"angular",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-html"},'<div NgxMasonryInfiniteGrid\n  [gap]="5"\n  attributePrefix="data-grid-"\n  >\n  ...\n</div>\n'))),(0,r.yg)(l.A,{value:"svelte",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-html"},'<script>\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n<\/script>\n<MasonryInfiniteGrid\n  gap={5}\n  attributePrefix={"data-grid-"}\n>\n  ...\n</MasonryInfiniteGrid>\n')))),(0,r.yg)("h2",{id:"html-structure"},"HTML structure"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The option called ",(0,r.yg)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,r.yg)("inlineCode",{parentName:"li"},"container"),"."),(0,r.yg)("li",{parentName:"ul"},"If you set the ",(0,r.yg)("inlineCode",{parentName:"li"},"container")," option to true, a container is created inside the wrapper.",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"The class name of container has been changed from ",(0,r.yg)("inlineCode",{parentName:"li"},"_eg-infinitegrid-container_")," to ",(0,r.yg)("inlineCode",{parentName:"li"},"infinitegrid-container"))))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-html",metastring:"{3}","{3}":!0},'<body>\n  <div class="wrapper">\n    <div class="infinitegrid-container">\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n    </div>\n  </div>\n</body>\n')),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-js"},'const ig = new InfiniteGrid(".container", {\n  container: true,\n});\n')),(0,r.yg)("h2",{id:"changes-when-using-umd-modules"},"Changes when using umd modules"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"We've removed ",(0,r.yg)("inlineCode",{parentName:"li"},"eg")," namespace on umd modules.",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"eg.InfiniteGrid")," is now just ",(0,r.yg)("inlineCode",{parentName:"li"},"InfiniteGrid"))))),(0,r.yg)("h2",{id:"changed-module-names"},"Changed module names"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"From"),(0,r.yg)("th",{parentName:"tr",align:null},"To"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"GridLayout"),(0,r.yg)("td",{parentName:"tr",align:null},"MasonryInfiniteGrid")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"JustifiedLayout"),(0,r.yg)("td",{parentName:"tr",align:null},"JustifiedInfiniteGrid")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"FrameLayout"),(0,r.yg)("td",{parentName:"tr",align:null},"FrameInfiniteGrid")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"SquareLayout"),(0,r.yg)("td",{parentName:"tr",align:null},"Integration into MasonryInfiniteGrid")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"PackingLayout"),(0,r.yg)("td",{parentName:"tr",align:null},"PackingInfiniteGrid")))),(0,r.yg)("h2",{id:"changed-options"},"Changed Options"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Default value of ",(0,r.yg)("strong",{parentName:"li"},"attributePrefix")," is now ",(0,r.yg)("inlineCode",{parentName:"li"},"data-grid-")," (was ",(0,r.yg)("inlineCode",{parentName:"li"},"data-"),")"),(0,r.yg)("li",{parentName:"ul"},"The option called ",(0,r.yg)("inlineCode",{parentName:"li"},"margin")," is renamed ",(0,r.yg)("inlineCode",{parentName:"li"},"gap"),"."),(0,r.yg)("li",{parentName:"ul"},"The option called ",(0,r.yg)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,r.yg)("inlineCode",{parentName:"li"},"container"),".")),(0,r.yg)("h2",{id:"changed-events"},"Changed Events"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The event called ",(0,r.yg)("inlineCode",{parentName:"li"},"append")," is renamed ",(0,r.yg)("inlineCode",{parentName:"li"},"requestAppend"),"."),(0,r.yg)("li",{parentName:"ul"},"The event called ",(0,r.yg)("inlineCode",{parentName:"li"},"prepend")," is renamed ",(0,r.yg)("inlineCode",{parentName:"li"},"requestPrepend"),"."),(0,r.yg)("li",{parentName:"ul"},"The event called ",(0,r.yg)("inlineCode",{parentName:"li"},"layoutComplete")," is renamed ",(0,r.yg)("inlineCode",{parentName:"li"},"renderComplete"),"."),(0,r.yg)("li",{parentName:"ul"},"The event called ",(0,r.yg)("inlineCode",{parentName:"li"},"change")," is renamed ",(0,r.yg)("inlineCode",{parentName:"li"},"changeScroll"),"."),(0,r.yg)("li",{parentName:"ul"},"The event called ",(0,r.yg)("inlineCode",{parentName:"li"},"imageError")," is renamed ",(0,r.yg)("inlineCode",{parentName:"li"},"contentError"),".")),(0,r.yg)("h2",{id:"changed-methods"},"Changed Methods"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The method called ",(0,r.yg)("inlineCode",{parentName:"li"},"layout")," is renamed ",(0,r.yg)("inlineCode",{parentName:"li"},"renderItems"),"."),(0,r.yg)("li",{parentName:"ul"},"The method ",(0,r.yg)("inlineCode",{parentName:"li"},"getItems(true)")," can be used as ",(0,r.yg)("inlineCode",{parentName:"li"},"getItems()"),"."),(0,r.yg)("li",{parentName:"ul"},"The method ",(0,r.yg)("inlineCode",{parentName:"li"},"getItems(false)")," can be used as ",(0,r.yg)("inlineCode",{parentName:"li"},"getVisibleItems()"),"."),(0,r.yg)("li",{parentName:"ul"},"The usage of the ",(0,r.yg)("inlineCode",{parentName:"li"},"getStatus")," method has changed.",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.NOT_REMOVE)"),"(default) gets all infos"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.REMOVE_INVISIBLE_GROUPS)")," gets visible infos"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_ITEMS)")," gets visible infos. However, the information is simplified for invisible items."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_GROUPS)")," gets visible infos. However, invisible items are removed and only the outline remains.")))),(0,r.yg)("h2",{id:"removed-options"},"Removed Options"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The option called ",(0,r.yg)("inlineCode",{parentName:"li"},"transitionDuration")," is removed.",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"Use CSS. See ",(0,r.yg)(o.A,{to:(0,u.A)("Guides#use-transition"),mdxType:"Link"},"Guides"))))),(0,r.yg)("h2",{id:"removed-methods"},"Removed Methods"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"The method called ",(0,r.yg)("inlineCode",{parentName:"li"},"startLoading")," is removed.",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"Use a method called ",(0,r.yg)("inlineCode",{parentName:"li"},"wait")," instead."))),(0,r.yg)("li",{parentName:"ul"},"The method called ",(0,r.yg)("inlineCode",{parentName:"li"},"endLoading")," is removed.",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"Automatically check whether loading is ended."))),(0,r.yg)("li",{parentName:"ul"},"The method called ",(0,r.yg)("inlineCode",{parentName:"li"},"isLoading")," is removed.",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},"Use a method called ",(0,r.yg)("inlineCode",{parentName:"li"},"isWait")," instead."))),(0,r.yg)("li",{parentName:"ul"},"The method called ",(0,r.yg)("inlineCode",{parentName:"li"},"isProcessing")," is removed.")))}f.isMDXComponent=!0},15680:(e,n,t)=>{t.d(n,{xA:()=>d,yg:()=>c});var a=t(96540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=a.createContext({}),s=function(e){var n=a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=s(e.components);return a.createElement(u.Provider,{value:n},e.children)},m="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},p=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),m=s(t),p=r,c=m["".concat(u,".").concat(p)]||m[p]||g[p]||i;return t?a.createElement(c,l(l({ref:n},d),{},{components:t})):a.createElement(c,l({ref:n},d))}));function c(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=p;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o[m]="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=t[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}p.displayName="MDXCreateElement"}}]);