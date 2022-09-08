"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9854],{3217:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(7294),i=n(6277);const r="tabItem_Ymn6";function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,i.Z)(r,l),hidden:n},t)}},3873:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(7896),i=n(7294),r=n(6277),l=n(8864),o=n(3171),d=n(9e3),s=n(1347);const u="tabList__CuJ",m="tabItem_LNqP";function p(e){var t;const{lazy:n,block:l,defaultValue:p,values:c,groupId:g,className:v}=e,k=i.Children.map(e.children,(e=>{if((0,i.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),f=c??k.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),h=(0,o.l)(f,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const N=null===p?p:p??(null==(t=k.find((e=>e.props.default)))?void 0:t.props.value)??k[0].props.value;if(null!==N&&!f.some((e=>e.value===N)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${N}" but none of its children has the corresponding value. Available values are: ${f.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:b,setTabGroupChoices:y}=(0,d.U)(),[C,I]=(0,i.useState)(N),T=[],{blockElementScrollPositionUntilNextRender:w}=(0,s.o5)();if(null!=g){const e=b[g];null!=e&&e!==C&&f.some((t=>t.value===e))&&I(e)}const E=e=>{const t=e.currentTarget,n=T.indexOf(t),a=f[n].value;a!==C&&(w(t),I(a),null!=g&&y(g,String(a)))},M=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=T.indexOf(e.currentTarget)+1;n=T[t]??T[0];break}case"ArrowLeft":{const t=T.indexOf(e.currentTarget)-1;n=T[t]??T[T.length-1];break}}null==(t=n)||t.focus()};return i.createElement("div",{className:(0,r.Z)("tabs-container",u)},i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":l},v)},f.map((e=>{let{value:t,label:n,attributes:l}=e;return i.createElement("li",(0,a.Z)({role:"tab",tabIndex:C===t?0:-1,"aria-selected":C===t,key:t,ref:e=>T.push(e),onKeyDown:M,onFocus:E,onClick:E},l,{className:(0,r.Z)("tabs__item",m,null==l?void 0:l.className,{"tabs__item--active":C===t})}),n??t)}))),n?(0,i.cloneElement)(k.filter((e=>e.props.value===C))[0],{className:"margin-top--md"}):i.createElement("div",{className:"margin-top--md"},k.map(((e,t)=>(0,i.cloneElement)(e,{key:t,hidden:e.props.value!==C})))))}function c(e){const t=(0,l.Z)();return i.createElement(p,(0,a.Z)({key:String(t)},e))}},5388:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>d,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>m});var a=n(7896),i=(n(7294),n(3905)),r=n(3873),l=n(3217);const o={title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},d=void 0,s={unversionedId:"migration-from-v3",id:"version-4.0.0/migration-from-v3",title:"Migration Guide from v3 to v4",description:"Changed Usage",source:"@site/versioned_docs/version-4.0.0/migration-from-v3.mdx",sourceDirName:".",slug:"/migration-from-v3",permalink:"/egjs-infinitegrid/docs/4.0.0/migration-from-v3",draft:!1,editUrl:null,tags:[],version:"4.0.0",frontMatter:{title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},sidebar:"version-4.0.0/started",previous:{title:"Listening to Events",permalink:"/egjs-infinitegrid/docs/4.0.0/listening-to-events"}},u={},m=[{value:"Changed Usage",id:"changed-usage",level:2},{value:"HTML structure",id:"html-structure",level:2},{value:"Changes when using umd modules",id:"changes-when-using-umd-modules",level:2},{value:"Changed module names",id:"changed-module-names",level:2},{value:"Changed Options",id:"changed-options",level:2},{value:"Changed Events",id:"changed-events",level:2},{value:"Changed Methods",id:"changed-methods",level:2},{value:"Removed Methods",id:"removed-methods",level:2}],p={toc:m};function c(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"changed-usage"},"Changed Usage"),(0,i.kt)("p",null,"Double options are combined into one option."),(0,i.kt)(r.Z,{groupId:"modules",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"js",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n\nconst ig = new MasonryInfiniteGrid(".container", {\n  attributePrefix: "data-grid-",\n  column: 5,\n});\n\nig.renderItems();\n'))),(0,i.kt)(l.Z,{value:"react",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\n\n<MasonryInfiniteGrid\n  attributePrefix={"data-grid-"}\n  column={5}\n  >\n  ...\n</MasonryInfiniteGrid>\n'))),(0,i.kt)(l.Z,{value:"vue",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,i.kt)(l.Z,{value:"vue3",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue3-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,i.kt)(l.Z,{value:"angular",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<div NgxMasonryInfiniteGrid\n  [gap]="5"\n  attributePrefix="data-grid-"\n  >\n  ...\n</div>\n'))),(0,i.kt)(l.Z,{value:"svelte",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<script>\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n<\/script>\n<MasonryInfiniteGrid\n  gap={5}\n  attributePrefix={"data-grid-"}\n>\n  ...\n</MasonryInfiniteGrid>\n')))),(0,i.kt)("h2",{id:"html-structure"},"HTML structure"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The option called ",(0,i.kt)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"container"),"."),(0,i.kt)("li",{parentName:"ul"},"If you set the ",(0,i.kt)("inlineCode",{parentName:"li"},"container")," option to true, a container is created inside the wrapper.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"The class name of container has been changed from ",(0,i.kt)("inlineCode",{parentName:"li"},"_eg-infinitegrid-container_")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"infinitegrid-container"))))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html",metastring:"{3}","{3}":!0},'<body>\n  <div class="wrapper">\n    <div class="infinitegrid-container">\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n    </div>\n  </div>\n</body>\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const ig = new InfiniteGrid(".container", {\n  container: true,\n});\n')),(0,i.kt)("h2",{id:"changes-when-using-umd-modules"},"Changes when using umd modules"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"We've removed ",(0,i.kt)("inlineCode",{parentName:"li"},"eg")," namespace on umd modules.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"eg.InfiniteGrid")," is now just ",(0,i.kt)("inlineCode",{parentName:"li"},"InfiniteGrid"))))),(0,i.kt)("h2",{id:"changed-module-names"},"Changed module names"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"From"),(0,i.kt)("th",{parentName:"tr",align:null},"To"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"GridLayout"),(0,i.kt)("td",{parentName:"tr",align:null},"MasonryInfiniteGrid")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"JustifiedLayout"),(0,i.kt)("td",{parentName:"tr",align:null},"JustifiedInfiniteGrid")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"FrameLayout"),(0,i.kt)("td",{parentName:"tr",align:null},"FrameInfiniteGrid")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"SquareLayout"),(0,i.kt)("td",{parentName:"tr",align:null},"Integration into MasonryInfiniteGrid")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"PackingLayout"),(0,i.kt)("td",{parentName:"tr",align:null},"PackingInfiniteGrid")))),(0,i.kt)("h2",{id:"changed-options"},"Changed Options"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Default value of ",(0,i.kt)("strong",{parentName:"li"},"attributePrefix")," is now ",(0,i.kt)("inlineCode",{parentName:"li"},"data-grid-")," (was ",(0,i.kt)("inlineCode",{parentName:"li"},"data-"),")"),(0,i.kt)("li",{parentName:"ul"},"The option called ",(0,i.kt)("inlineCode",{parentName:"li"},"margin")," is renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"gap"),"."),(0,i.kt)("li",{parentName:"ul"},"The option called ",(0,i.kt)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"container"),".")),(0,i.kt)("h2",{id:"changed-events"},"Changed Events"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The event called ",(0,i.kt)("inlineCode",{parentName:"li"},"append")," is renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"requestAppend"),"."),(0,i.kt)("li",{parentName:"ul"},"The event called ",(0,i.kt)("inlineCode",{parentName:"li"},"prepend")," is renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"requestPrepend"),"."),(0,i.kt)("li",{parentName:"ul"},"The event called ",(0,i.kt)("inlineCode",{parentName:"li"},"layoutComplete")," is renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"renderComplete"),"."),(0,i.kt)("li",{parentName:"ul"},"The event called ",(0,i.kt)("inlineCode",{parentName:"li"},"change")," is renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"changeScroll"),"."),(0,i.kt)("li",{parentName:"ul"},"The event called ",(0,i.kt)("inlineCode",{parentName:"li"},"imageError")," is renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"contentError"),".")),(0,i.kt)("h2",{id:"changed-methods"},"Changed Methods"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The method called ",(0,i.kt)("inlineCode",{parentName:"li"},"layout")," is renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"renderItems"),"."),(0,i.kt)("li",{parentName:"ul"},"The method ",(0,i.kt)("inlineCode",{parentName:"li"},"getItems(true)")," can be used as ",(0,i.kt)("inlineCode",{parentName:"li"},"getItems()"),"."),(0,i.kt)("li",{parentName:"ul"},"The method ",(0,i.kt)("inlineCode",{parentName:"li"},"getItems(false)")," can be used as ",(0,i.kt)("inlineCode",{parentName:"li"},"getVisibleItems()"),"."),(0,i.kt)("li",{parentName:"ul"},"The usage of the ",(0,i.kt)("inlineCode",{parentName:"li"},"getStatus")," method has changed.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.NOT_REMOVE)"),"(default) gets all infos"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.REMOVE_INVISIBLE_GROUPS)")," gets visible infos"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_ITEMS)")," gets visible infos. However, the information is simplified for invisible items."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_GROUPS)")," gets visible infos. However, invisible items are removed and only the outline remains.")))),(0,i.kt)("h2",{id:"removed-methods"},"Removed Methods"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The method called ",(0,i.kt)("inlineCode",{parentName:"li"},"startLoading")," is removed.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Use a method called ",(0,i.kt)("inlineCode",{parentName:"li"},"wait")," instead."))),(0,i.kt)("li",{parentName:"ul"},"The method called ",(0,i.kt)("inlineCode",{parentName:"li"},"endLoading")," is removed.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Automatically check whether loading is ended."))),(0,i.kt)("li",{parentName:"ul"},"The method called ",(0,i.kt)("inlineCode",{parentName:"li"},"isLoading")," is removed.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Use a method called ",(0,i.kt)("inlineCode",{parentName:"li"},"isWait")," instead."))),(0,i.kt)("li",{parentName:"ul"},"The method called ",(0,i.kt)("inlineCode",{parentName:"li"},"isProcessing")," is removed.")))}c.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>c});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var d=a.createContext({}),s=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(d.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,d=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=s(n),c=i,g=p["".concat(d,".").concat(c)]||p[c]||m[c]||r;return n?a.createElement(g,l(l({ref:t},u),{},{components:n})):a.createElement(g,l({ref:t},u))}));function c(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=p;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var s=2;s<r;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);