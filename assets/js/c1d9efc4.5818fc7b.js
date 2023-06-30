"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6684],{3905:function(e,n,t){t.d(n,{Zo:function(){return m},kt:function(){return c}});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var u=a.createContext({}),d=function(e){var n=a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},m=function(e){var n=d(e.components);return a.createElement(u.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},p=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,u=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),p=d(t),c=i,v=p["".concat(u,".").concat(c)]||p[c]||s[c]||r;return t?a.createElement(v,l(l({ref:n},m),{},{components:t})):a.createElement(v,l({ref:n},m))}));function c(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,l=new Array(r);l[0]=p;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var d=2;d<r;d++)l[d]=t[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},2360:function(e,n,t){t.d(n,{Z:function(){return l}});var a=t(7294),i=t(6010),r="tabItem_OmH5";function l(e){var n=e.children,t=e.hidden,l=e.className;return a.createElement("div",{role:"tabpanel",className:(0,i.Z)(r,l),hidden:t},n)}},9877:function(e,n,t){t.d(n,{Z:function(){return c}});var a=t(7462),i=t(7294),r=t(2389),l=t(7392),o=t(7094),u=t(2466),d=t(6010),m="tabList_uSqn",s="tabItem_LplD";function p(e){var n,t,r,p=e.lazy,c=e.block,v=e.defaultValue,f=e.values,g=e.groupId,k=e.className,h=i.Children.map(e.children,(function(e){if((0,i.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),N=null!=f?f:h.map((function(e){var n=e.props;return{value:n.value,label:n.label,attributes:n.attributes}})),b=(0,l.l)(N,(function(e,n){return e.value===n.value}));if(b.length>0)throw new Error('Docusaurus error: Duplicate values "'+b.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var y=null===v?v:null!=(n=null!=v?v:null==(t=h.find((function(e){return e.props.default})))?void 0:t.props.value)?n:null==(r=h[0])?void 0:r.props.value;if(null!==y&&!N.some((function(e){return e.value===y})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+N.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var C=(0,o.U)(),I=C.tabGroupChoices,T=C.setTabGroupChoices,w=(0,i.useState)(y),O=w[0],E=w[1],M=[],S=(0,u.o5)().blockElementScrollPositionUntilNextRender;if(null!=g){var G=I[g];null!=G&&G!==O&&N.some((function(e){return e.value===G}))&&E(G)}var x=function(e){var n=e.currentTarget,t=M.indexOf(n),a=N[t].value;a!==O&&(S(n),E(a),null!=g&&T(g,a))},j=function(e){var n,t=null;switch(e.key){case"ArrowRight":var a=M.indexOf(e.currentTarget)+1;t=M[a]||M[0];break;case"ArrowLeft":var i=M.indexOf(e.currentTarget)-1;t=M[i]||M[M.length-1]}null==(n=t)||n.focus()};return i.createElement("div",{className:(0,d.Z)("tabs-container",m)},i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,d.Z)("tabs",{"tabs--block":c},k)},N.map((function(e){var n=e.value,t=e.label,r=e.attributes;return i.createElement("li",(0,a.Z)({role:"tab",tabIndex:O===n?0:-1,"aria-selected":O===n,key:n,ref:function(e){return M.push(e)},onKeyDown:j,onFocus:x,onClick:x},r,{className:(0,d.Z)("tabs__item",s,null==r?void 0:r.className,{"tabs__item--active":O===n})}),null!=t?t:n)}))),p?(0,i.cloneElement)(h.filter((function(e){return e.props.value===O}))[0],{className:"margin-top--md"}):i.createElement("div",{className:"margin-top--md"},h.map((function(e,n){return(0,i.cloneElement)(e,{key:n,hidden:e.props.value!==O})}))))}function c(e){var n=(0,r.Z)();return i.createElement(p,(0,a.Z)({key:String(n)},e))}},5164:function(e,n,t){t.r(n),t.d(n,{assets:function(){return v},contentTitle:function(){return p},default:function(){return k},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return f}});var a=t(7462),i=t(3366),r=(t(7294),t(3905)),l=t(9877),o=t(2360),u=t(9960),d=t(4996),m=["components"],s={title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},p=void 0,c={unversionedId:"migration-from-v3",id:"version-4.3.1/migration-from-v3",title:"Migration Guide from v3 to v4",description:"Changed Usage",source:"@site/versioned_docs/version-4.3.1/migration-from-v3.mdx",sourceDirName:".",slug:"/migration-from-v3",permalink:"/egjs-infinitegrid/docs/migration-from-v3",draft:!1,editUrl:null,tags:[],version:"4.3.1",frontMatter:{title:"Migration Guide from v3 to v4",id:"migration-from-v3",slug:"/migration-from-v3",custom_edit_url:null},sidebar:"started",previous:{title:"Listening to Events",permalink:"/egjs-infinitegrid/docs/listening-to-events"}},v={},f=[{value:"Changed Usage",id:"changed-usage",level:2},{value:"HTML structure",id:"html-structure",level:2},{value:"Changes when using umd modules",id:"changes-when-using-umd-modules",level:2},{value:"Changed module names",id:"changed-module-names",level:2},{value:"Changed Options",id:"changed-options",level:2},{value:"Changed Events",id:"changed-events",level:2},{value:"Changed Methods",id:"changed-methods",level:2},{value:"Removed Options",id:"removed-options",level:2},{value:"Removed Methods",id:"removed-methods",level:2}],g={toc:f};function k(e){var n=e.components,t=(0,i.Z)(e,m);return(0,r.kt)("wrapper",(0,a.Z)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"changed-usage"},"Changed Usage"),(0,r.kt)("p",null,"Double options are combined into one option."),(0,r.kt)(l.Z,{groupId:"modules",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"React",value:"react"},{label:"Vue@2",value:"vue"},{label:"Vue@3",value:"vue3"},{label:"Angular",value:"angular"},{label:"Svelte",value:"svelte"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"js",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'import { MasonryInfiniteGrid } from "@egjs/infinitegrid";\n\nconst ig = new MasonryInfiniteGrid(".container", {\n  attributePrefix: "data-grid-",\n  column: 5,\n});\n\nig.renderItems();\n'))),(0,r.kt)(o.Z,{value:"react",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";\n\n<MasonryInfiniteGrid\n  attributePrefix={"data-grid-"}\n  column={5}\n  >\n  ...\n</MasonryInfiniteGrid>\n'))),(0,r.kt)(o.Z,{value:"vue",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,r.kt)(o.Z,{value:"vue3",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <MasonryInfiniteGrid\n    attributePrefix="data-grid-"\n    v-bind:column="5">\n    ...\n  </MasonryInfiniteGrid>\n</template>\n<script>\n  import { MasonryInfiniteGrid } from "@egjs/vue3-infinitegrid";\n  export default {\n    components: {\n      MasonryInfiniteGrid,\n    },\n  };\n<\/script>\n'))),(0,r.kt)(o.Z,{value:"angular",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<div NgxMasonryInfiniteGrid\n  [gap]="5"\n  attributePrefix="data-grid-"\n  >\n  ...\n</div>\n'))),(0,r.kt)(o.Z,{value:"svelte",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<script>\n  import { MasonryInfiniteGrid } from "@egjs/svelte-infinitegrid";\n<\/script>\n<MasonryInfiniteGrid\n  gap={5}\n  attributePrefix={"data-grid-"}\n>\n  ...\n</MasonryInfiniteGrid>\n')))),(0,r.kt)("h2",{id:"html-structure"},"HTML structure"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The option called ",(0,r.kt)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"container"),"."),(0,r.kt)("li",{parentName:"ul"},"If you set the ",(0,r.kt)("inlineCode",{parentName:"li"},"container")," option to true, a container is created inside the wrapper.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"The class name of container has been changed from ",(0,r.kt)("inlineCode",{parentName:"li"},"_eg-infinitegrid-container_")," to ",(0,r.kt)("inlineCode",{parentName:"li"},"infinitegrid-container"))))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html",metastring:"{3}","{3}":!0},'<body>\n  <div class="wrapper">\n    <div class="infinitegrid-container">\n      <div>Item 1</div>\n      <div>Item 2</div>\n      <div>Item 3</div>\n    </div>\n  </div>\n</body>\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const ig = new InfiniteGrid(".container", {\n  container: true,\n});\n')),(0,r.kt)("h2",{id:"changes-when-using-umd-modules"},"Changes when using umd modules"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"We've removed ",(0,r.kt)("inlineCode",{parentName:"li"},"eg")," namespace on umd modules.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"eg.InfiniteGrid")," is now just ",(0,r.kt)("inlineCode",{parentName:"li"},"InfiniteGrid"))))),(0,r.kt)("h2",{id:"changed-module-names"},"Changed module names"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"From"),(0,r.kt)("th",{parentName:"tr",align:null},"To"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"GridLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"MasonryInfiniteGrid")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"JustifiedLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"JustifiedInfiniteGrid")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"FrameLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"FrameInfiniteGrid")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SquareLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"Integration into MasonryInfiniteGrid")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"PackingLayout"),(0,r.kt)("td",{parentName:"tr",align:null},"PackingInfiniteGrid")))),(0,r.kt)("h2",{id:"changed-options"},"Changed Options"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Default value of ",(0,r.kt)("strong",{parentName:"li"},"attributePrefix")," is now ",(0,r.kt)("inlineCode",{parentName:"li"},"data-grid-")," (was ",(0,r.kt)("inlineCode",{parentName:"li"},"data-"),")"),(0,r.kt)("li",{parentName:"ul"},"The option called ",(0,r.kt)("inlineCode",{parentName:"li"},"margin")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"gap"),"."),(0,r.kt)("li",{parentName:"ul"},"The option called ",(0,r.kt)("inlineCode",{parentName:"li"},"isOverflowScroll")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"container"),".")),(0,r.kt)("h2",{id:"changed-events"},"Changed Events"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"append")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"requestAppend"),"."),(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"prepend")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"requestPrepend"),"."),(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"layoutComplete")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"renderComplete"),"."),(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"change")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"changeScroll"),"."),(0,r.kt)("li",{parentName:"ul"},"The event called ",(0,r.kt)("inlineCode",{parentName:"li"},"imageError")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"contentError"),".")),(0,r.kt)("h2",{id:"changed-methods"},"Changed Methods"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"layout")," is renamed ",(0,r.kt)("inlineCode",{parentName:"li"},"renderItems"),"."),(0,r.kt)("li",{parentName:"ul"},"The method ",(0,r.kt)("inlineCode",{parentName:"li"},"getItems(true)")," can be used as ",(0,r.kt)("inlineCode",{parentName:"li"},"getItems()"),"."),(0,r.kt)("li",{parentName:"ul"},"The method ",(0,r.kt)("inlineCode",{parentName:"li"},"getItems(false)")," can be used as ",(0,r.kt)("inlineCode",{parentName:"li"},"getVisibleItems()"),"."),(0,r.kt)("li",{parentName:"ul"},"The usage of the ",(0,r.kt)("inlineCode",{parentName:"li"},"getStatus")," method has changed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.NOT_REMOVE)"),"(default) gets all infos"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS_TYPE.REMOVE_INVISIBLE_GROUPS)")," gets visible infos"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_ITEMS)")," gets visible infos. However, the information is simplified for invisible items."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"getStatus(STATUS.MINIMIZE_INVISIBLE_GROUPS)")," gets visible infos. However, invisible items are removed and only the outline remains.")))),(0,r.kt)("h2",{id:"removed-options"},"Removed Options"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The option called ",(0,r.kt)("inlineCode",{parentName:"li"},"transitionDuration")," is removed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Use CSS. See ",(0,r.kt)(u.Z,{to:(0,d.Z)("Guides#use-transition"),mdxType:"Link"},"Guides"))))),(0,r.kt)("h2",{id:"removed-methods"},"Removed Methods"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"startLoading")," is removed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Use a method called ",(0,r.kt)("inlineCode",{parentName:"li"},"wait")," instead."))),(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"endLoading")," is removed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Automatically check whether loading is ended."))),(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"isLoading")," is removed.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Use a method called ",(0,r.kt)("inlineCode",{parentName:"li"},"isWait")," instead."))),(0,r.kt)("li",{parentName:"ul"},"The method called ",(0,r.kt)("inlineCode",{parentName:"li"},"isProcessing")," is removed.")))}k.isMDXComponent=!0}}]);